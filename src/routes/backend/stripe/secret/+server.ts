import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import * as Stripe from 'stripe';
const stripe = new Stripe('xxx_xxx_xxx');


export const GET: RequestHandler = async ({request, cookies, url}) => {
const paymentIntent = await stripe.paymentIntents.create
({
  amount: 1099,
  currency: 'usd',
  automatic_payment_methods: {
    enabled: true,
  },
});

  }

