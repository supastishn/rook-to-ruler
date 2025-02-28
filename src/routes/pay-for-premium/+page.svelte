<script>
        import Navbar from '$lib/components/navbar/Navbar.svelte';
	import {loadStripe} from '@stripe/stripe-js';
	import { onMount } from 'svelte';
onMount(async () => {
        const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
        const clientSecret = await fetch("/backend/stripe/secret")
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
