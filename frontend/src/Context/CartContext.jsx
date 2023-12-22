import { createContext, useState } from 'react';

export const CartContext = createContext({
  cart: [],
  addItem: (item, quantity) => {},
  removeItem: (itemId) => {},
  updateQuantity: (itemId, newQuantity) => {},
  clearCart: () => {},
  totalQuantity: () => {},
  cartTotal: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  console.log(cart);

  const addItem = (item, quantity) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem._id === item._id);

    if (!isInCart(item._id)) {
      setCart((prev) => [...prev, { ...item, quantity }]);
    } else {
      console.error('El producto ya fue agregado');

      let updatedCart = [...cart];
      updatedCart[itemIndex].quantity += quantity;
      setCart(updatedCart);
    }
  };

  const removeItem = (itemId) => {
    const cartUpdated = cart.filter((prod) => prod._id !== itemId);
    setCart(cartUpdated);
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const isInCart = (itemId) => {
    return cart.some((prod) => prod._id === itemId);
  };

  const totalQuantity = () => {
    let quantity = 0;
    cart.forEach((item) => (quantity += item.quantity));
    return quantity;
  };

  const cartTotal = () => {
    return cart.reduce((acc, prod) => (acc += prod.price * prod.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        updateQuantity,
        totalQuantity,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
