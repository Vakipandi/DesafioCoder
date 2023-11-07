import 'dotenv/config.js';
import './dao/db/dbConfig.js'

// working with express
import express from 'express';
import expressSession from 'express-session';

//absolute path to the project folder
import __dirname from './utils.js';

// importing routes
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';

// import index router
import IndexRouter from './routes/index.routes.js';

// socket.io
import { Server } from 'socket.io';
import passport from 'passport';
import initializePassport from './middlewares/passport.js';

const router = new IndexRouter();

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

// passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));

// static files
app.use(express.static(`${__dirname}/public`));


// routes
app.use('/api', router.getRouter());


// listen to the port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



