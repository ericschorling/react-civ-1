import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { setWinState, updateAttackedState } from '../features/gameboard/gameboardSlice'

const ATTACK_SUCCESS_PROBABILITY = .8
const DEFENDING_SUCCESS_PROBABILITY =.2


export const Attack =()=>{
    const dispatch = useDispatch()
    const attacked = useSelector((state)=> state.gameBoard.attacked)
    const [modalOpenState, setModalState]= useState(false)
    const [attacker, setAttacker] = useState('')
    const [damageDealt, setDamageDealt] = useState(0)
    const warriorStrength = useSelector((state)=>state.players.modifiers.units.warrior.power)
    const enemyUnits = useSelector((state)=>state.players.enemyUnits)
    const enemyHealth = useSelector((state)=>state.players.enemyHealth)
    const playerHealth = useSelector((state)=>state.players.playerHealth)
    const playerUnits = useSelector((state)=>state.players.playerUnits)
    const winState = useSelector((state)=>state.gameBoard.winState)
    const gameModifiers = useSelector((state)=>state.players.modifiers)
    // const gameModifiers = useSelector((state)=>state.players.modifiers)

    const _handleAttackClick=(attacker)=>{
    
        setModalState(true)
        setAttacker(attacker)
        dispatch(updateAttackedState(true))
        console.log(attacked)
        const calcAttack =(attackerUnits)=>{
            let attackPower = 0
            attackPower += attackerUnits.length? attackerUnits.filter(unit => unit.unit === "warrior").length * warriorStrength:null
            return attackPower
        }

        const dealAttackerDamage=()=>{
            let damage =0
            if(attacker ==="player"){
                damage = calcAttack(playerUnits)*ATTACK_SUCCESS_PROBABILITY - calcAttack(enemyUnits) * DEFENDING_SUCCESS_PROBABILITY
                setDamageDealt(damage)
                if(enemyHealth - damage <= 0){
                    dispatch(setWinState("win"))
                }
            }
            if(attacker ==="enemy"){
                damage = calcAttack(enemyUnits)*ATTACK_SUCCESS_PROBABILITY - calcAttack(playerUnits) * DEFENDING_SUCCESS_PROBABILITY
                setDamageDealt(damage)
                if(playerHealth - damage <= 0){
                    dispatch(setWinState("lose"))
                }
            }
        }
        dealAttackerDamage()

    }
    return(
        <div>
        <div className="attack-area">
            <div className="attack-button" onClick={()=>_handleAttackClick("player")}>Attack!!</div>
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
                    <div>{attacker==="player"? "player":"enemy"} has {attacker==="player"? playerHealth : enemyHealth} health remaining</div>
                    {winState!=="playing"? <div>You {winState}</div> : null}
                    <button onClick={()=>setModalState(false)}>Close</button>
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