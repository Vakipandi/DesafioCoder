import args from '../config/arguments.js'; //persitence
import MongoConnect from '../config/Mongo.js'; //conection mongo
import env from '../config/env.js'; //variables entorno

let dao = {};

switch (args.persistence) {
  case 'FS':
    console.log('File System: Connectedd');
    const { default: ProductFs } = await import(
      './filemanagers/manager/productManager.js'
    );
    const { default: CartFs } = await import(
      './filemanagers/manager/cartManager.js'
    );
    const { default: UserFs } = await import(
      './filemanagers/manager/userManager.js'
    );
    const { default: OrderFs } = await import(
      './filemanagers/manager/orderManager.js'
    );
    dao = {
      Product: ProductFs,
      Cart: CartFs,
      User: UserFs,
      Order: OrderFs,
    };
    break;
  default: //MONGO
    const mongo = new MongoConnect(env.DB_CONNECTION);
    mongo.connectMongo();
    const { default: ProductMongo } = await import('./db/products.mongo.js');
    const { default: CartMongo } = await import('./db/carts.mongo.js');
    const { default: UserMongo } = await import('./db/users.mongo.js');
    const { default: OrderMongo } = await import('./db/orders.mongo.js');
    dao = {
      Product: ProductMongo,
      Cart: CartMongo,
      User: UserMongo,
      Order: OrderMongo,
    };
    break;
}

export default dao;
