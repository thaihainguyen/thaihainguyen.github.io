"use strict";
 
const PIECE_WIDTH = 100;
const PIECE_HEIGHT = 100;
var rows_cols = 4;
var emptyPiece_row = 3;//the first row is 0
var emptyPiece_col = 3;//the first column is 0
var emptyPiece_col = 3;//the first column is 0
const SHUFFLE_NUM = 1000; 

$(document).ready(function() {
	$("#puzzlearea div").addClass("puzzlepiece");
	
	let topPos = getCurTopPos("#puzzlearea")-150; //If not minus 200, the topPos is incorrect
	let height = getCurHeight();
	let leftPos = getCurLeftPos("#puzzlearea");
	let width = getCurWidth();
	
	let pieces = $("#puzzlearea").children().each(function(index, piece){
		//alert($(this).text());
	
		//calculate position of each piece
		let row = Math.floor(index / 4);
		let topPiecePos = topPos + row*PIECE_HEIGHT;
		let col = index % 4;
		let leftPiecePos = leftPos + col*PIECE_WIDTH;
		
		$(piece).css({"top":topPiecePos, "left":leftPiecePos});
		
		//set 'id' for each aquare by format "square_row_col"
		let piece_id = createPieceID(row, col);
		$(piece).attr("id", piece_id); // or using $(piece).prop('id', piece_id); 
		
		//calculate position of background image compared with position of each piece
		let pieceTopPos = getCurTopPos(".puzzlepiece");
		let pieceLeftPos = getCurLeftPos(".puzzlepiece");
		let imgTop = pieceTopPos - row*PIECE_HEIGHT;
		let imgLeft = pieceLeftPos - col*PIECE_WIDTH;
		$(piece).css("background-position-y", imgTop);
		$(piece).css("background-position-x", imgLeft);
		
	});
	
	//adding the action Shuffle
	$("#shufflebutton").click(shufflePieces);
	//adding the action Move to each piece
	$(".puzzlepiece").click(move);
	//adding the action hover to each piece
    $(".puzzlepiece").hover(mouseIn, mouseOut);
}
);

function mouseIn(){
	let id = $(this).attr("id");
	let rc = id.split("_");
	let row = parseInt(rc[1]);
	let col = parseInt(rc[2]);
	//if the piece is a neigbor of the empty piece, it will be highlighted
	if(movablePiece(row, col) == 1){
		//$(this).css({"color":"red", "border-color":"red"});
		$(this).addClass("movablepiece");
	}
}

function mouseOut(){
	let id = $(this).attr("id");
	let rc = id.split("_");
	let row = parseInt(rc[1]);
	let col = parseInt(rc[2]);
	
	//if the piece is a neigbor of the empty piece, the highlight attributes will be removed
	if(movablePiece(row, col) == 1){
		//$(this).css({"color":"black", "border-color":"black"});
		$(this).removeClass("movablepiece");
	}
}


//The shuffle algorithm is as following:
//1. Radomize a number of moving times, <n>, between 1 and 1000
//2. Loop <n> times:
//	a. if loop i of <n> is even number, moving the neigbor piece of the empty piece by row
//	b. if loop i of <n> is odd number, moving the neigbor piece of the empty piece by column
//Note: When starting the shuffle, the moving is backward and keep going to until the neighbor piece is the 1st row or 1st column,
// the moving will change to indirection
function shufflePieces(){
//	alert("shuffle");
	let numOfMoves = parseInt(Math.random() * SHUFFLE_NUM);
	let movedPieceRow, movedPieceCol; 
	let movedPieceID;
	let backward = 1;
//	alert("Number of moving: " + numOfMoves);
	for(let i=0; i<numOfMoves; i++){
		if(i % 2 == 0){ //even --> move by row
			movedPieceRow = neighborRowCol(emptyPiece_row, backward);
			if((backward == 1) && (movedPieceRow > emptyPiece_row)){
				backward = 0;
			}
			//movedPieceRow = emptyPiece_row - 1;
			movedPieceCol = emptyPiece_col;
		}
		else{//odd --> move by column
			movedPieceRow = emptyPiece_row;
			movedPieceCol = neighborRowCol(emptyPiece_col, backward);
			if((backward == 1) && (movedPieceCol > emptyPiece_col)){
				backward = 0;
			}
		}
		
		movedPieceID = "#" + createPieceID(movedPieceRow, movedPieceCol);
		movePiece($(movedPieceID), movedPieceRow, movedPieceCol);
	}
}

