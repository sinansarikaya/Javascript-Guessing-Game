const guessInput = document.querySelector(".guessInput");
const guessButton = document.querySelector(".guessButton");
const lifeDiv = document.querySelector(".life");
const resetButton = document.querySelector(".resetButton");
const scoreList = document.querySelector(".scoreList");
const bestScore = document.querySelector(".bestScore");

let getScore = JSON.parse(localStorage.getItem("playerScore"));

let life = 5;
let randomNumber = Math.round(Math.random() * 100);
let isEnd = false;

console.log(randomNumber);

document.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    checkResult();
  }
});
console.log(getScore);
const checkResult = () => {
  if (life > 0 && !isEnd) {
    if (Number(guessInput.value) === randomNumber) {
      endGame();
    } else if (Number(guessInput.value) < randomNumber) {
      life -= 1;
      lifeDiv.innerHTML = `❤️ ${life} Yukari`;
      guessInput.value = "";
    } else {
      life -= 1;
      console.log("Assagi");
      lifeDiv.innerHTML = `❤️ ${life} Assagi`;
      guessInput.value = "";
    }
  } else {
    endGame();
  }
};
if (getScore) {
  bestScore.innerHTML = `Best Score ${Math.max(...getScore)}`;
}

function endGame() {
  isEnd = true;
  if (
    (life === 0 && Number(guessInput.value) === randomNumber) ||
    Number(guessInput.value) === randomNumber
  ) {
    lifeDiv.innerHTML = `❤️ ${life} Kazandin`;
    setPoint();
  } else if (life === 0 && Number(guessInput.value) !== randomNumber) {
    lifeDiv.innerHTML = `❤️ ${life} Kaybettin`;
  }

  getPoint();
}

const getPoint = () => {
  getScore
    .reverse()
    .slice(0, 10)
    .map((score, i) => {
      scoreList.innerHTML += `<li key="${i}">${score}</li>`;
    });
};

getPoint();

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
  lifeDiv.innerHTML = `❤️ ${life}`;
  guessInput.value = "";
  console.log(randomNumber);
});
console.log(getScore.length);
