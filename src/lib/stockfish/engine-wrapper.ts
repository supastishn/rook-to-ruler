import {Chess} from "chess.js"

interface EngineOptions {
    chess: Chess,
    color: "white" | "black",
    limitElo: boolean,
    elo: number,
    level: number,
    ponder: boolean,
}

class EngineInstance {
    engine: Worker
    evaler: Worker
    options: EngineOptions
    chess: Chess
    //engine = typeof STOCKFISH === "function" ? STOCKFISH() : new Worker(options.stockfishjs || 'src/stockfish.js');
    //evaler = typeof STOCKFISH === "function" ? STOCKFISH() : new Worker(options.stockfishjs || 'src/stockfish.js');
    //var engineStatus = {};
    //var playerColor = 'white';
    constructor(options: EngineOptions = {chess: new Chess(), color: "black", limitElo: false, elo: 1320, level: 20, ponder: true}) {
        this.engine = new Worker('$lib/stockfish/stockfish-16.1-lite.js')
        this.evaler = new Worker('$lib/stockfish/stockfish-16.1-lite.js')
        this.options = options
        this.chess = options.chess
        // run uci to initialize engine
        this.runCmd("uci")
        this.runCmd("setoption name UCI_LimitStrength value" + options.limitElo.toString())
        this.runCmd("setoption name UCI_Elo value " + options.elo.toString())
        this.runCmd("setoption name Skill Level value " + options.level.toString())
        this.runCmd("setoption name ponder value " + options.ponder.toString())
        
    }

	runCmd(cmd: String, which: Worker = this.engine) {
        console.log("UCI: " + cmd);
        which.postMessage(cmd);
    }

    nextMove() {
        const fen: String = this.chess.fen()
        this.runCmd("position fen" + fen)
        this.runCmd("position fen" + fen, this.evaler)
    }

}	
