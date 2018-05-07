let dot = document.createElement('div');
dot.className = "dot";
let dotX = 50;
let dotY = 50;
dot.style.top = dotX + "px";
dot.style.left = dotY + "px";

arena.appendChild(dot);


function moveDot() {
  alert( 'Hello everyone!' );
}

function placeDot() {
  alert( 'Hello everyone!' );
}

xcoord.oninput = function() {
  arena.innerHTML = xcoord.value;
};
