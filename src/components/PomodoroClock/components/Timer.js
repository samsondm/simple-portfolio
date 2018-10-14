import React from 'react';

const Timer = ({ time, label, className }) => (
  <div className={"timer " + className}>
    <div className="timer__label">
      {label}
    </div>
    <div className="timer__time-left">
      {time}
    </div>
  </div>
);

export default Timer;