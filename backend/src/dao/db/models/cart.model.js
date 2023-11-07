import { Schema, model, Types } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new Schema(
  {
    product_id: { type: Types.ObjectId, ref: 'products', required: true },
    user_id: { type: Types.ObjectId, ref: 'users', required: true },
    quantity: { type: Number, default: 1, required: true },
    state: {
      type: String,
      enum: ['pending', 'paid', 'delivered'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre('find', function (next) {
  this.populate('products._id');
  next();
});

let Cart = model(cartCollection, cartSchema);

export default Cart;
