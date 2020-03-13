$(document).ready(function() {
	let touchWall = 0;
	let start = 0;
	
	var wallMouseOver = function(){
		$(".boundary").addClass("youlose");
		touchWall = 1;
	//	alert("You lose");
		$("#status").text("You lose!:[");
	}
	
	var startGame = function(){
		start = 1;
		touchWall = 0;
	}
	
	var endGame = function(){
		if(start == 1 && touchWall == 0){
			//alert("You win");
			$("#status").text("You win!:]");
		}
	}
	
	var resetGame = function(){
		$("#status").text("Click the \"S\" to begin.");
		$(".boundary").removeClass("youlose");
		touchWall = 0;
		start = 1;
	}
	
	$(".boundary").mouseover(wallMouseOver);
	$("#maze").mouseleave(wallMouseOver);
	
	$("#start").mouseover(startGame);
	
	$("#end").mouseover(endGame);
	
	$("#start").click(resetGame);
	
}
);
