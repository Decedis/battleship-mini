/*
Classes:
1. Board Class to track board state. This includes board size, ship positions and player score. When a node is occupied, it cannot be taken by another node.
2. Ships are defined in their own class. Track ship type/length, and position

Functions:
1. Random Value functions
2. Vertical and Horizontal Growth functions dependent upon length and a random direction variable.

*/
export { Board, Battleship, populateBoard };

class Board {
    constructor(size){
        this.size = size;
        this.boardBuilder(size);
        
        this.occupiedNodes = new Set;
        this.hits = new Set;
        this.guesses = new Array;
        this.score = new Number;
    }
    boardBuilder (size) {
        let xAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //10 values 0-9 index
        let yAxis = ['A','B','C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; ////10 0-9 index
        //for-loop from the two values above to create new boards ranges
        let alpha = [];
        let numeric = [];

        let fullBoard = []; //uses Alpha and Numeric to build
        for (let i = 0; i < size; i++){
            alpha.push(xAxis[i]);
        }
        for (let i = 0; i < size; i++){
            numeric.push(yAxis[i]);
        }
        for (const number of numeric){
            for (const letter of alpha){
                fullBoard.push(`${letter}${number}`);
            }
        }
        this.fullBoard = fullBoard;
    }
    nodeGatherer(battleshipNodes) {
        for (let i = 0; i < battleshipNodes.length; i++){
            this.occupiedNodes.add(battleshipNodes[i]);
        }         
    }
    nodeGuesser(guess) {
        if (this.occupiedNodes.has(guess)) {
            console.log('You made a hit!');

            this.hits.add(guess);
            this.occupiedNodes.delete(guess);
            this.score += 1; 

            this.guesses.push(guess);
        } else if (!this.occupiedNodes.has(guess)) {
            this.guesses.push(guess);
        }
        if (this.guesses.filter(value => value == guess).length > 1) {
            console.log('This has already been guessed. Try again.');
        } 
        //guesses will keep building up. 
        //will fix in later iteration 
    }
}

class Battleship {
    constructor(ID, shipSize, board) {
        this.ID = ID; //track the amount of ships. Not strictly necessary
        this.board = board; //get the fullBoard
        this.sizeValidator(shipSize); 
        this.positionSetter(shipSize, board) //track ship nodes. BoardSize is a number, board is a property
    }
    sizeValidator(shipSize) {
        if (shipSize > 0) {
            if (shipSize < this.board.size) {
                return this.shipSize = shipSize;
            } else {
                return this.shipSize = 0;
            }
        } else {
            return this.shipSize = 0;
        }
    } 
    //horizontal ship => increment less than Letter-Number(less than size)
    //vertical ship => increment + size
    positionSetter(shipSize, board) { //board size is derived from the size set by the board => Board.fullBoard
        let openNodes = this.board.fullBoard;
        let boardSize = this.board.size;

        let orientationRoll = Math.floor(Math.random() * 2);
        
        let occupiedNodes = []; 
        
        while (occupiedNodes.length < this.shipSize) {
            let initialNodeIndex = Math.floor(Math.random() * openNodes.length);
            this.initialNode = openNodes[initialNodeIndex];
            let numericNode = Number(this.initialNode.slice(0, -1));
            //console.log('INITIAL NODE: ', this.initialNode);
            //console.log(`Initial Node: ${this.initialNode}`);

            if (orientationRoll === 1) { //vertical placement. 
                let condition = initialNodeIndex + (boardSize * shipSize);
                if(condition <= openNodes.length){ //vertical placement DOWn
                    for(let i = 0; i < shipSize; i++) {
                        occupiedNodes.push(openNodes[initialNodeIndex + (i * boardSize)]);
                    }
                    if (!this.board.occupiedNodes.has(...occupiedNodes)) {
                        this.nodes = occupiedNodes;
                        this.board.nodeGatherer(occupiedNodes);
                    } 
                    else {
                        //console.log('Positional Failure. ERROR CODE: VD');
                        occupiedNodes = [];
                        continue;
                    }
                } else if (condition >= 0 ) { //vertical placement UP. Check for space
                    for(let i = 0; i < shipSize; i++) {
                        occupiedNodes.push(openNodes[initialNodeIndex - (i * boardSize)]);
                    }
                    if (!this.board.occupiedNodes.has(...occupiedNodes)) {
                        this.nodes = occupiedNodes;
                        this.board.nodeGatherer(occupiedNodes);
                    } 
                    else {
                        //console.log('Positional Failure. ERROR CODE: VU');
                        occupiedNodes = [];
                        continue;
                    }
                } else {
                    //console.log('VERTICAL TRIGGER OPERATION FAILED. Continuing roll.');
                    orientationRoll = 0;
                    continue;
                }
            }
            else { //horizontal
                //instead of numericNode, change to initialIndex? Or, maybe -1 to account for value
                let condition = boardSize - (shipSize + numericNode);
                if(condition > 0) { //horizontal right
                    for(let i = 0; i < shipSize; i++){
                        occupiedNodes.push(openNodes[initialNodeIndex + i]);
                    }
                    if (!this.board.occupiedNodes.has(...occupiedNodes)) {
                        this.nodes = occupiedNodes;
                        this.board.nodeGatherer(occupiedNodes);
                    } 
                    else {
                        //console.log('Positional Failure. ERROR CODE: HR');
                       
                        occupiedNodes = [];
                        continue;
                    }
                }
                else if(condition < 0 ) { //Horizontal Left
                    for(let i = 0; i < shipSize; i++){
                        occupiedNodes.push(openNodes[initialNodeIndex - i]);
                    }
                    if (!this.board.occupiedNodes.has(...occupiedNodes)) {
                        this.nodes = occupiedNodes;
                        this.board.nodeGatherer(occupiedNodes);
                    } 
                    else {
                        //console.log('Positional Failure. ERROR CODE: HL');
                        
                        occupiedNodes = [];
                        continue;
                    }
                }
                else {
                    //console.log('HORIZONTAL TRIGGER OPERATION FAILED. Continuing roll.');
                    orientationRoll = 1;
                    continue;
                }
            }
        }
    }
}

function populateBoard(board) {
    switch (board.size) {
        case 1:
            console.log('Board is too small to play.');
            break;
        case 2:
            console.log('Board is too small to play.');
            break;
        case 3: {
            let battleShipSizeTwo = new Battleship(1, 2, board);
            console.log('One ship is on the board');
            break;
        }
        case 4: {
            let battleShipSizeTwo    = new Battleship(1, 2, board);
            let battleShipSizeThree  = new Battleship(2, 3, board);
            let battleShipSizeThree2 = new Battleship(3, 3, board);
            console.log('Three ships are on the board');
            break;
        }
        case 5: {
            let battleShipSizeTwo = new Battleship(1, 2, board);
            let battleShipSizeThree = new Battleship(2, 3, board);
            let battleShipSizeThree2 = new Battleship(3,3, board);
            let battleShipSizeFour = new Battleship(4, 4, board);
            console.log('Four ships are on the board');
            break;
        }
        case 6: {
            let battleShipSizeTwo = new Battleship(1, 2, board);
            let battleShipSizeThree = new Battleship(2, 3, board);
            let battleShipSizeThree2 = new Battleship(3,3, board);
            let battleShipSizeFour = new Battleship(4, 4, board);
            console.log('Four ships are on the board');
            break;
        }
        case 7: {
            let battleShipSizeTwo = new Battleship(1, 2, board);
            let battleShipSizeThree = new Battleship(2, 3, board);
            let battleShipSizeThree2 = new Battleship(3,3, board);
            let battleShipSizeFour = new Battleship(4, 4, board);
            let battleShipSizeFive = new Battleship(5, 5, board);
            console.log('Five ships are on the board');
            break;
        }
        case 8: {
            let battleShipSizeTwo = new Battleship(1, 2, board);
            let battleShipSizeThree = new Battleship(2, 3, board);
            let battleShipSizeThree2 = new Battleship(3,3, board);
            let battleShipSizeFour = new Battleship(4, 4, board);
            let battleShipSizeFive = new Battleship(5, 5, board);
            console.log('Five ships are on the board');
            break;
        }
        case 9: {
            let battleShipSizeTwo = new Battleship(1, 2, board);
            let battleShipSizeThree = new Battleship(2, 3, board);
            let battleShipSizeThree2 = new Battleship(3,3, board);
            let battleShipSizeFour = new Battleship(4, 4, board);
            let battleShipSizeFive = new Battleship(5, 5, board);
            console.log('Five ships are on the board');
            break;
        }
        case 10: {
            let battleShipSizeTwo = new Battleship(1, 2, board);
            let battleShipSizeThree = new Battleship(2, 3, board);
            let battleShipSizeThree2 = new Battleship(3,3, board);
            let battleShipSizeFour = new Battleship(4, 4, board);
            let battleShipSizeFive = new Battleship(5, 5, board);
            console.log('Five ships are on the board');
            break;
        }
        default: {
            console.log('Invalid Board Size. No ships placed');
            let battleShipSizeTwo, battleShipSizeThree, battleShipSizeThree2, battleShipSizeFour, battleShipSizeFive = null;
            break;
        }
    }
}




