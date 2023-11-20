import args from '../arguments.js';
import expressSession from 'express-session';
import sessionFileStore from 'session-file-store';
import { connect } from 'mongoose';
import MongoStore from 'connect-mongo';
import env from '../env.js';
import { MongoClient } from 'mongodb'

let sessions = null;

const clientPromise = MongoClient.connect(env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const store = MongoStore.create({
  clientPromise,
  ttl: 60 * 60 * 24 * 7,
  retries: 0,
});

switch (args.persistence) {
  case 'FS':
    const FileStore = sessionFileStore(expressSession);
    sessions = expressSession({
      store: new FileStore({
        path: './src/config/sessions/files',
        ttl: 60 * 60 * 24 * 7,
        retries: 0,
      }),
      secret: env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    });
    break;

  default:
    sessions = expressSession({
      store,
      secret: env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    });
    break;
}

export default sessions;
