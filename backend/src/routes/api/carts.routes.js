// CAPA DE ENRUTAMIENTO
// se va a encargar de qe los requerimientos sean los correctos
// es decir aca manejamos REQ y RES

import MyRouter from '../router.js';
import CartController from '../../controllers/carts.controller.js';
import passport from 'passport';

const cartController = new CartController();

export default class CartRouter extends MyRouter {
  init() {
    this.create('/', passport.authenticate('jwt'), async (req, res, next) => {
      try {
        let data = req.body;
        let response = await cartController.createController(data);
        return res.sendSuccessCreate(response);
      } catch (error) {
        next(error);
      }
    });
  }
}
