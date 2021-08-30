import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { updateGameTile, updateGameBoard } from '../features/gameboard/gameboardSlice'
import { HouseTileStyle, FarmTileStyle, BarracksTileStyle, isPlayerCastle, GrassTileStyle, Wrapper, selectStyle} from '../styles/tileStyles'

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
    const copyGameBoard = ()=> {
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
    const _handleBuildClick=(building)=>{
        let style
        switch (building) {
            case "house":
                style = "house";
                break;
            case "farm":
                style = FarmTileStyle;
                break;
            case "barracks":
                style = BarracksTileStyle;
                break;
            default:
                break;
        }
        let newBoard = copyGameBoard()
        console.log(newBoard)
        newBoard[props.location[0]][props.location[1]].style = "house"
        dispatch(updateGameBoard(newBoard))
        console.log(newBoard)
        console.log(board)
        setTileStyle(selectStyle(tileData.style))
        setModalOpenState(false)
    }
    
    return (
        <>
            <Wrapper>
                <TileStyle 
                    onClick={()=>board[props.location[0]][props.location[1]].style === "grass" ? _handleTileClick(props.location, props.coordinates) : null}
                    className="tile">
                </TileStyle>
            </Wrapper>
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
                            src={`/assets/${building}.jpg`} 
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
