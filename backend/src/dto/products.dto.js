import crypto from 'crypto'; //modulo nativo de nodejs para crear codigos aleatoriosç
import args from '../config/arguments.js';

export default class ProductDto {
  constructor(product) {
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.image = product.image;
    this.stock = product.stock;
    this.code = product.code;
    this.status = product.status;
    this.category = product.category;
    if (args.persistence === 'FS') {
      this._id = crypto.randomBytes(20).toString('hex');
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.__v = 0;
    }
  }
}
