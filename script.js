window.onload = function () {
    //Global variables for tile randomizer and flipping//
    var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];
    var memory_values = [];
    var memory_tile_ids = [];
    var tiles_flipped = 0;
    var match = false;
    var doubleflip = false; //controls ouput of message for player turns//

    //Global variables for countdown timer//
    var timeLeft = 30;
    var elem = document.getElementById('timer');
    var timer;
    //var clock= new Audio()

    //Global variables for score tracking//
    var p1 = 0;
    var p2 = 0;
    var counter = 1;



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
                    if(doubleflip){
                      scoring();
                      doubleflip=false
                    }
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
                    match = true;
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
                  doubleflip = true;
                }
                else {
                    setTimeout(flip2Back, 700);
                    match = false;
                    doubleflip =  true;
                }
            }
        }
    }//end of fliptile function

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

    //Countdown function - called when "onclick" for start button//
    function countdown(){
      if (timeLeft == 0){
        if (p1>p2){
          alert("Player 1 wins!");
        }else if (p2>p1){
          alert("Player 2 wins!");
        }else{
          alert("It's a tie!");
        }
        document.getElementById('memory_board').innerHTML = ""; //clears the grid//
        myStopFunction();
        elem.innerHTML = "";//elem.innerHTML = 0 + ' seconds left';
        }
        else {
        timeLeft--;
        document.getElementById('start').innerHTML = "";
        elem.innerHTML = timeLeft + ' seconds left';
      }
    }

    //score tracking function//
    function scoring(){

      if(counter %2 !== 0 && match == true){ //As counter starts globally at 1, modulus will not give zero, hence Player 1 starts//
        p1++;
        counter++;
        document.getElementById('score1').innerHTML = p1;
        document.getElementById('message').innerHTML = "Player 2 turn";
        document.getElementById('message').style.color = "red";
      }else if(counter %2 !== 0 && match == false){
        document.getElementById('message').innerHTML = "Player 2 turn";
        document.getElementById('message').style.color = "red";
        counter++;
      }else if(counter %2 === 0 && match == true){
        p2++;
        counter++;
        document.getElementById('score2').innerHTML = p2;
        document.getElementById('message').innerHTML = "Player 1 turn";
        document.getElementById('message').style.color = "blue";
      }else {
        document.getElementById('message').innerHTML = "Player 1 turn";
        document.getElementById('message').style.color = "blue";
        counter++;
      }

    }

    //Onclick function to start game - populates grid and starts counter//
    document.getElementById('start').onclick = function(){
      newBoard();
      timer = setInterval(countdown, 1000);
      //displays "Player 1 turn" at start of game//
      document.getElementById('message').innerHTML = "Player 1 turn";
      document.getElementById('message').style.color = "blue";
    }

} //End of windows.onload curly brace//
