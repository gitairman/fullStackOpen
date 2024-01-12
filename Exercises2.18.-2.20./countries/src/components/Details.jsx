import axios from 'axios'
import { useState, useEffect } from 'react'

const Details = ({ country }) => {

    if (country === null) {
        return null
    }

    const weatherApiKey = import.meta.env.VITE_SOME_KEY
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${country.capital[0].toLowerCase()}&aqi=no`

    const [weather, setWeather] = useState(null)

    if (weather === null) {
        axios.get(weatherUrl).then(res => setWeather(res.data.current)).catch(error => console.log(error))
    }

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population.toLocaleString("en-US")}</p>
            <p>Languages:</p>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <p>Flag:</p>
            <img src={country.flags.svg} alt={`${country.name.common}Flag`} width="200" height="100" />
            {weather !== null ?
                <>
                    <h3>Weather in {country.capital}</h3>
                    <p>Temperature: {weather.temp_c} Celsius</p>
                    <p>Current Conditions:</p>
                    <img src={weather.condition.icon} alt={weather.condition.text} width="200" height="100" />
                    <p>Wind: {weather.wind_kph} kph</p>
                </> : <></>}
        </div>
    )

}

export default Details