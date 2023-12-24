// CAPA INTERMEDIARIA ENTRE DAO Y SERVICIO
// SE COMUNICA CON EL DAO CORRESPONDIENTE
// TRANFORMA LOS OBJETOS QUE CORRESPONDAN IMPLEMENTANDO DTO

import UserDto from '../dto/register.dto.js';
import dao from '../dao/factory.js';

const { User } = dao;

export default class UserRepository {
  constructor() {
    this.model = new User();
  }

  async register(data) {
    let dataDto = new UserDto(data);
    let response = await this.model.register(dataDto);
    return response;
  }

  login = () => {
    return this.model.login();
  };

  logout = () => {
    return this.model.logout();
  };

  readOne = (email) => {
    return this.model.readOne(email);
  };

  readById = (id) => {
    return this.model.readById(id);
  };

  update = (id, data) => {
    return this.model.update(id, data);
  };
}
