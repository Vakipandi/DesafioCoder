
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../Components/PaymentForm';

const Checkout = () => {
  return (
    <div>
      <h1>Checkout</h1>
      <Elements>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Checkout;