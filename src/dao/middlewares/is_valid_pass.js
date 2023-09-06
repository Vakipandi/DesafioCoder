import bcrypt from 'bcryptjs';
import { userModel } from '../models/users.model.js';

export default async function (req, res, next) {
  let pass_from_form = req.body.password;
  let user = await userModel.findOne({ email: req.body.email });
  let pass_hash = user.password;
  let is_match = bcrypt.compareSync(pass_from_form, pass_hash);
  if (is_match) {
    next();
  } else {
    return res.status(401).json({
      status: 401,
      method: req.method,
      path: req.url,
      response: 'invalid credentials',
    });
  }
}
