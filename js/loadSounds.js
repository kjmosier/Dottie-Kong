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


function loadSounds(){
  jumpSound = new sound("sounds/jump.mp3");
  hitSound = new sound("sounds/hit.wav");
  jumpOnTopSound = new sound("sounds/jumpOnTop.wav");
  jumpCrushSound = new sound("sounds/Cartoon-pop.mp3");
  gateOpenSound = new sound("sounds/openGate.mp3");
  winSound = new sound("sounds/win.mp3");

}
