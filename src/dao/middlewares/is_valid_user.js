import { userModel } from '../models/users.model.js';

export default async function (req, res, next) {
  try {
    const { email } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      if (user) {
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
