import { configureStore } from '@reduxjs/toolkit'
import gameboardReducer from '../features/gameboard/gameboardSlice'
import playerReducer from '../features/gameboard/playerSlice'

export default configureStore({
    reducer: {
        gameBoard: gameboardReducer,
        players: playerReducer
    },
})