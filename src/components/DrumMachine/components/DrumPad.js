import React from 'react';
import DisplayPlayButton from '../containers/DisplayPlayButton';
import { bankOne, bankTwo } from '../data/soundClips';

const DrumPad = ({ bankNumber }) => {

  const bank = bankNumber === 'one' ? bankOne : bankTwo;
  const playButtons = bank.map(clip => {
    return <DisplayPlayButton
      key={clip.keyTrigger}
      keyName={clip.keyTrigger}
      clipName={clip.id}
      url={clip.url}
      keyCode={clip.keyCode} />;
  });

  return (
    <div className='drum-pad-container'>
      {playButtons}
    </div>
  );
};

export default DrumPad;