import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tutorial } from './Tutorial'
import { updateTutorialState } from '../features/gameboard/gameboardSlice'
import {updatePlayerName} from '../features/gameboard/playerSlice'

export const Home =() => {
    const dispatch = useDispatch()
    const [player, setPlayer] = useState('')
    const playerName = useSelector((state)=> state.players.playerName)
    const tutorial= useSelector((state) => state.gameBoard.tutorialShow)
    const _handleTutorialShow=()=>{
        if(tutorial){
            dispatch(updateTutorialState(false))
        }else {
            dispatch(updateTutorialState(true))
        }
       
    }
    const _handleChange=(e)=>{
        setPlayer(e)
    }
    const _handleNameSubmit=(e)=>{
        e.preventDefault()
        dispatch(updatePlayerName(player))
    }
    return (
        <div className="homepage">
            <div className="game-tutorial">
                <h2> Welcome to Foundation</h2>
                <p>It is time to take on the enemy in a game of chance and skill.</p>
            </div>
            
            {playerName === "player" ?
                <>
                    <div>Tell me your name?</div>
                    <form>
                        <input onChange={(e)=>_handleChange(e.target.value)}></input>
                        <input type="submit" value="That's Me" onClick={(e)=>_handleNameSubmit(e)}></input>
                    </form> 
                </> :
                <div> Welcome {playerName}</div>
                }
            <div className="startGame">
                <nav>
                    <Link className="start-button" to='/Foundation'>Let's Play</Link>
                    <div className="turn-button" onClick={()=>_handleTutorialShow()}>Tutorial</div>
                </nav> 
                {!tutorial ? 
                    null
                    :
                    <Tutorial  />
                }
            </div>
        </div>
    )
}