import { Board, Battleship } from './modules/base.mjs';

let board = new Board(10);
// let battleShip = new Battleship(1, 3, board.size, board.fullBoard);
// let battleShip2 = new Battleship(2, 1, board.size, board.fullBoard);


let battleShip = new Battleship(1, 3, board);
console.log('Ship Occupied Nodes: ', battleShip.nodes);
let battleShip2 = new Battleship(2, 3, board);
console.log('Board Occupied Nodes: ', board.occupiedNodes);
//board.nodeGatherer([battleShip.nodes]);

// let battleShip2 = new Battleship(2, 3, board);
// console.log('Occupied Nodes: ', battleShip2.nodes);
// board.nodeGatherer([battleShip.nodes]);

//console.log('Occupied Nodes: ', board.occupiedNodes);
