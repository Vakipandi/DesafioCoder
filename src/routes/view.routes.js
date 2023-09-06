import { Router } from 'express';
import __dirname from '../utils.js';
import ProductManager from '../dao/mongoManagers/productManagerMongo.js';
import CartManager from '../dao/mongoManagers/cartManagerMongo.js';
import * as next from 'next';
import is_admin from '../dao/middlewares/is_admin.js';
import is_8_char from '../dao/middlewares/is_8_char.js';
import is_form_ok from '../dao/middlewares/is_form_ok.js';
import auth from '../dao/middlewares/auth.js';
import verify_token from '../dao/middlewares/verify_token.js';


const productMng = new ProductManager();
const cartMng = new CartManager();

const viewRouter = Router();

viewRouter.get('/', async (req, res, next) => {
  try {
    // const listProducts = await productMng.getProducts();
    // res.render("products", { listProducts });
    // PAGINA DE INICIOOOOOOO
    return;
  } catch (error) {
    next(error);
  }
});

viewRouter.get('/products',auth, async (req, res, next) => {
  const ITEMS_PER_PAGE = 6;
  try {
    const page = Number(req.query.page) || 1;
    const searchTitle = req.query.title || '';

    const currentPage = page;
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;

    const regexTitle = new RegExp(searchTitle, 'i');
    const totalCount = await productMng.countProducts({ title: regexTitle });
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    const filteredProducts = await productMng.getProductsByTitle(regexTitle);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const listProducts = filteredProducts.slice(startIndex, endIndex);

    res.render('products', {
      listProducts,
      hasPreviousPage: previousPage >= 1,
      hasNextPage: nextPage <= totalPages,
      previousPage,
      nextPage,
      currentPage,
      totalPages,
      style: 'products.css',
    });
    return;
  } catch (error) {
    next(error);
  }
});

viewRouter.get('/products/:pid',auth, async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prod = await productMng.getProductById(pid);

    if (!prod) {
      return res.status(404).send('Producto no encontrado');
    }

    res.render('product_id', { prod, style: 'productid.css' });

    return;
  } catch (error) {
    next(error);
  }
});

viewRouter.get('/new_product',/*is_admin*/ async (req, res, next) => {
  try {
    const listProducts = await productMng.getProducts();
    res.render('new_product', { listProducts, style: 'products.css' });
    return;
  } catch (error) {
    next(error);
  }
});

viewRouter.get('/chat', async (req, res, next) => {
  try {
    res.render('chat');
    return;
  } catch (error) {
    next(error);
  }
});

viewRouter.get('/carts',auth, async (req, res, next) => {
  try {
    const cart = await cartMng.getFirstCart();

    let carTotal = 0;
    for (let i = 0; i < cart.products.length; i++) {
      carTotal += cart.products[i]._id.price * cart.products[i].quantity;
    }
    cart.total = carTotal;
    console.log(cart);
    res.render('carts', { cart, style: 'carts.css' });
    return;
  } catch (error) {
    next(error);
  }
});

viewRouter.get('/register', async (req, res, next) => {
  try {
    res.render('register', { style: 'register.css' });
    return;
  } catch (error) {
    next(error);
  }

})

viewRouter.get('/login', async (req, res, next) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/profile');
    } else {
      res.render('login', { style: 'login.css' });
    }
  } catch (error) {
    next(error);
  }
});

viewRouter.get('/profile', async (req, res, next) => {
  try {
    if (req.session.loggedIn) {
      res.send('¡Bienvenido a tu perfil! <a href="/logout">Cerrar Sesión</a>');
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    next(error);
  }
});



export default viewRouter;
