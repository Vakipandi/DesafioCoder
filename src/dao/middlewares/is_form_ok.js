export default function (req, res, next) {
  try {
    let { name, email, password } = req.body;
    if (name && email && password) {
      next();
    } else {
      return res.status(400).json({
        status: 500,
        method: req.method,
        path: req.url,
        message: 'name, email and password are required',
      });
    }
  } catch (error) {
    next(error);
  }
}
