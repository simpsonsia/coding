
const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const bestScoreDisplay = document.getElementById("best-score");
const guessButton = document.getElementById("guess-button");
const restartButton = document.getElementById("restart-button");

let secretNumber;
let attempts = 0;
let bestScore = null;
let gameOver = false;

// Start a new game
function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  gameOver = false;

  attemptsDisplay.textContent = attempts;
  message.textContent = "Make your first guess!";
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  restartButton.hidden = true;

  guessInput.focus();
}

// Check the player's guess
guessForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (gameOver) return;

  const guess = Number(guessInput.value);

  if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
    message.textContent = "Enter a whole number from 1 to 100!";
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (guess === secretNumber) {
    message.textContent =
      `Correct! You guessed the number in ${attempts} attempt(s)!`;

    gameOver = true;
    guessInput.disabled = true;
    guessButton.disabled = true;
    restartButton.hidden = false;

    if (bestScore === null || attempts < bestScore) {
      bestScore = attempts;
      bestScoreDisplay.textContent = bestScore;
    }
  } else if (guess < secretNumber) {
    message.textContent = "Too low! Try a higher number.";
  } else {
    message.textContent = "Too high! Try a lower number.";
  }

  if (!gameOver) {
    guessInput.select();
  }
});

// Restart the game
restartButton.addEventListener("click", startGame);

// Initialize the first round
startGame();
