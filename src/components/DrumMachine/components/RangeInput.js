import React from 'react';

const RangeInput = ({
  min = 0,
  max = 100,
  step = 1,
  curr, showCurr, changeCurr, power, className
}) => {
  const handleChange = (e) => {
    if (power) {
      const curr = e.target.value;
      changeCurr(curr);
      showCurr(curr);
    }
  };

  return (
    <div className={className}>
      <input type="range" min={min}
        max={max}
        step={step}
        value={curr}
        onChange={handleChange} />
    </div>
  );
};

export default RangeInput;