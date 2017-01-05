//use jquery to check if the document is ready. if its ready using the function display an alert
$(document).ready(function(){
//Define vars

var canvas = $("#myCanvas")[0];
//var canvas = document.getElementById('#myCanvas');
var ctx = canvas.getContext('2d');
var w= $("#myCanvas").width();
var h=$("#myCanvas").height();
var cw=15;
var d="right";
var food;
var score;
var speed=130;
var color = "green";
//Snake array
var snakeArray;
//Initialize function

function init(){
	createSnake();
	createFood();
	score=0;
	d="right";

	if (typeof gameLoop != "undefined") clearInterval(gameLoop);
	gameLoop = setInterval(paint,speed); //calls paint at regular intervals - tat is assigned in speed


}

init();// Run Initializer
//Create Snake
function createSnake(){
var length = 5;
snakeArray =[];

for (var i = length-1; i >= 0; i--) //
{
	snakeArray.push({x:i,y:0}); //creates the snake at the top of the canvas at the 5th postion  and decrements it
}//for loop ends
}//createSnake ends

function createFood(){
food = {
	x:Math.round(Math.random()*(w-cw)/cw), y:Math.round(Math.random()*(h-cw)/cw)

};

}//createFood ends

function paint(){
//Paint Canvas
ctx.fillStyle="black";
ctx.fillRect(0,0,w,h);
ctx.strokeStyle ="White";
ctx.strokeRect(0,0,w,h);

//logic for movement - when snake hits the food, its going to pop out the tail cell and place it in front of the head cell
//variables for the current position of the snake
var nx = snakeArray[0].x;
var ny = snakeArray[0].y;

if (d=='right') nx++;
else if(d=='left') nx--;
else if(d=='up') ny--;
else if(d=='down') ny++;

//Collide to wall or itself
if(nx == -1 || nx == w/cw || ny== -1 || ny==h/cw || checkCollision(nx,ny,snakeArray)){

	//init();
	//Insert Final Score
	$('#finalScore').html(score);
	//Show Overlay
	$('#Overlay').fadeIn(300);
	return;
} //collision ends

//logic for snake to eat food - when it eats the food new head postion matches with the food and food becomes the head
if(nx == food.x && ny == food.y){
	var tail = {x:nx, y:ny};
	score++;
	//Create Food
	createFood();

} else {
	var tail = snakeArray.pop();
	tail.x =nx; 
	tail.y = ny;

}
snakeArray.unshift(tail);//makes tail first cell

for(var i=0; i<snakeArray.length; i++){
	var c = snakeArray[i];
	paintCell(c.x,c.y);
}
paintCell(food.x, food.y);//snake can eat the food and snake will grow when it eats the food

//check score
checkScore(score);

//Display Current Score
$("#score").html('Your Score: ' +score);

} //paint ends

function paintCell(x,y){
	ctx.fillStyle=color;
	ctx.fillRect(x*cw, y*cw, cw,cw);
	ctx.strokeStyle="white";
	ctx.strokeRect(x*cw, y*cw, cw,cw);
}

function checkCollision(x,y,array){
for (var i = 0; i < array.length; i++) {
	if (array[i].x == x && array[i].y == y) return true;
	}
	return false;
};

function checkScore(score){
		if(localStorage.getItem('highscore') === null){
			//If there is no high score
			localStorage.setItem('highscore',score);
		} else {
			//If there is a high score
			if(score > localStorage.getItem('highscore')){
				localStorage.setItem('highscore',score);
			}
			$('#highScore').html('High Score: '+localStorage.highscore);
		}
		};
//KeyBoard Controller
$(document).keydown(function(e){

	var key = e.which; //indicates which key is pressed
	if(key == "37" && d !="right") d="left";
	 else if(key == "38" && d !="down") d="up";
	 else if(key == "39" && d !="left") d="right";
	 else if(key == "40" && d !="up") d="down";

});


});// document ends
function resetScore(){
	localStorage.highscore = 0;
	//Disply high score

	highscorediv= document.getElementById('highScore');
	highscorediv.innerHTML ='High Score: 0';
}