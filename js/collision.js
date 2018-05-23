// -------   colision ----------------
function collision(obj, other) {
    if (obj.x < other.x + other.width &&
        obj.x + obj.width > other.x &&
        obj.y < other.y + other.height &&
        obj.height + obj.y > other.y) {
        return true;
    }
    return false;
}

function collisionDirection(obj, other) {
    var obj_bottom = obj.y + obj.height;
    var other_bottom = other.y + other.height;
    var obj_right = obj.x + obj.width;
    var other_right = other.x + other.width;

    var b_collision = other_bottom - obj.y;
    var t_collision = obj_bottom - other.y;
    var l_collision = obj_right - other.x;
    var r_collision = other_right - obj.x;
    //   ---   Top collision
    if ((t_collision < b_collision) && (t_collision < l_collision) && (t_collision < r_collision)) {
        jumpOnTop(obj, other);
    }
    //  ---   bottom collision
    if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision) {
        bumpHead(obj, other);
    }
    //  ---   Left collision
    if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision) {
        sideCollide(obj, other);
    }

    // ----   Right collision
    if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision) {
        sideCollide(obj, other);
    }

}
// -------------   End Collision direction ---------

// --------  Collision Results ------------------

function jumpOnTop(obj, other) {
    //bounce back
    obj.y = obj.prevY;
    obj.gravitySpeed = 0;
    //Barrels bounces after falling
    if (obj.type == "barrel") {
        obj.gravitySpeed = -1;
    }
    if (obj.type == "player" && other.type == "barrel") {
        playerSmashBarrel(other)
    }
    // Two barrels still touching after bounce back then delete 1st barrel
    if (obj.type == "barrel" && other.type == "barrel") {
        if (collision(obj, other)) {
            barrelCrushBarrel(obj)
        }
    }
    if (other.type == "brokenBarrel") {
        jumpOnBrokenBarrel(obj, other)
    }
}

function bumpHead(obj, other) {
    if (obj.type == "player" && other.type == "barrel") {
        barrelHitPlayer(obj);
        return;
    }
    obj.y = obj.prevY;
    obj.gravitySpeed = .5;

    if (obj.type == "barrel" && other.type == "player") {
        playerSmashBarrel(obj)
    }
    // Two barrels still touching after bounce back then delete 1st barrel
    if (obj.type == "barrel" && other.type == "barrel") {
        if (collision(obj, other)) {
            barrelCrushBarrel(obj)
        }
    }
}

function sideCollide(obj, other){
  if (obj.type == "player" && other.type == "barrel") {
      barrelHitPlayer(obj);
      return;
  }
  obj.x = obj.prevX;
  if (obj.type == "barrel") {
      obj.speedX *= -1
  }
  // Two barrels still touching after bounce back then delete 1st barrel
  if (obj.type == "barrel" && other.type == "barrel") {
      if (collision(obj, other)) {
          barrelCrushBarrel(obj)
      }
  }

  if (other.type == "brokenBarrel") {
      sideHitBrokenBarrel(obj, other)
  }

}

function barrelHitPlayer(player) {
    hitSound.play();
    //myGamePiece.gravitySpeed = -10;
    playerDown(player);
}

function playerSmashBarrel(hitBarrel) {
    myGamePiece.gravitySpeed = -2;
    if (hitBarrel.color == "yellow") {
        crushBarrel(hitBarrel);
    } else {
        myScore += 10;
        jumpOnTopSound.play();
        hitBarrel.color = "yellow";
    }
}

function crushBarrel(hitBarrel) {
    jumpCrushSound.play();
    myGamePiece.gravitySpeed = -2;
    myScore += 20;
    hitBarrel.fall();
    brokenBarrels.push(new brokenBarrel(hitBarrel.x, hitBarrel.y));
    hitBarrel.type = "delete";
    barrels = barrels.filter(function(obj) {
        return obj.type !== 'delete';
    });
}

function barrelCrushBarrel(hitBarrel) {
    jumpCrushSound.play();
    hitBarrel.fall();
    brokenBarrels.push(new brokenBarrel(hitBarrel.x, hitBarrel.y));
    hitBarrel.delete();
}

function jumpOnBrokenBarrel(obj, hitBarrel) {
    obj.gravitySpeed = -3;
    hitBarrel.health--;
    if (hitBarrel.health == 0) {
        hitBarrel.color = "red";
    }
    if (hitBarrel.health < 0) {
        hitBarrel.delete()
    }
}

function sideHitBrokenBarrel(obj, hitBarrel) {
    if (obj.type == "barrel"){hitBarrel.health--}
    if (hitBarrel.health == 0) {
        hitBarrel.color = "red";
    }
    if (hitBarrel.health < 0) {
        hitBarrel.delete()
    }
}
