import React, { useState } from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

const GrassTileStyle = styled.div`
    background: green;
`
const HouseTileStyle = styled.div`
    background-image: url("assets/house.jpg");
    background-repeat: no-repeat;
    background-position: center;
`
const FarmTileStyle = styled.div`
    background-image: url("assets/farm.jpg");
    background-repeat: no-repeat;
    background-position: center;
`

const BarracksTileStyle = styled.div`
    background-image: url("assets/barracks.jpg");
    background-repeat: no-repeat;
    background-position: center;
`
const TOP_MARGIN = 102
const TILE_SIZE = 52
const BUILDING_ARRAY = ["farm", "house", "barracks"]


export default function Tile(props){
    const BarracksTileStyle = styled.div`
        background-image: url("assets/barracks.jpg");
        background-repeat: no-repeat;
        background-position: center;`
    const [modalOpenState, setModalOpenState] = useState(false)
    const [TileStyle, setTileStyle] = useState(GrassTileStyle)
    const [mousePosition, setMousePosition] = useState([0,0])
    
    
    const _handleModalClick=()=>{
        setModalOpenState(false)
    }
    const _handleTileClick=(position,coordinates)=>{
        console.log("Clicked at " + position + coordinates)
        //setTileStyle(HouseTileStyle)
        setMousePosition(coordinates) 
        setModalOpenState(true)      
    }
    const _handleBuildClick=(building)=>{
        let style
        switch (building) {
            case "house":
                style = HouseTileStyle;
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
        setTileStyle(style)
        setModalOpenState(false)
    }
    
    return (
        <>
            <TileStyle onClick={()=>_handleTileClick(props.location, props.coordinates)}className="tile">
            </TileStyle>
            <ReactModal
                    style={{
                        content: {
                            height:'200px',
                            width: '300px',
                            top: `${mousePosition[1]}px`,
                            left: `${mousePosition[0]}px`
                        }
                    }}
                    isOpen={modalOpenState} 
                >
                    <p className="modal-title">Build Something</p>
                    {/* <img alt="house" src="/assets/house.jpg" onClick={()=>_handleBuildClick("house")}></img><span>Housing (2 turns)</span> */}
                    
                    {BUILDING_ARRAY.map((building, key)=>(
                        <div key={key}>
                            <img 
                                alt={building}
                                src={`/assets/${building}.jpg`} 
                                onClick={()=>_handleBuildClick(building)}
                            ></img>
                            <span>{`${building} (3 turns)`}</span>
                        </div>
                    ))}
                    <div className="div-button" onClick={()=>_handleModalClick()}>Close</div>
            </ReactModal>
        </>
    )
}
