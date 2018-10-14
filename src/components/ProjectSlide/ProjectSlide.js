import React from 'react';
import PropTypes from 'prop-types';
import './ProjectSlide.css';

const ProjectSlide = ({ imgUrl, title = 'Test App', stack = 'React, SASS, REST API', description = 'Simple react project', isViewed, children }) => {
  const style = {
    backgroundImage: `url(${imgUrl})`
  },
    handleTransitionEnd = (e) => e.stopPropagation();
  return (
    <div className="project-slide aspect-ratio-wrapper">
      <div className="project-slide__background" style={style} />
      <div className="project-slide__content" onTransitionEnd={handleTransitionEnd}>
        <div className={"project-slide__title semi-transparent-bg "}>
          {title}
        </div>
        <div className={"project-slide__description semi-transparent-bg " + (isViewed ? "project-slide__description_viewed" : "")}>
          {description}
        </div>
        <div className={"project-slide__stack semi-transparent-bg " + (isViewed ? "project-slide__stack_viewed" : "")}>
          {stack}
        </div>
        {React.cloneElement(React.Children.only(children), { className: "project-slide__link semi-transparent-bg semi-transparent-bg_hover" })}
      </div>
    </div>
  );
};

ProjectSlide.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  stack: PropTypes.string,
  description: PropTypes.string,
};

export default ProjectSlide;