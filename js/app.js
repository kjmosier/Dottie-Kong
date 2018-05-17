

var myGamePiece;
var deck = [];
var jumpSound;
var hitSound;
var barrel = [];
var barrelCount = 0;
var barrelSide = true;
//var barrelNumber = 0;

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
//  -----------------   Barrels  ---------------



// --------------     Game Piece --------------
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.1;
    this.gravitySpeed = 0;
    this.bounce = 0;
    if (this.type == "barrel"){
      barrelSide ? this.speedX = 1 : this.speedX = -1;
      barrelSide = !barrelSide;
    }
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.prevX = this.x;
        this.prevY = this.y;
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        for (i = 0; i < deck.length; i += 1){
          this.collision(deck[i]);
        }
        for (i = 0; i < barrel.length; i += 1){
          this.collision(barrel[i]);
        }
    }


    this.collisionFrom = function(obj){
      var player_bottom = this.y + this.height;
      var obj_bottom = obj.y + obj.height;
      var player_right = this.x + this.width;
      var obj_right = obj.x + obj.width;

      var b_collision = obj_bottom - this.y;
      var t_collision = player_bottom - obj.y;
      var l_collision = player_right - obj.x;
      var r_collision = obj_right - this.x;
      if ((t_collision < b_collision) && (t_collision < l_collision) && (t_collision < r_collision) ){
          //Top collision
          //alert ('Top');
          this.y = this.prevY;
          this.gravitySpeed = 0;
          if (this.type == "barrel"){this.gravitySpeed = -1;}
          if (this.type == "dot" && obj.type == "barrel"){
            jumpOnTopSound.play();
            this.gravitySpeed = -2;
          }
          if (this.type == "barrel" && obj.type == "barrel"){
          //  alert('Two Barrels!');
          }
        }
        if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision){
          //bottom collision
          this.y = this.prevY;
          this.gravitySpeed = .5;
          if (this.type == "dot" && obj.type == "barrel"){
            hitSound.play();
            this.gravitySpeed = -10;
            myGameArea.stop();
          }
          if (this.type == "barrel" && obj.type == "barrel"){
            //alert('Two Barrels!');
          }

        }
        if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision)
        {
          //Left collision
          this.x = this.prevX;
          if (this.type == "barrel"){this.speedX *= -1}
          if (this.type == "dot" && obj.type == "barrel"){
            hitSound.play();
            this.gravitySpeed = -10;
            myGameArea.stop();
          }
          if (this.type == "barrel" && obj.type == "barrel"){
            //alert('Two Barrels!');
          }
        }
        if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision )
        {
          //Right collision
          this.x = this.prevX;
          if (this.type == "barrel"){this.speedX *= -1}
          if (this.type == "barrel" && obj.type == "barrel"){
            //alert('Two Barrels!');
          }
          if (this.type == "dot" && obj.type == "barrel"){
            hitSound.play();
            this.gravitySpeed = -10;
            myGameArea.stop();
          }
        }

    }
    // -------   colision ----------------
    this.collision = function(other){
      if (this.x < other.x + other.width &&
        this.x + this.width > other.x &&
        this.y < other.y + other.height &&
        this.height + this.y > other.y) {
          this.collisionFrom(other);
        }
      }


    }



// ----------------------  UPDATE GAME AREA ------------

function updateGameArea() {
    myGameArea.clear();
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
    barrelCount += 1;
    if (barrelCount % 400 == 0){
      barrel.push(new component (25, 25, "brown", 260, 35, "barrel"));
    }

}


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
  //  this.sound.setAttribute("crossOrigin", "anonymous");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
