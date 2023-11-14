import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../dao/db/models/user.model.js';
import jwt from 'passport-jwt';
import GhStrategy from 'passport-github2';

export default function () {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null, user);
  });
  passport.use(
    'register',
    new Strategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        try {
          let user = await User.findOne({ email: username });
          if (!user) {
            let user = await User.create(req.body);
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  passport.use(
    'login',
    new Strategy(
      {
        usernameField: 'email',
      },
      async (username, password, done) => {
        try {
          let user = await User.findOne({ email: username });
          if (!user) {
            return done(null);
          } else {
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    'github',
    new GhStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CB,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile._json.login });
          if (user) {
            return done(null, user);
          } else {
            let one = await User.create({
              name: profile.displayName,
              email: profile._json.login,
              photo: profile.photos[0].value,
              password: profile.id,
            });
            return done(null, one);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.use(
    'jwt',
    new jwt.Strategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([
          (req) => req?.cookies['token'],
        ]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          let one = await User.findOne({ email: payload.email });
          if (one) {
            return done(null, one);
          } else {
            return done(null);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
}
