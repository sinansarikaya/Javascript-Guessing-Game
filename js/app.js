const guessInput = document.querySelector(".guessInput");
const guessButton = document.querySelector(".guessButton");
const lifeDiv = document.querySelector(".life");
const resetButton = document.querySelector(".resetButton");
const scoreList = document.querySelector(".scores");
const bestScore = document.querySelector(".bestScore");
const arrowDown = document.querySelector(".down");
const arrowUp = document.querySelector(".up");
const box = document.querySelector(".header-content div:nth-child(1)");
const box2 = document.querySelector(".header-content div:nth-child(2)");

let life = 5;
let randomNumber = Math.floor(Math.random() * 100);
let isEnd = false;
let inputControl = false;
let getScore = JSON.parse(localStorage.getItem("playerScore"));

guessInput.addEventListener("input", () => {
  console.log(guessInput.value.length);
  if (guessInput.value.length > 2) {
    error("Maximum 2 characters!", "#fe5f5580");
    inputControl = false;
  } else {
    if (guessInput.value.length == 1) {
      inputControl = true;
      box.innerHTML = "0";
      box2.innerHTML = guessInput.value[0];
      console.log(inputControl);
    } else if (guessInput.value.length == 2) {
      inputControl = true;
      box.innerHTML = guessInput.value[0];
      box2.innerHTML = guessInput.value[1];
      console.log(inputControl);
    }
  }
});

console.log(randomNumber);
console.log(inputControl);

const getPoint = () => {
  getScore
    .reverse()
    .slice(0, 4)
    .map((score, i) => {
      scoreList.innerHTML += `<div class="score-box" key="${i}">${
        i + 1
      }. ${score}</div>`;
    });
};

document.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    checkResult();
  }
});

const checkResult = () => {
  if (inputControl === true) {
    if (!isEnd) {
      if (life === 0) {
        endGame();
      } else if (Number(guessInput.value) === randomNumber) {
        endGame();
      } else if (Number(guessInput.value) < randomNumber) {
        life -= 1;
        lifeDiv.innerHTML = `<i class="fa-solid fa-heart"></i> ${life}`;
        arrowUp.style.opacity = "1";
        arrowDown.style.opacity = "0.5";
      } else if (Number(guessInput.value) > randomNumber) {
        life -= 1;
        console.log("Assagi");
        lifeDiv.innerHTML = `<i class="fa-solid fa-heart"></i> ${life}`;
        arrowUp.style.opacity = "0.5";
        arrowDown.style.opacity = "1";
      }
    } else {
      endGame();
    }
  }
};

if (getScore) {
  bestScore.innerHTML = Math.max(...getScore);
}

function endGame() {
  isEnd = true;
  if (Number(guessInput.value) === randomNumber) {
    lifeDiv.innerHTML = `❤️ ${life} Kazandin`;
    setPoint();
    if (getScore) {
      getPoint();
    }
  } else if (life === 0 && Number(guessInput.value) !== randomNumber) {
    lifeDiv.innerHTML = `❤️ ${life} Kaybettin`;
  }
}

if (getScore) {
  getPoint();
}

const setPoint = () => {
  let score = [];
  if (getScore) {
    getScore.push(life);
    score = getScore;
  } else {
    score[0] = life;
  }
  localStorage.setItem("playerScore", JSON.stringify(score));
};

resetButton.addEventListener("click", () => {
  randomNumber = Math.round(Math.random() * 100);
  life = 5;
  isEnd = false;
  inputControl = false;
  lifeDiv.innerHTML = `<i class="fa-solid fa-heart"></i> ${life}`;
  guessInput.value = "";
  arrowUp.style.opacity = "0.5";
  arrowDown.style.opacity = "0.5";
  box.innerHTML = "0";
  box2.innerHTML = "0";
  console.log(randomNumber);
});

const error = (msg, type) => {
  console.log(msg, type);
};
