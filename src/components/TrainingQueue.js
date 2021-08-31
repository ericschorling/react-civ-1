import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import{updatePlayerTraining, updatePlayerTrainingQueue} from '../features/gameboard/playerSlice'

export const TrainingQueue = () => {
    const playerTrainingQueue = useSelector((state) => state.players.playerTrainingQueue)
    const playerTrainingSpeeds = useSelector((state)=>state.players.playerTrainingSpeeds)
    const trainedUnits = useSelector((state)=>(state.players.playerUnits))
    const buildingModifiers = useSelector((state)=>(state.players.modifiers.buildings))
    const currentBuildings = useSelector((state)=> (state.players.playerBuildings))
    const dispatch = useDispatch()

    const setUnitTrainingSpeed =(unit)=>{
        let trainingTurns = 0
        for(const building of currentBuildings){
            if(buildingModifiers[building.building].unit === unit){
                trainingTurns -= buildingModifiers[building.building].turns
            }
        }
        let finalTurns = playerTrainingSpeeds[unit] + trainingTurns
        return finalTurns <= 0 ? 1 : finalTurns
    }

    const _handleUnitClickDelete=(unit)=>{
        console.log("clicked", unit)
        let newQueue = playerTrainingQueue.map((unit) => unit)
        newQueue.splice(unit,1)
        dispatch(updatePlayerTraining(newQueue))
    }
    const _handleBuildUnit=(unit)=>{
        let newUnit ={
            unit: unit,
            turns: setUnitTrainingSpeed(unit)
        }
        dispatch(updatePlayerTrainingQueue(newUnit))
    }
    
    return (
        <>
            <h2>Train Units</h2>
            <div className="unit-display">
                <div className="queue-image">
                <img
                    alt="unit"
                    src="assets/worker.jpg"
                    onClick={()=>_handleBuildUnit("worker")}>

                </img>
                    worker
                </div>
                <div className="queue-image">
                <img
                    alt="unit"
                    src="assets/warrior.jpg"
                    onClick={()=>_handleBuildUnit("warrior")}>

                </img>
                    warrior
                </div>
            </div>
            <h2>Training Queue</h2>
            <div className="unit-display">
                {playerTrainingQueue ? playerTrainingQueue.map((unit, key)=>(
                    <div className="queue-image">
                        <img
                            key={key}
                            className="unit-image" 
                            alt={unit.unit}
                            src={`assets/${unit.unit}.jpg`} 
                            onClick={()=>_handleUnitClickDelete(key)}
                        ></img>
                        <p> {unit.turns} turns</p> 
                    </div>
                )):null
                }
            </div>
            <h3>Units Available</h3>
            <div className="unit-display">
                {trainedUnits ? trainedUnits.map((unit, key)=>(
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
        </>
    )
}