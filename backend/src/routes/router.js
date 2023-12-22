import { Router } from 'express';
import jwt from 'jsonwebtoken';
import MyError from '../config/MyError.js';
import errors from '../config/errors.js';
import dao from '../dao/factory.js';
import env from '../config/env.js';

const { failed, credentials, auth, notfound } = errors;
const { User } = dao;

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
    res.sendFailed = () => MyError.new(failed);
    res.sendNotFound = (payload) =>
      MyError.new(notfound(payload).message, notfound(payload).code);
    res.sendInvalidCred = () => MyError.newError(credentials);
    res.sendNoAuth = () => MyError.newError(auth);
    res.sendForbidden = () =>
      res.status(403).json({ status: 'Error', message: 'Unauthorized' });
    res.sendNoAuthorizatedError = () =>
      MyError.new(noauthorizated.message, noauthorizated.code);

    return next();
  };

  // policies
  handlePolicies = (policies) => async (req, res, next) => {
    const model = new User();
    try {
      if (policies.includes('PUBLIC')) {
        return next();
      }
      const token = req.cookies.token;
      if (!token) {
        return res.sendForbidden();
      }
      const payload = jwt.verify(token, env.JWT_SECRET);
      const user = await model.readOne(payload.email);
      const role = user.response.role;

      if (policies.includes('USER') && role === 'USER') {
       
        return next();
      } else if (policies.includes('PREMIUM') && role === 'PREMIUM') {
        req.user = { email: payload.email, role };
        return next();
      } else if (policies.includes('ADMIN') && role === 'ADMIN') {
        req.user = { email: payload.email, role };
        return next();
      } else {
        return res.sendInvalidCred('Insufficient permissions');
      }
    } catch (error) {
      console.error('Error verifying JWT:', error);
      return res.sendForbidden();
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
