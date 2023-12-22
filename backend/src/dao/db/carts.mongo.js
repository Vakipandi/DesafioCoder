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

  async readOneModel(user_id) {
    let one = await Cart.findOne({ user_id }).lean();
    return {
      response: one,
      message: 'Cart found',
    };
  }

  // update
  async updateModel(user_id, data) {
    let one = await Cart.findOneAndUpdate(
      { user_id },
      { $set: data },
      { new: true }
    );
    if (one) {
      return {
        message: 'Product updated!',
        response: one,
      };
    } else {
      return null;
    }
  }

  // delete
  async deleteModel(user_id) {
    let one = await Cart.findOneAndDelete({ user_id });
    if (one) {
      return {
        message: 'Cart deleted',
      };
    } else {
      return null;
    }
  }
}
