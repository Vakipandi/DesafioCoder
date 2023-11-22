// import dotenv from 'dotenv';
// dotenv.config({ path: `${__dirname}/.env` });

import './config/env.js';
// import MongoConnect from './config/Mongo.js';
import express from 'express';
import __dirname from './config/utils.js';
import cookieParser from 'cookie-parser';
import IndexRouter from './routes/index.routes.js';
import passport from 'passport';
import initializePassport from './middlewares/passport.js';
import cors from 'cors';
import sessions from './config/sessions/factory.js';
import compression from 'express-compression';
import winston from './middlewares/winston.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import options from './config/swagger.js';

const router = new IndexRouter();

const app = express();
const PORT = process.env.PORT;

const specs = swaggerJSDoc(options);

// winston
app.use(winston);

// express and middlewares
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.static(`${__dirname}/public`));

app.use('/api/docs', serve, setup(specs));

// database
// const db = new MongoConnect(process.env.DB_CONNECTION);
// db.connectMongo();

// express-session
app.use(sessions);

// passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use(compression({ brotli: { enabled: true, zlib: {} } }));
// routes
app.use('/api', router.getRouter());

// error handler
app.use(notFoundHandler);
app.use(errorHandler);

// listen to the port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
