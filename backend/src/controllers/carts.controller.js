// CAPA CONTROLADORA
// es la encargada de dirigirme hacia el servicio que corresponda

import CartService from '../services/carts.service.js';

export default class CartController {
  constructor() {
    this.service = new CartService();
  }

  createController(data) {
    let response = this.service.createService(data);
    return response;
  }
}
