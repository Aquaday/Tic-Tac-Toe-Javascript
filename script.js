const gameBoard = document.querySelector("#gameboard")
const info = document.querySelector("#info")
const resetbutton = document.querySelector("#resetButton")
let go = "circle"

const startCells = ["", "", "", "", "", "", "", "", ""]

function createBoard() {
    startCells.forEach((cell, index) => {
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        cellElement.id = index
        cellElement.addEventListener("click", addGo)
        gameBoard.append(cellElement)

    })
}

createBoard()

resetbutton.addEventListener("click", () => {
    gameBoard.innerHTML = ""
    info.innerHTML = ""
    createBoard()
})


function addGo(e) {
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)

    //sjekker om verdien på "go" er det samme som "circle", og hvis det er det, så bytter den til cross.
    //hvis den ikke er circle, så bytter den til circle
    go = go === "circle" ? "cross" : "circle"
    info.textContent = "it is now " + go + "'s turn"
    e.target.removeEventListener("click", addGo)
    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2], [3,4,5], [6, 7, 8],
        [0,3,6], [1,4,7], [2, 5, 8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
            //sjekker alle squares, om den har en child (firstChild?), og om den Child har klassen circle
            allSquares[cell].firstChild?.classList.contains("circle"))
        if (circleWins) {
            info.textContent = "Circle Wins!"

            //denne fjerner alle eventListeners på squares, med å se igjennom alle squares, 
            //og bytte den ut med en kopi som inneholder samme verdiene, men ikke funksjonene
            //true i cloneNode betyr at den også kopierer resten av det som ligger inne i valgte square.
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        }
    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains("cross"))
        if (crossWins) {
            info.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        }
    })

    
}


// const circleElement = document.createElement("div")
// circleElement.classList.add("cross")
// cellElement.append(circleElement)