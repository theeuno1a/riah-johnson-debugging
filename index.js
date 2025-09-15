const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0; 
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

if (guess < 1 || guess > 99 || isNaN(guess)) {
    const invalidMessage = document.getElementById('invalid-input');
    invalidMessage.style.display = '';  
    guessInput.value = '';
    return; 
  }

  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  
    confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff6f61', '#ffcc00', '#4db6ac', '#ffffff'],
  });
  }
// if guess was wrong - it had to be too high or too low. 
  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

// the syntax here was wrong - i had to change it to "===" instead of "====". 
  if (attempts === maxNumberOfAttempts) {
    // had to fix the typo in the disabled. It was "disbaled"
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';

  resetButton.style.display = '';
}
// loops over all the messages and hides them, however it had a typo in the for loop - "<=" vs "<".
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

// had to fix the typo in function from "funtion" to "function"
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();

// floating numbers animation

const floatingNumbersContainer = document.getElementById('floating-numbers');

function createFloatingNumber() {
  const number = document.createElement('div');
  number.classList.add('floating-number');


  number.textContent = Math.floor(Math.random() * 100);

  // random horizontal position
  number.style.left = Math.random() * 100 + 'vw';

  // random animation duration
  number.style.animationDuration = 5 + Math.random() * 5 + 's';

  // random font size
  number.style.fontSize = 15 + Math.random() * 25 + 'px';

  floatingNumbersContainer.appendChild(number);

  // remove number after animation
  setTimeout(() => {
    number.remove();
  }, parseFloat(number.style.animationDuration) * 1000);
}

setInterval(createFloatingNumber, 300);
