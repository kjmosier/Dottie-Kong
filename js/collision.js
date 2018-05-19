// -------   colision ----------------
function collision(obj, other){
  if (obj.x < other.x + other.width &&
    obj.x + obj.width > other.x &&
    obj.y < other.y + other.height &&
    obj.height + obj.y > other.y) {
      collisionDirection(obj , other);
    }
  }

  function collisionDirection (obj, other){
      var player_bottom = obj.y + obj.height;
      var other_bottom = other.y + other.height;
      var player_right = obj.x + obj.width;
      var other_right = other.x + other.width;

      var b_collision = other_bottom - obj.y;
      var t_collision = player_bottom - other.y;
      var l_collision = player_right - other.x;
      var r_collision = other_right - obj.x;
      //   ---   Top collision
      if ((t_collision < b_collision) && (t_collision < l_collision) && (t_collision < r_collision) ){
          obj.y = obj.prevY;
          obj.gravitySpeed = 0;
          if (obj.type == "barrel"){obj.gravitySpeed = -1;}
          if (obj.type == "dot" && other.type == "barrel"){playerSmashBarrel(other)}
          // Two barrels collide nothing happens, direction is changed in above line
          if (obj.type == "barrel" && other.type == "barrel"){}
        }
        //  ---   bottom collision
        if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision){
          obj.y = obj.prevY;
          obj.gravitySpeed = .5;
          if (obj.type == "dot" && other.type == "barrel"){barrelHitPlayer()}
          // Two barrels collide nothing happens, direction is changed in above line
          if (obj.type == "barrel" && other.type == "barrel"){}
        }
        //  ---   Left collision
        if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision){
          obj.x = obj.prevX;
          if (obj.type == "barrel"){obj.speedX *= -1}
          if (obj.type == "dot" && other.type == "barrel"){barrelHitPlayer()}
          // Two barrels collide nothing happens, direction is changed in above line
          if (obj.type == "barrel" && other.type == "barrel"){}
        }

        // ----   Right collision
        if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision ){
          obj.x = obj.prevX;
          if (obj.type == "barrel"){obj.speedX *= -1}
          // Two barrels collide nothing happens, direction is changed in above line
          if (obj.type == "barrel" && other.type == "barrel"){}
          if (obj.type == "dot" && other.type == "barrel"){barrelHitPlayer()}
        }

    }
// -------------   End Collision direction ---------


// --------  Collision Results ------------------

function barrelHitPlayer(){
  hitSound.play();
  myGamePiece.gravitySpeed = -10;
  myGameArea.stop();
}

function playerSmashBarrel(hitBarrel){
  jumpOnTopSound.play();
  myGamePiece.gravitySpeed = -2;
  if (hitBarrel.color == "yellow"){crushBarrel(hitBarrel);}
  else{
    myScore +=10 ;
    hitBarrel.color = "yellow";
  }
}

function crushBarrel(hitBarrel){
  jumpOnTopSound.play();
  myGamePiece.gravitySpeed = -2;
  myScore +=20 ;
  hitBarrel.type = "smashedBarrel";
  barrel = barrel.filter(function( obj ){
    return obj.type !== 'smashedBarrel';
  });
}
