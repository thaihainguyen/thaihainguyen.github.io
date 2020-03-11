
var myModule = (function(){
	timer = null;
	return{
		// stores ID of interval timer 
		delayMsg2:function() {
			if (timer === null) {
				timer = setInterval(rudy, 1000); 
			} else { 
				clearInterval(timer); timer = null; 
			} 
		}
	}
}
)();

function rudy() { 
// called each time the timer goes off 
 document.getElementById("output").value += " Rudy!"; 
}

