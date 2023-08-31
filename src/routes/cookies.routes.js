import { Router } from 'express';

const cookiesRouter = Router();

cookiesRouter.get('/cookies/set', (req, res, next) => {
  try {
    res.cookie('myCookie', 'myValue', {
      maxAge: 10000,
      signed: true,
    });
    res.status(200).json({
      status: 'success',
      message: 'Cookie set successfully',
    });
  } catch (error) {
    next(error);
  }
});

cookiesRouter.get('/cookies/get', (req, res, next) => {
  try {
    // res.status(200).json({
    //   status: 'success',
    //   message: 'Cookie get successfully',
    //   data: req.cookies,
    
    // });
    return res.status(200).json({
      // req.signedCookies
      status: 'success',
      message: 'Cookie get successfully',
      data: req.signedCookies,
    
    })
  } catch (error) {
    next(error);
  }
});

cookiesRouter.get('/cookies/delete', (req, res, next) => {
  try {
    res.clearCookie('myCookie');
    res.status(200).json({
      status: 'success',
      message: 'Cookie deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default cookiesRouter;