function neighborRowCol(rowcol, backward){
	let neighbor;
	if((backward == 1)){
		if((rowcol - 1) >= 0){
			neighbor = rowcol - 1;
		}
		else{
			neighbor = rowcol + 1;
		}
	}
	else{
		if((rowcol + 1) < rows_cols){
			neighbor = rowcol + 1;
		}
		else{
			neighbor = rowcol - 1;
		}
	}
	
	return neighbor;
}

function move(){
	let id = $(this).attr("id");
	let rc = id.split("_");
	let row = parseInt(rc[1]);
	let col = parseInt(rc[2]);
	
	if(movablePiece(row, col) == 1){
		movePiece(this, row, col);
	}
}

function movablePiece(row, col){
	if((((row+1) == emptyPiece_row) || (((row-1) == emptyPiece_row))) && (col == emptyPiece_col)){
		return 1;
	}
	else{
		if((((col+1) == emptyPiece_col) || (((col-1) == emptyPiece_col))) && (row == emptyPiece_row)){
			return 1;
		}
	}
	return 0;
}

function movePiece(piece, row, col){

	if((row == emptyPiece_row || col == emptyPiece_col)){//checking the moved piece must have the same row OR the same column of the empty piece
		if(((row+1)<rows_cols) && ((row+1) == emptyPiece_row)){ //able to move down to the emply piece at the next row

			//update new position for the moved piece
			let x_cor = parseInt($(piece).css("top")) + PIECE_HEIGHT;
			$(piece).css({"top": x_cor});
			//update new ID for the moved piece
			$(piece).attr("id", createPieceID(emptyPiece_row, emptyPiece_col));
			//the empty piece will move up to the upper position of the piece which will be moved down
			emptyPiece_row--;
		}
		else if(((row-1)>=0) && ((row-1) == emptyPiece_row)){//able to move up to the emply piece at the previous row
			
			//update new position for the moved piece
			let x_cor = parseInt($(piece).css("top")) - PIECE_HEIGHT;
			$(piece).css("top", x_cor);
			//update new ID for the moved piece
			$(piece).attr("id", createPieceID(emptyPiece_row, emptyPiece_col));
			//swap position with the moved element
			emptyPiece_row++;
		}
		else if(((col+1)<rows_cols) && ((col+1) == emptyPiece_col)){//able to move right to the emply piece by the next column
			
			//update new position for the moved piece
			let y_cor = parseInt($(piece).css("left")) + PIECE_WIDTH;
			$(piece).css("left", y_cor);
			//update new ID for the moved piece
			$(piece).attr("id", createPieceID(emptyPiece_row, emptyPiece_col));
			//swap position with the moved element
			emptyPiece_col--;
		}
		else if(((col-1)>=0) && ((col-1) == emptyPiece_col)){//able to move left to the emply piece by the previous column
			
			//update new position for the moved piece
			let y_cor = parseInt($(piece).css("left")) - PIECE_WIDTH;
			$(piece).css("left", y_cor);
			//update new ID for the moved piece
			$(piece).attr("id", createPieceID(emptyPiece_row, emptyPiece_col));
			//swap position with the moved element
			emptyPiece_col++;
		}
	}
}

function createPieceID(row, col){
	return "square_" + row + "_" + col;
}

function getCurTopPos(ele){
	//var testDiv = document.getElementById("puzzlearea");
	//alert(testDiv.offsetTop);
	let pos = $(ele).position();
	//alert(pos.top);
	return pos.top;
}

function getCurHeight(){
	var testDiv = document.getElementById("puzzlearea");
	return (testDiv.offsetHeight);
}

function getCurLeftPos(ele){
	//var testDiv = document.getElementById("puzzlearea");
	//return (testDiv.offsetLeft);
	return $(ele).position().left;
}

function getCurWidth(){
	var testDiv = document.getElementById("puzzlearea");
	return (testDiv.offsetWidth);
}
