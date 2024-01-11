import { useState, useEffect } from 'react'
import axios from 'axios'

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

  let dataToRender = []

  if (countries.length > 10) {
    dataToRender = <p>Too many matches!  Please be more specific.</p>
  } else if (countries.length === 1) {
    let key = 0
    let country = countries[0]
    dataToRender = [
        <h2 key={key++}>{country.name.common}</h2>,
        <p key={key++}>Capital: {country.capital}</p>,
        <p key={key++}>Population: {country.population.toLocaleString("en-US")}</p>,
        <p key={key++}>Languages:</p>,
        <ul key={key++}>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>,
        <p key={key++}>Flag:</p>,
        <img key={key++} src={country.flags.svg} alt={`${country.name.common}Flag`} width="200" height="100" />
    ]
  } else {
    dataToRender = countries.map(country => <p key={country.cca3}>{country.name.common}</p>)
  }

  return (
    <>
      <div>
        Find countries: <input type="text" value={filter} onChange={handleFilterChange} />
        {dataToRender}
      </div>
    </>
  )
}

export default App
