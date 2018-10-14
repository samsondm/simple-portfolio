import React from 'react';

const DisplayBox = ({ className, display }) => {
  return (
    <div className={className}>
      {display}
    </div>
  );
};

export default DisplayBox;