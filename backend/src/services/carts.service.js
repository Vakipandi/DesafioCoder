// CAPA DE SERVICIOS
// brindar servicios segun la persistencia

import CartMongo from '../dao/db/carts.mongo.js';

export default class CartService {
  constructor() {
    this.model = new CartMongo();
  }
  createService(data) {
    let response = this.model.createModel(data);
    return response;
  }
}
