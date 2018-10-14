import React from 'react';

const IconArrow = ({ direction, onClickCapture }) => {
  let rotate;
  switch (direction) {
    case 'left':
      rotate = 0;
      break;
    case 'right':
      rotate = 180;
      break;
    case 'top':
      rotate = 90;
      break;
    case 'bottom':
      rotate = 270;
      break;
    default:
      break;
  }
  const wrapperStyle = {
    display: `block`,
    lineHeight: 0,
    transform: `rotate(${rotate}deg)`,
    WebkitTransform: `rotate(${rotate}deg)`,
    msTransform: `rotate(${rotate}deg)`,
  };
  return (
    <div style={wrapperStyle}>
      <i className="icon-arrow" onClickCapture={onClickCapture} />
    </div>
  );
};

export default IconArrow;