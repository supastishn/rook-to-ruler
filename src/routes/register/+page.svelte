<script lang="ts">
	import Navbar from "$lib/components/navbar/Navbar.svelte"
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { createAccount } from '$lib/appwrite/account_tools.ts'
	let email = '';
	let password = '';
	let confirmPassword = '';
	let showError = false;
	let errorMessage = '';

	const handleSubmit = async () => {
		if (password !== confirmPassword) {
			showError = true;
			errorMessage = 'Passwords do not match';
			return;
		}

	  const Response = await createAccount(email, password, name)
		showError = true;
		errorMessage = 'Registration successful!';
		// Redirect to the login page or another page
		goto('/login');
	};
</script>
<Navbar/>
<div class="main-content">
	<h1>Register</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<div>
			<label for="email">Email:</label>
			<input type="email" id="email" bind:value={email} />
		</div>
		<div>
			<label for="password">Password:</label>
			<input type="password" id="password" bind:value={password} />
		</div>
		<div>
			<label for="confirmPassword">Confirm Password:</label>
			<input type="password" id="confirmPassword" bind:value={confirmPassword} />
		</div>
		<button type="submit" class="button-1">Register</button>
	</form>
	{#if showError}
		<div class="error-message">{errorMessage}</div>
	{/if}
</div>

<style>
	.error-message {
		color: red;
	}
	.main-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 60px;
		background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent to blend with chessboard */
		margin: 100px;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
	.main-content img {
		max-width: 45%;
		border-radius: 10px;
	}
	.main-content div {
		max-width: 50%;
	}
	.main-content h1 {
		font-size: 28px;
		margin-bottom: 20px;
		text-decoration: underline;
	}
</style>


