import { Router } from 'express';

export default class MyRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() {}
  applyCb(cbs) {
    return cbs.map((cb) => async (...params) => {
      try {
        await cb.apply(this, params);
      } catch (e) {
        params[1].status(500).send(e.message);
      }
    });
  }

  responses = (req, res, next) => {
    res.sendSuccessCreate = (payload) => res.status(201).json(payload);
    res.sendSuccess = (payload) => res.status(200).json(payload);
    //res.sendNotFound = payload => res.status(payload.status).json(payload.json)
    res.sendNotFound = () =>
      res.status(404).json({ success: false, response: 'not found' });
    res.sendNoAuthenticatedError = (error) =>
      res.status(401).json({ status: 'error', error });
    res.sendNoAuthorizatedError = (error) =>
      res.status(403).json({ status: 'error', error });
    return next();
  };

  //create
  create(path, ...cbs) {
    this.router.post(path, this.applyCb(cbs));
  }
  //read
  read(path, ...cbs) {
    this.router.get(path, this.applyCb(cbs));
  }
  //update
  update(path, ...cbs) {
    this.router.put(path, this.applyCb(cbs));
  }
  //delete
  delete(path, ...cbs) {
    this.router.delete(path, this.applyCb(cbs));
  }
  // use
  use(path, ...cbs) {
    this.router.use(path, this.responses, this.applyCb(cbs));
  }
}
