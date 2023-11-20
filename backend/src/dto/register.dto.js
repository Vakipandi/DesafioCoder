import { hashSync, genSaltSync } from 'bcrypt';

export default class {
  constructor(obj) {
    this.name = obj.name;
    this.email = obj.email;
    this.password = hashSync(obj.password, genSaltSync(10));
    this.role = obj.role;
    obj.photo && (this.photo = obj.photo);
    obj.age && (this.age = obj.age);
    obj.cart && (this.cart = obj.cart);
  }
}
