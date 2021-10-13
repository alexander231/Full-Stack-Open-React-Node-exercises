
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'
import { showAndHide } from '../reducers/notificationReducer'
const AnecdoteList = () => {
    
    const anecdotes = useSelector(state => 
        state.anecdotes
                    .filter(anecdote => 
                        anecdote.content.toLowerCase().includes(
                            state.filter.toLowerCase())))
                                                    .sort((a, b) => a.votes - b.votes)

    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        
        dispatch(increaseVote(anecdote))
        dispatch(showAndHide(`You voted '${anecdote.content}'`, 2000))
        
    }

    return(
        <div>
            {anecdotes.map(anecdote =>
            <Anecdote
                key = {anecdote.id}
                anecdote = {anecdote}
                handleClick = {() => vote(anecdote)}
            /> )}   
        </div>
        
    )
}

export default AnecdoteList