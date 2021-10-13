import React from 'react'
const Header = (props) => {

    return (
      <div>
        <h1>
            {props.course}
        </h1>
        
      </div>
    )
  }
  const Part = ({ part, exercises }) => {
  
    return (
      <div>
        <p>{part} {exercises}</p>
      </div>
    )
  }
  const Content = ({ parts }) => {
  
    return (
      <div>
        
          {parts.map(part => 
           
             <Part key = {part.id} part = {part.name} exercises = {part.exercises}/>
           
          )}
        
      </div>
    )
  }
  const Total = ({parts}) => {
  // Noob sum
  /*  let total = 0;
    for(let value of parts) {
      total += value.exercises;
    } */
  // Chad sum
    const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    console.log(total);
      return (
      <div>
        <p><b>Number of exercises {total} </b></p>
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
       
        
        <Header course = {course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
        
      </div>
    )
  }

  export default Course;