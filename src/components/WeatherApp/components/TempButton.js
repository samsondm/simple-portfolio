import React from 'react';

const TempButton = ({ name, onClick }) => (
  <div
    onClick={onClick}
    className="weather__tempUnit">
    {name}
  </div>
);

export default TempButton;