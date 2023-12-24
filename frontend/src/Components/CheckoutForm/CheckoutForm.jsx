import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      // Enviar el paymentMethod.id y el total al servidor
      console.log('PaymentMethod:', result.paymentMethod);
      console.log('Total:', total);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default CheckoutForm;
