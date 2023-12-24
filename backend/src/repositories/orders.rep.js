// CAPA INTERMEDIARIA ENTRE DAO Y SERVICIO
// SE COMUNICA CON EL DAO CORRESPONDIENTE
// TRANFORMA LOS OBJETOS QUE CORRESPONDAN IMPLEMENTANDO DTO

import dao from '../dao/factory.js';

const { Order } = dao;

export default class OrderRepository {
  constructor() {
    this.model = new Order();
  }

  createRepository(data) {
    let response = this.model.createModel(data);
    return response;
  }

  readRepository(user_id) {
    let response = this.model.readModel(user_id);
    return response;
  }

  readOneRepository(id) {
    let response = this.model.readOneModel(id);
    return response;
  }

  getTotalCartRepository(user_id) {
    let response = this.model.getTotalCart(user_id);
    return response;
  }
}
