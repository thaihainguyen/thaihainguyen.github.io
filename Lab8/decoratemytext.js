window.onload = init;

function init(){
	//alert("init");
	let btnDeco = document.getElementById("deco");
	btnDeco.onclick = delayIncFontSize;//deco;
	
	let chkBox = document.getElementById("bling");
	chkBox.onchange = bling;
	
	let btnPigLatin = document.getElementById("piglatin");
	btnPigLatin.onclick = actionPigLatin;
	
	let btnMalkovich = document.getElementById("malkovich");
	btnMalkovich.onclick = actionMalkovich;
}

function deco(){
//	alert("Hello, world!");
	let css_class = document.getElementById("ta");
	//let curFontSize = css_class.style.font-size;
	let curFontSize = document.getElementById("ta").style.fontSize;
//	alert(curFontSize);
	/*let curFontSize = document.getElementById("ta").style.fontSize;*/
	/*let a = window.getComputedStyle(document.getElementById("ta")).fontSize;*/
	document.getElementById("ta").style.fontSize = (parseInt(curFontSize) + 2) + 'pt';
}

function delayIncFontSizeByTimeout(){
	setTimeout(deco, 500);
}

var timer = null;
function delayIncFontSize(){
	if(timer == null){
		timer = setInterval(deco, 500);
	}
	else{
		clearInterval(timer);
		timer = null;
	}
}

function bling(){
		alert("Clicked on the checkbox");
		
		if(document.getElementById("bling").checked){
			/*$("ta").attr("style.fontWeight") = 'bold';*/
			document.getElementById("ta").style.fontWeight = 'bold';
			document.getElementById("ta").style.fontColor = 'green';
			document.getElementById("ta").style.textDecoration = 'underline';
			document.getElementById("bd").style.backgroundImage = 'http://www.cs.washington.edu/education/courses/190m/CurrentQtr/labs/6/hundred-dollar-bill.jpg';
		}
		else{
			document.getElementById("ta").style.fontWeight = 'normal';
		}
}

function actionPigLatin(){
	let textBtn = document.getElementById("ta").value;
	//Vowels: A, E, I, O, U 
	//Consonant: remaining letters
	
	let pigLatin = "";
	for(let i = 0; i<textBtn.length; i++){
		let c = textBtn.charAt(i);
		if(c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U' || 
            c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'){
			
			pigLatin = textBtn.substring(i, textBtn.length);
			pigLatin += textBtn.substring(0, i) + "ay";
			break;
		}
	}
	document.getElementById("ta").value = pigLatin;
}

function actionMalkovich(){
	let textBtn = document.getElementById("ta").value;
	
	if(textBtn.length >= 5){
		textBtn = document.getElementById("ta").value = "Malkovich";
	}
}