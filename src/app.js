// working with express
import express from "express";

// import handlebars
import handlebars from "express-handlebars";

//absolute path to the project folder
import __dirname from "./utils.js";

// importing routes
import cartsRouter from "./routes/carts.routes.js";
import productsRouter from "./routes/products.routes.js";
import viewRouter from "./routes/view.routes.js";

// socket.io
import { Server } from "socket.io";
import "./dao/dbConfig.js";

// initialize express app
// create a new express app
const app = express();
const PORT = process.env.PORT || 3000;

// understand the incoming data

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static(`${__dirname}/public`));

// handlebars template engine
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

// routes
app.use("/api", cartsRouter);
app.use("/api", productsRouter);
app.use("/", viewRouter);

// listen to the port
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

import ProductManager from "./dao/mongoManagers/productManagerMongo.js";
const productMng = new ProductManager();

import CartManager from "./dao/mongoManagers/cartManagerMongo.js";
const cartMng = new CartManager();

import MessagesManager from "./dao/mongoManagers/messageManagerMongo.js";
const messagesMng = new MessagesManager();

socketServer.on("connection", async (socket) => {
  console.log("New client connected with ID:", socket.id);
  const listProducts = await productMng.getProducts();
  socketServer.emit("sendProducts", listProducts);

  socket.on("sendIdCart", async (id) => {
    const listCart = await cartMng.getProductsByCartId(id);
    console.log(listCart);
    socketServer.emit("sendCart", listCart);

  });

  socket.on("addCart", async (cart) => {
    await cartMng.addCart(cart);
    const listCarts = await cartMng.getCarts();
    
    socketServer.emit("sendCarts", listCarts);
  });

  socket.on("deletePCart", async (id) => {
    await cartMng.deleteProductFromCart(id);
    const listCarts = await cartMng.getCarts();
    console.log(listCarts);
    socketServer.emit("sendCarts", listCarts);
  });

  socket.on("addProduct", async (product) => {
    await productMng.addProduct(product);
    const listProducts = await productMng.getProducts();
    socketServer.emit("sendProducts", listProducts);
  });

  socket.on("deleteProduct", async (id) => {
    await productMng.deleteProduct(id);
    const listProducts = await productMng.getProducts();
    socketServer.emit("sendProducts", listProducts);
  });

  socket.on("newUser", (user) => {
    console.log("user", user);
    socket.broadcast.emit("broadcast", user);
  });

  socket.on("disconnect", (socket) => {
    console.log(`user with id: ${socket.id} disconnected`);
  });

  socket.on("message", async (message) => {
    await messagesMng.createMessage(message);
    const listMessages = await messagesMng.getMessages();
    socketServer.emit("chat", listMessages);
  });
});
