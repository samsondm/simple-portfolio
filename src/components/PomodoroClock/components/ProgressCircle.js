import React from 'react';

const ProgressCircle = ({ radius, strokeColor, strokeWidth, progressLeftPercent, className }) => {
  const rectSize = 2 * (radius + strokeWidth),
    circleCoord = rectSize / 2,
    circumference = 2 * Math.PI * radius,
    circleFilled = circumference * progressLeftPercent / 100;
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      baseProfile="full"
      className={"progress-circle " + className}
      viewBox={`0 0 ${rectSize} ${rectSize}`}
      preserveAspectRatio="xMinYMin"
      width="100%"
      height="100%" >
      <circle
        className="progress-circle__move"
        cx="50%"
        cy="50%"
        r={radius}
        id="progress-circle"
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circleFilled} ${circumference - circleFilled}`}
        transform={`rotate(-90, ${circleCoord}, ${circleCoord})`}
      />
    </svg>
  );
};

export default ProgressCircle;