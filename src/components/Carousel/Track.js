import React, { Children } from 'react';
import Slide from './Slide';

const Track = ({
  beenViewed,
  transitioning,
  currentSlide,
  children,
  slideWidth,
  style,
  onTransitionEnd,
  onClick,
  handleGesture
}) => {
  const childCount = Children.count(children),
    slideStyle = { width: slideWidth };
  return (
    <div
      className="track"
      style={style}
      onClickCapture={onClick}
      onTransitionEnd={onTransitionEnd}
      {...handleGesture}
    >
      <Slide key={"clone-last"} style={slideStyle} index={-1}>
        {React.cloneElement(children[childCount - 1])}
      </Slide>
      {Children.map(
        children,
        (child, index) =>
          <Slide
            key={"slide-" + index}
            style={slideStyle}
            index={index}
            children={child}
            currentSlide={currentSlide}
            transitioning={transitioning}
            beenViewed={beenViewed}
          />
      )}
      <Slide key={"clone-first"} style={slideStyle} index={childCount}>
        {React.cloneElement(children[0])}
      </Slide>
    </div>
  );
};

export default Track;