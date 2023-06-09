const gameBoard = document.querySelector('#gameboard')
const infoDisplay = document.querySelector('#info')
const startCells = [
    "", "", "","", "", "","", "", ""
]

let go = 'circle'
infoDisplay.textContent = "Circle goes first"


function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellELement = document.createElement('div')
        cellELement.classList.add('square')
        cellELement.id = index;
        cellELement.addEventListener('click', addGo)
        gameBoard.append(cellELement)
    })
}
createBoard()

function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === 'circle' ? 'cross' : 'circle'
    infoDisplay.textContent = "it is now " + go + "'s go."
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2], [3, 4, 5], [6, 7,8],
        [0,3,6], [1, 4, 7], [2, 5,8],
        [0,4,8], [2, 4, 6]
    ]

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'))
        if (circleWins) {
            infoDisplay.textContent = "Circle Wins"
            setTimeout(resetBoard, 1000)
            //allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))  //replace removes eventlisteners(actually you cant remove eventlisteners)
            return
        }
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('cross'))
        if (crossWins) {
            infoDisplay.textContent = "Cross Wins"
            setTimeout(resetBoard, 1000)
            return
        }
    })
    
}

function resetBoard() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach(square => {
        square.textContent = ""
        square.addEventListener('click', addGo)
    })
    go = 'circle'
    infoDisplay.textContent = "Circle goes first"
}

const restart = document.querySelector(".restart")
function start() {
   return restart.addEventListener('click', resetBoard)
}

start()