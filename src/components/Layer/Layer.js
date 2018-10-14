import React, { Component } from 'react';
import './Layer.css';

class Layer extends Component {
  // get document scrolling element
  scrollingElement = document.scrollingElement || document.documentElement;
  // document scrolling element scroll position
  scrollPosition = 0;

  componentDidMount() {
    // setTimeout hack to prevent 'lagging' for slow mobiles
    window.setTimeout(() => {
      // save scroll position
      this.scrollPosition = this.scrollingElement.scrollTop;
      // prevent document scrolling when showing Layer
      this.scrollingElement.style.overflow = 'hidden';
      this.scrollingElement.style.width = '100%';
      this.scrollingElement.style.position = 'fixed';
      this.scrollingElement.style.top = -this.scrollPosition + 'px';
    }, 100);
  }

  componentWillUnmount() {
    // restore document scrolling when no Layer
    this.scrollingElement.style.overflow = '';
    this.scrollingElement.style.width = '';
    this.scrollingElement.style.position = '';
    this.scrollingElement.style.top = '';
    // restore document scroll position
    this.scrollingElement.scrollTop = this.scrollPosition;
  }

  handleClick = (e) => {
    e.stopPropagation();
    document.title = 'Portfolio';
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="layer" onClick={this.handleClick} >
        <div className="layer__scroll-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layer;