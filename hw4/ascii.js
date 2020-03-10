var separatedString = "=====\n";
var frameOrder = 0;
var timer = null;
var curText = "";
var speed = 250;

window.onload = function(){
 //document.getElementById("animation").onchange = startAnimation;
 document.getElementById("start").onclick = startAnimation;
 document.getElementById("stop").onclick = stopAnimation;
 document.getElementById("stop").disabled = true;
 document.getElementById("size").onchange = changeSize;
 document.getElementById("speed").onchange = changeSpeed;
};

function startAnimation(){

 var animationType = document.getElementById("animation").value;
 var anms = ANIMATIONS[animationType];
 var listFrames = anms.split(separatedString);

 //backup text on the textarea
 curText = document.getElementById("mytextarea").value;

 //Enable the stop button
 document.getElementById("stop").disabled = false;
 document.getElementById("start").disabled = true;
 document.getElementById("animation").disabled = true;
 //start from the first frame
 frameOrder = 0;

 timer = setTimeout(changeAnimation, speed, listFrames);
}

function stopAnimation(){
 clearInterval(timer);

 document.getElementById("mytextarea").value = curText;
 document.getElementById("stop").disabled = true;
 document.getElementById("start").disabled = false;
 document.getElementById("animation").disabled = false;
}

function changeAnimation(listFrames){

 if(listFrames.length > 0){
  frameOrder++;

  if(frameOrder <= listFrames.length){
   document.getElementById("mytextarea").value = listFrames[frameOrder - 1];
  }
  else{
   frameOrder = 1;
   document.getElementById("mytextarea").value = listFrames[frameOrder - 1];
  }
 }

 timer = setTimeout(changeAnimation, speed, listFrames);
}

function changeSize(){

 var curSize = document.getElementById("size").value;
 //Tiny (7pt), Small (10pt), Medium (12pt),
 //Large (16pt), Extra Large (24pt), XXL (32pt)
 if(curSize == "Tiny"){ curSize = 7;}
 else if(curSize == "Small"){ curSize = 10;}
 else if(curSize == "Medium"){ curSize = 12;}
 else if(curSize == "Large"){ curSize = 16;}
 else if(curSize == "Extra Large"){ curSize = 24;}
 else if(curSize == "XXL"){ curSize = 32;}
 else{ curSize = 12;}

 document.getElementById("mytextarea").style.fontSize = curSize + "pt";
}

function changeSpeed(){
 var curSpeed = document.getElementById("speed").checked;
 if(curSpeed == true){
  speed = 50;
 }
 else{
  speed = 250;
 }
}
