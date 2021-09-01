import React, { useState } from 'react'
import ReactModal from 'react-modal'
import Tile from './Tile'
import { isPlayerCastle } from '../styles/tileStyles'
import { useDispatch, useSelector } from 'react-redux'
import {
    setGameState, 
    updateGameBoard, 
    incrementTurn, 
    updateBuildingTurn, 
    updateAttackedState, 
    setWinState
} from '../features/gameboard/gameboardSlice'
import { PlayerInformation } from './PlayerInformation'
import { EnemyInformation } from './EnemyInformation'
import { copyGameBoard } from '../app/functions/copyBoard'
import {
    pickBuildingLocation,
    pickBuilding,
    pickUnit, 
    getRandomNumber
}from '../app/functions/enemyPlayLogic'
import { 
    updatePlayerBuildingTurns, 
    updatePlayerBuilding, 
    updatePlayerUnitTurns, 
    updatePlayerTraining, 
    addPlayerUnits, 
    updatePlayerBuiltBuildings, 
    clearPlayerBuildings, 
    clearPlayerUnits, 
    updatePlayerPopulation,
    addEnemyUnit, 
    updateEnemyUnitTurns,
    updateEnemyTrainingQueue,
    addEnemyUnitTraining,
    updateEnemyBuildingLocations,
    updateEnemyBuildingQueue,
    updateEnemyBuildingTurn,
    updateEnemyBuildings,
    addEnemyBuilding,
    addEnemyBuildingQueue,
    updatePlayerHeath,
    udpateEnemyHealth

} from '../features/gameboard/playerSlice'

const BOARD_SIZE = 14
const ATTACK_SUCCESS_PROBABILITY = .8
const DEFENDING_SUCCESS_PROBABILITY =.2


