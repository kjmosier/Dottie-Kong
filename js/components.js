// --------------     Game Piece --------------
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.1;
    this.gravitySpeed = 0;
    this.bounce = 0;

    // -----------  Barrel Throw------------------
    if (this.type == "barrel"){
      barrelSide ? this.speedX = 1 : this.speedX = -1;
      barrelSide = !barrelSide;
    }

    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
          ctx.font = this.width + " " + this.height;
          ctx.fillStyle = this.color;
          ctx.fillText(this.text, this.x, this.y);
        } else {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        this.prevX = this.x;
        this.prevY = this.y;
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        for (i = 0; i < deck.length; i += 1){
          if (collision(this, deck[i])){collisionDirection(this, deck[i])}
        }
        for (i = 0; i < barrel.length; i += 1){
          if (collision(this, barrel[i])){collisionDirection(this, barrel[i])}
        }
        for (i = 0; i < brokenBarrels.length; i += 1){
          if (collision(this, brokenBarrels[i])){collisionDirection(this, brokenBarrels[i])}
        }
    }


    this.fall = function() {
      collide = false;
      while (!collide){
        for (i = 0; i < deck.length; i += 1){
          if (collision(this, deck[i])){collide = true;}
        }
        this.y++;
      }
    }

}
//-----------------  END Component Class --------

// ---------------   Component Helpers ----

function brokenBarrel(x, y){
  this.x = x;
  this.y = y;
  this.height = 25;
  this.width = 20;
  this.type = "brokenBarrel";


  this.update = function() {
      ctx = myGameArea.context;
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(x, y + 25);
      ctx.lineTo(x + 10, y+5);
      ctx.lineTo(x + 20, y +25);
      ctx.fill();
  }
}



// --------------    Platform Class--------------

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
