<script>
	import {isLoggedIn} from "$lib/appwrite/account_tools.ts"
	import {onMount} from "svelte"
	export const ssr = false 
	var loggedIn
	onMount(() => {
	isLoggedIn().then(logged => {
		console.log("lOGIN:")
		console.log(logged)
		if (!logged) {
			document.getElementById("loggedIn").style.display = "none"
		}
		else {
			document.getElementById("notLoggedIn").style.display = "none"
		}
	})
	})
	
</script>

<header>
	<div class="logo">
		<img src="/images/logo.png" alt="Rook to Ruler Logo" />
	</div>
	<nav>
		<div>
		<a href="/bot">DEMO</a>
		<a href="/about">ABOUT</a>
		<a href="/pricing">PRICING</a>
		
			<div id ="notLoggedIn">
		<a href="/login">LOGIN</a>
		<a href="/register">REGISTER</a>
			</div>
		
		<a href="https://www.bbc.com" target="_blank" rel="noopener noreferrer">DISCORD</a>
		<div id="loggedIn">
			<img src="/profile.jpg" alt="Profile Picture" />
		</div>
		</div>
	</nav>
</header>

<style>
	div {
		display:flex;
		align-items: center;
	}
</style>