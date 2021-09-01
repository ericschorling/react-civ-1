
export const copyGameBoard = (board)=> {
    let gameBoardArray = []
    for(let x = 0; x<board.length; x++){
        gameBoardArray.push([])
        for(let y = 0; y< board[x].length; y++){
            let tile = {
                style: board[x][y].style,
                turn: board[x][y].turn,
                buildstyle: board[x][y].buildstyle
            }
            // tile.style = isPlayerCastle([x,y])
            gameBoardArray[x].push(tile)
        }
    }
    return gameBoardArray
}

// export const 