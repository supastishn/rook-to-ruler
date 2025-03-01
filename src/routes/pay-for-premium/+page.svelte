<script lang="ts">
        import Navbar from '$lib/components/navbar/Navbar.svelte';
	import {loadStripe} from '@stripe/stripe-js';
	import { onMount } from 'svelte';
onMount(async () => {
        const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
        const clientJson = await fetch("/backend/stripe/secret")
        const {clientSecret} = await clientJson.json()
        const appearance = {
    theme: 'stripe',
  };
 // @ts-ignore
 let elements = stripe.elements({ appearance, clientSecret });

  const paymentElementOptions = {
    layout: "accordion",
  };

   // @ts-ignore
  const paymentElement = elements.create("payment", paymentElementOptions)
  paymentElement.mount("#payment-element")
})

</script>

<title>Rook to Ruler - Home</title>

<Navbar />
<div class="main-content">
	<form id="payment-form">
		<div id="payment-element">
			<!-- Elements will create form elements here -->
		</div>
		<button id="submit">Submit</button>
		<div id="error-message">
			<!-- Display error message to your customers here -->
		</div>
	</form>
</div>
