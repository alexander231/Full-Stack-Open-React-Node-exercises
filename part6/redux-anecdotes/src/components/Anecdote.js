
import React from 'react'

const Anecdote = ({ anecdote, handleClick }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes
        <button onClick = {handleClick}>
          vote
        </button>
      </div>
    </div>
  )
}

export default Anecdote