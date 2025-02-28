<script lang="ts">
	import Navbar from "$lib/components/navbar/Navbar.svelte"
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { login } from '$lib/appwrite/account_tools.ts';
	let email = '';
	let password = '';
	let showError = false;
	let errorMessage = '';

	const handleSubmit = async () => {
		try {
			const response = await login(email, password);
			// Redirect to the home page or another page
			goto('/');
		} catch (error) {
			showError = true;
			errorMessage = 'Invalid email or password';
		}
	};
</script>
<Navbar/>
<div class="main-content">
	<h1>Login</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<div>
			<label for="email">Email:</label>
			<input type="email" id="email" bind:value={email} />
		</div>
		<div>
			<label for="password">Password:</label>
			<input type="password" id="password" bind:value={password} />
		</div>
		<button type="submit" class="button-1">Login</button>
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
