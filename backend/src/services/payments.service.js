import Stripe from 'stripe';
import env from '../config/env.js';

export default async function (amount, currency) {
  const data = {
    amount: amount,
    currency: currency,
  };
  const stripe = new Stripe(env.STRIPE_KEY);
  const paymentIntent = await stripe.paymentIntents.create(data);

  return paymentIntent;
}
