import OrderController from '../../controllers/orders.controller.js';
import passport from 'passport';
import MyRouter from '../router.js';

const orderController = new OrderController();

export default class OrderRouter extends MyRouter {
  init() {
    this.create(
      '/',
      ['USER'],
      passport.authenticate('jwt'),
      async (req, res, next) => {
        try {
          let data = req.body;
          data.user_id = req.user._id;
          let response = await orderController.createController(data);
          return response
            ? res.sendSuccessCreate(response)
            : res.sendNotFound('Order');
        } catch (error) {
          next(error);
        }
      }
    );

    this.read(
      '/',
      ['USER'],
      passport.authenticate('jwt'),
      async (req, res, next) => {
        try {
          let user_id = req.user._id;
          let response = await orderController.readController(user_id);
          return response
            ? res.sendSuccess(response)
            : res.sendNotFound('Order');
        } catch (error) {
          next(error);
        }
      }
    );

    this.read(
      '/gain',
      ['ADMIN'],
      passport.authenticate('jwt'),
      async (req, res, next) => {
        try {
          let user_id = req.user._id;
          let response = await orderController.getTotalCartController(user_id);
          return response
            ? res.sendSuccess(response)
            : res.sendNotFound('Order');
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
