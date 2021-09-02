import React, {useState} from 'react'
import { BuildQueue } from './BuildQueue'
import {TrainingQueue} from './TrainingQueue'
import { useSelector } from 'react-redux'

export const PlayerInformation =() => {

    const buildingQueue = useSelector((state)=> state.players.playerBuildingQueue)
    const trainingQueue = useSelector((state)=> state.players.playerTrainingQueue)
    const playerName = useSelector((state)=> state.players.playerName)
    const [page, setPage] = useState("training")
    
    return (
        <div className="player-container">
            <h1>{playerName}</h1>
            <div>
                <nav className="construction-nav">
                    <div className="tab" onClick={()=>setPage("training")}>Units ({trainingQueue.length ? trainingQueue.length : 0})</div>
                    <div className="tab" onClick={()=>setPage("building")}>Buildings ({buildingQueue.length ? buildingQueue.length : 0})</div>
                </nav>
                
                {page === 'training' ? 
                    <TrainingQueue/> :
                    <BuildQueue/>
                }
            </div>
        </div>
    )
}