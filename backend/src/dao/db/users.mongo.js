import User from '../db/models/user.model.js';
import bycript from 'bcrypt';

export default class UserMongo {
  constructor() {}

  async register(data) {
    try {
      let one = await User.create(data);
      return {
        message: 'User registered',
        response: one,
      };
    } catch (error) {
      console.error('Error during user registration:', error);

      if (error.code === 11000) {
        // Manejar error de duplicados
        return {
          message: 'El correo electrónico ya está en uso.',
          error: {
            index: error.index,
            keyPattern: error.keyPattern,
            keyValue: error.keyValue,
          },
        };
      }

      throw error;
    }
  }

  login() {
    return {
      success: true,
      message: 'User Logged In',
    };
  }

  logout() {
    return {
      success: true,
      message: 'User Logged Out',
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

  async resetPass(email, newPass) {
    const hashedPassword = await bcrypt.hash(newPass, 10);
    let one = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    );
    if (one) {
      return {
        message: 'Password updated!',
        response: one,
      };
    } else {
      return null;
    }
  }
}
