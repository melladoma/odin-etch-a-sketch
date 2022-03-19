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
            newCell.setAttribute("data-col", i);
            //calc of dynamic cell size within fixed grid size
            let cellSize = (maxSize - 2 * cellsNum) / cellsNum;
            newCell.style.height = `${cellSize}px`;
            newCell.style.width = `${cellSize}px`;
        }
        rows[i].setAttribute("data-row", i);
    }
}
let cells = document.getElementsByClassName('cell');

createGrid(); //creates a grid upon loading

//LEAVING PEN-LIKE TRAIL UPON HOVERING

//-- COLOR MODES
let colormodeActive = true;
let normalModeActive = true;
let funkyModeActive = false;
let colorPickingActive = false;
let blendEffectActive;



//default mode
let bBlue = 255;
let rBlue = 0;
let gBlue = 0;
function addBlue(ev) {
    normalModeActive = true;
    if (ev.fromElement.className.includes("cell")) {
        ev.fromElement.style.backgroundColor = `rgb(${rBlue}, ${gBlue}, ${bBlue})`;
        if (blendEffectActive) { addColorBlend(ev) };
    }
}

//Random color - Funky Mode
let bRandom = 0;
let rRandom = 0;
let gRandom = 0;
function addRandom(ev) {
    funkyModeActive = true;
    if (ev.fromElement.className.includes("cell")) {
        bRandom = Math.floor(Math.random() * 255);
        rRandom = Math.floor(Math.random() * 255);
        gRandom = Math.floor(Math.random() * 255);
        ev.fromElement.style.backgroundColor = `rgb(${rRandom}, ${gRandom}, ${bRandom})`;
        if (blendEffectActive) { addColorBlend(ev) };
    }
}

//Picked color
let allInput = document.querySelectorAll('input.rgbinput');
let rInputValue
let gInputValue
let bInputValue
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
            rInputValue = allInput[0].value;
            gInputValue = allInput[1].value;
            bInputValue = allInput[2].value;
            inputWarning.textContent = `You picked color rgb(${rInputValue}, ${gInputValue}, ${bInputValue})`;
        }
    });
}

function addColorPicked(ev) {
    if (ev.fromElement.className.includes("cell")) {
        rInputValue = allInput[0].value;
        gInputValue = allInput[1].value;
        bInputValue = allInput[2].value;
        ev.fromElement.style.backgroundColor = `rgb(${rInputValue}, ${gInputValue}, ${bInputValue})`;
        if (blendEffectActive) { addColorBlend(ev) };
    }
}
console.log(rInputValue)
// ADDING TRAIL 
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

//BLENDING EFFECT (AVAILABLE ON ALL COLOR MODES) 
//HAS TO BE IMPROVED with another state than disabled because cells cannot be recolored after,  but with what?

function addColorBlend(ev) {
    ev.fromElement.addEventListener('mouseleave', togglestate);//one pass :disabled
    if (ev.fromElement.disabled && ev.fromElement.style.filter !== "brightness(0.35)") {
        ev.fromElement.style.filter = "brightness(0.55)";
        ev.fromElement.addEventListener('mouseleave', togglestate);//two pass:abled
    } else if (ev.fromElement.style.filter === "brightness(0.55)" && !ev.fromElement.disabled) {
        ev.fromElement.style.filter = "brightness(0.35)";
        ev.fromElement.addEventListener('mouseleave', togglestate);//three pass:disabled
    }
}
function togglestate(ev) {
    (ev.fromElement.disabled) ? ev.fromElement.disabled = false : ev.fromElement.disabled = true
}


//USER CUSTOMIZED GRID SIZE
let userCellNum
function getUserGrid() {
    userCellNum = prompt('How many squares-wide do you want your grid? \n\nNote: default is 16 squares wide.')

    if (userCellNum === null || userCellNum === NaN || userCellNum <= 0 || userCellNum > 100) {
        alert('please enter a number between 1 and 100')
    } else {
        resetGrid()
        createGrid(userCellNum);
    }
};

//GRID MODE BUTTONS + EVENTS
const buttonSize = document.getElementById('button-size');
buttonSize.addEventListener('click', getUserGrid)

const buttonReset = document.getElementById('button-reset')
buttonReset.addEventListener('click', () => {
    resetGrid();
    styleButton();
    createGrid(userCellNum);

})

