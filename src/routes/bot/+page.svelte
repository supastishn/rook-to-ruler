<script>
	import {onMount} from "svelte"
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { Chessground } from 'chessground'
	import { toColor, toDests, aiPlay, playOtherSide } from '$lib/utils.ts';
	import {Chess} from 'chess.js'

	const chess = new Chess()
onMount(() => {
const cg = Chessground(document.getElementById("board"), {
      movable: {
        color: 'white',
        free: false,
        dests: toDests(chess),
      },
      draggable: {
        showGhost: true
      }
      });
      cg.set({
      movable: { events: { after: playOtherSide(cg, chess) } }
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
