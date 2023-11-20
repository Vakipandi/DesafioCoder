import OrderService from '../services/orders.service.js';

export default class OrderController {
  constructor() {
    this.service = new OrderService();
  }

  createController(data) {
    let response = this.service.createService(data);
    return response;
  }

  readController(user_id) {
    let response = this.service.readService(user_id);
    return response;
  }
  getTotalCartController(user_id) {
    let response = this.service.getTotalCartService(user_id);
    return response;
  }
}
