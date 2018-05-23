var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//variables coordinates
var x = canvas.width/2;
var y = canvas.height-30;
//velocities
var dx = 2;
var dy= -2;
      //ball radius
var ballRadius = 10;
//PADDLE TO HIT THE BALL
var paddleHeight = 10;
var paddleWidth = 75;  
var paddleX = (canvas.width-paddleWidth)/2; //starting point on x axis
// for user control
var right = false;
var left = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = new Array();
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, mode: 1 }; // default coordinate
    }
}
//SCORE
var score = 0;
var lives = 3;
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+ score, 8, 20);
}

  function keyDownHandler(e){
    if(e.keyCode == 39)right = true;
    else if(e.keyCode == 37)left = true;
  }
  function keyUpHandler(e){
    if(e.keyCode == 39) right = false;
    else if(e.keyCode == 37) left = false;
  }
  function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }
  function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  
  function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].mode == 1){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
    }
  function draw(){
    //draw the ball
    //clear the old position 
    // take in input top right and bottom left
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the new one
    drawScore();
    drawLives();
    drawBricks(); // draw the target
    drawBall(); // draw the ball on the screen 
    collide(); //check if collision happenes
    drawPaddle(); //draw the paddle on screen 
    bounce(); // check if ball bounce
    movePaddle(); // user move paddle
    x+= dx;
    y += dy;
  }
  function bounce(){
    if(y+dy < ballRadius) dy = -dy; // need to substract ballRadius because otherwise it will enter the wall
    if(x + dx < ballRadius|| x + dx > canvas.width-ballRadius) dx = -dx; // x is the center of the ball , need to account for the radius
    else if (y+dy > canvas.height-ballRadius-paddleHeight){
        if(x >= paddleX && x <= (paddleX + paddleWidth)) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                reset("Game Over no more lives! your score:" + score);
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                paddleX = (canvas.width-paddleWidth)/2;
                alert("number of lives left: "+lives);
            }

        }
    }
  }
  function movePaddle(){
    if(right && paddleX  < canvas.width-paddleWidth) paddleX +=7;
    else if(left && (paddleX > 0)) paddleX -=7;
  }
  function collide(){
      for(var c = 0 ; c < brickColumnCount; c++){
          for(var r=0; r < brickRowCount; r++){
              var b = bricks[c][r];
              //check if collision happens
              if(b.mode ==1){
                  if (x >= b.x && x <= b.x + brickWidth && y >= b.y && y <= b.y+brickHeight){
                      dy = -dy;
                      b.mode =0;
                      score++;
                      if(score == (brickColumnCount*brickRowCount)){
                          reset("YOU WON");
                      }
                  }
              }
          }
      }
  }
  function reset(message){
      alert(message);
      document.location.reload(false);
  }
  setInterval(draw,10); //draw method executed within setInterval every 10 ms