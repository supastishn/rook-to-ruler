import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Prisma from "$lib/prisma.ts"

const crypto = require("crypto")
const hash = crypto.createHash("sha256")

const endpointSecret = ""

const stripe = require('stripe')('');

export const POST: RequestHandler = async ({request, cookies, url}) => {
  const json = await request.json()
  const signature = request.headers.get("stripe-signature")

  let event

  try {
    event = stripe.webhooks.constructEvent(json, signature, endpointSecret)
  }
  catch(err) {
    error(400, "Stripe:" + err)

    return
  }
  if (
    event.type === 'checkout.session.completed'
    || event.type === 'checkout.session.async_payment_succeeded'
  ) {
    fulfillCheckout(event.data.object.id, cookies);

  }
  return json({status: 201})

}

async function fulfillCheckout(sessionId: string, cookies) {
  // Set your secret key. Remember to switch to your live secret key in production.
  // See your keys here: https://dashboard.stripe.com/apikeys


  console.log('Fulfilling Checkout Session ' + sessionId);

  // TODO: Make this function safe to run multiple times,
  // even concurrently, with the same session ID

  // TODO: Make sure fulfillment hasn't already been
  // peformed for this Checkout Session

  // Retrieve the Checkout Session from the API with line_items expanded
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items'],
  });

  // Check the Checkout Session's payment_status property
  // to determine if fulfillment should be peformed
  if (checkoutSession.payment_status !== 'unpaid') {
    cookies.set('visited', 'true', { path: '/' });
    // TODO: Perform fulfillment of the line items

    // TODO: Record/save fulfillment status for this
    // Checkout Session
  }
}
