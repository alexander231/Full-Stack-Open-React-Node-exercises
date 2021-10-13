// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]
import anecdotesService from "../services/anecdotes"
// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

export const increaseVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.updateVotes(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
  

}
export const createNotification = (content) => {
  return async dispatch => {
    
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: newAnecdote
    })
  }
}
//const initialState = anecdotesAtStart.map(asObject)
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }

}
const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE': {
      // const id = action.data.id
      // const notificationToChange = state.find(notification => notification.id === id)
      // const changedNotification = {
      //   ...notificationToChange, votes: notificationToChange.votes + 1
      // }
      const id = action.data.id
      const updatedAnecdote = action.data
      return state.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)

    }
    case 'NEW_NOTIFICATION': {
      return [...state, action.data]
    }
    case 'INIT_ANECDOTES': {
      return action.data
    }
    default:
       return state
  }
  
}

export default anecdoteReducer