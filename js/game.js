var myGamePiece;
var myScore = 0;
var deck = [];
var jumpSound;
var hitSound;
var barrel = [];
var barrelSide = true;
var brokenBarrels = [];
var lives = 1;
var paused = true;

function startGame() {
  showScore = new component("15px", "Consolas", "black", 420, 25, "text");
  startRect = {x: 190, y: 110, w: 140, h:70};
  loadSounds();
  loadLandscape();
  resetGamePiece();
  kong = new component (30,50, "brown", 260, 35);
  pushBarrel();
  myGameArea.start();
}


//   ------------  Arena  -------------------
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 540;
        this.canvas.height = 350;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 1;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
          myGameArea.keys = (myGameArea.keys || []);
          myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
          myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        this.canvas.addEventListener('click', checkStart, false);
      },
     stop : function() {
        clearInterval(this.interval);
     },

     clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
     },
}

// ----------------------  UPDATE GAME AREA ------------

function updateGameArea() {
    if (!paused){
      myGameArea.frameNo += 1;
      for (var i in barrel){barrel[i].newPos();}
      getPlayerInput(myGamePiece);
      myGamePiece.newPos();
    }

    myGameArea.clear();
    showScore.text = "SCORE: " + myScore;
    showScore.update();
    printLives();
    kong.update();
    myGamePiece.update();
    for (var i in barrel){barrel[i].update();}
    for (var i in deck){deck[i].update();}
    for (var i in brokenBarrels){brokenBarrels[i].update();}
    //------------------  Throw Barrel ---------------
    if (everyinterval(300)){pushBarrel()}

    if(paused){
      lives == -1 ? displayGameOver() : showStartButton();
    }
 }

 // ------     End Update GAME AREA  ---------



 // ---------     Game Update Helpers  --------
function everyinterval(n) {
      if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
      return false;
}

function getPlayerInput(gamePiece){
  gamePiece.speedX = 0;
  gamePiece.speedY = 0;
  if (myGameArea.keys && myGameArea.keys[37]) {gamePiece.speedX = -1; }
  if (myGameArea.keys && myGameArea.keys[39]) {gamePiece.speedX = 1; }
  if (myGameArea.keys && myGameArea.keys[32]) {
     if (gamePiece.gravitySpeed == 0){
       gamePiece.gravitySpeed = -4;
       jumpSound.play();
     }
   }
}

function printLives(){
  var x = 10;
  var i = 0;
  ctx = myGameArea.context;
  while (i < lives){
    ctx.fillStyle = "red";
    ctx.fillRect(x, 10, 10, 10);
    i++;
    x += 20;
  }
}

function showStartButton(){
  ctx = myGameArea.context;
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = "white";
  ctx.fillRect(startRect.x, startRect.y, startRect.w, startRect.h);
  ctx.globalAlpha = 1.0;
  ctx.font = "60px Arial";
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "green";
  ctx.fillText("Play", startRect.x + 10, startRect.y + 55);;
  ctx.strokeText("Play", startRect.x + 10, startRect.y + 55);
}

function checkStart(e) {
    var p = getMousePos(e);
    if (p.x >= startRect.x && p.x <= startRect.x + startRect.w &&
        p.y >= startRect.y && p.y <= startRect.y + startRect.h) {
          if (paused && lives >=0 ){paused = !paused};
          if (paused && lives < 0 ){restartGame()};
     }
}

function getMousePos(e) {
    var r = myGameArea.canvas.getBoundingClientRect();
    return {
        x: e.clientX - r.left,
        y: e.clientY - r.top
    };
}

//---------            Player Hit  --------------

function playerDown (player){
  lives -= 1;
  if(lives == -1){
    paused = true;
  }
  else{
    wait(1500);
    paused = true;
    barrel = [];
    pushBarrel();
    resetGamePiece();
  }
}

function restartGame(){
  resetGamePiece();
  barrel = [];
  pushBarrel();
  lives = 3;
  myScore = 0;
}

function displayGameOver(){
  ctx = myGameArea.context;
  ctx.font = "60px Arial";
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "green";
  ctx.fillText("Game Over", 100, 160);
  ctx.strokeText("Game Over", 100, 160);
}

function wait(ms){
  var d = new Date();
  var d2 = null;
  do { d2 = new Date(); }
  while(d2-d < ms);
}

function pushBarrel(){barrel.push(new component (25, 25, "brown", 260, 35, "barrel"));}

function resetGamePiece(){  myGamePiece = new component(30, 30, "red", 5, 300, "dot");}
