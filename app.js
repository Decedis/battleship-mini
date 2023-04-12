//external import 
import readlineSync from 'readline-sync';
//local import
import { Board, Battleship, populateBoard } from './modules/base.mjs';


let prompt = readlineSync.keyIn('Press any key to start the game...');
let boardSize = readlineSync.questionInt('How big do you want the board to be? It can be between 1 and 10: ');
console.log('Board size: ', boardSize);
let board = new Board(boardSize);
populateBoard(board);
    
while (prompt) {
    console.log('Occupied nodes:size =>', board.occupiedNodes, board.occupiedNodes.size);
    if (board.size > 0 && board.size <= 10) {
        console.log(board.fullBoard);
    }
    if (board.occupiedNodes.size > 0) {
        let guess = readlineSync.question('Guess a battleship node location: ');
        board.nodeGuesser(guess);
        if (board.score > 0) {
            console.log('Your score is: ', board.score);
        }
        console.log('Your hits are: ', board.hits);
        console.log('Your guesses are: ', board.guesses);
        console.log('Occupied Nodes: ', board.occupiedNodes.size);
    }

    

    else if (board.occupiedNodes.size == 0) {
        let exit = readlineSync.question('You have destroyed all battleships. Would you like to play again? Y/N: ');
        if (exit.toUpperCase() === 'Y') {
            console.log('Lets keep playing');
            boardSize = readlineSync.questionInt('How big do you want the board to be? It can be between 1 and 10: ');
            board = new Board(boardSize);
            populateBoard(board);
        } else if (exit.toUpperCase() === 'N') {
            console.log('Exiting game');
            prompt = undefined;
        } else {
            console.log('Invalid input.');
        }
    }
    
}
console.log('Thanks for playing.');




