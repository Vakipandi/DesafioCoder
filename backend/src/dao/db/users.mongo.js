import User from '../db/models/user.model.js';

export default class UserMongo {
  constructor() {}

  async register(data) {
    let one = await User.create(data);
    return {
      message: 'User registered',
      response: 'user_id: ' + one._id,
    };
  }

  login() {
    return {
      message: 'User logged in',
      response: true,
    };
  }

  logout() {
    return {
      message: 'User logged out',
      response: true,
    };
  }

  async readOne(email) {
    let one = await User.findOne({ email: email });
       if (one) {
      return {
        message: 'User found',
        response: one,
      };
    } else {
      return null;
    }
  }

  async readById(id) {
    let one = await User.findById(id);
    if (one) {
      return one;
    } else {
      return null;
    }
  }

  async update(id, data) {
    let one = await User.findByIdAndUpdate(id, data);
    if (one) {
      return {
        message: 'User updated!',
        response: one,
      };
    } else {
      return null;
    }
  }
}
