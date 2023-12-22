import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../dao/db/models/user.model.js';
import jwt from 'passport-jwt';
import GhStrategy from 'passport-github2';
import env from '../config/env.js'

export default function () {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    if (!id) {
      return done(null, null);
    }
    const user = await User.findById(id);
    return done(null, user);
  });

  // Configura la estrategia de registro
  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password',
      },
      async (req, email, password, done) => {
        try {
          const { name } = req.body;

          // Verifica si el usuario ya existe
          let user = await User.findOne({ email: email });

          if (!user) {
            // Si el usuario no existe, crea el usuario y devuelve el objeto de usuario para la serialización
            let newUser = await User.create({
              name,
              email,
              password,
            });

            return done(null, newUser);
          } else {
            // Si el usuario ya existe, devuelve un mensaje indicando que el correo ya está en uso
            return done(null, false, {
              message: 'El correo electrónico ya está en uso.',
            });
          }
        } catch (error) {
          // Maneja errores
          return done(error);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              message: 'Usuario o contraseña incorrectos',
            });
          }

          // Autenticación exitosa
          return done(null, user);
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
        clientID: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
        callbackURL: env.GITHUB_CB,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile._json);
          let user = await User.findOne({ email: profile._json.login });
          console.log(user);
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
          done(error, null);
        }
      }
    )
  );

  passport.use(
    'jwt',
    new jwt.Strategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([
          (req) => {
            return req?.cookies['token'];
          },
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
