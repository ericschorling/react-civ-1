import { configureStore } from '@reduxjs/toolkit'
import gameboardReducer from '../features/gameboard/gameboardSlice'

export default configureStore({
    reducer: {
        gameboard: gameboardReducer,

    },
})