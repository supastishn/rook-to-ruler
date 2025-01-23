<script lang="ts">
	import {onMount} from "svelte"
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { Chessground } from 'chessground'
	import { toColor, toDests, aiPlay, playOtherSide, stockfishPlay } from '$lib/utils.ts';
	import {Chess} from 'chess.js';
	import {Settings} from "lucide-svelte";
  import {EngineInstance} from "$lib/stockfish/engine-wrapper.ts";
	const chess = new Chess()
  
onMount(() => {
  
const cg = Chessground(document.getElementById("board") as HTMLElement, {
      movable: {
        color: 'white',
        free: false,
        dests: toDests(chess),
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
    ponder: true,
  })
      cg.set({
      movable: { events: { after: stockfishPlay(Engine, cg, chess) } }
    });
    
})
</script>

<title>Rook to Ruler - Home</title>

<Navbar />
	<main>
	<div class="chessboard" id="board">

	</div>
	<div class="evaluation">
		<div class="bar">
		
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
width:41svw;
height:81svh;
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
background: #F8F7F7;
border-style: solid;
border-width: 2px;
border-color: #323131;
border-radius: 10px;
box-shadow: 2px 3px 5px var(--border);
}
.bar {
min-height: 10%;
width: 100%;
border-width: 2px;
border-bottom: var(--border) solid;
}
</style>
