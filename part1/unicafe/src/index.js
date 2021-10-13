import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Header = ({text}) => {
  return (
    <div>
      <h1>
      <b>{text}</b>
      </h1>
    </div>
      
    
  )
}

const Body = ({setToGood, setToNeutral, setToBad}) => {
  return (
    <div>
    <Button text="good" handleClick = {setToGood}/>
    <Button text="neutral" handleClick = {setToNeutral}/>
    <Button text="bad" handleClick = {setToBad}/>
    </div>
    
  )
}

const Button = ({text, handleClick}) => {
  
  return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const Statistic = ({text, value, percentage}) => {
  if (percentage === "yes"){
    return (
      <tr>
        <td>
          {text}
        </td>
        <td>
          {value} %
        </td>
      </tr>
      )
  }
  else {
    return (
      <tr>
        <td>
          {text}
        </td>
        <td>
          {value} 
        </td>
      </tr>
    )
  }

}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all !== 0){
    return (
    <table>
      <tbody>
      <Statistic text ="good" value ={good} percentage = "No"/>
      <Statistic text ="neutral" value ={neutral} percentage = "No"/>
      <Statistic text ="bad" value ={bad} percentage = "No"/>
      <Statistic text ="all" value ={all} percentage = "No"/>
      <Statistic text ="average" value ={average} percentage = "No"/>
      <Statistic text ="positive" value ={positive} percentage = "yes"/>
      </tbody>
    </table>
      
    
    )
  }
  else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => () =>  setGood(newValue)
 
  const setToNeutral = (newValue) => () =>  setNeutral(newValue)
  
  const setToBad = (newValue) => () => setBad(newValue)

  let all = good + neutral + bad

  let average = (good - bad)/all

  let positive = (good/all) * 100
  
  console.log(good);
  console.log(neutral);
  console.log(bad);
  return (
    <div>
      <Header text = "Give feedback"/>
      <Body setToGood = {setToGood(good + 1)} setToNeutral = {setToNeutral(neutral + 1)} setToBad = {setToBad(bad + 1)}/>
      <Header text = "Statistics"/>
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} average = {average} positive = {positive}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)