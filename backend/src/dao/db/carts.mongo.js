// CAPA DE PERSISTENCIA
// encargada de realizar el CRUD

import Cart from '../db/models/cart.model.js';

export default class CartMongo {
  constructor() {}

  async createModel(data) {
    let one = await Cart.create(data);
    return {
      message: 'Cart created successfully',
      response: { cart_id: one._id },
    };
  }
}
