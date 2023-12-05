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

  readController() {
    let response = this.service.readFewService();
    return response;
  }
  
}
