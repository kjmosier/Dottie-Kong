

var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "red", 80, 75);
    myGameArea.start();
}


//   ------------  Arena  -------------------
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
          myGameArea.keys = (myGameArea.keys || []);
          myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
          myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
      },

     stop : function() {
        clearInterval(this.interval);
     },

     clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
     },
}


// --------------     Game Piece --------------
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.1;
    this.gravitySpeed = 0;
    this.bounce = 0;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }
}

function updateGameArea() {
    myGameArea.clear();

    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[32]) {
      if (myGamePiece.gravitySpeed == 0){myGamePiece.gravitySpeed = -5;}
    }
    myGamePiece.newPos();
    myGamePiece.update();
}
















/*




//break

var dot;

function startGame() {
    myGameArea.start();
    dot = new component(15, 30, "red", 10, 120);
}


//Arena
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 530;
        this.canvas.height = 310;
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


    stop : function() {
      clearInterval(this.interval);
    },


    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}



//Moving Game Piece
function component(width, height, color, x, y, type) {
    this.type = type;
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.jumpTime = 0;


    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }


    this.newPos = function() {
        if (this.jumpTime == 0){
          this.gravitySpeed += this.gravity;
        } else {
            this.jumpTime--;
            if (this.jumpTime == 0){this.gravity = 0.05;}
          }
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }


    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
    this.jump = function(){
      dot.gravity = -3.0;
      dot.jumpTime = 2000;
    }
}

function updateGameArea() {
    myGameArea.clear();
    dot.speedX = 0;
    dot.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {dot.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {dot.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[32]) {
      alert('spacebar');
//       dot.jump();
    }
    dot.newPos();
    dot.update();
}

*/
