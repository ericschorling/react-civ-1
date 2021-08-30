import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { updateGameTile, updateGameBoard } from '../features/gameboard/gameboardSlice'
import {isPlayerCastle,  selectStyle} from '../styles/tileStyles'
import { copyGameBoard } from '../app/functions/copyBoard'
const TOP_MARGIN = 102
const TILE_SIZE = 52
const BUILDING_ARRAY = ["farm", "house", "barracks"]


const updateBoard =(board, style , location) =>{
    let newBoard
    newBoard = board.map((row)=> newBoard.push([...row]))
    newBoard[location[0]][location[1]] = 1
    return newBoard
}

export default function Tile(props){
    const board = useSelector((state) => state.gameBoard.board)
    const tileData = board[props.location[0]][props.location[1]]
    const [modalOpenState, setModalOpenState] = useState(false)
    const [TileStyle, setTileStyle] = useState(selectStyle(tileData.style))
    const [mousePosition, setMousePosition] = useState([0,0])
    const dispatch = useDispatch()

    
    const _handleModalClick=()=>{
        setModalOpenState(false)
    }
    const _handleTileClick=(position,coordinates)=>{
        console.log("Clicked at " + position + coordinates)
        setMousePosition(coordinates) 
        setModalOpenState(true)      
    }
    
    const _handleBuildClick=(building)=>{
        let newBoard = copyGameBoard(board)
        console.log(newBoard)
        newBoard[props.location[0]][props.location[1]].style = building
        dispatch(updateGameBoard(newBoard))
        console.log(newBoard)
        console.log(board)
        setTileStyle(selectStyle(tileData.style))
        setModalOpenState(false)
    }
    
    return (
        <>
            
            <div className={tileData.style}
                onClick={()=>board[props.location[0]][props.location[1]].style === "grass" ? _handleTileClick(props.location, props.coordinates) : null}
                >
            </div>
        
            <ReactModal
                style={{
                    content: {
                        height:'240px',
                        width: '220px',
                        top: `${mousePosition[1]}px`,
                        left: `${mousePosition[0]}px`
                    }
                }}
                isOpen={modalOpenState} 
            >
            <p className="modal-title">Build Something</p>
            <div className="building-modal-container">
                {BUILDING_ARRAY.map((building, key)=>(
                    <div key={key} className="building-item">
                        <img
                            className="building-image" 
                            alt={building}
                            src={`assets/${building}.jpg`} 
                            onClick={()=>_handleBuildClick(building)}
                        ></img>
                        <span>{`${building} (3 turns)`}</span>
                    </div>
                ))}
            </div>
            <div className="button-modal-container">
                <div className="div-button" onClick={()=>_handleModalClick()}>
                    Close
                </div>
            </div>
            </ReactModal>
        </>
    )
}
