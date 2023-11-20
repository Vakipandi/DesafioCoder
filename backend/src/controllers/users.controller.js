import UserService from '../services/users.service.js';

export default class UserController {
  constructor() {
    this.service = new UserService();
  }

  register = (data) => {
    return this.service.register(data);
  };

  login = () => {
    return this.service.login();
  };

  logout = () => {
    return this.service.logout();
  };

  readOne = (email) => {
    return this.service.readOne(email);
  };

  readById = (id) => {
    return this.service.readById(id);
  };

  update = (id, data) => {
    return this.service.update(id, data);
  };
}
