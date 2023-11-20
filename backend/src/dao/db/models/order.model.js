import { model, Schema, Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

let collection = 'orders';
let schema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: 'users' },
    products: [
      {
        product_id: { type: Types.ObjectId, ref: 'products' },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
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

schema.plugin(paginate);

let Order = model(collection, schema);

export default Order;
