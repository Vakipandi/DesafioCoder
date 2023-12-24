import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      setError('Stripe.js has not loaded yet.');

      return;
    }


    // Validar la información del formulario, por ejemplo, la dirección de facturación.

    const cardElement = elements.getElement(CardElement);

    // Crear un PaymentMethod usando la información de la tarjeta.
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Enviar el ID del PaymentMethod al servidor para crear un pago.
    const { data } = await axios.post('URL_DE_TU_BACKEND/crear-pago', {
      payment_method: paymentMethod.id,
    });

    if (data.success) {
      // El pago fue exitoso. Realizar acciones adicionales según tus necesidades.
      clearCart(); // Limpiar el carrito después del pago
      navigate('/confirmacion'); // Redirigir a la página de confirmación
    } else {
      setError(
        'Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tarjeta de Crédito
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      {error && (
        <div className="text-red-500 mb-4">
          <p>{error}</p>
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-full font-semibold text-lg shadow-lg shadow-blue-300"
      >
        PAGAR
      </button>
    </form>
  );
};

export default PaymentForm;
