import { Router } from 'express';
const sessionsRouter = Router();

sessionsRouter.get('/session/get', (req, res, next) => {
  try {
    return res.status(200).json(req.session);
  } catch (error) {
    next(error);
  }
});

sessionsRouter.post('/session/login', (req, res, next) => {
  try {
    req.session.user = req.body;
    return res.status(200).json(req.session);
  } catch (error) {
    next(error);
  }
});

sessionsRouter.get('/session/logout', (req, res, next) => {
    try {
    req.session.destroy();
    return res.status(200).json({
        status: "success",
        message: "Logout successful",
        
    });
  } catch (error) {
    next(error);
  }

})

export default sessionsRouter;
