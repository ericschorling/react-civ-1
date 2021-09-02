import React from 'react'
import Tile from './Tile'

export const Tutorial =()=>{
    return (
        <div className="tutorial">
            This is the tutorial. It will tell you stuff.
            <h2>Playing the Game</h2>
            <h3>Goal</h3>
            <p>Your goal is to defeat the enemy before they defeat you. You will build structures and train units. Using the unique bonuses and your warriors you will attack and defeat the enemy.</p>
            <h3>The Gameboard</h3>
            <p>The gameboard is separated into a 14x14 grid. On the bottom right corner you will see your castle</p> <img src="/assets/castleimage.jpg" alt="castle"></img> <p>on the top left you will see the enemy castle. </p>
            <p> There are 196  green squares on the board.
            <div className="grass"></div>
            You will be able to click a square and select a building to create. The enemy will also be able to build a building on the tiles around their base.
            </p>
            <h3>Game Play</h3>
            <p>To start simply click the Start game button and a new gameboard will be generated for play.</p>
            <h3>Buildings</h3>
            <p>Click a green square and you will be presented with 3 options for buildings</p>
            <h4>House</h4>
            <div className="house"></div>
            <p>House can be built on any ti</p>
        </div>
    )
}