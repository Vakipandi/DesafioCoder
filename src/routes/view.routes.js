import { Router } from "express";
import __dirname from "../utils.js";
import ProductManager from "../dao/mongoManagers/productManagerMongo.js";
import CartManager from "../dao/mongoManagers/cartManagerMongo.js";

const productMng = new ProductManager();
const viewRouter = Router();

viewRouter.get("/products", async (req, res, next) => {
  try {
    const listProducts = await productMng.getProducts();
    res.render("products", { listProducts });
    return;
  } catch (error) {
    next(error);
  }
});

viewRouter.get("/realtimeproducts", async (req, res, next) => {
  try {
    const listProducts = await productMng.getProducts();
    res.render("realtimeproducts", { listProducts });
    return;
  
  } catch (error) {
    next(error);
  }
});

viewRouter.get("/chat", async (req, res, next) => {
  try {
    res.render("chat");
    return;
  } catch (error) {
    next(error);
  }
});


viewRouter.get("/carts", async (req, res, next) => {
  try {
    const cart = await CartManager.getCarts();
    res.render("cart", { cart });
    return;
  } catch (error) {
    next(error);
  }

})


export default viewRouter;
