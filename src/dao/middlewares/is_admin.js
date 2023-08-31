export default function (req, res, next) {
  try {
    if (req.session.role === 1) {
      next();
    } else {
      if (req.headers.accept.includes('json')) {
        return res.status(403).json({
          status: 403,
          method: req.method,
          path: req.url,
          message: 'Forbidden',
        });
      } else {
        res.redirect('/login?error=unauthorized');
      }
    }
  } catch (error) {
    next(error);
  }
}
