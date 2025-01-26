const stripe = require('stripe')('API CODE HERE!');

stripe.products.create({
  name: 'Rook To Ruler Premium',
  description: "A one-time, $10 payment to unlock all of Rook to Ruler's features!",
}).then(product => {
  stripe.prices.create({
    unit_amount: 1000,
    currency: 'usd',
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your starter subscription price id: ' + price.id);
  });
});
