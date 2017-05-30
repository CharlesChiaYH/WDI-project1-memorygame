window.onload = function () {
    //Global variables for tile randomizer//
    var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];
    var memory_values = [];
    var memory_tile_ids = [];
    var tiles_flipped = 0;

    //Countdown Timer global variables//
    var timeLeft = 30;
    var elem = document.getElementById('timer');
    var timer;

    //Global variables for turn counter and player scores//
    /*var p1 = 0 //document.getElementById('score1') - update innerHTML;//
    var p2 = 0 //document.getElementById('score2') - update innerHTML;//
    var turn = 1;//

    function scoring(){
    if (turn %2 !== 0){
        1)run tile flipping function
          1a)if memory_values[0] = memory_values[1], p1 ++, and update into html
          1b)turn ++
          1c)alert message that it is player 2 turn
          1d)if memory_values [0] !== memory_values[1], no change to p1
          1e)alert message that it is player 2 turn
          1f) turn ++
      }else if (turn %2 ==0){
        2)
          2a)if memory_values[0] = memory_values[1], p2 ++, and update into html
          2b)turn ++
          2c)alert message that it is player 1 turn
          2d)if memory_values [0] !== memory_values[1], no change to p2
          2e)alert message that it is player 1 turn
          2f) turn ++
        }
    }
    Exit condition when timer ==0
    or when tiles flipped = memory_array.length
    if p1>p2
    alert message (player 1 wins)
    else
    alert message (player 2 wins)
    after clicking alert message for either player's win, windows.location.reload()
    */

    //Function to randomize tile array. Reference: Fisher-Yates shuffle algorithm//
    Array.prototype.memory_tile_shuffle = function () {
        var i = this.length, j, temp;
        while (--i > 0) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this[j];
            this[j] = this[i];
            this[i] = temp;
        }
    }

    //Function to take randomized tile array to add into grid//
    function newBoard() {
        tiles_flipped = 0;
        memory_array.memory_tile_shuffle();
        for (var i = 0; i < memory_array.length; i++) {
            //this creates a new object for the idValue
            var idValue = 'tile_' + i;
            //create new element
            var newDiv = document.createElement('div');
            //add new id to the element
            newDiv.id = idValue;
            //create onclick function to this element
            //however since the values are in the array.
            //we will need to be creative as if we reference the value in the array no matter what
            //it will give us the last value which is an issue since it is in a loop a problem called closure.
            //as explained https://j11y.io/javascript/closures-in-javascript/

            newDiv.onclick = (function (n) {
                return function () {
                    console.log('you clicked on : ' + n);
                    memoryFlipTile(this, memory_array[n]);
                };
            })(i);
            document.getElementById('memory_board').appendChild(newDiv);
        }
    }

    //Function to flip tile in grid//
    function memoryFlipTile(tile, val) {
        console.log(tile);
        console.log(val);
        if (tile.innerHTML === "" && memory_values.length < 2) {
            tile.style.background = '#FFF';
            tile.innerHTML = val;
            if (memory_values.length === 0) {
                memory_values.push(val);
                memory_tile_ids.push(tile.id);
                console.log(tile.id);
            }
            else if (memory_values.length === 1) {
                memory_values.push(val);
                memory_tile_ids.push(tile.id);
                if (memory_values[0] === memory_values[1]){ //check for matching tiles//
                    tiles_flipped += 2;
                    // Clear both arrays
                    memory_values = [];
                    memory_tile_ids = [];
                    // Check to see if the whole board is cleared
                    if (tiles_flipped === memory_array.length) {
                        alert("Board cleared... generating new board");
                        document.getElementById('memory_board').innerHTML = "";
                        newBoard();
                    }
                }
                else {
                    setTimeout(flip2Back, 700);
                }
            }
        }
    }
    //Flip the 2 tiles back over//
    function flip2Back() {
        var tile_1 = document.getElementById(memory_tile_ids[0]);
        var tile_2 = document.getElementById(memory_tile_ids[1]);
        tile_1.style.background = 'url("tile_bg.jpg") no-repeat';
        tile_1.innerHTML = "";
        tile_2.style.background = 'url("tile_bg.jpg") no-repeat';
        tile_2.innerHTML = "";
        // Clear both arrays when no match//
        memory_values = [];
        memory_tile_ids = [];
    }

    //Timer stop function - called from Countdown function//
    function myStopFunction(){
      clearInterval(timer);
      //Alert message for replay//
      if(confirm("Time's up! Please refresh screen to start new game")){
      window.location.reload();
      }
    }

    //Countdown function - called when Onclick for start button//
    function countdown(){
      if (timeLeft == 0){
        document.getElementById('memory_board').innerHTML = "";
        //elem.innerHTML = 0 + ' seconds left';
        myStopFunction();
        elem.innerHTML = "";
        }
        else {
        timeLeft--;
        document.getElementById('start').innerHTML = "";
        elem.innerHTML = timeLeft + ' seconds left';
        }
    }

    //Onclick function to start game//
    //Populates grid and starts timer//
    document.getElementById('start').onclick = function(){
      newBoard();
      timer = setInterval(countdown, 500);
    }

} //End of windows.onload curly brace//
