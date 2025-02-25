const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field = [];
let step = true;
let stepsNumber = 0;
let dimension = 3;

startGame(dimension);
addResetListener();

function startGame (dimension) {
    createGrid(dimension)
    renderGrid(dimension);
}

function createGrid(dimension) {
    stepsNumber = dimension**2;
    for (let i = 0; i < dimension; i++) {
        let row = [];
        for (let j = 0; j < dimension; j++) {
            row.push(EMPTY);
        }
        field.push(row);
    }
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = field[i][j];
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    if (field[row][col] === EMPTY) {
        field[row][col] = (step) ? CROSS : ZERO;
        step = !step;
        renderSymbolInCell(field[row][col], row, col);
        stepsNumber -= 1;
        checkFieldForWinner(row, col);
    }
    if (stepsNumber === 0) {
        alert("Победила дружба");
    }
    console.log(`Clicked on cell: ${row}, ${col}`);
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}

function checkFieldForWinner(row, col) {
    let rows = [row - 2, row - 1, row, row + 1, row + 2];
    let cols = [col - 2, col - 1, col, col + 1, col + 2];
    let symbol = 0;
    count = 0;
    for (let i = 0; i < 5; i++) {
        if (rows[i] < 0 || rows[i] > dimension - 1) continue;
        if (symbol === 0) symbol = field[rows[i]][col];
        if (field[rows[i]][col] === symbol) count++;
        else count = 0;
    }
    if (count >= 3 && symbol !== EMPTY) {
        alert(`Победил ${symbol}!`);
        return;
    }
    symbol = 0;
    count = 0;
    for (let i = 0; i < 5; i++) {
        if (cols[i] < 0 || cols[i] > dimension - 1) continue;
        if (symbol === 0) symbol = field[row][cols[i]];
        if (field[row][cols[i]] === symbol) count++;
        else count = 0;
    }
    if (count >= 3 && symbol !== EMPTY) {
        alert(`Победил ${symbol}!`);
        return;
    }
    symbol = 0;
    count = 0;
    for (let i = 0; i < 5; i++) {
        if (cols[i] < 0 || cols[i] > dimension - 1 || rows[i] < 0 || rows[i] > dimension - 1) continue;
        if (symbol === 0) symbol = field[rows[i]][cols[i]];
        if (field[rows[i]][cols[i]] === symbol) count++;
        else count = 0;
    }
    if (count >= 3 && symbol !== EMPTY) {
        alert(`Победил ${symbol}!`);
        return;
    }
    symbol = 0;
    count = 0;
    for (let i = 0; i < 5; i++) {
        if (cols[i] < 0 || cols[i] > dimension - 1 || rows[4 - i] < 0 || rows[4 - i] > dimension - 1) continue;
        if (symbol === 0) symbol = field[rows[4 - i]][cols[i]];
        if (field[rows[4 - i]][cols[i]] === symbol) count++;
        else count = 0;
    }
    if (count >= 3 && symbol !== EMPTY) {
        alert(`Победил ${symbol}!`);
        return;
    }
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
