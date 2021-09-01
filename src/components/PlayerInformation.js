import React, {useState} from 'react'
import { BuildQueue } from './BuildQueue'
import {TrainingQueue} from './TrainingQueue'
import { useSelector } from 'react-redux'

export const PlayerInformation =() => {
    const playerUnits = useSelector((state)=>state.players.playerUnits)
    const gameModifiers = useSelector((state)=> state.players.modifiers)
    const buildingQueue = useSelector((state)=> state.players.playerBuildingQueue)
    const trainingQueue = useSelector((state)=> state.players.playerTrainingQueue)
    const playerPopulation = useSelector((state) =>state.players.playerPopulation)
    const warriorPower = gameModifiers.units.warrior.power
    const playerHealth = useSelector((state)=> state.players.playerHealth)
    const [page, setPage] = useState("training")
    
    const getPlayerPower=()=>{
        let playerArmy = playerUnits.length ? playerUnits.filter(unit => unit.unit === "warrior") : []
        let totalPower = playerArmy.length ? playerArmy.length * warriorPower : 0
        return totalPower
    }

    
    return (
        <div className="player-container">
            <h1>Player 1</h1>
            <h3>Power: {`${getPlayerPower()}`}</h3>
            <h4>Health: {playerHealth}</h4>
            <h4>Population: {`${playerUnits.length} / ${playerPopulation}`}</h4>
            <nav className="construction-nav">
                <div className="tab" onClick={()=>setPage("training")}>Units ({trainingQueue.length ? trainingQueue.length : 0})</div>
                <div className="tab" onClick={()=>setPage("building")}>Buildings ({buildingQueue.length ? buildingQueue.length : 0})</div>
            </nav>
            
            {page === 'training' ? <TrainingQueue/> :
            <BuildQueue/>}
        </div>
    )
}