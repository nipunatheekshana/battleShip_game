var gameBoard = document.getElementById("game-board");
var squares = gameBoard.getElementsByClassName("square");
var resetButton = document.getElementById("reset-button");
var hitCount = document.getElementById("hit-count");
var missCount = document.getElementById("miss-count");
var gameOverScreen = document.getElementById("game-over-screen");
var victoryScreen = document.getElementById("victory-screen");
var playAgainButton = document.getElementsByClassName("play-again-button");
var loadingScreen = document.getElementById("loading-screen");
var hit = 0;
var miss = 0;

// Show loading screen
loadingScreen.style.display = "flex";

// Hide loading screen after 2 seconds
setTimeout(function() {
loadingScreen.style.display = "none";
}, 2000);

for (var i = 0; i < squares.length; i++) {
squares[i].addEventListener("click", function() {
if (this.classList.contains("ship")) {
this.classList.add("hit");
hit++;
hitCount.innerHTML = hit;
checkWin();
playSound("hit.mp3");
} else if (!this.classList.contains("hit") && !this.classList.contains("miss")) {
this.classList.add("miss");
miss++;
missCount.innerHTML = miss;
playSound("miss.mp3");
}
});
}

function playSound(file) {
var sound = new Audio("sounds/" + file);
sound.play();
}

function checkWin() {
if (hit === 5) {
victoryScreen.style.display = "flex";
playAgainButton.addEventListener("click", resetGame);
} else if (miss === 15) {
gameOverScreen.style.display = "flex";
playAgainButton.addEventListener("click", resetGame);
}
}

function resetGame() {
for (var i = 0; i < squares.length; i++) {
squares[i].classList.remove("hit", "miss", "ship");
squares[i].style.backgroundImage = "url('water.jpg')";}
hit = 0;
miss = 0;
hitCount.innerHTML = hit;
missCount.innerHTML = miss;
gameOverScreen.style.display = "none";
victoryScreen.style.display = "none";

var shipSquares = [];
while (shipSquares.length < 5) {
var randomSquare = squares[Math.floor(Math.random() * squares.length)];
if (!randomSquare.classList.contains("ship")) {
randomSquare.classList.add("ship");
shipSquares.push(randomSquare);
}
}
}

resetButton.addEventListener("click", resetGame);

