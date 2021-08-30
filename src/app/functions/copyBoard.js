import { isPlayerCastle } from "../../styles/tileStyles"
export const copyGameBoard = (board)=> {
    let gameBoardArray = []
    for(let x = 0; x<board.length; x++){
        gameBoardArray.push([])
        for(let y = 0; y< board[x].length; y++){
            let tile = {
                size: board[x][y].size,
                style: board[x][y].style,
                background: board[x][y].style,
                feature: board[x][y].feature
            }
            tile.style = isPlayerCastle([x,y])
            gameBoardArray[x].push(tile)
        }
    }
    return gameBoardArray
}