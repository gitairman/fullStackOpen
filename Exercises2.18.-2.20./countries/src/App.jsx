import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Country from './components/Country'
import Details from './components/Details'

let allCountries = []

function App() {

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/all`).then(res => {
      allCountries = res.data
    })
      .catch(err => console.log(err.message))

  }, [])

  useEffect(() => {
    if (filter !== '') {
      let filtered = allCountries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
      setCountries(filtered)
    } else {
      setCountries([])
    }
  }, [filter])


  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleShowClick = (e) => {
    setFilter(e.target.name)
  }

  let displayList = true
  let country = null
  let tooManyResultsMessage = <p>Too many matches!  Please be more specific.</p>

  if (countries.length > 10) {
    displayList = false
    country = null
  } else if (countries.length === 1) {
    displayList = false
    country = countries[0]
    tooManyResultsMessage = <></>
  } else {
    country = null
  }

  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {
        displayList ? 
        <ul style={{listStyle: "none", paddingLeft: 0}}> {countries.map(country => 
        <Country key={country.cca3} name={country.name.common} handleShowClick={handleShowClick}/>)}
        </ul> :
        tooManyResultsMessage
      }
      <Details country={country} />
    </>
  )
}

export default App
