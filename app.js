//external import 
import readlineSync from 'readline-sync';
//local import
import { Board, Battleship, populateBoard } from './modules/base.mjs';

let board = new Board(10);

populateBoard(board);

let prompt = readlineSync.question('Hello, is this thing on?: ');
console.log(prompt);




