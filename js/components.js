



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

    // -----------  Barrel Throw------------------
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
