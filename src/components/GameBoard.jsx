import React, { useState } from 'react'
import Tile from './Tile'

const BOARD_SIZE = 14
const TILE_SIZE = 5
export default function GameBoard() {
    const [mousePosition, setMousePosition] = useState([0,0])
    const [gameBoard, setGameBoard ] = useState([])
    let tile = {
        size: TILE_SIZE,
        background: "green",
        feature: undefined
    }
    const createNewGameBoard =()=> {
        let gameBoardArray = []
        for(let x = 0; x<BOARD_SIZE; x++){
            gameBoardArray.push([])
            for(let y = 0; y< BOARD_SIZE; y++)
            gameBoardArray[x].push(tile)
        }
        setGameBoard(gameBoardArray)  
    }
    const _handleStart=()=>{
        createNewGameBoard()
    }
    const _handleMouseMove=(coordinates)=>{
        setMousePosition(coordinates)
    }

    return (
        <>
            <div >
                <h1>
                    Foundation
                </h1>
                <button onClick={()=>_handleStart()}>Start Game</button>
                <div onMouseMove={(e)=>_handleMouseMove([e.clientY, e.clientX])} className="gameboard-container">
                    {gameBoard.map((tileArray,key)=>(
                        <div className="row" key={key}>
                            {gameBoard[key].map((tile,key2)=>(
                                <Tile key={key2} location={[key,key2]}
                                coordinates={mousePosition}
                                    background={'green'}/>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}