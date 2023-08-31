import { userModel } from '../models/users.model.js';

export default async function (req, res, next) {
  try {
    const { email } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        status: 400,
        method: req.method,
        path: req.url,
        message: 'the email is already in use',
      });
    }
    next();
  } catch (error) {
    next(error);
  }
}
