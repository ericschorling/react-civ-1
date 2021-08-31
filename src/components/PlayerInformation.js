import React from 'react'
import { BuildQueue } from './BuildQueue'
import {TrainingQueue} from './TrainingQueue'

export const PlayerInformation =() => {
    return (
        <>
            <div>Player 1</div>
            <TrainingQueue/>
            <BuildQueue/>
        </>
    )
}