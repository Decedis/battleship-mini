import { Board, Battleship } from './modules/base.mjs';

let board = new Board(10);



let battleShip = new Battleship(1, 3, board);
console.log('Ship Occupied Nodes: ', battleShip.nodes);
let battleShip2 = new Battleship(2, 3, board);
console.log('Board Occupied Nodes: ', board.occupiedNodes);
