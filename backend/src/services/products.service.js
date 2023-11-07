// CAPA DE SERVICIOS
// brindar servicios segun la persistencia

import ProductMongo from '../dao/db/products.mongo.js';

export default class ProductsService {
  constructor() {
    this.model = new ProductMongo();
  }

  createService(data) {
    let response = this.model.createModel(data);
    return response;
  }

  readService() {
    let response = this.model.readModel();
    return response;
  }

  readOneService(id) {
    let response = this.model.readModelById(id);
    return response;
  }

  updateService(id, data) {
    let response = this.model.updateModel(id, data);
    return response;
  }
  
  deleteService(id) {
    let response = this.model.deleteModel(id);
    return response;
  }
}
