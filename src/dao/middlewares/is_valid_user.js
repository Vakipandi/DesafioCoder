import { userModel } from '../models/users.model.js';

export default async function (req, res, next) {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      if (user && user.password === password) {
        next();
      }else{
        return res.status(401).json({
            status: 400,
            method: req.method,
            path: req.url,
            message: 'invalid credential'
        
        })
      }
    }
  } catch (error) {
    next(error);
  }
}
