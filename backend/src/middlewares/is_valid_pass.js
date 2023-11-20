import { compareSync } from 'bcrypt';
import UserService from '../services/users.service.js';

export default async function (req, res, next) {
  try {
    let pass_from_form = req.body.password;
    const User = new UserService();
    let user = await User.readOne(req.body.email);

    if (user && user.response.password) {
      let pass_hash = user.response.password;
      let verified = compareSync(pass_from_form, pass_hash);
    
      if (verified) {
        return next();
      } else {
        return res.status(401).json({
          status: 401,
          method: req.method,
          path: req.url,
          response: 'Incorrect password',
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        method: req.method,
        path: req.url,
        response: 'User not found',
      });
    }
  } catch (error) {
    next(error);
  }
}
