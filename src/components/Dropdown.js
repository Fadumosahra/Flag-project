import React from 'react';
import Select, { components } from 'react-select';
import lightArrow from '../assets/arrow-down-dark.svg';
import darkArrow from  '../assets/arrow-down-light.svg';

const CustomSingleValue = (props) => (
  <components.SingleValue {...props}>
    Filter by region
  </components.SingleValue>
);

const Dropdown = ({ options, selectedRegion, setSelectedRegion, isDarkMode }) => {
  return (
    <div style={{ position: 'relative', width: '190px' }}> 
      <Select
        options={options}
        value={selectedRegion}
        onChange={setSelectedRegion}
        components={{
          DropdownIndicator: () => null, 
          SingleValue: CustomSingleValue, 
        }}
        isClearable={false} 
        isSearchable={false}
        placeholder="Filter by region" 
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: isDarkMode ? 'var(--dark-blue)' : 'white', 
            color: isDarkMode ? 'var(--white)' : 'black',
            border: '1px solid transparent',
            borderRadius: '5px', 
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
            outline: 'none',
            paddingRight: '40px', 
            marginRight: '20px',
        
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: isDarkMode ? 'var(--dark-blue)' : 'white',
            borderRadius: '8px', 
            marginTop: '4px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
              ? isDarkMode
                ? '#3a4753'
                : '#f0f0f0' 
              : 'transparent', 
            color: isDarkMode ? 'var(--white)' : 'black',
          }),
          singleValue: (base) => ({
            ...base,
            color: isDarkMode ? 'var(--white)' : 'black',
          }),
          placeholder: (base) => ({
            ...base,
            color: isDarkMode ? 'var(--white)' : 'black',
          }),
          indicatorSeparator: (base) => ({
            ...base,
            display: 'none', 
          }),
        }}
      />
      <img
        src={isDarkMode ? darkArrow : lightArrow}
        alt="Dropdown Arrow"
        style={{
          position: 'absolute',
          top: '50%',
          right: '50px', 
          transform: 'translateY(-50%)',
          pointerEvents: 'none', 
        
       
        
        }}
      />
    </div>
  );
};

export default Dropdown;
