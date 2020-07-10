const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let game;
let keyPressed = [];

for(let i = 0; i < 255; i++) {
  keyPressed.push(false);
}

document.onkeydown = (e) => {
  keyPressed[e.keyCode] = true;
}

document.onkeyup = (e) => {
  keyPressed[e.keyCode] = false;
}

window.onload = () => {
	console.log("LiteTJ | Snake Game in JavaScript");

	game = new Game(40, 40);
	game.run();
}