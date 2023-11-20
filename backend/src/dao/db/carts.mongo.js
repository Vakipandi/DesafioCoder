// CAPA DE PERSISTENCIA
// encargada de realizar el CRUD

import Cart from '../db/models/cart.model.js';

export default class CartMongo {
  constructor() {}

  async createModel(data) {
    let one = await Cart.create(data);
    return {
      message: 'Product added',
      response: { cart_id: one._id },
    };
  }

  async readModels(user_id, state) {
    let all = await Cart.find(
      { user_id, state },
      'product_id user_id quantity state'
    )
      .populate('user_id', 'name email photo')
      .populate('product_id', '-createdAt -updatedAt -__v');
    if (all.length > 0) {
      return {
        message: 'Products found',
        response: { products: all },
      };
    } else {
      return null;
    }
  }

  async readAllModels() {
    let all = await Cart.find().lean();
    return all;
  }
}
