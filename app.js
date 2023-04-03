import { Board, Battleship } from './modules/base.mjs';

let board = new Board(10);
let battleShip = new Battleship(1, 3, board.size, board.fullBoard);
let battleShip2 = new Battleship(2, 1, board.size, board.fullBoard);

console.log('Battleship Information: ', battleShip);
console.log('Battleship Information: ', battleShip2);

console.log('Board Information: ', board);
board.nodeGatherer([battleShip.nodes, battleShip2.nodes]);
console.log('Occupied Nodes: ', board.occupiedNodes);
