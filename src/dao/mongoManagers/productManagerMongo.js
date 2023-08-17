import { productsModel } from "../models/products.model.js"

export default class ProductManager {

  countProducts = async () => {
    try {
      return await productsModel.countDocuments();
    } catch (error) {
      console.log(error);
    }
  
  }
  getProductsByTitle = async (title) => {
    try {
      return await productsModel.find({ title: title }).lean().exec();
    } catch (error) {
      console.log(error);
    }
  
  }

  getProducts = async () => {
    try {
      return await productsModel.find().lean().exec();
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (id) => {
    try {
      return await productsModel.findById(id).lean();
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (product) => {
    try {
      await productsModel.create(product);
      return await productsModel.findOne({ title: product.title });
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (id, product) => {
    try {
      return await productsModel.findByIdAndUpdate(id, { $set: product });
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      return await productsModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  };
}
