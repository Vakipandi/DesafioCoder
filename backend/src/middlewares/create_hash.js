import {hashSync, genSaltSync} from 'bcrypt';

export default function (req, res, next) {
  let password_from_form = req.body.password;
  let password_hash = hashSync(
    password_from_form,
    genSaltSync(10)
  );
  req.body.password = password_hash;
  return next();
}