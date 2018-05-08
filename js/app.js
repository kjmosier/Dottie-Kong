let dot = document.createElement('div');
dot.className = "dot";
let dotX = 50;
let dotY = 50;


arena.appendChild(dot);






function placeDot() {
  dot.style.top = dotX + "px";
  dot.style.left = dotY + "px";
}


xcoord.oninput = function() {
  dot.style.top = xcoord.value + "px";
};


document.addEventListener('keydown', function(event) {
  switch (event.code){
     case 'KeyS':
       dotX+=6;
       break;
     case 'KeyW':
       dotX -=6;
       break;
     case 'KeyA':
       dotY-=6;
       break;
     case 'KeyD':
       dotY+=6;
       break;
     case ('KeyS' && 'KeyD'):
       dotY+=6;
       dotX+=6;
       break;

     default:
       break;
     }
    placeDot();
});

placeDot();
