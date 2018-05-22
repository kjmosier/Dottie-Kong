// -------   colision ----------------
function collision(obj, other){
  if (obj.x < other.x + other.width &&
    obj.x + obj.width > other.x &&
    obj.y < other.y + other.height &&
    obj.height + obj.y > other.y) {
    return true;
    }
    return false;
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
          if (obj.type == "barrel" && other.type == "barrel"){
            if (collision(obj, other)){barrelCrushBarrel(obj)}
          }
          if (other.type == "brokenBarrel"){
            other.health --;
            if (other.health == 0){other.color = "red";}
            if (other.health < 0){
              other.delete();
              return;
            }
            obj.gravitySpeed = -4;
            obj.speedX *= -1;
          }
        }
        //  ---   bottom collision
        if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision){
          obj.y = obj.prevY;
          obj.gravitySpeed = .5;
          if (obj.type == "dot" && other.type == "barrel"){barrelHitPlayer(obj)}
          if (obj.type == "barrel" && other.type == "dot"){playerSmashBarrel(obj)}
          // Two barrels collide nothing happens, direction is changed in above line
          if (obj.type == "barrel" && other.type == "barrel"){
            if (collision(obj, other)){barrelCrushBarrel(obj)}
          }
        }
        //  ---   Left collision
        if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision){
          obj.x = obj.prevX;
          if (obj.type == "barrel"){obj.speedX *= -1}
          if (obj.type == "dot" && other.type == "barrel"){barrelHitPlayer(obj)}
          // Two barrels collide nothing happens, direction is changed in above line
          if (obj.type == "barrel" && other.type == "barrel"){
            if (collision(obj, other)){barrelCrushBarrel(obj)}
          }
        }

        // ----   Right collision
        if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision ){
          obj.x = obj.prevX;
          if (obj.type == "barrel"){obj.speedX *= -1}
          // Two barrels collide nothing happens, direction is changed in above line
          if (obj.type == "barrel" && other.type == "barrel"){
            if (collision(obj, other)){barrelCrushBarrel(obj)}
          }
          if (obj.type == "dot" && other.type == "barrel"){barrelHitPlayer(obj)}
        }

    }
// -------------   End Collision direction ---------


// --------  Collision Results ------------------

function barrelHitPlayer(player){
  hitSound.play();
  //myGamePiece.gravitySpeed = -10;
  playerDown(player);
}

function playerSmashBarrel(hitBarrel){
  myGamePiece.gravitySpeed = -2;
  if (hitBarrel.color == "yellow"){crushBarrel(hitBarrel);}
  else{
    myScore +=10 ;
    jumpOnTopSound.play();
    hitBarrel.color = "yellow";
  }
}

function crushBarrel(hitBarrel){
  jumpCrushSound.play();
  myGamePiece.gravitySpeed = -2;
  myScore +=20 ;
  hitBarrel.fall();
  brokenBarrels.push (new brokenBarrel (hitBarrel.x, hitBarrel.y));
  hitBarrel.type = "smashedBarrel";
  barrel = barrel.filter(function( obj ){
    return obj.type !== 'smashedBarrel';
  });
}

function barrelCrushBarrel(hitBarrel){
  jumpCrushSound.play();
  hitBarrel.fall();
  brokenBarrels.push (new brokenBarrel (hitBarrel.x, hitBarrel.y));
  hitBarrel.type = "smashedBarrel";
  barrel = barrel.filter(function( obj ){
    return obj.type !== 'smashedBarrel';
  });
}
