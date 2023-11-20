import { Router } from 'express';
import jwt from 'jsonwebtoken';
import MyError from '../config/MyError.js';
import errors from '../config/errors.js';

const { failed, unauthenticated, noauthorizated, notfound } = errors;

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
      if (typeof cb === 'function') {
        try {
          await cb.apply(this, params);
        } catch (e) {
          params[1].status(500).send(e.message);
        }
      } else {
        // Manejar el caso en el que cb no sea una función válida
        params[1].status(500).send('Error: cb is not a valid function');
      }
    });
  }

  responses = (req, res, next) => {
    res.sendSuccessCreate = (payload) => res.status(201).json(payload);
    res.sendSuccess = (payload) => res.status(200).json(payload);
    res.sendFailed = () => MyError.new(failed.message, failed.code);
    res.sendNotFound = (payload) =>
      MyError.new(notfound(payload).message, notfound(payload).code);
    res.sendNoAuthenticatedError = () =>
      MyError.new(unauthenticated.message, unauthenticated.code);
    res.sendNoAuthorizatedError = () =>
      MyError.new(noauthorizated.message, noauthorizated.code);

    return next();
  };

  // policies
  handlePolicies = (policies) => (req, res, next) => {
    if (policies.includes('PUBLIC')) {
      return next();
    } else {
      const authHeaders = req.headers.authorization;
      if (!authHeaders) {
        return res.sendNoAuthenticatedError('Unauthenticated');
      } else {
        const tokenArray = authHeaders.split(' ');
        const token = tokenArray[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const role = user?.role;
        if (
          (policies.includes('USER') && role === 'USER') ||
          (policies.includes('ADMIN') && role === 'ADMIN') ||
          (policies.includes('PREMIUM') && role === 'PREMIUM')
        ) {
          req.user = user;
          return next();
        } else {
          return res.sendNoAuthorizatedError('Unauthorized');
        }
      }
    }
  };

  //create
  create(path, policies, ...cbs) {
    this.router.post(
      path,
      this.responses,
      this.handlePolicies(policies),
      this.applyCb(cbs)
    );
  }
  //read
  read(path, policies, ...cbs) {
    this.router.get(
      path,
      this.responses,
      this.handlePolicies(policies),
      this.applyCb(cbs)
    );
  }
  //update
  update(path, policies, ...cbs) {
    this.router.put(
      path,
      this.responses,
      this.handlePolicies(policies),
      this.applyCb(cbs)
    );
  }
  //delete
  delete(path, policies, ...cbs) {
    this.router.delete(
      path,
      this.responses,
      this.handlePolicies(policies),
      this.applyCb(cbs)
    );
  }
  // use
  use(path, ...cbs) {
    this.router.use(path, this.responses, this.applyCb(cbs));
  }
}
