
import React from 'react'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/anecdoteReducer'
import { showAndHide } from '../reducers/notificationReducer'
const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const addNotification = async (event) => {

        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        dispatch(createNotification(content))
        dispatch(showAndHide(`You added '${content}'`, 3000))
       
    }

  return (
      <div>
        <h2>create new</h2>
        <form onSubmit = {addNotification}>
            <div><input name = "anecdote"/></div>
            <button>create</button>
        </form>
      </div>
  
  )
}

export default AnecdoteForm