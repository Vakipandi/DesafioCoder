import { Schema, model, Types } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new Schema(
  {
    products: [
      {
        product_id: { type: Types.ObjectId, ref: 'products', required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    user_id: { type: Types.ObjectId, ref: 'users', required: true },
  },
  {
    timestamps: true,
  }
);



let Cart = model(cartCollection, cartSchema);

export default Cart;
