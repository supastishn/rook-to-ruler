<script lang="ts">

	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { Chessground } from 'chessground';
	import { toColor, toDests, aiPlay, playOtherSide, stockfishPlay } from '$lib/utils.ts';
	import { Chess } from 'chess.js';
	//import {Settings} from "lucide-svelte";
	import { EngineInstance } from '$lib/stockfish/engine-wrapper.ts';
	import { getOpenAiSecure } from "$lib/return_ai.ts"
	import OpenAI from "openai";

	const chess = new Chess();

	onMount(() => {
		if (!cookie.get("paid")) {
			document.getElementById("bar").remove()
		}
		const cg = Chessground(document.getElementById('board') as HTMLElement, {
			movable: {
				color: 'white',
				free: false,
				dests: toDests(chess)
			},
			draggable: {
				showGhost: true
			}
		});
		const Engine = new EngineInstance({
			cg: cg,
			chess: chess,
			color: 'b',
			limitElo: true,
			elo: 1320,
			level: 2,
			ponder: true
		});
		cg.set({
			movable: { events: { after: stockfishPlay(Engine, cg, chess) } }
		});
	});


	const openai = getOpenAiSecure()
	async function updateAIBot(element: HTMLElement) {
	console.log("update bot")

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are an assistant designed to help people play the board game chess. You will recieve positions in PGN format, then you will guide the player to what move they should play, explaining the moves advantages.." },
        {
            role: "user",
            content: "Hello, please give me advice for a move in this position: " + chess.pgn(),
        },
    ],
    store: true
    })
    	console.log("done")
	console.log(completion.choices[0].message)
	element.innerHTML = completion.choices[0].message;
	}
</script>

<title>Rook to Ruler - Home</title>

<Navbar />
<main>
	<div class="chessboard" id="board"></div>
	<div class="evaluation">
		<div class="bar">
			<button onclick={() => updateAIBot(document.getElementById('para'))} class="button-1" role="button" id="ai"> Ask AI for advice! </button>
			<p id="para"></p>
		</div>
	</div>
</main>

<style>
	:root {
		--border: #323131;
	}
	main {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90svh;
		width: 100svw;
		padding: 0 5svw;
	}
	.chessboard {
		width: 41svw;
		height: 81svh;
		border-radius: 5px;
		/*
border-style: solid;
border-width: 5px
border: var(--border);
*/
	}
	.evaluation {
		display: flex;
		flex-direction: column;
		width: 41svw;
		height: 81svh;
		background: #f8f7f7;
		border-style: solid;
		border-width: 2px;
		border-color: #323131;
		border-radius: 10px;
		box-shadow: 2px 3px 5px var(--border);
	}
	.bar {
	display:flex;
		min-height: 10%;
		width: 100%;
		border-width: 2px;
		border-bottom: var(--border) solid;
		justify-content: center;
		align-items: center;
	}


/* CSS */
.button-1 {
  background-color: #EA4C89;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button:hover,
.button:focus {
  background-color: #F082AC;
}
</style>
