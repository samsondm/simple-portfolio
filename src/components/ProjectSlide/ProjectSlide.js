import React from 'react';
import PropTypes from 'prop-types';
import './ProjectSlide.scss';
import { withRouter } from 'react-router-dom';

const getMovedDistance = ({ x: prevX, y: prevY } = {}, { x: currX, y: currY } = {}) =>
  prevX !== undefined && prevY !== undefined && currX !== undefined && currY !== undefined ?
    Math.sqrt(Math.pow(currX - prevX, 2) + Math.pow(currY - prevY, 2)) :
    null;

const getCurrGesturePageCoord = (e) => {
  return e.touches && e.changedTouches[0] ? // check if touch event
    {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    } : {
      x: e.pageX,
      y: e.pageY
    };
};

class ProjectSlide extends React.Component {
  state = {
    isHovered: false
  };
  dragTriggerDelta = 3;
  hasGestureStarted = false;
  hasDragged = false;
  isPointerSupported = window.PointerEvent;
  linkRef = React.createRef();

  componentDidMount() {
    if (!this.isPointerSupported) {
      this.linkRef.current.addEventListener('touchstart', this.handleGestureStart);
    }
  }

  handleMouseLeave = (e) => {
    this.setState({
      isHovered: false
    });
  };

  // prevent transitionend from bubling after project slide gets in view
  handleTransitionEnd = (e) => e.stopPropagation();

  handleGestureStart = (e) => {
    if (this.hasGestureStarted) return;
    this.hasGestureStarted = true;
    this.startGestureCoord = getCurrGesturePageCoord(e);

    if (this.isPointerSupported) {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    this.setState({
      isHovered: true
    });
  };

  handleGestureMove = (e) => {
    if (this.hasGestureStarted && this.state.isHovered) {
      // detect sloppy click
      this.currGestureCoord = getCurrGesturePageCoord(e);
      const movedDistance = getMovedDistance(this.startGestureCoord, this.currGestureCoord);
      if (movedDistance <= this.dragTriggerDelta) {
        return;
      }

      this.setState({
        isHovered: false
      });
      this.hasDragged = true;
    } else if (!this.hasGestureStarted && !this.state.isHovered) {
      this.setState({
        isHovered: true
      });
    }
  };

  handleGestureEnd = (e) => {
    if (!this.hasGestureStarted) return;
    if (this.isPointerSupported) {
      e.preventDefault();
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    this.hasGestureStarted = false;
    if (this.hasDragged) {
      this.hasDragged = false;
      return;
    }
    this.setState({
      isHovered: false
    });
    // do not load project on pointercancel
    if (e.type === 'pointercancel') return;
    // race between onclick event and loading project
    window.setTimeout(() => this.props.history.push('/' + this.props.link), 50);
  };

  handleGesture = this.isPointerSupported ? {
    onPointerDown: this.handleGestureStart,
    onPointerMove: this.handleGestureMove,
    onPointerUp: this.handleGestureEnd,
    onPointerCancel: this.handleGestureEnd
  } : {
      onMouseDown: this.handleGestureStart,
      onMouseMove: this.handleGestureMove,
      onMouseUp: this.handleGestureEnd,
      // onTouchStart: this.handleGestureStart,
      onTouchMove: this.handleGestureMove,
      onTouchEnd: this.handleGestureEnd
    };

  render() {
    const { imgUrl, title, stack, description, isViewed } = this.props;
    const style = {
      backgroundImage: `url(${imgUrl})`
    };
    const linkClass = "project-slide__link semi-transparent-bg " + (this.state.isHovered ? 'semi-transparent-bg_hover' : '');
    const descriptionClass = "project-slide__description semi-transparent-bg " + (isViewed ? "project-slide__description_viewed" : "");
    const stackClass = "project-slide__stack semi-transparent-bg " + (isViewed ? "project-slide__stack_viewed" : "");

    return (
      <div className="project-slide aspect-ratio-wrapper">
        <div className="project-slide__background" style={style} />
        <div className="project-slide__content" onTransitionEnd={this.handleTransitionEnd}>
          <div className={"project-slide__title semi-transparent-bg "}>
            {title}
          </div>
          <div className={descriptionClass}>
            {description}
          </div>
          <div className={stackClass}>
            {stack}
          </div>
          <div
            className={linkClass}
            ref={this.linkRef}
            {...this.handleGesture}
            onMouseLeave={this.handleMouseLeave}
          >
            EXPLORE
          </div>
        </div>
      </div>
    );
  }
}

ProjectSlide.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  stack: PropTypes.string,
  description: PropTypes.string,
};

export default withRouter(ProjectSlide);
