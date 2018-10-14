import React, { Component } from 'react';

class Slide extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.transitioning) {
      return false;
    }
    return true;
  }
  render() {
    const newChild = (this.props.beenViewed &&
      this.props.currentSlide === this.props.index &&
      !this.props.transitioning) ?
      React.cloneElement(this.props.children, { isViewed: true }) :
      this.props.children;
    return (
      <div className="slide" style={this.props.style} index={this.props.index}>
        {newChild}
      </div>
    );
  }
}
export default Slide;