import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import{updatePlayerBuilding} from '../features/gameboard/playerSlice'
import{removeBuilding} from '../features/gameboard/gameboardSlice'

export const BuildQueue = () => {
    const playerBuildQueue = useSelector((state) => state.players.playerBuildingQueue)
    const dispatch = useDispatch()

    const _handleBuildClickDelete=(key, building)=>{
        console.log("clicked", building)
        let newQueue = playerBuildQueue.map((building) => building)
        newQueue.splice(key,1)
        dispatch(updatePlayerBuilding(newQueue))
        dispatch(removeBuilding(building.location))
    }

    
    return (
        <>
            <div className="building-queue">
                <h2>Building Queue</h2>
                <div className="unit-display">
                    {playerBuildQueue ? playerBuildQueue.map((building, key)=>(
                        <div className="queue-image">
                            <img
                                key={key}
                                className="building-image" 
                                alt={building.building}
                                src={`assets/${building.building}.jpg`} 
                                onClick={()=>_handleBuildClickDelete(key, building)}
                            ></img>
                            <p> {building.turns} turns</p> 
                        </div>
                    )):null}
                    </div>
            </div>
        </>
    )
}