function startGame() {
  gameArena.start();
}

var gameArena = {
  arena : document.createElement("canvas"),
  start : function() {
    this.arena.width = 480;
    this.arena.height = 270;
    this.context = this.arena.getContext("2d");
    document.body.insertBefore(this.arena, document.body.childNodes[0]);
  }
}
