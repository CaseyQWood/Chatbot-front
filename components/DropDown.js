import React, { useState } from 'react';

export default function DropdownSelect({ options, setChar }) {
  const [selectedOption, setSelectedOption] = useState();

  const handleOptionChange = (event) => {
    console.log("event.target.value: ", event.target.value)
    setSelectedOption(event.target.value);
    setChar(event.target.value);
  };

  
  return (
    <select value={selectedOption} onChange={handleOptionChange}>
      {options.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
