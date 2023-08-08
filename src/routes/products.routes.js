import { Router } from "express";
import ProductManager from "../dao/mongoManagers/productManagerMongo.js";
import __dirname from "../utils.js";

const productMng = new ProductManager();
const productsRouter = Router();

productsRouter.get("/products", async (req, res, next) => {
  try {
    const products = await productMng.getProducts();
    if (products.length === 0) {
      return res
        .status(404)
        .json({ status: "error", response: "no products found" });
    } else {
      res.status(200).json({ status: "success", response: products });
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/products/:id", async (req, res, next) => {
  try {
    const productFound = await productMng.getProductById(req.params.id);
    if (!productFound) {
      return res
        .status(404)
        .json({ status: "error", response: "product not found" });
    } else {
      res.status(200).json({ status: "success", response: productFound });
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/products", async (req, res, next) => {
  try {
    const  product  = req.body;
    console.log(product);
    const newProduct = await productMng.addProduct( product );
   
    res.status(201).json({ status: "success", response: newProduct });
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/products/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const { body } = req;
    const productUpdated = await productMng.updateProduct(pid, body);
    res.status(200).json({ status: "success", response: productUpdated });
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/products/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productDeleted = await productMng.deleteProduct(pid);
    res.status(200).json({ status: "success", response: productDeleted });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
