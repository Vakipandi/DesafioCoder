import { Router } from 'express';
import { userModel } from '../dao/models/users.model.js';
import is_form_ok from '../dao/middlewares/is_form_ok.js';
import is_8_char from '../dao/middlewares/is_8_char.js';
import is_valid_user from '../dao/middlewares/is_valid_user.js';
import is_same_email from '../dao/middlewares/is_same_email.js';

const userRouter = Router();

userRouter.get('/users', async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      message: 'Users found',
      data: users,
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post(
  '/users/register',
  is_same_email,
  is_form_ok,
  is_8_char,
  async (req, res, next) => {
    try {
      const user = await userModel.create(req.body);
      res.status(201).json({
        message: 'User created successfully',
        data: user,
        status: 'success',
        user_id: user._id,
      });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  '/users/login',
  is_8_char,
  is_valid_user,
  async (req, res, next) => {
    try {
      req.session.email = req.body.email;
      const user = await userModel.findOne({ email: req.body.email });
      req.session.role = user.role;
      return res.status(200).json({
        session: req.session,
        message: 'Login successful',
      });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post('/users/logout', async (req, res, next) => {
  try {
    req.session.destroy();
    return res.status(200).json({
      status: 'success',
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
});

export default userRouter;
