import UserController from "../controllers/users.controller.js";

export default async function (req, res, next) {
  try {
    const { email } = req.body;
    const User = new UserController();
    const one = await User.readOne(email);
    if (one) {
      req.user = one;
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
