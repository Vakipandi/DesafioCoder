// CAPA DE ENRUTAMIENTO
// se va a encargar de qe los requerimientos sean los correctos
// es decir aca manejamos REQ y RES

import MyRouter from '../router.js';
import CartController from '../../controllers/carts.controller.js';
import passport from 'passport';

const cartController = new CartController();

export default class CartRouter extends MyRouter {
  init() {
    this.create(
      '/',
      ['USER'],
      passport.authenticate('jwt'),
      async (req, res, next) => {
        try {
          let user = req.user;
          let data = req.body;
          if (user && user._id) {
            data.user_id = user._id;
          } else {
            return res.sendNoAuthenticatedError('Authentication required');
          }

          let response = await cartController.createController(data);
          return res.sendSuccessCreate(response);
        } catch (error) {
          next(error);
        }
      }
    );

    // afterclass 21/09
    this.read(
      '/',
      ['USER'],
      // passport.authenticate('jwt'),
      async (req, res, next) => {
        try {
          let user_id = req.user._id;
          let state = 'PENDING';
          if (req.query.state) {
            state = req.query.state;
          }
          let response = await cartController.readController(user_id, state);
          if (response) {
            return res.sendSuccess(response);
          } else {
            return res.sendNotFound();
          }
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
