import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const IconButton = ({ onClick, icon, className }) => (
  <div className={className} onClick={onClick}>
    <FontAwesomeIcon icon={icon} />
  </div>
);

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default IconButton;