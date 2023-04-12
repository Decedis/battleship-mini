## Overview 
This is a basic battleship game. The computer does not guess, nor does the user have battleships of their own. 

The user guesses occupied nodes, and accumulates a score. 

In `base.mjs`, are classes for generating boards, and positioning battleships. 

### Known Bugs

- On occassion, the generated nodes for the battleships will overlap. The overlapping *seems* to largely follow a pattern where a later battleship will share a node with an end node on a battleship that has been generated earlier. Note the nodes on battleship two and battleship five. However, this may just be a numbers game, since there are 10 end nodes of the 17 nodes total. 
``` JS
Battleship info: Two,  [ '6E', '7E' ]
Battleship info: Three [ '5B', '5C', '5D' ]
Battleship info: Three [ '9C', '9D', '9E' ]
Battleship info: Four [ '4F', '4G', '4H', '4I' ]
Battleship info: Five [ '3E', '4E', '5E', '6E', '7E' ]
``` 

- User input is not setup to be arbitrary, but is instead forced to be uppercase. 1a, 1b, 1c do not work as proper input when they should. 

### TODO
- Refactor battleship `positionSetter` function. This includes simplifying the logic, and doublechecking that the checks against the board `occupiedNodes`. 
- Refactor the code in the while loop in `app.js`, implementing the DRY principle. 
- Correct `populateBoard` function. The pattern is rigid and highly repetitive. This function is an extreme example of what *not* to do. 