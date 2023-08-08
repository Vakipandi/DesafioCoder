import { Router } from "express";
import CartManager from "../dao/mongoManagers/cartManagerMongo.js";
import ProductManager from "../dao/mongoManagers/productManagerMongo.js";
import __dirname from "../utils.js";

const cartMng = new CartManager();
const productMng = new ProductManager();

const cartsRouter = Router();

cartsRouter.get("/carts", async (req, res, next) => {
  try {
    const carts = await cartMng.getCarts();
    res.status(200).json({ status: "ok", response: carts });
    return;
  } catch (error) {
    next(error);
  }
});

cartsRouter.get("/carts/:id", async (req, res, next) => {
  try {
    const cartFound = await cartMng.getCartById(req.params);
    res.status(200).json({ status: "ok", response: cartFound });
  } catch (error) {
    next(error);
  }
});

cartsRouter.post("/carts", async (req, res, next) => {
  try {
    const { cart } = req.body;
    if (!Array.isArray(cart)) {
      return res
        .status(400)
        .json({ status: "error", response: "cart must be an array" });
    }
    const validProducts = [];

    for (const product of cart) {
      const checkId = await productMng.getProductById(product._id);

      if (checkId === null) {
        return res
          .status(400)
          .json({ status: "error", response: "product not found" });
      }
      validProducts.push(checkId);
    }
    const newCart = await cartMng.addCart(validProducts);
    res.status(201).json({ status: "ok", response: newCart });
  } catch (error) {
    next(error);
    res.status(500).json({ status: "error", response: error.message });
  }
});

cartsRouter.post("/carts/:cid/products/:pid", async (req, res, next) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const checkIdProduct = await productMng.getProductById(pid);
    if (!checkIdProduct) {
      return res.status(404).json({
        status: "error",
        response: `product with id ${pid} not found`,
      });
    }

    const checkIdCart = await cartMng.getCartById(cid);
    if (!checkIdCart) {
      return res
        .status(404)
        .json({ status: "error", response: `cart with id ${cid} not found` });
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
    res.status(500).json({ status: "error", response: error.message });
  }
});

export default cartsRouter;
