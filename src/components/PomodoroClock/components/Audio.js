import React from 'react';
import PropTypes from 'prop-types';

const Audio = React.forwardRef(({ src, id }, ref) => (
  <audio ref={ref} id={id} src={src} />
));

Audio.propTypes = {
  src: PropTypes.string,
  id: PropTypes.string
};

Audio.defaultProps = {
  src: 'http://www.soundjay.com/button/beep-07.wav'
};

export default Audio;