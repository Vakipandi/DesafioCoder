import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router';
import PaymentForm from '../Components/PaymentForm/PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutScreen = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [intent, setIntent] = useState(null);
  

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/tickets/${id}`
      );
      console.log(response.data);
      if (response.status === 200) {
        setOrder(response.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createPaymentIntent = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payments/payment-intent/${
          order.amount
        }`
      );
      if (response.status === 200) {
        setIntent(response.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    id && getOrder();
  }, [id]);

  console.log(order);
  return (
    <>
      {order ? (
        <div className="w-full h-[100vh] absolute top-0 left-0 pt-24 flex gap-10 justify-center items-center">
          <div className="bg-white p-14 rounded-lg flex flex-col gap-5">
            <h3 className="font-semibold uppercase text-lg w-full text-center">
              Purchase Order
            </h3>
            <div>
              <p>
                Order: <span className="font-semibold pl-1">{order.code}</span>
              </p>
              <p>
                Amount:{' '}
                <span className="font-semibold pl-1">
                  ${order.amount.toLocaleString()}
                </span>
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={createPaymentIntent}
                className="font-semibold bg-blue-600 text-white text-lg rounded-full py-2 px-16 shadow-lg shadow-blue-300"
              >
                PAGAR
              </button>
            </div>
          </div>
          {intent ? (
            <div className="bg-white p-10 rounded-lg">
              <Elements
                stripe={stripePromise}
                options={{ clientSecret: intent }}
              >
                <PaymentForm />
              </Elements>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default CheckoutScreen;
