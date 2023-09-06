import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  let token = jwt.sign(
    {
      email: req.body.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 * 24 * 7 }
  );
  req.session.token = token;
  return next();
};
