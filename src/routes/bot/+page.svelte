<script lang="ts">

	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { Chessground } from 'chessground';
	import { toColor, toDests, aiPlay, playOtherSide, stockfishPlay } from '$lib/utils.ts';
	import { Chess } from 'chess.js';
	//import {Settings} from "lucide-svelte";
	import { EngineInstance } from '$lib/stockfish/engine-wrapper.ts';



	const chess = new Chess();

	onMount(() => {
		function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
		}
		function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

		if (paid == false && getCookie("time") == "true") {
			setTimeout(() => {
				document.getElementById("ai").innerHTML = "Sorry, the demo time has run out! Please pay to continue"
			}, 5000)
		
		}
			else {
				setTimeout(() => {
					setCookie("time", "true", 1000)
					document.getElementById("ai").innerHTML = "Sorry, the demo time has run out! Please pay to continue"
					
				}, 10000)
			}
	


});

	async function updateAIBot(element: HTMLElement) {
	console.log("update bot")
	if (getCookie("time") == "true" && getCookie("paid") == "false") {
		return
	}
	
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
			<button onclick={() => {
									const openai = getOpenAiSecure()
	async function updateAIBot(element: HTMLElement) {
	console.log("update bot")
	if (getCookie("time") == "true" && getCookie("paid") == "false") {
		return
	}
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
			}
											 }
				class="button-1" role="button" id="ai"> Ask AI for advice! </button>
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
		width: 35%;
		height: 81%;
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
