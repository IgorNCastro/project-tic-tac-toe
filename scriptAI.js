// Initial Data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let pos = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1'
];

let player = '';
let warning = '';
let playing = false;

// Events
reset();
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(player === 'x') {
        if(playing && square[item] === '') {
        square[item] = 'x';
        renderSquare();
        togglePlayer();
        }
    }
    else {
        nextPlay();
    }
}

function reset() {
    warning = '';
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';
    for(let i in square) {
        square[i] = '';
    }
    playing = true;
    renderSquare();
    renderInfo();
    firstMove();
}

function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
}

function renderInfo() {
    document.querySelector('.turn').innerHTML = player;
    document.querySelector('.result').innerHTML = warning;
}

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'You won!';
        playing = false;
    } else if(checkWinnerFor('o')) {
        warning = 'The AI won!';
        playing = false;
    } else if(isFull()) {
        warning = 'Draw...';
        playing = false;
    }
}

function checkWinnerFor(player) {
    for(let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon) {
            return true;
        }
    }
    return false;
}

function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }
    return true;
}

function firstMove() {
    for(let i in square) {
        if(player === 'o' && square[i] === '') {
            square['b2'] = player;
            renderSquare();
            togglePlayer();
        }
    }
}


function nextPlay() {
    checkWin();
    renderInfo();
    checkDefense();
    let table = [
        'a1',
        'a2',
        'a3',
        'b1',
        'b2',
        'b3',
        'c1',
        'c2',
        'c3'
    ];
    let randomNumber = Math.floor(Math.random() * 9);
    let position = table[randomNumber];
    if(player === 'o'&& playing) {
        if(square[`${position}`] === '') {
            square[`${position}`] = 'o';
            renderSquare();
            togglePlayer();
        } else {
            nextPlay();
        }
    }
}

function checkWin() {
    let wArray = [];
    if(player === 'o') {
        for(let c in pos) {
            wArray = pos[c].split(',');
            for(let i in wArray) {
                if(square[wArray[0]] === 'o' && square[wArray[1]] === 'o' && square[wArray[2]] === '') {
                    square[`${wArray[2]}`] = 'o';
                    renderSquare();
                    checkGame();
                    return true;
                } else if(square[wArray[0]] === 'o' && square[wArray[1]] === '' && square[wArray[2]] === 'o') {
                    square[`${wArray[1]}`] = 'o';
                    renderSquare();
                    checkGame();
                    return true;
                } else if (square[wArray[0]] === '' && square[wArray[1]] === 'o' && square[wArray[2]] === 'o') {
                    square[`${wArray[0]}`] = 'o';
                    renderSquare();
                    checkGame();
                    return true;
                }
            }
        }
    }
}

function checkDefense() {
    let cArray = [];
    if(player === 'o' && playing) {
        for(let c in pos) {
            cArray = pos[c].split(',');
            for(let i in cArray) {
                if(square[cArray[0]] === 'x' && square[cArray[1]] === 'x' && square[cArray[2]] === '') {
                    square[`${cArray[2]}`] = 'o';
                    renderSquare();
                    togglePlayer();
                    return true;
                } else if(square[cArray[0]] === 'x' && square[cArray[1]] === '' && square[cArray[2]] === 'x') {
                    square[`${cArray[1]}`] = 'o';
                    renderSquare();
                    togglePlayer();
                    return true;
                } else if (square[cArray[0]] === '' && square[cArray[1]] === 'x' && square[cArray[2]] === 'x') {
                    square[`${cArray[0]}`] = 'o';
                    renderSquare();
                    togglePlayer();
                    return true;
                }
            }
        }
    }   
}