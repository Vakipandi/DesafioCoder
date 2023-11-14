import { model, Schema, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

let collection = 'products';

let productSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    stock: { type: Number, required: true },
    code: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);

let Product = model(collection, productSchema);

export default Product;
