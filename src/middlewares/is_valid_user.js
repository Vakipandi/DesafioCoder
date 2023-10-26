import User from '../db/models/user.model.js'

export default async function (req, res, next) {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      if (user) {
        next();
      } else {
        return res.status(401).json({
          status: 400,
          method: req.method,
          path: req.url,
          message: 'invalid credential',
        });
      }
    }
  } catch (error) {
    next(error);
  }
}
