import { createSlice } from "@reduxjs/toolkit";

export const gameboardSlice = createSlice({
    name: 'gameboard',
    initialState: {
        board: [],
    },
    reducers: {
        updateGameBoard: (state, action) => {
            state.board = action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = gameboardSlice.actions

export default gameboardSlice.reducer