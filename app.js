import { Board, Battleship, populateBoard } from './modules/base.mjs';

let board = new Board(10);

//populateBoard(board);

let battleShipSizeTwo = new Battleship(1, 2, board);
let battleShipSizeThree = new Battleship(2, 3, board);
let battleShipSizeThree2 = new Battleship(3,3, board);
let battleShipSizeFour = new Battleship(4, 4, board);
let battleShipSizeFive = new Battleship(5, 5, board);


console.log(battleShipSizeTwo.nodes);
console.log(battleShipSizeThree.nodes);
console.log(battleShipSizeThree2.nodes);
console.log(battleShipSizeFour.nodes);
console.log(battleShipSizeFive.nodes);
console.log('Board Nodes: ', board.occupiedNodes);