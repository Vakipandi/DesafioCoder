import UserController from '../../controllers/users.controller.js';
import create_token from '../../middlewares/create_token.js';
import is_8_char from '../../middlewares/is_8_char.js';
import is_same_email from '../../middlewares/is_same_email.js';
import is_user from '../../middlewares/is_user.js';
import is_valid_pass from '../../middlewares/is_valid_pass.js';
import passport from 'passport';
import MyRouter from '../router.js';

const userController = new UserController();

export default class UserRouter extends MyRouter {
  init() {
    this.create(
      '/register',
      ['PUBLIC'],
      is_8_char,
      is_same_email,
      async (req, res, next) => {
        try {
          let data = req.body;
          let response = await userController.register(data);
          return response
            ? res.sendSuccessCreate(response)
            : res.sendNotFound('User');
        } catch (error) {
          next(error);
        }
      }
    );

    this.create(
      '/login',
      ['PUBLIC'],
      is_user,
      is_valid_pass,
      create_token,
      async (req, res, next) => {
        try {
          req.session.email = req.body.email;
          req.session.role = req.body.role;
          let response = await userController.login();
          if (response) {
            return res
              .cookie('token', req.session.token, {
                maxAge: 60 * 60 * 24 * 7 * 1000,
                httpOnly: true,
              })
              .sendSuccess(response);
          } else {
            return res.sendNotFound('User');
          }
        } catch (error) {
          next(error);
        }
      }
    );

    this.create(
      '/logout',
      ['PUBLIC'],
      passport.authenticate('jwt'),
      async (req, res, next) => {
        try {
          req.session.destroy();
          let response = await userController.logout();
          return response
            ? res.clearCookie('token').sendSuccess(response)
            : res.clearCookie('token').sendNotFound('User');
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

// import { Router } from 'express';
// import User from '../../dao/db/models/user.model.js';
// import is_form_ok from '../../dao/middlewares/is_form_ok.js';
// import is_8_char from '../../dao/middlewares/is_8_char.js';
// import is_valid_user from '../../dao/middlewares/is_valid_user.js';
// import is_same_email from '../../dao/middlewares/is_same_email.js';
// import create_hash from '../../dao/middlewares/create_hash.js';
// import is_valid_pass from '../../dao/middlewares/is_valid_pass.js';
// import passport from 'passport';
// import create_token from '../../dao/middlewares/create_token.js';
// import is_admin from '../../dao/middlewares/is_admin.js';

// const userRouter = Router();

// userRouter.get('/', async (req, res, next) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({
//       message: 'Users found',
//       data: users,
//       status: 'success',
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // userRouter.post(
// //   '/users/register',
// //   is_same_email,
// //   is_form_ok,
// //   is_8_char,
// //   create_hash,
// //   async (req, res, next) => {
// //     try {
// //       const user = await userModel.create(req.body);
// //       res.status(201).json({
// //         message: 'User created successfully',
// //         data: user,
// //         status: 'success',
// //         user_id: user._id,
// //       });
// //     } catch (error) {
// //       next(error);
// //     }
// //   }
// // );

// userRouter.post(
//   '/register',
//   is_same_email,
//   is_form_ok,
//   is_8_char,
//   create_hash,
//   passport.authenticate('register'),
//   async (req, res, next) => {
//     try {
//       res.status(201).json({
//         message: 'User created successfully',
//         status: 'success',
//         user_id: req.user._id,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// // userRouter.post(
// //   '/users/login',
// //   is_8_char,
// //   is_valid_user,
// //   is_valid_pass,
// //   async (req, res, next) => {
// //     try {
// //       req.session.email = req.body.email;
// //       const user = await userModel.findOne({ email: req.body.email });
// //       req.session.role = user.role;
// //       return res.status(200).json({
// //         session: req.session,
// //         message: 'Login successful',
// //       });
// //     } catch (error) {
// //       next(error);
// //     }
// //   }
// // );
// userRouter.post(
//   '/login',
//   is_8_char,
//   passport.authenticate('login'),
//   is_valid_pass,
//   create_token,
//   async (req, res, next) => {
//     try {
//       req.session.email = req.body.email;
//       req.session.role = req.user.role;
//       return res.status(200).json({
//         status: 'success',
//         user: req.user,
//         // session: req.session,
//         message: 'Login successful',
//         token: req.session.token,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// userRouter.post(
//   '/logout',
//   passport.authenticate('jwt'),
//   async (req, res, next) => {
//     try {
//       req.session.destroy();
//       return res.status(200).clearCookie('myCookie').json({
//         status: 'success',
//         message: 'Logout successful',
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// userRouter.get(
//   '/github',
//   passport.authenticate('github', { scope: ['user:email'] }),
//   (req, res) => {}
// );

// userRouter.get(
//   '/github/callback',
//   passport.authenticate('github', {}),
//   (req, res, next) => {
//     try {
//       req.session.email = req.user.email;
//       req.session.role = req.user.role;
//       return res.status(200).json({
//         success: true,
//         message: 'Github login successful',
//         user: req.user,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// export default userRouter;
