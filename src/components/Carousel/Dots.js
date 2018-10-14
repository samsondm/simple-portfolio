import React from 'react';

const Dots = ({ currentSlide, slideCount, onClick }) => {
  return (
    <div className="dots">
      {[...Array(slideCount)].map((elem, index) =>
        index === currentSlide ?
          <div key={index} index={index} className="dots__dot dots__dot_active" /> :
          <div key={index} index={index} className="dots__dot" onClickCapture={onClick} />
      )}
    </div>
  );
};

export default Dots;