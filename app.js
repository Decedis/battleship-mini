import { Board, Battleship } from './modules/base.mjs';

let board = new Board(10);
let battleShip = new Battleship(1, 3, board.size, board.fullBoard);

console.log('Battleship Information: ', battleShip);

console.log('Board Information: ', board);
board.nodeGatherer(battleShip.nodes)
console.log('Hidden Board Info: ', board.occupiedNodes);
