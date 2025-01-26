import { Chess, Move } from 'chess.js';
import type { Api } from 'chessground/api';
import { Chessground } from 'chessground';
import { toColor, toDests } from '$lib/utils.ts';
interface EngineOptions {
	cg?: Api;
	chess: Chess;
	color: 'w' | 'b';
	limitElo: boolean;
	elo: number;
	level: number;
	ponder: boolean;
}

interface EngineStatus {
	search: String;
	score: String;
}
export class EngineInstance {
	engine: Worker;
	evaler: Worker;
	options: EngineOptions;
	chess: Chess;
	history: String;
	evaluation_el: String;
	engineStatus: EngineStatus;
	cg?: Api;
	//engine = typeof STOCKFISH === "function" ? STOCKFISH() : new Worker(options.stockfishjs || 'src/stockfish.js');
	//evaler = typeof STOCKFISH === "function" ? STOCKFISH() : new Worker(options.stockfishjs || 'src/stockfish.js');
	//var engineStatus = {};
	//var playerColor = 'white';

	constructor(
		options: EngineOptions = {
			chess: new Chess(),
			color: 'b',
			limitElo: false,
			elo: 1320,
			level: 20,
			ponder: true
		}
	) {
		this.engine = new Worker('stockfish-16.1-lite-single.js');
		this.evaler = new Worker('stockfish-16.1-lite-single.js');
		this.options = options;
		this.chess = options.chess;
		this.history = '';
		this.evaluation_el = '';
		this.engineStatus = { search: '', score: '' };
		this.cg = options.cg;
		let inst = this;

		this.update();

		// set engine methods for when message is recieved
		this.evaler.onmessage = function (event) {
			var line;

			if (event && typeof event === 'object') {
				line = event.data;
			} else {
				line = event;
			}

			console.log('evaler: ' + line);

			/// Ignore some output.
			if (line === 'uciok' || line === 'readyok' || line.substr(0, 11) === 'option name') {
				return;
			}

			inst.evaluation_el += '\n';

			inst.evaluation_el += line;
		};

		this.engine.onmessage = function (event) {
			var team = inst.chess.turn();

			var line;

			if (event && typeof event === 'object') {
				line = event.data;
				//console.log(line)
			} else {
				line = event;
				//console.log(line)
			}
			//console.log("Reply: " + line)
			if (line == 'uciok') {
			} else if (line == 'readyok') {
			} else {
				var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
				/// Did the AI move?
				if (match) {
					inst.chess.move({ from: match[1], to: match[2], promotion: match[3] });
					if (inst.cg) {
						inst.cg.move(match[1], match[2]);
						inst.cg.set({
							turnColor: toColor(inst.chess),
							movable: {
								color: toColor(inst.chess),
								dests: toDests(inst.chess)
							}
						});
						inst.cg.playPremove();
					}

					inst.evaluation_el = '';
					//uciCmd("eval");
					/// Is it sending feedback?
				} else if ((match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/))) {
					inst.engineStatus.search = 'Depth: ' + match[1] + ' Nps: ' + match[2];
				}

				/// Is it sending feed back with a score?
				if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
					var score = parseInt(match[2]) * (team == 'w' ? 1 : -1);
					/// Is it measuring in centipawns?
					if (match[1] == 'cp') {
						inst.engineStatus.score = (score / 100.0).toFixed(2);
						/// Did it find a mate?
					} else if (match[1] == 'mate') {
						inst.engineStatus.score = 'Mate in ' + Math.abs(score);
					}

					/// Is the score bounded?
					if ((match = line.match(/\b(upper|lower)bound\b/))) {
						inst.engineStatus.score =
							((match[1] == 'upper') == (team == 'w') ? '<= ' : '>= ') + inst.engineStatus.score;
					}
				}
			}
		};
		this.runCmd('uci');
		this.runCmd('setoption name UCI_LimitStrength value ' + options.limitElo.toString());
		this.runCmd('setoption name UCI_Elo value ' + options.elo.toString());
		this.runCmd('setoption name Skill Level value ' + options.level.toString());
		this.runCmd('setoption name ponder value ' + options.ponder.toString());
	}

	runCmd(cmd: String, which: Worker = this.engine) {
		console.log('UCI: ' + cmd);
		which.postMessage(cmd);
	}

	update() {
		//this.fen = this.chess.fen()
		//
		// loop over history
		this.history = '';
		this.chess.history({ verbose: true }).forEach((value: Move, index: number, array: Move[]) => {
			this.history += value.lan;
			this.history += ' ';
		});
		this.runCmd('position startpos moves ' + this.history, this.evaler);
		this.runCmd('position startpos moves ' + this.history);
	}

	nextMove(depth: number = 15) {
		this.runCmd('go depth ' + depth.toString());
	}

	evaluate() {
		this.runCmd('eval', this.evaler);
	}
}
