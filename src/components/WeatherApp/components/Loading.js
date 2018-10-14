import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

const Loading = () => (
  <div className="weather-app__loading">
    <FontAwesomeIcon icon={faSpinner} size="lg" spin />
  </div>
);

export default Loading;