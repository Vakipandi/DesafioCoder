// import dotenv from 'dotenv';
// dotenv.config({ path: `${__dirname}/.env` });

import './config/config.js'
import MongoConnect from './config/Mongo.js';
import express from 'express';
import expressSession from 'express-session';
import __dirname from './utils.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import IndexRouter from './routes/index.routes.js';
import passport from 'passport';
import initializePassport from './middlewares/passport.js';
import cors from 'cors';

const router = new IndexRouter();

const app = express();
const PORT = process.env.PORT;

// express and middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.static(`${__dirname}/public`));

// database
// const db = new MongoConnect(process.env.DB_CONNECTION);
// db.connectMongo();


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

// routes
app.use('/api', router.getRouter());

// listen to the port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
