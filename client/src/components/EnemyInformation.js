import React from 'react'
import { useSelector } from 'react-redux'

export const EnemyInformation = () => {
    const enemyBuildQueue = useSelector((state)=>state.players.enemyBuildingQueue)
    const enemyTrainingQueue = useSelector((state)=>state.players.enemyTrainingQueue)
    const enemyUnits = useSelector((state)=>state.players.enemyUnits)
    const warriorStrength = useSelector((state)=>state.players.modifiers.units.warrior.power)
    const enemyHealth = useSelector((state)=>state.players.enemyHealth)
    return (
        <div className="enemy-information">
            <h1>Enemy</h1>
            <h3>Power: {enemyUnits.length? enemyUnits.filter(unit => unit.unit === "warrior").length * warriorStrength:null}</h3>
            <h3>Health: {enemyHealth}</h3>
            <h2>Building Queue</h2>
            {enemyBuildQueue.length? enemyBuildQueue.map((building, key)=>(
                    <div key={key} className="queue-image">
                        <img
                            className="building-image" 
                            alt={building.building}
                            src={`assets/${building.building}.jpg`} 
                        ></img>
                        <p> {building.turns} turns</p> 
                    </div>
                )):null}
            <h2>Training Queue</h2>
            <div className="unit-display">
                {enemyTrainingQueue.length ? enemyTrainingQueue.map((unit, key)=>(
                    <div key={key} className="queue-image">
                        <img
                            className="unit-image" 
                            alt={unit.unit}
                            src={`assets/${unit.unit}.jpg`} 
                        ></img>
                        <p> {unit.turns} turns</p> 
                    </div>
                )):null
                }
            </div>
            <h3>Units Available</h3>
            <div className="unit-display">
                {enemyUnits.length ? enemyUnits.map((unit, key)=>(
                    <div className="queue-image">
                        <img
                            key={key}
                            className="unit-image" 
                            alt={unit.unit}
                            src={`assets/${unit.unit}.jpg`} 
                        ></img> 
                        <p>{unit.unit}</p>
                    </div>
                )):null
                }
                </div>
                
        </div>
    )
}