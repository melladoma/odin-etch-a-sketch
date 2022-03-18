//GRID GENERATION
const grid = document.getElementById('grid');
let maxSize = 500; //fixed grid size in px - value for exercise 960pxs

function createGrid(cellsNum = 16) {//creates a 16px grid by default
    createRows(cellsNum);
    createColumns(cellsNum);
}

function createRows(cellsNum) {
    for (let r = 0; r < cellsNum; r++) {
        let row = document.createElement('div')
        row.className = "gridRow"
        grid.appendChild(row).className = "gridRow"
    }
}
let rows = document.getElementsByClassName('gridRow');

function createColumns(cellsNum) {
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < cellsNum; j++) {
            let newCell = document.createElement('div');
            rows[j].appendChild(newCell).className = "cell";
            //calc of dynamic cell size within fixed grid size
            let cellSize = (maxSize - 2 * cellsNum) / cellsNum;
            newCell.style.height = `${cellSize}px`;
            newCell.style.width = `${cellSize}px`;
        }
    }
}
let cells = document.getElementsByClassName('cell');

createGrid(); //creates a grid upon loading

//LEAVING PEN-LIKE TRAIL UPON HOVERING
let colormodeActive = true;
let normalModeActive = true;
let funkyModeActive = false;
let colorPickingActive = false;


//COLOR MODES
//default mode
function addBlue(ev) {
    normalModeActive = true;
    if (ev.fromElement.className === "cell") {
        let b = 255;
        let r = 0;
        let g = 0;
        ev.fromElement.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
}
//Random color - Funky Mode
function addRandom(ev) {
    if (ev.fromElement.className === "cell") {
        funkyModeActive = true;
        let b = 0;
        let r = 0;
        let g = 0;
        b = Math.floor(Math.random() * 255);
        r = Math.floor(Math.random() * 255);
        g = Math.floor(Math.random() * 255);
        ev.fromElement.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
}

//Picked color

let allInput = document.querySelectorAll('input');
let rInput
let gInput
let bInput
let inputWarning = document.getElementById('input-warning');

for (let i = 0; i < 3; i++) {
    allInput[i].addEventListener('input', () => {
        grid.removeEventListener('mouseover', addColor());
        colorPickingActive = true;
        normalModeActive = false;
        funkyModeActive = false;
        grid.addEventListener('mouseover', addColor());
        if (allInput[i].value > 255 || allInput[i].value < 0 || isNaN(parseInt(allInput[i].value))) {
            inputWarning.textContent = "Please enter a number from 0 to 255";
        } else {
            inputWarning.textContent = "";
            rInput = allInput[0].value;
            gInput = allInput[1].value;
            bInput = allInput[2].value;
            inputWarning.textContent = `You picked color rgb(${rInput}, ${gInput}, ${bInput})`;
        }
    });
}

function addColorPicked(ev) {
    if (ev.fromElement.className === "cell") {
        rInput = allInput[0].value;
        gInput = allInput[1].value;
        bInput = allInput[2].value;
        ev.fromElement.style.backgroundColor = `rgb(${rInput},${gInput},${bInput})`;
    }
}

function addColorBlended(ev) {
    if (ev.fromElement.className === "cell") {
        let b = 0;
        let r = 0;
        let g = 0;
        ev.fromElement.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
}

function addColor() {
    colormodeActive = true;
    if (colorPickingActive) {
        return colormode = addColorPicked;
    } else if (funkyModeActive) {
        return colormode = addRandom;
    } else if (normalModeActive) {
        return colormode = addBlue;
    }
}


//RESETTING GRID
function resetGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

//USER CUSTOMIZED GRID SIZE
let userCellNum
function getUserGrid() {
    userCellNum = prompt('What type of grid do you want?')

    if (userCellNum === null || userCellNum === NaN || userCellNum <= 0 || userCellNum > 100) {
        alert('please enter a number between 1 and 100')
    } else {
        resetGrid()
        createGrid(userCellNum);
    }
};

//NEW FUNCTIONS BUTTONS
const buttonSize = document.getElementById('button-size');
buttonSize.addEventListener('click', getUserGrid)

const buttonReset = document.getElementById('button-reset')
buttonReset.addEventListener('click', () => {
    resetGrid();
    createGrid(userCellNum);
})

const funkyMode = document.getElementById('button-funky');
funkyMode.addEventListener('click', () => {
    grid.removeEventListener('mouseover', addColor());
    funkyModeActive = true;
    normalModeActive = false;
    colorPickingActive = false;
    grid.addEventListener('mouseover', addColor());
})

const normalMode = document.getElementById("button-normal");
normalMode.addEventListener('click', () => {
    grid.removeEventListener('mouseover', addColor());
    normalModeActive = true;
    funkyModeActive = false;
    colorPickingActive = false;
    grid.addEventListener('mouseover', addColor());
})

const customMode = document.getElementById("button-custom");
customMode.addEventListener('click', () => {
    grid.removeEventListener('mouseover', addColor());
    colorPickingActive = true;
    normalModeActive = false;
    funkyModeActive = false;
    grid.addEventListener('mouseover', addColor());
})

//TOGGLE COLOR TRAIL WITH CLICK
grid.addEventListener('click', () => {
    colormodeActive ? stopColor() : grid.addEventListener('mouseover', addColor());
});

function stopColor() {
    grid.removeEventListener('mouseover', addColor());
    colormodeActive = false;
}


grid.addEventListener('mouseover', addColor());


