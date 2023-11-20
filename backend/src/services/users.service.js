import UserRepository from '../repositories/users.rep.js';

export default class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  register = (data) => {
    return this.repository.register(data);
  };

  login = () => {
    return this.repository.login();
  };

  logout = () => {
    return this.repository.logout();
  };

  readOne = (email) => {
    return this.repository.readOne(email);
  };

  readById = (id) => {
    return this.repository.readById(id);
  };

  update = (id, data) => {
    return this.repository.update(id, data);
  };
}
