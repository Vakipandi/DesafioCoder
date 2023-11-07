// CAPA DE ENRUTAMIENTO
// se va a encargar de qe los requerimientos sean los correctos
// es decir aca manejamos REQ y RES

import MyRouter from '../router.js';
import ProductsController from '../../controllers/products.controller.js';

const productsController = new ProductsController();

export default class ProductsRouter extends MyRouter {
  init() {
    this.create('/', [], async (req, res, next) => {
      try {
        let data = req.body;
        let response = await productsController.createController(data);
        return res.sendSuccessCreate(response);
      } catch (error) {
        next(error);
      }
    });

    this.read('/', [], async (req, res, next) => {
      try {
        let response = await productsController.readController();
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound();
        }
      } catch (error) {
        next(error);
      }
    });
  }
}

// import { Router } from "express";
// import ProductManager from "../../dao/mongoManagers/productManagerMongo.js";
// import __dirname from "../../utils.js";
// import is_admin from "../../dao/middlewares/is_admin.js";
// import verify_token from "../../dao/middlewares/verify_token.js";

// const productMng = new ProductManager();
// const productsRouter = Router();

// // GET localhost:3000/api/products
// productsRouter.get("/products", async (req, res, next) => {
//   const ITEMS_PER_PAGE = 6;
//   try {
//     const page = Number(req.query.page) || 1;
//     const searchTitle = req.query.title || "";
//     const regexTitle = new RegExp(searchTitle, "i");
//     const totalCount = await productMng.countProducts({ title: regexTitle });
//     const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
//     const filteredProducts = await productMng.getProductsByTitle(regexTitle);
//     const startIndex = (page - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;
//     const products = filteredProducts.slice(startIndex, endIndex);

//     if (products.length === 0) {
//       return res
//         .status(404)
//         .json({ status: "error", response: "no products found" });
//     } else {
//       res.status(200).json({
//         status: "success",
//         totalPages,
//         currentPage: page,
//         response: products,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// productsRouter.get("/products/:id", async (req, res, next) => {
//   try {
//     const productFound = await productMng.getProductById(req.params.id);
//     if (!productFound) {
//       return res
//         .status(404)
//         .json({ status: "error", response: "product not found" });
//     } else {
//       res.status(200).json({ status: "success", response: productFound });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// productsRouter.post("/products",verify_token,/*is_admin */ async (req, res, next) => {
//   try {
//     const product = req.body;
//     console.log(product);
//     const newProduct = await productMng.addProduct(product);

//     res.status(201).json({ status: "success", response: newProduct });
//   } catch (error) {
//     next(error);
//   }
// });

// productsRouter.put("/products/:pid", async (req, res, next) => {
//   try {
//     const { pid } = req.params;
//     const { body } = req;
//     const productUpdated = await productMng.updateProduct(pid, body);
//     res.status(200).json({ status: "success", response: productUpdated });
//   } catch (error) {
//     next(error);
//   }
// });

// productsRouter.delete("/products/:pid", async (req, res, next) => {
//   try {
//     const { pid } = req.params;
//     const productDeleted = await productMng.deleteProduct(pid);
//     res.status(200).json({ status: "success", response: productDeleted });
//   } catch (error) {
//     next(error);
//   }
// });

// export default productsRouter;
