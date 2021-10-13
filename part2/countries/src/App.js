import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Filter = ({value, handleChange}) => {
  
  return (
    <div>
      find countries <input value = {value} onChange = {handleChange}/>
    </div>
  )

  
 /* if (filterCountry === '')
  return (
    <div>
      Introduce a country
    </div>
  );
  else if (filteredCountries.length === 1) {
    return (

      <Country country = {filteredCountries[0]}/>
    )
  }
  else if(filteredCountries.length > 1 && filteredCountries.length <= 10){
    
    return (
      
        
          filteredCountries.map(country => <Name key = {country.numericCode} name = {country.name} handleClick = {handleClick}/>)
        
      
    );
  }
  else if (filteredCountries.length > 10 ) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else {
    return (
      <div>
        Country doesn't exist
      </div>
    )
  } */
}
const Title = ({name}) => {
  return (
    <h1>
      <b>
        {name}
      </b>
    </h1>
  )
}

const Button = ({id, handleClick }) => {
  return (
    <button id = {id} onClick = {handleClick}>
      show
  
    </button>
      
  )
}
const Name = ({ name, handleClick}) => {
  return (
    <div>
      {name}

      <Button id = {name} handleClick = {handleClick}/>

      
    </div>
  )
}
const BasicData = ({country}) => {
  return (
    <div>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>
        <b>languages</b>
      </h2>
      <ul>
        {country.languages.map(language => <li key = {language.name}>{language.name}</li>)}
      </ul>
      <img src = {country.flag} alt = "flag" width="128" height="128">
      </img>
      
    </div>
  )
}
const Weather = ({query}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const params = {
    q: query,
    appid: api_key
  }
  console.log(params)
  const [weather, setWeather] = useState({})
  useEffect(() => {
    
    axios
      .get("http://api.openweathermap.org/data/2.5/weather", {params: params})
      .then(response => {
        console.log(response.data);
        setWeather(response.data)
        
      })}, []);
  
  const hasWeather = Object.keys(weather).length === 0 && weather.constructor === Object;
  console.log(weather)
  console.log(hasWeather)
  return (
    <div>
      {!hasWeather && (<p> temperature: {weather.main.temp}</p>)}
      {!hasWeather && (<p>wind: {weather.wind.speed} deg: {weather.wind.deg}</p>)}
      
      
    </div>
  )
}
const Country = ({country}) => {
  return (
    <div>
      <Title name = {country.name}/>
      <BasicData country = {country}/>
    </div>
  )
}

const Countries = ({countries, handleClick}) => {
  const singleCountry = countries.length === 1
  const tooManyCountries = countries.length > 10
  const someCountries = countries.length <= 10 && countries.length > 1

  const countriesList = countries.map(country => <Name key = {country.alpha3Code} name = {country.name} handleClick = {handleClick}/>)

  return (
    <div>
      {tooManyCountries && "Too many matches, specify another filter"}
      {someCountries && <div>{countriesList}</div>}
      {singleCountry && <Country country ={countries[0]} />}
    </div>
  )
}
const App = () => {
  
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [hasFilter, setHasFilter] = useState(false)
  console.log(countries)
    
  const handleChange = (event) => {
    console.log(event.target.value);
    setFilterCountry(event.target.value);
    if (event.target.value === '') setHasFilter(false)
    else setHasFilter(true)

  }
  const handleClick = () => (event) => {
    setFilterCountry(event.target.id);
  };
  useEffect(() => {

    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log(response.data);
        setCountries(response.data)
      })}, []);

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filterCountry.toLowerCase()))

  const hasExactMatch = filteredCountries.some(country => country.name.toLowerCase() === filterCountry.toLowerCase())

  let exactFilteredCountries;

  if (hasExactMatch) {
    exactFilteredCountries = filteredCountries.filter(country => country.name.toLowerCase() === filterCountry.toLowerCase())
    
    
  }
  let singleFilteredCountry = filteredCountries.filter(country => country.name.toLowerCase().includes(filterCountry.toLowerCase()))

    //setUrl(url.concat('?q=', singleFilteredCountry.capital, '&appid=', api_key))
  
  const hasSingleFilteredCountry = singleFilteredCountry.length === 1
  console.log(singleFilteredCountry.length)

 
  
      
  
  return (
    <div>
        <Filter value = {filterCountry} handleChange = {handleChange} />
        {hasFilter && hasExactMatch && (
        <Countries countries={exactFilteredCountries}/>
      )}
      {hasFilter && !hasExactMatch && (
        <Countries
          countries={filteredCountries}
          handleClick={handleClick()}
        />
      )}
      {hasSingleFilteredCountry && (<Weather query = {singleFilteredCountry[0].capital}/>)}
    </div>
    
    
  )
}

export default App;
