import { Router } from 'express';
import CartManager from '../../dao/mongoManagers/cartManagerMongo.js';
import ProductManager from '../../dao/mongoManagers/productManagerMongo.js';
import __dirname from '../../utils.js';

const cartMng = new CartManager();
const productMng = new ProductManager();

const cartsRouter = Router();

// GET http://localhost:3000/api/carts
cartsRouter.get('/carts', async (req, res, next) => {
  try {
    const carts = await cartMng.getCarts();
    carts.forEach((cart) => {
      cart.products.sort((a, b) => a._id.title.localeCompare(b._id.title));
    });
    res.status(200).json({ status: 'ok', response: carts });
    return;
  } catch (error) {
    next(error);
  }
});

// GET http://localhost:3000/api/carts/:cid/products
cartsRouter.get('/carts/:cid', async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartFound = await cartMng.getCartById(cid);
    res.status(200).json({ status: 'ok', response: cartFound });
  } catch (error) {
    next(error);
  }
});

// total a pagar por cliente
cartsRouter.get('/carts/bills/:cid', async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartFound = await cartMng.getCartById(cid);
    console.log(cartFound);
    let cartTotal = 0;
    for (let i = 0; i < cartFound.products.length; i++) {
      const product = await productMng.getProductById(
        cartFound.products[i]._id
      );
      cartTotal += product.price * cartFound.products[i].quantity;
    }

    res.status(200).json({ status: 'ok', response: cartTotal });
  } catch (error) {
    next(error);
  }
});

// POST http://localhost:3000//api/carts
cartsRouter.post('/carts', async (req, res, next) => {
  try {
    const cart = await cartMng.addCart();
    res.status(201).json({ status: 'ok', response: cart });
  } catch (error) {
    next(error);
    res.status(500).json({ status: 'error', response: error.message });
  }
});

// POST http://localhost:3000/api/carts/:cid/products/:pid
cartsRouter.post('/carts/:cid/products/:pid', async (req, res, next) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const checkIdProduct = await productMng.getProductById(pid);
    if (!checkIdProduct) {
      return res.status(404).json({
        status: 'error',
        response: `product with id ${pid} not found`,
      });
    }

    const checkIdCart = await cartMng.getCartById(cid);
    if (!checkIdCart) {
      return res
        .status(404)
        .json({ status: 'error', response: `cart with id ${cid} not found` });
    }

    const result = await cartMng.addProductToCart(cid, {
      _id: pid,
      quantity: quantity,
    });
    res.status(201).json({
      status: `product with id ${pid} added to cart with id ${cid}`,
      cart: result,
    });
  } catch (error) {
    next(error);
    res.status(500).json({ status: 'error', response: error.message });
  }
});

// PUT http://localhost:3000/api/carts/:cid/products/:pid/:units
cartsRouter.put('/carts/:cid/products/:pid/:units', async (req, res, next) => {
  const { cid, pid, units } = req.params;
  try {
    const checkIdProduct = await productMng.getProductById(pid);
    if (!checkIdProduct) {
      return res.status(404).json({
        status: 'error',
        response: `product with id ${pid} not found`,
      });
    }

    const checkIdCart = await cartMng.getCartById(cid);
    if (!checkIdCart) {
      return res
        .status(404)
        .json({ status: 'error', response: `cart with id ${cid} not found` });
    }

    const result = await cartMng.updateProductFromCart(cid, {
      _id: pid,
      quantity: units,
    });
    res.status(201).json({
      status: `product with id ${pid} updated from cart with id ${cid}`,
      cart: result,
    });
  } catch (error) {
    next(error);
    res.status(500).json({ status: 'error', response: error.message });
  }
});

// DELETE http://localhost:3000/api/carts/:cid/products/:pid
cartsRouter.delete('/carts/:cid/products/:pid', async (req, res, next) => {
  const { cid, pid, units } = req.params;
  try {
    const checkIdProduct = await productMng.getProductById(pid);
    if (!checkIdProduct) {
      return res.status(404).json({
        status: 'error',
        response: `product with id ${pid} not found`,
      });
    }

    const checkIdCart = await cartMng.getCartById(cid);
    if (!checkIdCart) {
      return res
        .status(404)
        .json({ status: 'error', response: `cart with id ${cid} not found` });
    }

    const result = await cartMng.deleteProductFromCart(cid, {
      _id: pid,
      quantity: units,
    });
    res.status(201).json({
      status: `product with id ${pid} deleted from cart with id ${cid}`,
      cart: result,
    });
  } catch (error) {
    next(error);
    res.status(500).json({ status: 'error', response: error.message });
  }
});

export default cartsRouter;
