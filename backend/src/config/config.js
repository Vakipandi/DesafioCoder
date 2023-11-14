import dotenv from 'dotenv';
import command from './arguments.js';
import __dirname from '../utils.js';

const enviroment = command.mode;
const path =
  enviroment === 'dev' ? `${__dirname}/.env.dev` : `${__dirname}/.env.prod`;

dotenv.config({ path });

export default {
  PORT: process.env.PORT,
  DB_CONNECTION: process.env.DB_CONNECTION,
  SECRET_KEY: process.env.SECRET_KEY,
  SECRET_SESSION: process.env.SECRET_SESSION,
  GITHUB_APP_ID: process.env.GITHUB_APP_ID,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CB: process.env.GITHUB_CB,
  JWT_SECRET: process.env.JWT_SECRET,
};
