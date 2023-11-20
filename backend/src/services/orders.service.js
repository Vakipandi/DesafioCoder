// CAPA DE SERVICIOS
// brindar servicios segun la persistencia

import OrderRepository from '../repositories/orders.rep.js';

export default class OrderService {
  constructor() {
    this.repository = new OrderRepository();
  }

  createService(data) {
    let response = this.repository.createRepository(data);
    return response;
  }

  readService(user_id) {
    let response = this.repository.readRepository(user_id);
    return response;
  }

  getTotalCartService(user_id) {
    let response = this.repository.getTotalCartRepository(user_id);
    return response;
  }
}
