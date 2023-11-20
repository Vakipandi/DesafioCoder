// CAPA DE PERSISTENCIA
// encargada de realizar el CRUD

import Product from './models/product.model.js';

export default class ProductMongo {
  constructor() {}

  async createModel(product) {
    let one = await Product.create(product);
   
    // console.log(one);
    return {
      message: 'Product created successfully',
      response: { product_id: one._id },
    };
  }

  async readFewModel() {
    let fewProducts = await Product.paginate(
      {},
      { limit: 10, page: 1, lean: true }
    );
    if (fewProducts.docs.length > 0) {
      return {
        message: 'Few Products found',
        response: { products: fewProducts.docs },
      };
    } else {
      return null;
    }
  }

  async readAllModel() {
    let all = await Product.find().lean();
    // console.log(all);
    if (all.length > 0) {
      return {
        message: 'Products found',
        response: { products: all },
      };
    } else {
      return null;
    }
  }

  async readModel() {
    let all = await Product.paginate({}, { limit: 10, page: 1, lean: true });
    // console.log(all);
    if (all.docs.length > 0) {
      return {
        message: 'Products found',
        response: { products: all.docs },
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

  async deleteModel(id) {
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
