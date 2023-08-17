import { cartModel } from "../models/carts.model.js";

export default class CartManager {
  getFirstCart = async () => {
    try {
      const carts = await cartModel.find().lean().exec();
      console.log(carts);
      if (carts.length === 0) {
        const newCart = await cartModel.create({
          products: [],
        });
        return newCart;
      }
      return carts[0];
    } catch (error) {
      console.error(`error to get first cart: ${error}`);
      return error;
    }
  };

  getProductsByCartId = async (cartId) => {
    try {
      const cart = await cartModel.findById(cartId).lean();
      return cart.products;
    } catch (error) {
      console.error(`error to get products by cart id: ${error}`);
      return error;
    }
  
  }

  getCarts = async () => {
    try {
      const carts = await cartModel.find().lean();
      return carts;
    } catch (error) {
      console.error(`error to get carts: ${error}`);
      return [];
    }
  };

  getCartById = async (id) => {
    try {
      const cart = await cartModel.findById(id).lean();
      return cart;
    } catch (error) {
      console.error(`error to get cart by id: ${error}`);
      return error;
    }
  };

  addCart = async (cart) => {
    try {
      const newCart = await cartModel.create(cart);
      return newCart;
    } catch (error) {
      console.error(`error to add cart: ${error}`);
      return error;
    }
  };

  addProductToCart = async (cartId, product) => {
    try {
      const filter = { _id: cartId, "products._id": product._id };
      const cart = await cartModel.findById(cartId);
      const findProduct = cart.products.some(
        (prod) => prod._id.toString() === product._id
      );
      if (findProduct) {
        const update = { $inc: { "product.$.quantity": product.quantity } };
        await cartModel.updateOne(filter, update);
      } else {
        const update = { $push: { products: product } };
        await cartModel.updateOne({ _id: cartId }, update);
      }
    } catch (error) {
      console.error(`error to add product to cart: ${error}`);
      return error;
    }
  };

  // delete product from cart
  deleteProductFromCart = async (cartId, productId) => {
    try {
      const filter = { _id: cartId, "products._id": productId };
      const cart = await cartModel.findById(cartId);
      const findProduct = cart.products.some(
        (prod) => prod._id.toString() === productId
      );
      if (findProduct) {
        const update = { $inc: { "product.$.quantity": -1 } };
        await cartModel.updateOne(filter, update);
      } else {
        const update = { $pull: { products: { _id: productId } } };
        await cartModel.updateOne({ _id: cartId }, update);
      }
    } catch (error) {
      console.error(`error to delete product from cart: ${error}`);
      return error;
    }
  };

  // update product quantity
  updateProductFromCart = async (cartId, productId, quantity) => {
    try {
      const filter = { _id: cartId, "products._id": productId };
      const cart = await cartModel.findById(cartId);
      const findProduct = cart.products.some(
        (prod) => prod._id.toString() === productId
      );
      if (findProduct) {
        let update = { $inc: { "product.$.quantity": quantity } };
        await cartModel.updateOne(filter, update);
      } else {
        const update = { $push: { products: productId } };
        await cartModel.updateOne({ _id: cartId }, update);
      }
    } catch (error) {
      console.error(`error to update product from cart: ${error}`);
      return error;
    }
  };
}
