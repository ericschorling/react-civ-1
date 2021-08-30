import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: 'gameboard',
    initialState: {
        playerTrainingQueue: [],
        enemyTrainingQueue: [],
        playerBuildingQueue:[],
        enemyBuildingQueue:[]
    },
    reducers: {
        updatePlayerTraining: (state, action) => {
            state.playerTrainingQueue = action.payload
        }
    }
})

export const { updatePlayerTraining,  } = playerSlice.actions

export default playerSlice.reducer