import 'dotenv/config.js';

// working with express
import express from 'express';
import expressSession from 'express-session';

// import handlebars
import handlebars from 'express-handlebars';

//absolute path to the project folder
import __dirname from './utils.js';

// importing routes
import cartsRouter from './routes/carts.routes.js';
import productsRouter from './routes/products.routes.js';
import viewRouter from './routes/view.routes.js';
import usersRouter from './routes/user.routes.js';
import cookiesRouter from './routes/cookies.routes.js';
import sessionsRouter from './routes/sessions.routes.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';

// socket.io
import { Server } from 'socket.io';
import './dao/dbConfig.js';

// initialize express app
// create a new express app
const app = express();

// define the port
const PORT = process.env.PORT;

// understand the incoming data
app.use(express.json());

// express-session
app.use(
  expressSession({
    store: MongoStore.create({
      mongoUrl: process.env.DB_CONNECTION,
      ttl: 60 * 60 * 24 * 7,
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));

// static files
app.use(express.static(`${__dirname}/public`));

// handlebars template engine
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

// routes
app.use('/api', cartsRouter);
app.use('/api', productsRouter);
app.use('/api', usersRouter);
app.use('/api', cookiesRouter);
app.use('/api', sessionsRouter);

// view routes
app.use('/', viewRouter);

// listen to the port
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

import ProductManager from './dao/mongoManagers/productManagerMongo.js';
const productMng = new ProductManager();

import CartManager from './dao/mongoManagers/cartManagerMongo.js';
const cartMng = new CartManager();

import MessagesManager from './dao/mongoManagers/messageManagerMongo.js';
const messagesMng = new MessagesManager();

socketServer.on('connection', async (socket) => {
  console.log('New client connected with ID:', socket.id);
  const listProducts = await productMng.getProducts();
  socketServer.emit('sendProducts', listProducts);

  socket.on('sendIdCart', async (id) => {
    const listCart = await cartMng.getProductsByCartId(id);
    console.log(listCart);
    socketServer.emit('sendCart', listCart);
  });

  socket.on('addCart', async (cart) => {
    await cartMng.addCart(cart);
    const listCarts = await cartMng.getCarts();

    socketServer.emit('sendCarts', listCarts);
  });

  socket.on('deletePCart', async (id) => {
    await cartMng.deleteProductFromCart(id);
    const listCarts = await cartMng.getCarts();
    console.log(listCarts);
    socketServer.emit('sendCarts', listCarts);
  });

  socket.on('addProduct', async (product) => {
    await productMng.addProduct(product);
    const listProducts = await productMng.getProducts();
    socketServer.emit('sendProducts', listProducts);
  });

  socket.on('deleteProduct', async (id) => {
    await productMng.deleteProduct(id);
    const listProducts = await productMng.getProducts();
    socketServer.emit('sendProducts', listProducts);
  });

  socket.on('newUser', (user) => {
    console.log('user', user);
    socket.broadcast.emit('broadcast', user);
  });

  socket.on('disconnect', (socket) => {
    console.log(`user with id: ${socket.id} disconnected`);
  });

  socket.on('message', async (message) => {
    await messagesMng.createMessage(message);
    const listMessages = await messagesMng.getMessages();
    socketServer.emit('chat', listMessages);
  });
});
