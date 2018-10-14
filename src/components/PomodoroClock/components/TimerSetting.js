import React from 'react';
import IconButton from './IconButton';
import PropTypes from 'prop-types';
import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp';

const TimerSetting = ({ time, onIncrease, onDecrease, label }) => (
  <div className="pomodoro-clock__setting">
    <div id={label + '-label'}>
      {label}
    </div>
    <IconButton className={"pomodoro-clock__button " + label + '-decrement'} onClick={onDecrease} icon={faArrowDown} />
    <span id={label + '-length'}>
      {time}
    </span>
    <IconButton className={"pomodoro-clock__button " + label + '-increment'} onClick={onIncrease} icon={faArrowUp} />
  </div>
);

TimerSetting.propTypes = {
  time: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired
};

export default TimerSetting;