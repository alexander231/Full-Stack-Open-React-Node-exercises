import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {

  return (
    
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

const Head = ({ text }) => {

  return (
    
    <h1>
      <b>
      {text}
      </b>
    </h1>
  )
}
const MostVotesAnecdote = ({ votes, anecdotes }) => {
  
  let indexMaxVotes = votes[0];
  let maxVotes = 0;
  for (const key of Object.keys(votes)) {
    if (maxVotes < votes[key]) {
      
      maxVotes = votes[key];
      indexMaxVotes = key;
    }
    
  }
  
  return (
    
    <p>
    
      {anecdotes[indexMaxVotes]}
      <br/>
      has {maxVotes} votes
    </p>
  )
}
const Anecdote = ({ text, votes }) => {

  return (
    
    <p>
      {text}
      <br/>
      has {votes} votes
    </p>
  )
}
const App = ({anecdotes}) => {
  
  const initialVotes = {};
  for (let i = 0; i < anecdotes.length; ++i) {
    initialVotes[i] = 0;
  }
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)
  console.log(selected)
  console.log(votes)
  let text = anecdotes[selected]
  
  const setRandomSelected = () => () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const setToVotes = (votes, selected) => () => {
    const copyVotes = {...votes, [selected]: ++votes[selected]}
    setVotes(copyVotes)
  } 
  
  return (
    <div>
      <Head text = "Anecdote of the day"/>
      <Anecdote text = {text} votes = {votes[selected]}/>
      <Button text = "vote" handleClick = {setToVotes(votes, selected)}/>
      <Button text ="next anecdote" handleClick = {setRandomSelected()}/>
      <Head text = "Anecdote with most votes"/>
      <MostVotesAnecdote votes = {votes} anecdotes = {anecdotes} />
      
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes = {anecdotes} />,
  document.getElementById('root')
)