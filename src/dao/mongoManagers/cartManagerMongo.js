import { cartModel } from "../models/carts.model.js";

export default class CartManager {
  getCarts = async () => {
    try {
      const carts = await cartModel.find({}).lean();
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
}
