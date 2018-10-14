import React from 'react';
import IconButton from './IconButton';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faPause from '@fortawesome/fontawesome-free-solid/faPause';

const TimerControl = ({ onStart, onStop, isRunning }) => (
  <div className="pomodoro-clock__control">
    {!isRunning ?
      <IconButton className="pomodoro-clock__button pomodoro-clock__button_start-pause" onClick={onStart} icon={faPlay} /> :
      <IconButton className="pomodoro-clock__button pomodoro-clock__button_start-pause" onClick={onStop} icon={faPause} />}
  </div>
);

export default TimerControl;