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

  async readFewModel(page) {
    try {
      let fewProducts = await Product.paginate({}, { page, limit: 10 });

      if (fewProducts.docs.length > 0) {
        return {
          message: 'Few Products found',
          response: {
            products: fewProducts.docs,
            control: fewProducts,
          },
        };
      } else {
        return null;
      }
    } catch (error) {
      throw error; // Propaga el error para manejarlo en el controlador superior o en el middleware de manejo de errores.
    }
  }

  async readAllModel() {
    let all = await Product.find().lean();
    // console.log(all);
    if (all.length > 0) {
      return {
        message: 'All Products found',
        response: { products: all },
      };
    } else {
      return null;
    }
  }

  async readCategoryModel(category) {
    let all = await Product.find({ category: category }).lean();
    // console.log(all);
    if (all.length > 0) {
      return {
        message: 'All Products found',
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

  async searchProducts(searchQuery) {
    try {
      const regex = new RegExp(searchQuery, 'i'); // 'i' indica insensibilidad a mayúsculas y minúsculas
      const products = await Product.find({
        title: regex,
      });
     
      if (products.length > 0) {
        return {
          message: 'Products found',
          response: { products: products },
        };
      } else {
        return null;
      }
    } catch (error) {
      throw error; // Propaga el error para que pueda ser manejado en la capa superior
    }
  }
}
