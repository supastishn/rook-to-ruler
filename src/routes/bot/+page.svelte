<script lang="ts">
	import {onMount} from "svelte"
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { Chessground } from 'chessground'
	import { toColor, toDests, aiPlay, playOtherSide, stockfishPlay } from '$lib/utils.ts';
	import {Chess} from 'chess.js'
  import {EngineInstance} from "$lib/stockfish/engine-wrapper.ts"
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

	<div class="chessboard" id="board">

	</div>

<style>
.chessboard {
width:400px;
height:400px;
}
</style>
