const guessInput = document.querySelector(".guessInput");
const guessButton = document.querySelector(".guessButton");
const lifeDiv = document.querySelector(".life");
const resetButton = document.querySelector(".resetButton");
const scoreList = document.querySelector(".scores");
const bestScore = document.querySelector(".bestScore");
const arrowDown = document.querySelector(".down");
const arrowUp = document.querySelector(".up");

let getScore = JSON.parse(localStorage.getItem("playerScore"));

let life = 5;
let randomNumber = Math.round(Math.random() * 100);
let isEnd = false;

console.log(randomNumber);

const getPoint = () => {
  getScore
    .reverse()
    .slice(0, 5)
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
  if (life > 0 && !isEnd) {
    if (Number(guessInput.value) === randomNumber) {
      endGame();
    } else if (Number(guessInput.value) < randomNumber) {
      life -= 1;
      lifeDiv.innerHTML = `<i class="fa-solid fa-heart"></i> ${life}`;
      arrowUp.style.opacity = "1";
      arrowDown.style.opacity = "0.5";
      guessInput.value = "";
    } else {
      life -= 1;
      console.log("Assagi");
      lifeDiv.innerHTML = `<i class="fa-solid fa-heart"></i> ${life}`;
      arrowUp.style.opacity = "0.5";
      arrowDown.style.opacity = "1";
      guessInput.value = "";
    }
  } else {
    endGame();
  }
};
// if (getScore) {
//   bestScore.innerHTML = `Best Score ${Math.max(...getScore)}`;
// }

function endGame() {
  isEnd = true;
  if (
    (life === 0 && Number(guessInput.value) === randomNumber) ||
    Number(guessInput.value) === randomNumber
  ) {
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
  lifeDiv.innerHTML = `<i class="fa-solid fa-heart"></i> ${life}`;
  guessInput.value = "";
  arrowUp.style.opacity = "0.5";
  arrowDown.style.opacity = "0.5";
  console.log(randomNumber);
});
