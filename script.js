function createGame() {
  const secretNumber = Math.floor(Math.random() * 100) + 1;

  function guessNumber() {
    const userAnswer = prompt("Угадай число от 1 до 100");

    if (userAnswer === null ) {
      alert("Игра окончена");
      return;
    }

    if (userAnswer.trim() === "") {
      alert("Введите число!!!");
      guessNumber();
      return;
    }

    if (Number(userAnswer) <= 0) {
      alert("Введите число больше 0");
      guessNumber();
      return;
    }

    if (userAnswer > 100) {
      alert("Введите число меньшее или равное 100");
      guessNumber();
      return;
    }

    if (Number.isNaN(userAnswer)) {
      alert("Введи число!");
      guessNumber();
      return;
    }

    const number = Number(userAnswer);

    if (number > secretNumber) {
      alert("Загаданное число меньше");
      guessNumber();
      return;
    }

    if (number < secretNumber) {
      alert("Загаданное число больше");
      guessNumber();
      return;
    }

    alert("Поздравляю, Вы угадали!!!");
  }

  guessNumber();
}

const startGame = confirm("Начать игру?");

if (startGame) {
  createGame();
} else {
  alert("Игра окончена");
}
