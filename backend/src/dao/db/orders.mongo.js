import Order from './models/order.model.js';
import Cart from './models/cart.model.js';
import { Types } from 'mongoose';

export default class OrderMongo {
  constructor() {}

  async createModel(data) {
    let one = await Order.create(data);
    return {
      message: 'Order created',
      response: 'order_id' + one._id,
    };
  }

  async readModel(user_id) {
    let all = await Order.find({ user_id });
    if (all.length > 0) {
      return {
        message: 'Orders found',
        response: { orders: all },
      };
    } else {
      return null;
    }
  }

  async updateModel(id, data) {
    let one = await Order.findByIdAndUpdate(id, data, { new: true });
    if (one) {
      return {
        message: 'Order updated',
        response: { order: one },
      };
    } else {
      return null;
    }
  }

  async deleteModel(id) {
    let one = await Order.findByIdAndDelete(id);
    if (one) {
      return {
        message: 'Order deleted',
        response: { order_id: one._id },
      };
    } else {
      return null;
    }
  }

  async getTotalCart(user_id) {
    let totalCart = await Cart.aggregate([
      { $match: { user_id: Types.ObjectId(user_id) } },
      { $unwind: '$products' },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product_id', // Ajusta el campo para que coincida con tu esquema
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $multiply: [
                '$products.quantity',
                { $arrayElemAt: ['$productDetails.price', 0] },
              ],
            },
          },
        },
      },
    ]);
    

    if (totalCart.length > 0) {
      return {
        message: 'Total cart found',
        response: { total: totalCart[0].total },
      };
    } else {
      return {
        message: 'Total cart not found',
        response: { total: 0 },
      };
    }
  }
}
