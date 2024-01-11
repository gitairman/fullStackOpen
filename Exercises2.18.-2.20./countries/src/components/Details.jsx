const Details = ({ country }) => {
    if (country === null) {
        return null
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
        </div>
    )
}

export default Details