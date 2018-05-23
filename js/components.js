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

}

//-----------------  Text Class --------

function textElement(size, font, color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.size = size;
    this.font = font;
    this.text = "Score: ";

    this.update = function() {
        ctx = myGameArea.context;
        ctx.font = this.size + " " + this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}

//-----------------  Barrel Class --------

function barrel(width, height, color, x, y, type) {
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
    barrelSide ? this.speedX = 1 : this.speedX = -1;
    barrelSide = !barrelSide;

    this.fall = function() {
        collide = false;
        while (!collide) {
            for (i = 0; i < deck.length; i += 1) {
                if (collision(this, deck[i])) {
                    collide = true;
                }
            }
            this.y++;
        }
    }
    this.delete = function() {
        this.type = "delete";
        barrels = barrels.filter(function(obj) {
            return obj.type !== 'delete';
        });
    }


}

// ---------------   Component Helpers ----

function brokenBarrel(x, y) {
    this.x = x;
    this.y = y;
    this.height = 25;
    this.width = 20;
    this.type = "brokenBarrel";
    this.health = 5;
    this.color = "black";

    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(x, y + 25);
        ctx.lineTo(x + 10, y + 5);
        ctx.lineTo(x + 20, y + 25);
        ctx.fill();
    }

    this.delete = function() {
        brokenBarrels = brokenBarrels.filter(function(obj) {
            return obj.health >= 0;
        });
    }

}

// --------------    Platform Class--------------

function platform(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
}

// ---------------   Component Helpers ---------

function updatePosition(obj) {
    ctx = myGameArea.context;
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    obj.prevX = obj.x;
    obj.prevY = obj.y;
}

function newPosition(obj) {
    obj.gravitySpeed += obj.gravity;
    obj.x += obj.speedX;
    obj.y += obj.speedY + obj.gravitySpeed;
    for (i = 0; i < deck.length; i += 1) {
        if (collision(obj, deck[i])) {
            collisionDirection(obj, deck[i])
        }
    }
    for (i = 0; i < barrels.length; i += 1) {
        if (collision(obj, barrels[i])) {
            collisionDirection(obj, barrels[i])
        }
    }
    for (i = 0; i < brokenBarrels.length; i += 1) {
        if (collision(obj, brokenBarrels[i])) {
            collisionDirection(obj, brokenBarrels[i])
        }
    }
}
