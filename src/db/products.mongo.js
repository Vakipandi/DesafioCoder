// CAPA DE PERSISTENCIA
// encargada de realizar el CRUD

import { deleteModel } from 'mongoose';
import Product from './models/product.model.js';

export default class ProductMongo {
  constructor() {}

  async createProduct(product) {
    let one = await Product.create(product);
    return {
      message: 'Product created successfully',
      response: { product_id: one._id },
    };
  }

  async readModel() {
    let all = await Product.find();
    if (all.length > 0) {
      return {
        message: 'Products found',
        response: { products: all },
      };
    } else {
      return null;
    }
  }

  async readModelById(id) {
    let one = await Product.findById(id);
    if (one) {
      return {
        message: 'Product found',
        response: { product: one },
      };
    } else {
      return null;
    }
  }

  async updateModel(id, product) {
    let one = await Product.findByIdAndUpdate(id, product, { new: true });
    if (one) {
      return {
        message: 'Product updated',
        response: { product_id: one._id },
      };
    } else {
      return null;
    }
  }

  async deleteModel(id){
    let one = await Product.findByIdAndDelete(id);
    if (one) {
      return {
        message: 'Product deleted',
        response: { product_id: one._id },
      };
    } else {
      return null;
    }
  
  }
}
