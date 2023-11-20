import { createTransport } from 'nodemailer';
import args from '../config/arguments.js';
import env from '../config/env.js';

const { G_MAIL, G_PASS } = env;

export default createTransport({
  service: 'gmail',
  auth: {
    user: G_MAIL,
    pass: G_PASS,
  },
});
