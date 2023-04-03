/*
Classes:
1. Board Class to track board state. This includes board size, ship positions and player score. When a node is occupied, it cannot be taken by another node.
2. Ships are defined in their own class. Track ship type/length, and position

Functions:
1. Random Value functions
2. Vertical and Horizontal Growth functions dependent upon length and a random direction variable.

*/
export { Board, Battleship };

class Board {
    constructor(size){
        this.size = size;
        this.boardBuilder(size);
        this.scoreUpdater();
    }
    boardBuilder (size) {
        let xAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let yAxis = ['A','B','C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        //for-loop from the two values above to create new boards ranges
        let alpha = [];
        let numeric = [];

        let fullBoard = []; //uses Alpha and Numeric to build
        for (let i = 0; i < size; i++){
            alpha.push(xAxis[i]);
        }
        for (let i = 0; i <= size; i++){
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
        //take in every battleship as an array 
        //append to new `this` value to be used in
        //nodeGuesser 
        console.log('NODE GATHERER CALLED');
        let occupiedNodes = new Set(); //derived from Battleships
        for (let i = 0; i <= battleshipNodes; i++){
            console.log('i value: ', i);
            for (let j = 0; j <= battleshipNodes[i]; j++){
                occupiedNodes.add(battleshipNodes[i][j]);
                console.log('j value: ', j);
            }
        }
        this.occupiedNodes = occupiedNodes;
    }
    nodeGuesser (guess) {
        //if guess == hit, then update with X
        //else, update with O
       

        //list or set for misses 
        //list or set for hits 
        //list or set for every guess 
        if (this.fullBoard.includes(guess)) {
            
        }
        
        let index = this.fullBoard.indexOf(guess);
        return this.fullBoard.splice(index, 1);
    }
    scoreUpdater(guess){
        let score = 0;
        return score;
    }
}

class Battleship {
    constructor(ID, shipSize, boardSize, board) {
        this.ID = ID; //track ship amounts
        this.shipSize = shipSize; //track ship sizes
        this.boardSize = boardSize; //this is a number from the other class
        this.board = board; //get the fullBoard
        this.positionSetter(shipSize, boardSize, board) //track ship nodes. BoardSize is a number, board is a property
    }
    //horizontal ship => increment less than Letter-Number(less than size)
    //vertical ship => increment + size
    positionSetter(shipSize, boardSize, board){ //board size is derived from the size set by the board => Board.fullBoard
        let orientationRoll = Math.floor(Math.random() * 2);
        //console.log('Orientation Roll: ', orientationRoll );
        let openNodes = board;
        let initialNodeIndex = Math.floor(Math.random() * openNodes.length);
        //console.log('INITIAL INDEX:', initialNodeIndex);
        let occupiedNodes = []; //[openNodes[initialNodeIndex]];
        //occupiedNodes has to be passed back to the original board

        this.initialNode = openNodes[initialNodeIndex];
        let numericNode = Number(this.initialNode.slice(0,-1));
        console.log('Numeric NODE: ', numericNode);
        if( orientationRoll === 1 ){ //vertical placement. Needs conditions for space
            if((initialNodeIndex + (boardSize * shipSize)) <= board.length){ //vertical placement DOWN
                for(let i = 0; i < shipSize; i++) {
                    occupiedNodes.push(openNodes[initialNodeIndex + (i * boardSize)]);
                    //nodeTracker.add(openNodes[initialNodeIndex + (i * boardSize)]);
                }
                console.log('VERTICAL DOWN TRIGGER');
                this.nodes = occupiedNodes;

            } else if ((initialNodeIndex - (boardSize * shipSize)) >= 0 ) { //vertical placement UP. Check for space
                for(let i = 0; i < shipSize; i++) {
                    occupiedNodes.push(openNodes[initialNodeIndex - (i * boardSize)]);
                    //nodeTracker.add(openNodes[initialNodeIndex + (i * boardSize)]);
                }
                console.log('VERTICAL UP TRIGGER');
                this.nodes = occupiedNodes;
            } else {
                console.log('ABORT VERTICAL TRIGGER OPERATION');
                orientationRoll = 0;
            }

        } else { //horizontal
            //instead of numericNode, change to initialIndex? Or, maybe -1 to account for value
            let condition = boardSize - (shipSize + numericNode);
            if(condition > 0) { //horizontal right
                for(let i = 0; i < shipSize; i++){
                    occupiedNodes.push(openNodes[initialNodeIndex + i]);

                    //nodeTracker.add(openNodes[initialNodeIndex + (i * boardSize)]);
                }
                console.log('HORIZONTAL TRIGGER RIGHT');
                this.nodes = occupiedNodes;
            }
            else if(condition < 0 ) { //horizontal left IS NOT TRIGGERING
                for(let i = 0; i < shipSize; i++){
                    occupiedNodes.push(openNodes[initialNodeIndex - i]);

                    //nodeTracker.add(openNodes[initialNodeIndex + (i * boardSize)]);
                }
                console.log('HORIZONTAL TRIGGER LEFT');
                this.nodes = occupiedNodes;
            }
        }
    }
}




