import args from '../config/arguments.js'; //persitence
import MongoConnect from '../config/Mongo.js'; //conection mongo
import config from '../config/config.js'; //variables entorno

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
    const { default: UsertFs } = await import(
      './filemanagers/manager/userManager.js'
    );
    dao = {
      Product: ProductFs,
      Cart: CartFs,
      User: UsertFs,
    };
    break;
  default: //MONGO
    const mongo = new MongoConnect(config.DB_CONNECTION);
    mongo.connectMongo();
    const { default: ProductMongo } = await import('./db/products.mongo.js');
    const { default: CartMongo } = await import('./db/carts.mongo.js');
    const { default: UserMongo } = await import('./db/users.mongo.js');
    dao = {
      Product: ProductMongo,
      Cart: CartMongo,
      User: UserMongo,
    };
    break;
}

export default dao;
