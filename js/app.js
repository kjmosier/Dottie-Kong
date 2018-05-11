var myGamePiece;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 120);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[2]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }
    myGamePiece.newPos();
    myGamePiece.update();
}



/*
var dot;

function startGame() {
  dot = new component(30,30,"red", 10, 120);
  gameArena.start();
}

var gameArena = {
  arena : document.createElement("canvas"),
  start : function() {
    this.arena.width = 480;
    this.arena.height = 270;
    this.arena.setAttribute("id", "arena1")
    this.context = this.arena.getContext("2d");
    document.body.insertBefore(this.arena, document.body.childNodes[2]);
    this.interval = setInterval(updateGameArena, 20);
  },
  clear : function() {
    this.context.clearRect(0,0, this.arena.width, this.arena.height);
  }
}

function component(width, height, color, x, y){
  this.width=width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = gameArena.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

function updateGameArena(){
  gameArena.clear();
  dot.newPos();
  dot.update();
}


funtion moveup(){
  dot.speedY -= 1;
}

funtion movedown(){
  dot.speedY += 1;
}

funtion moveleft(){
  dot.speedX -= 1;
}

funtion moveright(){
  dot.speedX += 1;
}
*/
