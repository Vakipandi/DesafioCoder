// CAPA DE SERVICIOS
// brindar servicios segun la persistencia

import ProductMongo from '../db/products.mongo.js';

export default class ProductsService {
  constructor() {
    this.model = new ProductMongo();
  }

  createService(data) {
    let response = this.model.createModel(data);
    return response;
  }
}
