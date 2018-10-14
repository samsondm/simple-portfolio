import React from 'react';
import StatusDisplayBox from '../containers/StatusDisplayBox';
import PowerToggle from '../containers/PowerToggle';
import BankToggle from '../containers/BankToggle';
import VolumeRangeInput from '../containers/VolumeRangeInput';

const ControlPad = (props) => {
  return (
    <div className='drum-pad-control'>
      <PowerToggle title='Power' />
      <StatusDisplayBox className='drum-pad-display' />
      <VolumeRangeInput className='volume' />
      <BankToggle title='Bank' />
    </div>
  );
};

export default ControlPad;