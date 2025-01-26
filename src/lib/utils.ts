import type { Api } from 'chessground/api';
import type { Color, Key } from 'chessground/types';
import type { Chess } from 'chess.js';
import { SQUARES } from 'chess.js';

import { EngineInstance } from '$lib/stockfish/engine-wrapper';

export function toDests(chess: Chess): Map<Key, Key[]> {
	const dests = new Map();
	SQUARES.forEach((s) => {
		const ms = chess.moves({ square: s, verbose: true });
		if (ms.length)
			dests.set(
				s,
				ms.map((m) => m.to)
			);
	});
	return dests;
}

export function toColor(chess: Chess): Color {
	return chess.turn() === 'w' ? 'white' : 'black';
}

export function playOtherSide(cg: Api, chess) {
	return (orig, dest) => {
		chess.move({ from: orig, to: dest, promotion: 'q' });
		// console.log(chess.ascii())
		cg.set({
			turnColor: toColor(chess),
			movable: {
				color: toColor(chess),
				dests: toDests(chess)
			}
		});
		console.log('Done!');
	};
}

export function aiPlay(cg: Api, chess: Chess, delay: number, firstMove: boolean) {
	return (orig, dest) => {
		chess.move({ from: orig, to: dest });
		setTimeout(() => {
			const moves = chess.moves({ verbose: true });
			const move = firstMove ? moves[0] : moves[Math.floor(Math.random() * moves.length)];
			chess.move(move.san);
			cg.move(move.from, move.to);
			cg.set({
				turnColor: toColor(chess),
				movable: {
					color: toColor(chess),
					dests: toDests(chess)
				}
			});
			cg.playPremove();
		}, delay);
	};
}

export function stockfishPlay(engine: EngineInstance, cg: Api, chess: Chess) {
	return (orig, dest) => {
		chess.move({ from: orig, to: dest, promotion: 'q' });
		engine.update();
		engine.nextMove();
		engine.evaluate();
	};
}
