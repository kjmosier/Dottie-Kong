

var myGamePiece;
var deck = [];

function startGame() {
    myGamePiece = new component(30, 30, "red", 0, 0);
    deck[0] = new platform(300, 15, "blue", 40, 180);
    deck[1] = new platform(250, 15, "blue", 80, 80);
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


// --------------    platform --------------

function platform(width, height, color, x, y){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function() {
      ctx = myGameArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
  }
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
        for (i = 0; i < deck.length; i += 1){
          this.againstWall(deck[i]);
        }
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }

    //  -----  stop at Walls ---------

    this.againstWall = function(otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);

            var didHit = false;

            // Hit Top ... If Under Other Object
            if ((mytop < otherbottom) && (mybottom > otherbottom) && (myleft < otherright) && (myright > otherleft)){
              this.y = otherbottom;
              this.gravitySpeed = 1;
              this.gravity = 0.1;
              didHit = true;
            }
            //Hit Bottom ... If Above Other Object
            if ((mybottom > othertop) && (mytop < othertop) &&(myleft < otherright) && (myright > otherleft)&& !didHit){
              this.y = othertop - this.height;
              this.gravitySpeed = 0;
              didHit = true;
            }

            //  Hit Right
            if ((((mytop > othertop) && (mytop < otherbottom))
                   || ((mybottom >= othertop) && (mybottom <= otherbottom))) && (myright > otherleft) && (myleft < otherleft) && !didHit ){
                this.x = otherleft - this.width;
                this.gravitySpeed = 1;
                this.gravity = 0.1;
                didHit = true;
            }
            //  Hit Left
            if ((((mytop > othertop) && (mytop < otherbottom))
                   || ((mybottom >= othertop) && (mybottom <= otherbottom))) && (myleft < otherright) && (myright > otherright) && !didHit){
                this.x = otherright;
                this.gravitySpeed = 1;
                this.gravity = 0.1;
                didHit = true;
            }

     }
}

// ----------------------  UPDATE FRAME ------------

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
    for (i = 0; i < deck.length; i += 1){
      deck[i].update();
    }
}
