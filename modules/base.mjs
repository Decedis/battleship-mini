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
        this.occupiedNodes = new Set;
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
        //let occupiedNodes = new Set; //derived from Battleships
        for (let i = 0; i < battleshipNodes.length; i++){
            this.occupiedNodes.add(battleshipNodes[i]);
        }         
    }
    nodeGuesser(guess) {
        //NOT FINISHED
        //if guess == hit, then update with X
        //else, update with O
       

        //list or set for misses
        //list or set for hits
        //list or set for every guess 
        let userScore = 0;
        let guesses = new Set;
        if (this.occupiedNodes.includes(guess)) {
            userScore += 1; 
            guesses.add(guess);
        }
        
        let index = this.fullBoard.indexOf(guess);
        return this.fullBoard.splice(index, 1);
    }
    scoreUpdater(guess) {
        //NOT FINISHED
        let score = 0;
        return score;
    }
}

class Battleship {
    constructor(ID, shipSize, board) {
        this.ID = ID; //track ship amounts
        this.shipSize = shipSize; //track ship sizes
        //this.boardSize = boardSize; //this is a number from the other class
        this.board = board; //get the fullBoard
        this.positionSetter(shipSize, board) //track ship nodes. BoardSize is a number, board is a property
    }
    //horizontal ship => increment less than Letter-Number(less than size)
    //vertical ship => increment + size
    positionSetter(shipSize, board) { //board size is derived from the size set by the board => Board.fullBoard
        //old params (shipSize, boardSize, fullBoard)

        let openNodes = this.board.fullBoard;
        let boardSize = this.board.size;

        let orientationRoll = Math.floor(Math.random() * 2);
        let initialNodeIndex = Math.floor(Math.random() * openNodes.length);
        
        let occupiedNodes = []; 
        //occupiedNodes has to be passed back to the original board

        this.initialNode = openNodes[initialNodeIndex];
        let numericNode = Number(this.initialNode.slice(0,-1));
        console.log('INITIAL NODE: ', this.initialNode);
        console.log('SHIP SIZE: ', shipSize);
        console.log('OCCUPIED NODES LENGTH: ', occupiedNodes.length);
        while (occupiedNodes.length < shipSize) {
            if (orientationRoll === 1) { //vertical placement. 
                let condition = initialNodeIndex + (boardSize * shipSize);
                let counterCondition = [];
                //old param condition <= board.length
                if(condition <= openNodes.length){ //vertical placement DOWN
                    for(let i = 0; i < shipSize; i++) {
                        occupiedNodes.push(openNodes[initialNodeIndex + (i * boardSize)]);
                    }
                    console.log('VERTICAL DOWN TRIGGER');
                    this.nodes = occupiedNodes;
                    this.board.nodeGatherer(occupiedNodes);
    
                } else if (condition >= 0 ) { //vertical placement UP. Check for space
                    for(let i = 0; i < shipSize; i++) {
                        occupiedNodes.push(openNodes[initialNodeIndex - (i * boardSize)]);
                    }
                    console.log('VERTICAL UP TRIGGER');
                    this.nodes = occupiedNodes;
                    this.board.nodeGatherer(occupiedNodes);
                } else {
                    console.log('ABORT VERTICAL TRIGGER OPERATION');
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
                    //console.log('HORIZONTAL TRIGGER RIGHT');
                    this.nodes = occupiedNodes;
                    this.board.nodeGatherer(occupiedNodes);
                }
                else if(condition < 0 ) { //horizontal left IS NOT TRIGGERING
                    for(let i = 0; i < shipSize; i++){
                        occupiedNodes.push(openNodes[initialNodeIndex - i]);
                    }
                    console.log('HORIZONTAL TRIGGER LEFT');
                    this.nodes = occupiedNodes;
                    this.board.nodeGatherer(occupiedNodes);
                }
                else {
                    console.log('ABORT HORIZONTAL TRIGGER OPERATION');
                    orientationRoll = 1;
                    continue;
                }
            }
        }
    }
}




