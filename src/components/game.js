let mines = 10;
let size = 10;
let tiles = [];
let gameover = false;
const gameBoard = document.getElementById('game-board');

const neighbours = (tileIndex) => {
  const neighbourTiles = [];
  const helperArr = [-1, 0, 1];
  const [row, col] = [Math.floor(tileIndex / size), tileIndex % size];

  helperArr.forEach(x => helperArr.forEach((y) => {
    if (!x && !y) return;

    const [_row, _col] = [row + x, col + y];

    if (_row < 0 || _row >= size || _col < 0 || _col >= size) return;

    neighbourTiles.push(_row * size + _col);
  }));

  return neighbourTiles;
};

const generateGame = () => {
  tiles = [];

  for (let m = mines, i = size * size; i > 0; --i) {
    tiles.push((Math.floor(Math.random() * i) < m && m-- > -1) * -1);
  }

  tiles.forEach((value, index) => {
    if (value === -1) {
      neighbours(index).forEach(n => tiles[n] !== -1 && ++tiles[n]);
    }
  });
};

const checkWin = () => {
  const remainingTiles = Array.from(document.querySelectorAll('.cell:not(.open)'));

  if (remainingTiles.length > mines) return;

  remainingTiles.forEach(tile => tile.classList.add('mine'));
  if (!gameover) {
    const $heading = document.createElement('h2');
    $heading.innerHTML = 'You won!';
    gameBoard.appendChild($heading);
    gameover = true;
  }

  gameBoard.classList.add('winner');
};

const renderBoard = () => {
  gameBoard.classList = [];
  gameBoard.innerHTML = '';

  tiles.forEach((value, index) => {
    const $tile = document.createElement('span');
    $tile.classList.add('cell');
    if (value === 1) $tile.classList.add('blue');
    if (value === 2) $tile.classList.add('green');
    if (value === 3) $tile.classList.add('red');
    if (value === 4) $tile.classList.add('dark-blue');

    gameBoard.appendChild($tile);

    if ((index + 1) % size === 0) gameBoard.appendChild(document.createElement('div'));

    $tile.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      if (!event.currentTarget.classList.contains('open')) {
        event.target.classList.toggle('flag');
      }
    });

    $tile.addEventListener('click', (event) => {
      const $tiles = Array.from(document.querySelectorAll('.cell'));
      event.currentTarget.classList.add('open');

      if (value === -1 && !gameover) {
        tiles.forEach(($value, $index) => {
          if ($value < 0) $tiles[$index].classList.add('mine');
        });

        const $heading = document.createElement('h2');
        $heading.innerHTML = 'Game Over';
        gameBoard.appendChild($heading);
        gameover = true;

        return gameBoard.classList.add('gameover');
      }

      if (value > 0) {
        $tile.innerText = value;
        checkWin();
      }

      if (value === 0) {
        const clear = new Promise((resolve) => {
          const visited = {};
          const queue = [index];

          const checkNeighbours = () => setTimeout(() => {
            const nextTile = queue.shift();
            visited[nextTile] = true;

            neighbours(nextTile).filter(n => !visited[n]).forEach((n) => {
              $tiles[n].classList.add('open');

              if (tiles[n]) {
                $tiles[n].innerHTML = tiles[n];
              } else {
                queue.includes(n) || queue.push(n);
              }
            });

            queue.length ? checkNeighbours() : resolve();
          }, 20);

          checkNeighbours();
        });

        clear.then(checkWin());
      }
    });
  });
};

const startGame = () => {
  mines = document.getElementById('mines').value;
  size = document.getElementById('rows').value;
  gameover = false;
  generateGame();
  renderBoard();
};

startGame();
