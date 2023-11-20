import UserService from '../services/users.service.js';

export default async function (req, res, next) {
  try {
    const { email } = req.body;
    const User = new UserService();
    const user = await User.readOne(email);

    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(400).json({
        method: req.method,
        path: req.url,
        message: 'Invalid Credentials',
        response: null,
      });
    }
  } catch (error) {
    next(error);
  }
}
