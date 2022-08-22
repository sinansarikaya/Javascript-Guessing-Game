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

const getPoint = () => {
  bestScore.innerHTML = Math.max(...getScore);
  getScore
    .reverse()
    .slice(0, 4)
    .map((score, i) => {
      scoreList.innerHTML += `<div class="score-box" key="${i}">${
        i + 1
      }. ${score}</div>`;
    });
};

if (getScore) {
  getPoint();
}

guessInput.addEventListener("input", () => {
  if (guessInput.value.length > guessInput.maxLength) {
    guessInput.value = guessInput.value.slice(0, guessInput.maxLength);
  }

  if (guessInput.value.length > 2) {
    error("Maximum 2 characters!", "#fe5f5580");
    inputControl = false;
  } else {
    if (guessInput.value.length == 1) {
      inputControl = true;
      box.innerHTML = "0";
      box2.innerHTML = guessInput.value[0];
    } else if (guessInput.value.length == 2) {
      inputControl = true;
      box.innerHTML = guessInput.value[0];
      box2.innerHTML = guessInput.value[1];
    }
  }
});

console.log(randomNumber);

document.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    if (inputControl && !isEnd) {
      life -= 1;
      checkResult();
    }
  }
});
guessButton.addEventListener("click", (e) => {
  if (inputControl && !isEnd) {
    life -= 1;
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
        lifeDiv.innerHTML = `<i class="fa-solid fa-heart"></i> ${life}`;
        arrowUp.style.opacity = "1";
        arrowDown.style.opacity = "0.5";
        guessInput.value = "";
      } else if (Number(guessInput.value) > randomNumber) {
        console.log("Assagi");
        lifeDiv.innerHTML = `<i class="fa-solid fa-heart"></i> ${life}`;
        arrowUp.style.opacity = "0.5";
        arrowDown.style.opacity = "1";
        guessInput.value = "";
      }
    } else {
      endGame();
    }
  }
};

let newScore;
const countScore = (life) => {
  if (life === 4) {
    newScore = 100;
  } else if (life === 3) {
    newScore = 80;
  } else if (life === 2) {
    newScore = 60;
  } else if (life === 1) {
    newScore = 40;
  } else if (life === 0) {
    newScore = 20;
  }
  return newScore;
};

function endGame() {
  newScore = countScore(life);
  isEnd = true;
  if (Number(guessInput.value) === randomNumber) {
    lifeDiv.innerHTML = `Score : ${newScore} Win`;
    setPoint();
  } else if (life === 0 && Number(guessInput.value) !== randomNumber) {
    lifeDiv.innerHTML = `<i class="fa-solid fa-heart"></i> ${life} Lose`;
  }
}

const setPoint = () => {
  newScore = countScore(life);
  let score = [];
  if (getScore) {
    getScore.push(newScore);
    score = getScore;
  } else {
    score[0] = newScore;
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
  location.reload(true);
});

const error = (msg, type) => {
  console.log(msg, type);
};
