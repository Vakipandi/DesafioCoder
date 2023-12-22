import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Asegúrate de tener instalado react-icons
import { useContext } from 'react';
import { CartContext } from '../../../Context/CartContext';

const Cart = () => {
  const { totalQuantity } = useContext(CartContext);
  return (
    <Link to="/cart" className="nav-link">
      <div className="d-flex align-items-center">
        <FaShoppingCart className="me-2" />
        <span className="badge bg-secondary">{totalQuantity()}</span>
      </div>
    </Link>
  );
};

export default Cart;
