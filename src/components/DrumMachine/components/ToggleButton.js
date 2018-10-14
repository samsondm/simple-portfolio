import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({ title, state, handleClick }) => {
  return (
    <div className='toggle-button'>
      <div className='toggle-button__title'>
        {title}
      </div>
      <input type="checkbox" className="toggle-button__input" id={title} checked={state} onChange={handleClick} />
      <label className="toggle-button__label" htmlFor={title} />
    </div>
  );
};
export default ToggleButton;