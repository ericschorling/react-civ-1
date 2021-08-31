import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import{updatePlayerBuilding} from '../features/gameboard/playerSlice'

export const BuildQueue = () => {
    const playerBuildQueue = useSelector((state) => state.players.playerBuildingQueue)
    const dispatch = useDispatch()

    const _handleBuildClickDelete=(building)=>{
        console.log("clicked", building)
        let newQueue = playerBuildQueue.map((building) => building)
        newQueue.splice(building,1)
        dispatch(updatePlayerBuilding(newQueue))
    }

    
    return (
        <>
            <div>
                <h2>Building Queue</h2>
                {playerBuildQueue ? playerBuildQueue.map((building, key)=>(
                    <>
                        <img
                            className="building-image" 
                            alt={building.building}
                            src={`assets/${building.building}.jpg`} 
                            onClick={()=>_handleBuildClickDelete(key)}
                        ></img>
                        <p> {building.turns} remaining</p> 
                    </>
                )):null}
            </div>
        </>
    )
}