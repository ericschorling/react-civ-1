import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import{updatePlayerTrainingQueue} from '../features/gameboard/playerSlice'

export const TrainingQueue = () => {
    const playerTrainingQueue = useSelector((state) => state.players.playerTrainingQueue)
    const playerTrainingSpeeds = useSelector((state)=>state.players.playerTrainingSpeeds)
    const dispatch = useDispatch()

    const _handleUnitClickDelete=(unit)=>{
        console.log("clicked", unit)
        let newQueue = playerTrainingQueue.map((unit) => unit)
        newQueue.splice(unit,1)
        dispatch(updatePlayerTrainingQueue(newQueue))
    }
    const _handleBuildUnit=(unit)=>{
        let newUnit ={
            unit: unit,
            turns: playerTrainingSpeeds[unit] 
        }
        dispatch(updatePlayerTrainingQueue(newUnit))
    }
    
    return (
        <>
            <h2>Train Units</h2>
            <img
                alt="unit"
                src="assets/worker.jpg"
                onClick={()=>_handleBuildUnit("worker")}></img>
            <img
                alt="unit"
                src="assets/warrior.jpg"
                onClick={()=>_handleBuildUnit("warrior")}></img>
            <div>
                <h2>Training Queue</h2>
                {playerTrainingQueue ? playerTrainingQueue.map((unit, key)=>(
                    <>
                        <img
                            className="unit-image" 
                            alt={unit.unit}
                            src={`assets/${unit.unit}.jpg`} 
                            onClick={()=>_handleUnitClickDelete(key)}
                        ></img>
                        <p> {unit.turns} turns</p> 
                    </>
                )):null}
            </div>
            <div>Units Available</div>
        </>
    )
}