window.onload =function(){


/*Function for shuffling (Reference:Fisher-Yates Algorithm)*/
var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
        //uses j(random index identifier) to replace current position [i] of while loop//
    }
}


//Function for creating a fresh playing board//
function freshBoard(){
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" memory_array[i]></div>';
	}
	document.getElementById('game-board').innerHTML = output;
}

//Function for flipping tiles//


//End brace for memoryFlipTile function//

freshBoard();

}//End brace for doc ready