//borderless grid mode
const borderMode = document.getElementById('border-switch');
let borderModeActive = false;
borderMode.addEventListener('click', () => {
    if (borderModeActive) {
        borderModeActive = false;
        for (let k = 0; k < cells.length; k++) {
            cells[k].classList.remove("borderless")
        }
    } else {
        borderModeActive = true;
        for (let k = 0; k < cells.length; k++) {
            cells[k].classList.add("borderless")
        }
    }
})

//bubble grid mode
const cellMode = document.getElementById('bubble-switch');
let cellModeActive = false;
cellMode.addEventListener('click', () => {
    if (cellModeActive) {
        cellModeActive = false;
        for (let k = 0; k < cells.length; k++) {
            cells[k].classList.remove("bubble")
        }

    } else {
        cellModeActive = true;
        for (let k = 0; k < cells.length; k++) {
            cells[k].classList.add("bubble")
        }
    }
})

//RESETTING GRID
function resetGrid() {
    cellModeActive = false;
    borderModeActive = false;
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function check(inputId) {
    document.getElementById(inputId).checked = true;
}

function uncheck(inputId) {
    document.getElementById(inputId).checked = false;
}

//COLOR MODE BUTTONS + EVENTS

const funkyMode = document.getElementById('button-funky');
funkyMode.addEventListener('click', () => {
    grid.removeEventListener('mouseover', addColor());
    funkyModeActive = true;
    normalModeActive = false;
    colorPickingActive = false;
    grid.addEventListener('mouseover', addColor());
    styleButton();
})

const normalMode = document.getElementById("button-normal");
normalMode.addEventListener('click', () => {
    grid.removeEventListener('mouseover', addColor());
    normalModeActive = true;
    funkyModeActive = false;
    colorPickingActive = false;
    grid.addEventListener('mouseover', addColor());
    styleButton();
})

const customMode = document.getElementById("button-custom");
customMode.addEventListener('click', () => {
    grid.removeEventListener('mouseover', addColor());
    colorPickingActive = true;
    normalModeActive = false;
    funkyModeActive = false;
    grid.addEventListener('mouseover', addColor());
    styleButton();
})

//Blend mode toggle
const blendEffect = document.getElementById('blend-switch');
blendEffect.addEventListener('click', () => {
    if (blendEffectActive) {
        blendEffectActive = false;
    } else {
        blendEffectActive = true;
    }
})

//RESETTING BUTTONS AND TOGGLES
let rInput = allInput[0];
let gInput = allInput[1];
let bInput = allInput[2];
function styleButton() {
    if (normalModeActive) {
        normalMode.classList.add("active")
    } else if (!normalModeActive) {
        normalMode.classList.remove("active")
    }
    if (funkyModeActive) {
        funkyMode.classList.add("active")
    } else if (!funkyModeActive) {
        funkyMode.classList.remove("active")
    }
    if (colorPickingActive) {
        customMode.classList.add("active")
        rInput.classList.add("active");
        gInput.classList.add("active");
        bInput.classList.add("active");
    } else if (!colorPickingActive) {
        customMode.classList.remove("active")
        rInput.classList.remove("active");
        gInput.classList.remove("active");
        bInput.classList.remove("active");
    }
    if (!cellModeActive) {
        uncheck("bubble-switch");
    } else if (cellModeActive) {
        check("bubble-switch");
    }
    if (!borderModeActive) {
        uncheck("border-switch");
    } else if (borderModeActive) {
        check("border-switch");
    }
}

let rgbChoices = { red: "rgb(139, 0, 0)", green: "rgb(0, 128, 0)", blue: "rgb(0, 0, 255)", babyblue: "rgb(135,206,250)", yellow: "rgb(250,250,210)", orange: "rgb(255,165,0)", pink: "rgb(255,192,203)", violet: "rgb(139,0,139)", grey: "rgb(100,100,100)", black: "rgb(0,0,0)", white: "rgb(255,255,255" };



//TOGGLE COLOR TRAIL WITH CLICK
grid.addEventListener('click', () => {
    colormodeActive ? stopColor() : grid.addEventListener('mouseover', addColor());
});

function stopColor() {
    grid.removeEventListener('mouseover', addColor());
    colormodeActive = false;
}
styleButton();
grid.addEventListener('mouseover', addColor());
