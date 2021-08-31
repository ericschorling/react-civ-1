import { createSlice } from "@reduxjs/toolkit";

export const gameboardSlice = createSlice({
    name: 'gameboard',
    initialState: {
        gameState: undefined,
        turn: 0,
        board: [],
    },
    reducers: {
        updateGameBoard: (state, action) => {
            state.board = action.payload
        },
        incrementTurn: (state, action) => {
            if(action.payload === "new game"){
                state.turn = 1
            } else {
                state.turn += 1
            }
        },
        setGameState: (state, action) =>{
            state.gameState = action.payload
        },
        updateBuildingTurn: (state, action)=>{
            state.board[action.payload[0]][action.payload[1]].turn -=1
        },
        updateGameTile: (state, action)=>{
            state.board[action.payload[0]][action.payload[1]].style = action.payload[2]
        }
    }
})

export const { updateGameBoard, incrementTurn, setGameState, updateGameTile, updateBuildingTurn } = gameboardSlice.actions

export default gameboardSlice.reducer