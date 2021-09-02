import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: 'players',
    initialState: {
        playerName:'Player',
        playerHealth: 50,
        enemyHealth: 20,
        playerPopulation: 4,
        enemyPopulation: 4,
        playerTrainingQueue: [],
        enemyTrainingQueue: [
            {
                unit:"worker",
                turns:4
            }
        ],
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
        enemyBuildingLocations:[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[2,0],[2,1],[2,4],[2,5],[3,0],[3,1],[3,4],[3,5],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5]],
        enemyUnits:[],
        enemyBuildingSpeeds:{
            house: 4,
            farm: 5,
            barracks: 6,
            worker: 3,
            warrior: 8
        }
    },
    reducers: {
        updatePlayerName: (state, action) => {
            state.playerName = action.payload
        },
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
        },
        clearPlayerBuildings: (state)=> {
            state.playerBuildings = []
        },
        clearPlayerUnits: (state)=>{
            state.playerUnits =[]
        },
        updatePlayerHeath: (state, action) =>{
            state.playerHealth -= action.payload
        },
        udpateEnemyHealth: (state, action) =>{
            state.enemyHealth -= action.payload
        },
        updatePlayerPopulation: (state, action)=>{
            state.playerPopulation += action.payload
        },
        updateEnemyPopulation: (state, action)=>{
            state.enemyPopulation += action.payload
        },
        addEnemyUnit: (state, action)=>{
            state.enemyUnits.push(action.payload)
        },
        updateEnemyUnits: (state, action)=>{
            state.enemyUnits = action.payload
        },
        updateEnemyUnitTurns:(state)=>{
            state.enemyTrainingQueue[0].turns -= 1
        },
        addEnemyUnitTraining: (state, action)=>{
            state.enemyTrainingQueue.push(action.payload)
        },
        updateEnemyTrainingQueue: (state, action)=>{
            state.enemyTrainingQueue = action.payload
        },
        updateEnemyBuildingLocations:(state, action)=>{
            state.enemyBuildingLocations = action.payload
        },
        addEnemyBuildingQueue:(state, action)=>{
            state.enemyBuildingQueue.push(action.payload)
        },
        updateEnemyBuildingTurn: (state, action)=>{
            state.enemyBuildingQueue[0].turns -= 1
        },
        updateEnemyBuildingQueue:(state, action)=>{
            state.enemyBuildingQueue = action.payload
        },
        addEnemyBuilding:(state, action)=>{
            state.enemyBuildings.push(action.payload)
        },
        updateEnemyBuildings:(state, action)=>{
            state.enemyBuildings = action.payload
        },
        reduceTrainingTime: (state,action)=>{
            state.playerTrainingQueue[action.payload].turns -=1
        }

    }
})

export const {
    updatePlayerName, 
    updatePlayerTrainingQueue, 
    updatePlayerBuilding, 
    updatePlayerTraingingSpeeds, 
    updatePlayerBuildingTurns, 
    updatePlayerBuiltBuildings, 
    updatePlayerUnitTurns, 
    updatePlayerTraining, 
    addPlayerUnits, 
    clearPlayerBuildings, 
    clearPlayerUnits, 
    updatePlayerHeath, 
    udpateEnemyHealth, 
    updateEnemyPopulation, 
    updatePlayerPopulation,
    addEnemyUnit,
    updateEnemyUnits,
    updateEnemyUnitTurns,
    addEnemyUnitTraining,
    updateEnemyTrainingQueue,
    updateEnemyBuildingLocations,
    updateEnemyBuildingQueue,
    updateEnemyBuildingTurn,
    updateEnemyBuildings,
    addEnemyBuilding,
    addEnemyBuildingQueue,
    reduceTrainingTime,
    reduceBuildingTime

} = playerSlice.actions

export default playerSlice.reducer