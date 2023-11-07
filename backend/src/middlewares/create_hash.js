import bcrypt from 'bcryptjs';

export default function (req, res, next) {
  let password_from_form = req.body.password;
  let password_hash = bcrypt.hashSync(
    password_from_form,
    bcrypt.genSaltSync(10)
  );
  req.body.password = password_hash;
  return next();
}