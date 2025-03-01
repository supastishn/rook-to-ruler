import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import Stripe from 'stripe';

let _stripe: Stripe | null = null;
const getStripe = (): Stripe => {
  if (!_stripe) {
    _stripe = new Stripe("sda" as string);
  }
  return _stripe;
};

export const GET: RequestHandler = async ({request, cookies, url}) => {
const paymentIntent = await getStripe().paymentIntents.create
({
  amount: 1099,
  currency: 'usd',
  automatic_payment_methods: {
    enabled: true,
  },
});
  return json({client_secret: paymentIntent.client_secret})
  }

