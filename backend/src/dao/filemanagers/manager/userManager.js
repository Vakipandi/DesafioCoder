import fs from 'fs';

export default class UserManager {
  constructor(path) {
    this.path = path;
  }

  

  read = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const dataParse = JSON.parse(data);
        return {
          status: 'success',
          message: 'Users Found',
          data: dataParse,
        };
      } else {
        return {
          status: 'error',
          message: 'Users Not Found',
          data: [],
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  readOne = async (id) => {
    const users = await this.read();
    const userFound = users.data.find((user) => user.id === id);
    if (userFound) {
      return {
        status: 'success',
        message: 'User Found',
        data: userFound,
      };
    } else {
      return {
        status: 'error',
        message: 'User Not Found',
        data: [],
      };
    }

  }

}
