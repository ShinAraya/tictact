let titleText = document.querySelector('.title');
let restartBtn = document.querySelector('.js-restart');
let boxes = Array.from(document.querySelectorAll('.box'));

let winningIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks') ;
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-blocks') ;

const O_TEXT = 'O';
const X_TEXT = 'X';
let currentPlayer = X_TEXT;

let spaces = Array(9).fill(null);
let countPlays = 0;

const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
  const id = e.target.id;

  if(!spaces[id] && countPlays < 9) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if(playerHasWon() !==false) {
      titleText.innerText = `${currentPlayer} has won! ;3`
      let winning_blocks = playerHasWon();
      countPlays = 10;
      winning_blocks.map( box => boxes[box].style.backgroundColor = winningIndicator)
    }
    countPlays++;

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT ;
  }

  if (countPlays === 9) {
    titleText.innerText = 'Draw Game TvT'
    boxes.forEach(box => box.style.color = drawIndicator)
  }
} 

const winningCombos = [
  [0,1,2],[1,2,3],[2,3,4],
  [5,6,7],[6,7,8],[7,8,9],
  [10,11,12],[11,12,13],[12,13,14],
  [15,16,17],[16,17,18],[17,18,19],
  [20,21,22],[21,22,23],[22,23,24],

  [0,5,10],[5,10,15],[10,15,20],
  [1,6,11],[6,11,16],[11,16,21],
  [2,7,12],[7,12,17],[12,17,22],
  [3,8,13],[8,13,18],[13,18,23],
  [4,9,14],[9,14,19],[14,19,24],

  [0,6,12],[1,7,13],[2,8,14],
  [2,6,10],[3,7,11],[4,8,12],

  [5,11,17],[6,12,18],[7,13,19],
  [7,11,15],[8,12,16],[9,13,17],

  [10,16,22],[11,17,23],[12,18,24],
  [12,16,20],[13,17,21],[14,18,22]

]

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
        return [a,b,c];
    }
}
  return false;
}

restartBtn.addEventListener('click', Restart);

function Restart() {
  spaces.fill(null);

  boxes.forEach(box => {
    box.innerText = '';
    box.style.backgroundColor='';
    countPlays=0;
    box.style.color=''
})

  titleText.innerText = `tic tac toe :3`

  currentPlayer = X_TEXT;
}

startGame();