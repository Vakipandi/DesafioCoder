import MyRouter from '../router.js';
import create from '../../controllers/payments.controller.js';

export default class PaymentsRouter extends MyRouter {
  init() {
    this.create('/payment-intents/:amount', ['USER'], create);
  }
}
