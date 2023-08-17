import { Router } from "express";
import __dirname from "../utils.js";
import ProductManager from "../dao/mongoManagers/productManagerMongo.js";
import CartManager from "../dao/mongoManagers/cartManagerMongo.js";

const productMng = new ProductManager();
const cartMng = new CartManager();

const viewRouter = Router();

viewRouter.get("/", async (req, res, next) => {
  try {
    // const listProducts = await productMng.getProducts();
    // res.render("products", { listProducts });
    // PAGINA DE INICIOOOOOOO
    return;
  } catch (error) {
    next(error);
  }
});

viewRouter.get("/products", async (req, res, next) => {
  const ITEMS_PER_PAGE = 6;
  try {
    const page = Number(req.query.page) || 1;
    const searchTitle = req.query.title || "";

    const currentPage = page;
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;

    const regexTitle = new RegExp(searchTitle, "i");
    const totalCount = await productMng.countProducts({ title: regexTitle });
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    const filteredProducts = await productMng.getProductsByTitle(regexTitle);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const listProducts = filteredProducts.slice(startIndex, endIndex);

    res.render("products", {
      listProducts,
      hasPreviousPage: previousPage >= 1,
      hasNextPage: nextPage <= totalPages,
      previousPage,
      nextPage,
      currentPage,
      totalPages,
      style: "products.css",
    });
    return;
  } catch (error) {
    next(error);
  }
});

viewRouter.get("/products/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prod = await productMng.getProductById(pid);

    if (!prod) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("product_id", { prod, style: "productid.css" });

    return;
  } catch (error) {
    next(error);
  }
});

viewRouter.get("/new_product", async (req, res, next) => {
  try {
    const listProducts = await productMng.getProducts();
    res.render("new_product", { listProducts, style: "products.css" });
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
    const cart = await cartMng.getFirstCart();

    let carTotal = 0;
    for (let i = 0; i < cart.products.length; i++) {
      carTotal += cart.products[i]._id.price * cart.products[i].quantity;
    }
    cart.total = carTotal;
    console.log(cart);
    res.render("carts", { cart, style: "carts.css" });
    return;
  } catch (error) {
    next(error);
  }
});

export default viewRouter;
