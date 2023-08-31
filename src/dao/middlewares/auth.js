export default function (req, res, next) {
  if (req.session.role === 1 || req.session.role === 0) {
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
        res.locals.message = "Primero registrese o logueese";
      res.redirect('/login?error=unauthorized');
    }
  }
}
