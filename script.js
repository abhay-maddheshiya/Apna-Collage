let userScore = 0;
let compScore = 0;
let gameHistory = [];
let currentMove = -1;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const backBtn = document.querySelector("#back");
const newGameBtn = document.querySelector("#newGame");
const nextBtn = document.querySelector("#next");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = (userChoice, compChoice) => {
  msg.innerText = `Game was Draw. Both chose ${userChoice}.`;
  msg.style.backgroundColor = "#e4f567";
  msg.style.padding = "1rem";
  backBtn.classList.remove("hide");
  newGameBtn.classList.remove("hide");
  gameHistory.push({ userChoice, compChoice, result: "draw" });
  currentMove++;
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    msg.style.padding = "1rem";
    gameHistory.push({ userChoice, compChoice, result: "win" });
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    msg.style.padding = "1rem";
    gameHistory.push({ userChoice, compChoice, result: "lose" });
  }
  currentMove++;
  backBtn.classList.remove("hide");
  newGameBtn.classList.remove("hide");
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame(userChoice, compChoice);
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
    nextBtn.classList.add("hide");
  });
});

newGameBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "New Game started";
  msg.style.backgroundColor = "#081b31";
  backBtn.classList.add("hide");
  newGameBtn.classList.add("hide");
  nextBtn.classList.add("hide");
  gameHistory = [];
  currentMove = -1;
});

backBtn.addEventListener("click", () => {
  if (currentMove < 0) {
    msg.innerText = "No moves to undo!";
    msg.style.backgroundColor = "#081b31";
    backBtn.classList.add("hide")
    return;
  }

  const move = gameHistory[currentMove];
  if (move.result === "win") {
    userScore--;
  } else if (move.result === "lose") {
    compScore--;
  }

  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  currentMove--;
  nextBtn.classList.remove("hide");
  msg.innerText = `Undo: Back to move ${currentMove + 1}`;
});

nextBtn.addEventListener("click", () => {
  if (currentMove >= gameHistory.length - 1) {
    msg.innerText = "No more moves to redo!";
    msg.style.backgroundColor = "#081b31";
    return;
  }

  currentMove++;
  const move = gameHistory[currentMove];
  if (move.result === "win") {
    userScore++;
  } else if (move.result === "lose") {
    compScore++;
  }
  if(currentMove==0){
    backBtn.classList.remove("hide")
  }
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = `Redo: Move ${currentMove + 1}`;
  if (currentMove === gameHistory.length - 1) {
    nextBtn.classList.add("hide");
  }
});