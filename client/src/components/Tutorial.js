import React from 'react'


export const Tutorial =()=>{
    return (
        <div className="tutorial">
            <h2>Tutorial</h2>
            <h3>Goal</h3>
            <p>Your goal is to defeat the enemy before they defeat you. You will build structures and train units. Using the unique bonuses and your warriors you will attack and defeat the enemy.</p>
            <h3>The Gameboard</h3>
            <p>The gameboard is separated into a 14x14 grid. On the bottom right corner you will see your castle</p> <img className="castle-pic" src="/assets/castle.png" alt="castle"></img> <p>on the top left you will see the enemy castle. </p>
            <p> There are 196  green squares on the board.<div className="grass"></div> You and the enemy will use this space to build your city. You can see what the enemy has built and know their power to better plan your attacks.
            
            You will be able to click a square and select a building to create. The enemy will also be able to build a building on the tiles around their base.
            </p>
            <h3>Game Play</h3>
            <p>To start simply click the Start game button and a new gameboard will be generated for play.</p>
            <h3>Mechanics</h3>
            <h4>Building</h4>
            <p>To build a building click on the desired tile and select a building to build. Each tile can only hold one building and each building provides a benefit. You can select multiple buildings to build but only one building will be worked per turn. </p>
            <h4>Population</h4>
            <p>Population is a metric that determines your total units available to build. This can be increased by building new houses. You can queue units for production but they will not train until you have enough population.</p>
            <h4>Health</h4>
            <p>Each castle has a health meter. When attacked your health will decrease if you are not able to defend against attacks from the enemy. When this reaches zero for you or the enemy the game is over. </p>
            <h3>Buildings</h3>
            <p>Click a green square and you will be presented with 3 options for buildings. Each building has a unique bonus. The bonuses stack.</p>
            <h4>House</h4>
            <img src="/assets/house.jpg" alt="castle"></img>
            <p>Houses can be built on any tile. They provide 1 additional population per house. </p>
            <h4>Farm</h4>
            <img src="/assets/farm.jpg" alt="castle"></img>
            <p>Farms provide additional food for the workers and increase the speed to train a worker by 1 turn.</p>
            <h4>Barracks </h4>
            <img src="/assets/barracks.jpg" alt="castle"></img>
            <p>A barracks will provide extra space for your army and will increase the training speed of your warriors by 1 turn.</p>
            <h3>Units</h3>
            <p>There are 2 units in the game. A worker and a warrior. You can queue as many units as you want but only one will train per turn and they will not train unless there is available population.</p>
            <h4>Worker</h4>
            <img className="tutorial-image" src="/assets/worker.jpg" alt="worker"></img>
            <p>Workers are great for building a huge civilization. You can use them to speed up the construction of buildings. They reduce building speed by 1 turn. This effect stacks.</p>
            <h4>Warrior</h4>
            <img className="tutorial-image" src="/assets/worker.jpg" alt="warrior"></img>
            <p>A warrior will allow you to attack the enemy. You cannont attack without a warrior. You will find the warrior adds power to your attacks. You can find your power at the top of the screen.</p>
            <h3>Winning</h3>
            <p>Now that you have built your city and trained your units it is time to defeat your enemy. Click the attack button and send your troops into battle. Your strength will be matched by any defenders. To many defenders and you will not be able to do any damange. Check to see where the enemy's power is at before attacking.</p>
            <p>But be wary, the enemy will also attack you and has a chance to do so each turn. If you are not careful, they will distroy your castle first!!</p>
        </div>
    )
}