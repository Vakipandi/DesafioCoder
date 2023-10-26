import { Schema, model, Types } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new Schema({
  products: [
    {
      _id: { type: Types.ObjectId, ref: 'products' },
      quantity: { type: Number, default: 1 },
    },
  ],
});

cartSchema.pre('find', function (next) {
  this.populate('products._id');
  next();
});

let Cart = model(cartCollection, cartSchema);

export default Cart;
