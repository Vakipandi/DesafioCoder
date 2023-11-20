// CAPA CONTROLADORA
// es la encargada de dirigirme hacia el servicio que corresponda

import ProductsService from '../services/products.service.js';

export default class ProductsController {
  constructor() {
    this.service = new ProductsService();
  }

  createController(data) {
    let response = this.service.createService(data);
    return response;
  }

  readFewController() {
    let response = this.service.readFewService();
    return response;
  }
  readAllController() {
    let response = this.service.readAllService();
    return response;
  }

  readOneController(id) {
    let response = this.service.readOneService(id);
    return response;
  }

  updateController(id, data) {
    let response = this.service.updateService(id, data);
    return response;
  }

  deleteController(id) {
    let response = this.service.deleteService(id);
    return response;
  }
}