export default function GameBoard() {

    //const [gameBoard, setGameBoard ] = useState([])
    const board = useSelector((state) => state.gameBoard.board)
    const pbuildingqueue = useSelector((state) => state.players.playerBuildingQueue)
    const ptrainingqueue = useSelector((state)=> state.players.playerTrainingQueue)
    const gameState = useSelector((state) => state.gameBoard.gameState)
    const trainedUnits = useSelector((state)=> state.players.playerUnits)
    const playerPopulation = useSelector((state)=> state.players.playerPopulation)

    //Enemy Informaiton
    const enemyTrainingQueue = useSelector((state)=> state.players.enemyTrainingQueue)
    const enemyBuildingQueue = useSelector((state)=> state.players.enemyBuildingQueue)
    const enemyBuildingSpeeds = useSelector((state)=> state.players.enemyBuildingSpeeds)
    const enemyBuildings = useSelector((state)=> state.players.enemyBuildings)
    const enemyUnits = useSelector((state)=> state.players.enemyUnits)
    const enemyBuildingLocations = useSelector((state)=> state.players.enemyBuildingLocations)
    const unitModifier = useSelector ((state) => state.players.modifiers.units)
    const buildingModifiers = useSelector ((state) => state.players.modifiers.buildings)
    const dispatch = useDispatch()

    //modal dependencies
    const attacked = useSelector((state)=> state.gameBoard.attacked)
    const [modalOpenState, setModalState]= useState(false)
    const [attacker, setAttacker] = useState('')
    const [damageDealt, setDamageDealt] = useState(0)
    const warriorStrength = useSelector((state)=>state.players.modifiers.units.warrior.power)
    const enemyHealth = useSelector((state)=>state.players.enemyHealth)
    const playerHealth = useSelector((state)=>state.players.playerHealth)
    const playerUnits = useSelector((state)=>state.players.playerUnits)
    const winState = useSelector((state)=>state.gameBoard.winState)
    
    
    
    const createNewGameBoard = ()=> {
        let gameBoardArray = []
        for(let x = 0; x<BOARD_SIZE; x++){
            gameBoardArray.push([])
            for(let y = 0; y< BOARD_SIZE; y++){
                let style = isPlayerCastle([x,y])
                let tile = {
                    style: style,
                    turn: 0,
                    buildstyle: style
                }
                gameBoardArray[x].push(tile)
                console.log(tile.style)
            }
        }
        dispatch(setGameState(true))
        return gameBoardArray
        
    }
    const playerTurnAdvance=()=>{
        if(pbuildingqueue.length) {
            if(pbuildingqueue[0].turns>0){
                dispatch(updatePlayerBuildingTurns())
                dispatch(updateBuildingTurn(pbuildingqueue[0].location))
                if(pbuildingqueue[0].turns===1){
                    let newQueue = pbuildingqueue.map((building) => building)
                    newQueue.splice(0,1)
                    dispatch(updatePlayerBuilding(newQueue))
                    dispatch(updatePlayerBuiltBuildings(pbuildingqueue[0]))
                    if(pbuildingqueue[0].building==="house"){
                        dispatch(updatePlayerPopulation(1))
                    }
                }
            }
        }

        if(ptrainingqueue.length) {
            if( trainedUnits.length < playerPopulation){
                if(ptrainingqueue[0].turns>0){
                    console.log("theres a queue")
                    dispatch(updatePlayerUnitTurns())
                    if(ptrainingqueue[0].turns===1){
                        let newQueue = ptrainingqueue.map((unit) => unit)
                        newQueue.splice(0,1)
                        dispatch(updatePlayerTraining(newQueue))
                        console.log(ptrainingqueue[0])
                        dispatch(addPlayerUnits(ptrainingqueue[0]))
                    }
                }
            }
        }
    }
    const enemyTrainUnit=()=>{
        const setUnitTrainingSpeed =(unit)=>{
            let trainingTurns = 0
            for(const building of enemyBuildings){
                if(buildingModifiers[building.building].unit === unit){
                    trainingTurns -= buildingModifiers[building.building].turns
                }
            }
            let finalTurns = enemyBuildingSpeeds[unit] + trainingTurns
            return finalTurns <= 0 ? 1 : finalTurns
        }
        if(enemyTrainingQueue.length){
            console.log(enemyTrainingQueue[0].turns )
            if(enemyTrainingQueue[0].turns === 1){
                dispatch(addEnemyUnit(enemyTrainingQueue[0]))
                dispatch(updateEnemyTrainingQueue([]))
            }else {
                dispatch(updateEnemyUnitTurns())
            }
        }else {
            dispatch(addEnemyUnitTraining(pickUnit(enemyTrainingQueue, setUnitTrainingSpeed)))
            console.log(pickUnit(enemyTrainingQueue, setUnitTrainingSpeed))
        }
    }
    const enemyConstructBuilding=()=>{
        const getSpeedModifiers =(building)=>{
            let turns = 0
            for(const unit of enemyUnits){
                if(unit.unit === "worker"){
                    turns += unitModifier.worker.building_modifier
                }
            }
            
            let buildTurns = enemyBuildingSpeeds[building] + turns
    
            return buildTurns <= 0 ? 1 : buildTurns
        }
        if(enemyBuildingQueue.length){
            if(enemyBuildingQueue[0].turns === 1){
                dispatch(addEnemyBuilding(enemyBuildingQueue[0]))
                dispatch(updateEnemyBuildingQueue([]))
                let newBoard = copyGameBoard(board)
                let tile = {
                    style: enemyBuildingQueue[0].building,
                    turn: '',
                    buildstyle: enemyBuildingQueue[0].building
                }
                let boardLocation =  pickBuildingLocation(enemyBuildingLocations)
                newBoard[boardLocation[0]][boardLocation[1]] = tile
                dispatch(updateGameBoard(newBoard))
                let newBuildList = [...enemyBuildingLocations]
                newBuildList.splice(newBuildList.indexOf(boardLocation),1)
                console.log("indexof",newBuildList.indexOf(boardLocation))
                dispatch(updateEnemyBuildingLocations(newBuildList))
            }else {
                dispatch(updateEnemyBuildingTurn())
            }
        }else {
            dispatch(addEnemyBuildingQueue(pickBuilding( enemyBuildingQueue, getSpeedModifiers)))
        }
        
    }
    const enemyAttack=()=>{
        const calcAttack =(attackerUnits)=>{
            let attackPower = 0
            attackPower += attackerUnits.length? attackerUnits.filter(unit => unit.unit === "warrior").length * warriorStrength:null
            return attackPower
        }
        if(calcAttack(enemyUnits)>0){
            
                let chance = getRandomNumber()
                if(chance < 20){
                    _handleAttackClick("enemy")
                }
            

        }
    }
    const enemyTurnActions=()=>{
        enemyTrainUnit()
        enemyConstructBuilding()
        enemyAttack()
    }
    
    const _handleStart=()=>{
        dispatch(incrementTurn("new game"))
        dispatch(updateGameBoard(createNewGameBoard()))
        dispatch(updatePlayerTraining([]))
        dispatch(updatePlayerBuilding([]))
        dispatch(clearPlayerBuildings())
        dispatch(clearPlayerUnits())
        
        
    }
    const _handleAttackClick=(attacker)=>{
    
        setModalState(true)
        setAttacker(attacker)
        
        console.log(attacked)
        const calcAttack =(attackerUnits)=>{
            let attackPower = 0
            attackPower += attackerUnits.length? attackerUnits.filter(unit => unit.unit === "warrior").length * warriorStrength:null
            return attackPower
        }

        const dealAttackerDamage=()=>{
            let damage =0
            if(attacker ==="player"){
                damage = Math.floor(calcAttack(playerUnits)*ATTACK_SUCCESS_PROBABILITY - calcAttack(enemyUnits) * DEFENDING_SUCCESS_PROBABILITY)
                setDamageDealt(damage)
                dispatch(udpateEnemyHealth(damage))
                if(enemyHealth - damage <= 0){
                    dispatch(setWinState("win"))
                }
            }
            if(attacker ==="enemy"){
                damage = Math.floor((calcAttack(enemyUnits)*ATTACK_SUCCESS_PROBABILITY) - (calcAttack(playerUnits) * DEFENDING_SUCCESS_PROBABILITY))
                setDamageDealt(damage)
                dispatch(updatePlayerHeath(damage))
                if(playerHealth - damage <= 0){
                    dispatch(setWinState("lose"))
                }
            }
        }
        dealAttackerDamage()

    }
    const _handleModalClose=()=>{
        setModalState(false)
        dispatch(updateAttackedState(true))
    }
    const _handleTurnEnd =()=>{
        enemyTurnActions()
        playerTurnAdvance()
        dispatch(incrementTurn())
        dispatch(updateAttackedState(false))

    }

    return (
        <div className="gameboard">
            <div className="board-header">
                <h1>
                    Foundation
                </h1>
                {gameState ? 
                    <div className="button-row">
                        <button onClick={()=>_handleStart(true)}>Restart</button>
                        <button onClick={()=>_handleTurnEnd()}>End Turn</button>
                    </div>
                    :
                    <button onClick={()=>_handleStart()}>
                        Start Game
                    </button>}
                
            </div>
                <div className="game-space">   
                {gameState ? <EnemyInformation/> : null}
                <div 
                    className="gameboard-container">
                    {board.map((tileArray,key)=>(
                        <div className="row" key={key}>
                            {board[key].map((tile,key2)=>(
                                <Tile 
                                    key={key2} 
                                    location={[key,key2]}
                                    style={tile.style}
                                    className={tile.style}
                                ></Tile>

                            ))}
                        </div>
                    ))}
                    {gameState ? 
                        <div className="attack-area">
                            <div className="attack-button" onClick={()=>_handleAttackClick("player")} >Attack!!</div>
                        </div> 
                        : 
                        null
                    }
                </div>
                    {gameState? <PlayerInformation />: null}
            </div>
            <ReactModal
                    style={{
                        content: {
                            height:'240px',
                            width: '220px',
                            top: window.innerHeight/2,
                            left: window.innerWidth/2
                        }
                    }}
                    isOpen={modalOpenState} 
                >
                {!attacked ? 
                <div>
                    <div>{attacker} Attacked!!</div>
                    <div>{attacker} Dealt {damageDealt} Damage</div>
                    <div>{attacker!=="player"? "player":"enemy"} has {attacker==="player"? enemyHealth : playerHealth} health remaining</div>
                    {winState!=="playing"? <div>You {winState}</div> : null}
                    <button onClick={()=>_handleModalClose()}>Close</button>
                </div> :
                <div>
                    <div>You've Already Attacked</div>
                    <button onClick={()=>setModalState(false)}>Close</button>
                </div>
                }
            </ReactModal>
        </div>
    )

}
//