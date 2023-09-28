import MyRouter from './router.js';
import UserRouter from './api/user.routes.js';
import ProductRouter from './api/products.routes.js';
import CartRouter from './api/carts.routes.js';

const users = new UserRouter();
const products = new ProductRouter();
const carts = new CartRouter();

export default class IndexRouter extends MyRouter {
  init() {
    this.read('/', (req, res) => res.status(200).send('ECOMMERCE API'));
    this.use('/products', products.getRouter());
    this.use('/users', users.getRouter());
    this.use('/carts', carts.getRouter());
    
  }
}
