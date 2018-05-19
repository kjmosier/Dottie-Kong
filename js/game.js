var myGamePiece;
var deck = [];
var jumpSound;
var hitSound;
var barrel = [];
var barrelSide = true;

function startGame() {
  jumpSound = new sound("sounds/jump.mp3");
  hitSound = new sound("sounds/hit.wav");
  jumpOnTopSound = new sound("sounds/jumpOnTop.wav");

  myGamePiece = new component(30, 30, "red", 5, 300, "dot");
  kong = new component (30,50, "brown", 260, 35);
  barrel[0] = new component (25, 25, "brown", 270, 35, "barrel");


  deck[0] = new platform(200, 15, "green", 150, 85);
  deck[1] = new platform(300, 15, "green", 0, 145);
  deck[2] = new platform(300, 15, "green", 240, 200);
  deck[3] = new platform(300, 15, "green", 0, 250);
  deck[4] = new platform(300, 15, "green", 240, 310);

  deck[5] = new platform(5, 350, "blue", 0, 0);
  deck[6] = new platform(5, 350, "blue", 535, 0);
  deck[7] = new platform(540, 5, "blue", 0, 0);
  deck[8] = new platform(540, 5, "blue", 0, 345);

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
        this.frameNo = 0;
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

// ----------------------  UPDATE GAME AREA ------------

function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[32]) {
       if (myGamePiece.gravitySpeed == 0){
         myGamePiece.gravitySpeed = -4;
         jumpSound.play();
       }
     }
    kong.update();
    myGamePiece.newPos();

    for (var i in barrel){
      barrel[i].newPos();
    }

    myGamePiece.update();

    for (var i in barrel){
       barrel[i].update();
    }

    for (i = 0; i < deck.length; i += 1){
      deck[i].update();
    }
    //------------------  Throw Barrel ---------------
    if (everyinterval(400)){
       barrel.push(new component (25, 25, "brown", 260, 35, "barrel"));
     }

}
    function everyinterval(n) {
      if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
      return false;
}
