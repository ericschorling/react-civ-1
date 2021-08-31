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
        modifiers:{
            units:{
                warrior:{
                    unit:"warrior",
                    power:4,
                    attack_probablility:.5,
                    defense_probability:.7
                },
                worker:{
                    unit:"worker",
                    power:0,
                    building_modifier: -1
                }
            },
            buildings:{
                farm:{
                    building:"farm",
                    unit:"worker",
                    turns: 1
                },
                house:{
                    building:"house",
                    unit:"unit-cap",
                    total: 1,
                },
                barracks:{
                    building:"barracks",
                    unit:"warrior",
                    turns: 1
                }

            }
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
        addPlayerUnits: (state, action)=>{
            state.playerUnits.push(action.payload)
        },
        updatePlayerTraining: (state, action) => {
            state.playerTrainingQueue = action.payload 
        },
        updatePlayerBuilding: (state, action)=>{
            state.playerBuildingQueue = action.payload
        },
        updatePlayerBuildingTurns: (state) =>{
            state.playerBuildingQueue[0].turns -=1
        },
        updatePlayerUnitTurns: (state) =>{
            state.playerTrainingQueue[0].turns -=1
        },
        updatePlayerTraingingSpeeds: (state, action) =>{
            if(action.payload==="worker"){
                state.playerTrainingSpeeds.worker -= 1
            }else {
                state.playerTrainingSpeeds.warrior -=1
            }
        },
        updatePlayerBuiltBuildings: (state, action)=>{
            state.playerBuildings.push(action.payload)
        }
    }
})

export const { updatePlayerTrainingQueue, updatePlayerBuilding, updatePlayerTraingingSpeeds, updatePlayerBuildingTurns, updatePlayerBuiltBuildings, updatePlayerUnitTurns, updatePlayerTraining, addPlayerUnits } = playerSlice.actions

export default playerSlice.reducer