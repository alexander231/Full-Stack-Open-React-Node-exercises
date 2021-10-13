import React, { useState, useEffect } from 'react'
import numbersService from './services/numbersService'
import './index.css'

const Filter = ({persons, filterByName}) => {
 
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterByName.toLowerCase()))
 
  if (!(filterByName === '') && filteredPersons !== 0) {
    
    return (
     
       filteredPersons.map(person => <Person key = {person.id} person = {person}/>)
    
    )
  }
  
  else {
    return (
      <div>
      </div>
    )
  }
}

const Person = ({person, text, handleClick}) => {
  return (
    <div>
      <li>
        {person.name}: {person.phoneNumber} {text && (<Button1 id = {person.id} text = {text} handleClick = {handleClick}/>)}
      </li>
    </div>
  )
 
}
const Form = ({addPerson, newName, handleNameChange, newPhoneNumber, handlePhoneNumberChange}) => {
  return (
    <form onSubmit = {addPerson}>

        <div>

          name: <input value = {newName} onChange = {handleNameChange} />

        </div>

        <div>

          phone number: <input value = {newPhoneNumber} onChange = {handlePhoneNumberChange}/>

        </div>

        <div>

          <button type = "submit"> add </button>

        </div>
      </form>
  )
}
const Button1 = ({id, text, handleClick}) => {

  return (
    <button id = {id} onClick = {handleClick}>
      {text}
    </button>
  )
}
const Notification = ({message, type}) => {
  if (message === null) {
    return null
  }
  return(
    <div className = {type}>
      {message}
    </div>
  )
}

const App = () => {
  /*const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      phoneNumber: '072233',
      id: 0 
    },
    { name: 'Dan Abramov',
      phoneNumber: '07332233',
      id: 1 
    },
    { name: 'Mary Poppendieck',
      phoneNumber: '0372233',
      id: 2 
    }
  ]) */
  const [ messageToShow, setMessageToShow] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ filterByName, setFilterByName ] = useState('')

  useEffect(() => {
    numbersService
    .getAll()
      .then(response => {
        
        setPersons(response.data);
      })

  }, [])

  const addPerson = (event) =>  {
    event.preventDefault();
    let id;
    if (persons.length === 0) id = 0
    else id = persons[persons.length - 1].id + 1
    const personObject = {
      name: newName,
      phoneNumber: newPhoneNumber,
      id
    };
    if (persons.some(person => person.phoneNumber === personObject.phoneNumber)) {

      window.alert(newPhoneNumber + ' is already added to phonebook');   
    }
    else if(persons.some(person => person.name === personObject.name)){
      const personToUpdate = persons.filter(person => person.name === personObject.name)
      if (window.confirm(`${personToUpdate[0].name} is already in the phonebook, replace the old number with the new one?`)) {

        numbersService
          .update(personToUpdate[0].id, {...personObject, id:personToUpdate[0].id})
            .then(response => {
              console.log(response)
              setPersons(persons.map(person => person.id !== personToUpdate[0].id ? person : response.data))
              setNewName('');
              setNewPhoneNumber('');
              setMessageToShow(
                `${response.data.name} was added successfully`
              );
              setTimeout(() => {
                setMessageToShow(null)
              }, 5000)
            
              
            }).catch(error => {
              console.log(error.response.data)
            })
      }
    }
    else {
      numbersService
        .create(personObject)
          .then(response => { 
            console.log('x')
            setPersons(persons.concat(response.data))
            setNewName('');
            setNewPhoneNumber('');
            setMessageToShow(
              `${response.data.name} was added successfully`
            );
            setTimeout(() => {
              setMessageToShow(null)
            }, 5000)
          }).catch(error => {
            console.log(error.response.data)
            setErrorMessage(`${error.response.data.error}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
    }
  }
  const deletePerson = (id) => {
    const selectedPerson = persons.filter(person => person.id === id)
    if (window.confirm(`Are you sure you want to delete ${selectedPerson[0].name}?`)) {
    numbersService
      .deleteById(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(() => {
          setErrorMessage(
            `${selectedPerson[0].name} was already deleted`
          );
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  const handleNameChange = (event) => {
    
    setNewName(event.target.value);
  }

  const handlePhoneNumberChange = (event) => {
    
    setNewPhoneNumber(event.target.value);

  }
  const handleFilterByNameChange = (event) => {
    
    setFilterByName(event.target.value);
  }
  
  return (
    <div>

      <h2>Phonebook</h2>
      <Notification message = {messageToShow} type = "message"/>
      <Notification message = {errorMessage} type = "error"/>
      
        filter shown with <input value = {filterByName} onChange = {handleFilterByNameChange} />

      <ul>

        <Filter persons = {persons} filterByName = {filterByName}/>

      </ul>

      <h2>Add a new person</h2>

        <Form addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} newPhoneNumber = {newPhoneNumber} handlePhoneNumberChange = {handlePhoneNumberChange}/>
    
      <h2>Numbers</h2>

      <ul>
        {persons.map( person => <Person key = {person.id} person = {person} text = "delete" handleClick = {() => deletePerson(person.id)} />)}
      </ul>
     
    </div>
  )
}

export default App;
