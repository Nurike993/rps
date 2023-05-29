const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const game = document.querySelector('.game');
const FPS = 60;

let posXRock = 0;
let posYRock = 0;
let rockImage = 'rock.png';
let speedXRock = 3;
let speedYRock = 3;

let posXPaper = 450;
let posYPaper = 400;
let paperImage = 'paper.png';
let speedXPaper = 3;
let speedYPaper = 3;

let posXScissors = 650;
let posYScissors = 300;
let scissorsImage = 'scissors.png';
let speedXScissors = 3;
let speedYScissors = 3;

function movePaper() {
  posXPaper += speedXPaper;
  posYPaper += speedYPaper;

  paper.style.transform = `translate(${posXPaper}px, ${posYPaper}px)`;

  if (posXPaper <= 0 || posXPaper >= game.offsetWidth - paper.offsetWidth) {
    speedXPaper = -speedXPaper;
  }
  if (posYPaper <= 0 || posYPaper >= game.offsetHeight - paper.offsetHeight) {
    speedYPaper = -speedYPaper;
  }

  checkCollisions(paper, rock);
  checkCollisions(paper, scissors);

  window.requestAnimationFrame(movePaper);
}
// console.log(posXPaper, posYPaper)
function moveRock() {
  posXRock += speedXRock;
  posYRock += speedYRock;

  rock.style.transform = `translate(${posXRock}px, ${posYRock}px)`;

  if (posXRock <= 0 || posXRock >= game.offsetWidth - rock.offsetWidth) {
    speedXRock = -speedXRock;
  }
  if (posYRock <= 0 || posYRock >= game.offsetHeight - rock.offsetHeight) {
    speedYRock = -speedYRock;
  }

  checkCollisions(rock, paper);
  checkCollisions(rock, scissors);

  window.requestAnimationFrame(moveRock);
}
// console.log(posXRock, posYRock)
function moveScissors() {
  posXScissors += speedXScissors;
  posYScissors += speedYScissors;

  scissors.style.transform = `translate(${posXScissors}px, ${posYScissors}px)`;

  if (posXScissors <= 0 || posXScissors >= game.offsetWidth - scissors.offsetWidth) {
    speedXScissors = -speedXScissors;
  }
  if (posYScissors <= 0 || posYScissors >= game.offsetHeight - scissors.offsetHeight) {
    speedYScissors = -speedYScissors;
  }

  checkCollisions(scissors, rock);
  checkCollisions(scissors, paper);

  window.requestAnimationFrame(moveScissors);
}
// console.log(posXScissors, posYScissors)
function checkCollisions(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
  const overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));

  if (overlapX > 0 && overlapY > 0) {
    const tempSpeedX1 = speedXRock;
    const tempSpeedY1 = speedYRock;
    const tempSpeedX2 = speedXPaper;
    const tempSpeedY2 = speedYPaper;
    const tempSpeedX3 = speedXScissors;
    const tempSpeedY3 = speedYScissors;

    if (element1 === rock && element2 === paper) {
      rockImage = 'paper.png';
      paperImage = 'rock.png';
    }  else if (element1 === paper && element2 === scissors) {
      paperImage = 'scissors.png';
      scissorsImage = 'paper.png';
    } else if (element1 === rock && element2 === scissors) {
      rockImage = 'scissors.png';
      scissorsImage = 'rock.png';
    }

    speedXRock = tempSpeedX2;
    speedYRock = tempSpeedY2;
    speedXPaper = tempSpeedX3;
    speedYPaper = tempSpeedY3;
    speedXScissors = tempSpeedX1;
    speedYScissors = tempSpeedY1;

    posXRock += speedXRock;
    posYRock += speedYRock;
    posXPaper += speedXPaper;
    posYPaper += speedYPaper;
    posXScissors += speedXScissors;
    posYScissors += speedYScissors;

    rock.style.transform = `translate(${posXRock}px, ${posYRock}px)`;
    paper.style.transform = `translate(${posXPaper}px, ${posYPaper}px)`;
    scissors.style.transform = `translate(${posXScissors}px, ${posYScissors}px)`;
    rock.style.backgroundImage = `url(${rockImage})`;
    paper.style.backgroundImage = `url(${paperImage})`;
    scissors.style.backgroundImage = `url(${scissorsImage})`;
  }
}

window.requestAnimationFrame(moveRock);
window.requestAnimationFrame(movePaper);
window.requestAnimationFrame(moveScissors);

window.addEventListener('resize', () => {
  posXRock = 0;
  posYRock = 0;
  posXPaper = 0;
  posYPaper = 0;
  posXScissors = 0;
  posYScissors = 0;

  game.style.height = window.innerHeight + 'px';
  game.style.width = window.innerWidth + 'px';
});
