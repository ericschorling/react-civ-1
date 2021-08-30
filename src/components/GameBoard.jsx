import React, { useState } from 'react'
import Tile from './Tile'
import { isPlayerCastle } from '../styles/tileStyles'
import { useDispatch, useSelector } from 'react-redux'
import {setGameState, updateGameBoard, incrementTurn} from '../features/gameboard/gameboardSlice'
import { PlayerInformation } from './PlayerInformation'

const BOARD_SIZE = 14
const TILE_SIZE = 50


export default function GameBoard() {
    const [mousePosition, setMousePosition] = useState([0,0])
    //const [gameBoard, setGameBoard ] = useState([])
    const board = useSelector((state) => state.gameBoard.board)
    const gameState = useSelector((state) => state.gameBoard.gameState)
    const dispatch = useDispatch()
    
    let tile = {
        size: TILE_SIZE,
        style: undefined,
        background: "green",
        feature: undefined
    }
    const createNewGameBoard = ()=> {
        let gameBoardArray = []
        for(let x = 0; x<BOARD_SIZE; x++){
            gameBoardArray.push([])
            for(let y = 0; y< BOARD_SIZE; y++){
                tile.style = isPlayerCastle([x,y])
                gameBoardArray[x].push(tile)
                console.log(tile.style)
            }
        }
        dispatch(setGameState(true))
        return gameBoardArray
        
    }
    const _handleStart=(restart)=>{
        dispatch(incrementTurn("new game"))
        dispatch(updateGameBoard(createNewGameBoard()))
        
    }
    const _handleMouseMove=(coordinates)=>{
        setMousePosition(coordinates)
    }

    const _handleTurnEnd =()=>{
        dispatch(incrementTurn())

    }

    return (
        <>
            <div >
                <div className="board-header">
                    <h1>
                        Foundation
                    </h1>
                    {gameState ? 
                        <div className="button-row">
                            <button onClick={()=>_handleStart(1)}>Restart</button>
                            <button onClick={()=>_handleTurnEnd()}>End Turn</button>
                        </div>
                        :
                        <button onClick={()=>_handleStart()}>
                            Start Game
                        </button>}
                   
                </div>
                 <div className="game-space">   
                    <div className="enemy-information">The Enemy</div>
                    <div 
                        onMouseMove={(e)=>_handleMouseMove([e.clientX,e.clientY])} 
                        className="gameboard-container">
                        {board.map((tileArray,key)=>(
                            <div className="row" key={key}>
                                {board[key].map((tile,key2)=>(
                                    <Tile 
                                        key={key2} 
                                        location={[key,key2]}
                                        coordinates={mousePosition}
                                        style={tile.style}
                                        className={tile.style}
                                    />

                                ))}
                            </div>
                        ))}
                    </div>
                    <div>
                        <PlayerInformation />
                    </div>
                </div>
            </div>
        </>
    )

}