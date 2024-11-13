import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CountryDetail.css';


const CountryDetail = () => {
  const { countryCode } = useParams(); 
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]); 


  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data[0]); 

       
        if (data[0].borders) {
          fetch(`https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(',')}`)
            .then((response) => response.json())
            .then((borderData) => {
              setBorderCountries(borderData); 
            });
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
        setLoading(false);
      });
  }, [countryCode]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!country) {
    return <div>Country not found!</div>;
  }

  return (
    <div className="detail-container">
      <button onClick={() => window.history.back()} className="back-button">&larr; Back</button>
  
      <div className="flag-container">
        <img className="flag" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
  
      <div className="country-info-container">
        <h1 className="country-name">{country.name.common}</h1>
        <div className="country-info">
          <p><span className="title">Population:</span> {country.population.toLocaleString()}</p>
          <p><span className="title">Region:</span> {country.region}</p>
          <p><span className="title">Capital:</span> {country.capital ? country.capital[0] : 'No capital'}</p>
          <p><span className="title">Native namn:</span> {Object.values(country.name.nativeName || {})[0]?.common || 'N/A'}</p> 
          <p><span className="title">Top Level Domain:</span>{country.tld ? country.tld[0] : 'N/A'}</p> 
          <p><span className="title">Currencies:</span> {Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>
          <p><span className="title">Languages:</span> {Object.values(country.languages).join(', ')}</p>
        </div>

        <div className="border-countries-container">
          <p>Border Countries:</p>
          <div className="border-countries">
            {borderCountries && borderCountries.length > 0 ? (
              borderCountries.map((borderCountry) => (
                <Link
                  key={borderCountry.cca3}
                  to={`/country/${borderCountry.cca3}`}
                  className="border-button"
                >
                  {borderCountry.name.common}
                </Link>
              ))
            ) : (
              <p className="no-border-countries"> No border countries </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
