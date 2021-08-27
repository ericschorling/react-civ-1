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



export default function Tile(props){
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
    
    
    return (
        <>
            <TileStyle onClick={()=>_handleTileClick(props.location, props.coordinates)}className="tile">
            </TileStyle>
            <ReactModal
                    // className="modal" 
                    style={{
                        content: {
                            height:'100px',
                            width: '100px',
                            top: `${mousePosition[0]}px`,
                            left: `${mousePosition[1]}px`
                        }
                    }}
                    isOpen={modalOpenState} 
                >
                    <p>content  at {props.location}</p>
                    <div className="div-button" onClick={()=>_handleModalClick()}>Close</div>
            </ReactModal>
        </>
    )
}
