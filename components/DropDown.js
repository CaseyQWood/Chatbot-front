import React, { useState } from 'react';

export default function DropdownSelect({ characterList, setSessionState }) {
  const [selected, setSelected] = useState("");

  const handleOptionChange = (event) => {
    setSelected(event.target.value);
    setSessionState({character: event.target.value});
  };

  return (
    <select value={selected} onChange={handleOptionChange}>
      <option/>
      {characterList.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
