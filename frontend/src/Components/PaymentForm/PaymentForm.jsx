import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

axios.defaults.withCredentials = true;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cartAll, setCartAll] = useState([]);
  const { setIsCart } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });
    if (!error) {
      cartAll.forEach(async (cart) => {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/products/${cart.product_id._id}`,
          { quantity: cart.quantity }
        );
        await axios.put(`${import.meta.env.VITE_BASE_URL}/carts/${cart._id}`, {
          state: 'paid',
        });
        setIsCart((prev) => !prev);
      });
      navigate('/');
    } else {
      console.log(error);
    }
  };

  const getCart = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/carts/all`
      );
      if (response.status === 200) {
        setCartAll(response.data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <form>
        <PaymentElement />
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-full font-semibold text-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleSubmit}
          >
            Pagar
          </button>
        </div>
      </form>
    </>
  );
};
export default PaymentForm;
