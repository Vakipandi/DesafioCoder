import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';

const CartScreen = () => {
  const {
    cart,
    updateQuantity,
    removeItem,
    clearCart,
    totalQuantity,
    cartTotal,
  } = useContext(CartContext);

  const handleCheckout = () => {
    // Lógica de procesamiento del pedido
    console.log('Procesando el pedido...', cart);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <div className="alert alert-info" role="alert">
          ¡Tu carrito está vacío!
        </div>
      ) : (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col">Total</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="btn btn-sm btn-secondary ms-2"
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item._id)}
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center my-5">
            <button className="btn btn-warning p-2" onClick={clearCart}>
              Vaciar Carrito
            </button>
            <div>
              <p className="mb-0">
                Cantidad Total: <strong>{totalQuantity()}</strong>
              </p>
              <p className="mb-0">
                Total a Pagar: <strong>${cartTotal().toFixed(2)}</strong>
              </p>
            </div>
          </div>
          <div className="my-5 text-center">
            <Link to="/checkout">
              <button className="btn btn-success p-4" onClick={handleCheckout}>
                Comprar Ahora
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
