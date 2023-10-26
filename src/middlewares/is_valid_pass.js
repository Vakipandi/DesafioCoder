import bcrypt from 'bcryptjs';
import User from '../db/models/user.model.js';

export default async function (req, res, next) {
  let pass_from_form = req.body.password;
  let user = await User.findOne({ email: req.body.email });
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