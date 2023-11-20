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
      ['USER', 'PUBLIC'],
      passport.authenticate('jwt', { session: false }), // Deshabilita la sesión ya que estás usando tokens JWT
      async (req, res, next) => {
        try {
          // Verifica si el usuario está autenticado
          if (!req.isAuthenticated() || !req.user) {
            return res.sendNoAuthenticatedError('Authentication required');
          }
          // Asigna el _id del usuario autenticado a data.user_id
          const data = { ...req.body, user_id: req.user._id };
          // Lógica para crear el carrito en cartController
          const response = await cartController.createController(data);
    
          // Envía la respuesta de éxito
          return res.sendSuccessCreate(response);
        } catch (error) {
          // Maneja errores
          next(error);
        }
      }
    );

  
    this.read(
      '/',
      ['USER','PUBLIC'],
      // passport.authenticate('jwt'),
      async (req, res, next) => {
        try {
            let response = await cartController.readAllController();
          if (response) {
            return res.sendSuccess(response);
          } else {
            return res.sendNotFound('Cart');
          }
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
