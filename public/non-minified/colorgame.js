var number_of_color = 6;
var colors = genRandomColors(number_of_color);
var squares = document.getElementsByClassName("square");
//var pickedColor = randomColor();
var pickedColor = randomColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1Display = document.getElementById("header");
var modeButtons = document.getElementsByClassName("mode");
var type = document.getElementById("type");
type.addEventListener("change", function (){
	if(type.checked){
		for(var i =0 ; i < squares.length; i++){
			squares[i].style.borderRadius = "50%";
			document.getElementById("Mode").textContent = "Circles";
		}
		
	}
	else {
		for(var i =0 ; i < squares.length; i++){
			squares[i].style.borderRadius = "15%";
			document.getElementById("Mode").textContent = "Squares";
		}
	}
})

init();
function init(){
	setupModeButtons();
	setupSquares();
	reset();
}
function setupModeButtons(){
	for (var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function (){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "Easy")
			  number_of_color = 3;
			if (this.textContent === "Hard")
			  number_of_color = 6;
			if (this.textContent === "XHard")
			  number_of_color = 12;
			reset();
		});
	}
}


function setupSquares(){
	for(var i = 0; i < squares.length; i++){
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				document.getElementById("reset").textContent = "Play Again?"
				changeColors(clickedColor);
				document.querySelector("h1").style.background = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}

function reset(){
	colors = genRandomColors(number_of_color);
	pickedColor = randomColor();
	colorDisplay.textContent = pickedColor;
	document.getElementById("reset").textContent = "New Colors";
	messageDisplay.textContent = "";
	for(var i = 0 ; i < squares.length; i++){
		if (colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
	h1Display.style.backgroundColor = "steelblue";
}
document.getElementById("reset").addEventListener("click", function (){
	reset();

});
function changeColors(color){
	for(var i =0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}
function randomColor(){
	var rNum  = parseInt(Math.random()*colors.length);
	return colors[rNum];
}
function genRandomColors(num){

	var arr = new Array();
	for (var i = 0 ; i < num; i++ ){
		var rNum1 = parseInt(Math.random()*256);
		var rNum2 = parseInt(Math.random()*256);
		var rNum3 = parseInt(Math.random()*256);
		arr.push("rgb("+rNum1+", "+rNum2+", "+rNum3+")");
	}
	return arr;

}