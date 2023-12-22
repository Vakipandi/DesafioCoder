export default class {
  constructor(obj) {
    this.name = obj.name;
    this.email = obj.email;
    this.password = obj.password;
    obj.role && (this.role = obj.role);
    obj.photo && (this.photo = obj.photo);
    obj.age && (this.age = obj.age);
    obj.cart && (this.cart = obj.cart);
  }
}
