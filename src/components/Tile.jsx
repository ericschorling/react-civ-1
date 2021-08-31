import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import {updateGameBoard } from '../features/gameboard/gameboardSlice'
import { copyGameBoard } from '../app/functions/copyBoard'
import { updatePlayerBuilding } from '../features/gameboard/playerSlice'
// const TOP_MARGIN = 102
// const TILE_SIZE = 52
const BUILDING_ARRAY = ["farm", "house", "barracks"]



export default function Tile(props){
    const board = useSelector((state) => state.gameBoard.board)
    const tileData = board[props.location[0]][props.location[1]]
    const [modalOpenState, setModalOpenState] = useState(false)
    const [mousePosition, setMousePosition] = useState([0,0])
    const dispatch = useDispatch()
    const playerBuildQueue = useSelector((state)=>state.players.playerBuildingQueue)
    const buildingSpeed = useSelector((state)=> state.players.playerBuildingSpeeds)

    
    const _handleModalClick=()=>{
        setModalOpenState(false)
    }
    const _handleTileClick=(position,coordinates)=>{
        console.log("Clicked at " + position + coordinates)
        setMousePosition(coordinates) 
        setModalOpenState(true)      
    }
    
    const _handleBuildClick=(building)=>{
        let newBuilding = {
            building: building,
            turns: buildingSpeed[building],
            location: props.location
        }
        let newBoard = copyGameBoard(board)
        let tile = {
            style: "building",
            turn: buildingSpeed[building],
            buildstyle: building
        }
        newBoard[props.location[0]][props.location[1]] = tile
        dispatch(updateGameBoard(newBoard))
        
        let newQueue = playerBuildQueue.map((building) => building)
        newQueue.push(newBuilding)
        dispatch(updatePlayerBuilding(newQueue))
        setModalOpenState(false)
    }
    
    return (
        <>
            
            <div className={tileData.turn ? tileData.style : tileData.buildstyle}
                onClick={()=>board[props.location[0]][props.location[1]].style === "grass" ? _handleTileClick(props.location, props.coordinates) : null}
                >
                {tileData.turn ? tileData.turn : null}
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
                        <span>{`${building} (${buildingSpeed[building]} turns)`}</span>
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
