import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CountryCard from './CountryCard';
import Search from './Search';
import Dropdown from './Dropdown'; // Importera den nya Dropdown-komponenten
import '../App.css';

const HomePage = ({ isDarkMode }) => { 
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);


  const regionOptions = [
    { value: 'Africa', label: 'Africa' },
    { value: 'Americas', label: 'Americas' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' }
  ];

  
  const filteredCountries = countries.filter((country) => {
    const matchesSearchTerm = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = !selectedRegion || country.region === selectedRegion.value;
    return matchesSearchTerm && matchesRegion;
  });

  return (
    <div>
      <div className="filter-container">
        <div className="search-container">
          <Search onSearch={setSearchTerm} />
        </div>
        
        <Dropdown
          options={regionOptions} 
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          isDarkMode={isDarkMode} 
        />
      </div>

      <div className="countries-container">
        {filteredCountries.map((country) => (
          <Link
            key={country.cca3}
            to={`/country/${encodeURIComponent(country.cca3)}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <CountryCard country={country} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
