import { userModel } from '../models/users.model.js';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const auth = req.headers.authorization;
  console.log(auth);
  if (!auth) {
    return res.status(401).json({
      success: false,
      message: 'invalid token',
    });
  }
  const token = auth.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, async (error, credentials) => {
    try {
      let user = await userModel.findOne({ email: credentials.email });
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'invalid credentials',
      });
    }
  });
};
