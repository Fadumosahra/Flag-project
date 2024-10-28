import React from 'react';

const CountryCard = ({ country }) => {
    return (
      <div className="country-card">
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
        <h3>{country.name.common}</h3>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital ? country.capital[0] : 'No capital'}</p>
      </div>
    );
  };
  
  export default CountryCard;
  
