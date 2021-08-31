import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: 'players',
    initialState: {
        playerTrainingQueue: [],
        enemyTrainingQueue: [],
        playerBuildingQueue:[],
        enemyBuildingQueue:[],
        playerBuildingSpeeds:{
            house: 3,
            farm: 5,
            barracks: 7
        },
        playerTrainingSpeeds:{
            worker: 4,
            warrior: 7
        },
        playerBuildings: [],
        playerUnits: [],
        enemyBuildings:[],
        enemyUnits:[],
        enemyBuildingSpeeds:{
            house: 3,
            farm: 5,
            barracks: 7
        },
        enemyTrainingSpeeds:{
            worker: 4,
            warrior: 7
        }
    },
    reducers: {
        updatePlayerTrainingQueue: (state, action) => {
            state.playerTrainingQueue.push(action.payload) 
        },
        updatePlayerBuilding: (state, action)=>{
            state.playerBuildingQueue = action.payload
        },
        updatePlayerBuildingTurns: (state) =>{
            state.playerBuildingQueue[0].turns -=1
        },
        updatePlayerTraingingSpeeds: (state, action) =>{
            if(action.payload==="worker"){
                state.playerTrainingSpeeds.worker -= 1
            }else {
                state.playerTrainingSpeeds.warrior -=1
            }
        },
        updatePlayerActiveUnits: (state, action)=>{
            state.playerUnits.push(action.payload)
        }
    }
})

export const { updatePlayerTrainingQueue, updatePlayerBuilding, updatePlayerTraingingSpeeds, updatePlayerBuildingTurns } = playerSlice.actions

export default playerSlice.reducer