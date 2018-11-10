import React, { Component } from 'react';
import './Scrolless.scss';

class Scrolless extends Component {
  state = {
    overflow: '',
  };

  isScrolling = false;
  scroll = React.createRef();
  startScroll = 0;
  scrollMargin = '0px';

  componentDidMount() {
    this.setState({
      overflow: this.detectOverflowScroll(this.scroll.current)
    });
    this.scrollMargin = '-' + this.calcScrollWidth(this.scroll.current) + 'px';
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.output !== nextProps.output || this.state.overflow !== nextState.overflow) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    const newOverflow = this.detectOverflowScroll(this.scroll.current);
    if (this.state.overflow !== newOverflow) {
      this.setState({
        overflow: newOverflow
      });
    }
    // autoscroll to left on output change
    if (this.props.output !== prevProps.output && ['both', 'right'].indexOf(newOverflow) > -1) {
      const maxScroll = this.scroll.current.scrollWidth - this.scroll.current.clientWidth,
        scrollDelta = maxScroll - this.scroll.current.scrollLeft;
      this.scrollAnimation({
        element: this.scroll.current,
        length: scrollDelta
      });
    }
  }

  calcScrollWidth = (parent = window.document.body) => {
    const elem = document.createElement('div'),
      style = {
        position: 'absolute',
        visibility: 'hidden',
        width: '100px',
        height: '100px',
        overflowY: 'scroll'
      };
    Object.assign(elem.style, style);
    parent.appendChild(elem);
    const width = elem.offsetWidth - elem.clientWidth;
    parent.removeChild(elem);
    return width;
  }

  detectOverflowScroll = (container) => {
    const pos = container.scrollLeft,
      max = container.scrollWidth - container.clientWidth;
    return pos > 0 && pos < max ?
      'both' :
      max === 0 ?
        'none' :
        pos > 0 && pos === max ?
          'left' :
          'right';
  };

  handleScroll = (e) => {
    const newOverflow = this.detectOverflowScroll(this.scroll.current);
    if (this.state.overflow !== newOverflow) {
      this.setState({
        overflow: newOverflow
      });
    }
  };

  scrollAnimation = ({
    element,
    length = 100,
    duration = 200,
    startScroll = performance.now(),
  } = {}) => {
    if (performance.now() - startScroll < 150) {
      const startTime = performance.now(),
        scrollStart = element.scrollLeft,
        maxScroll = element.scrollWidth - element.clientWidth,
        easeOutQuad = (t) => t * (2 - t);
      const animation = (currTime) => {
        const time = (currTime - startTime) / duration;
        if (time <= 1 &&
          (element.scrollLeft > 0 || length > 0) &&
          (element.scrollLeft < maxScroll || length < 0)) {
          element.scrollLeft = scrollStart + easeOutQuad(time) * length;
          requestAnimationFrame(animation);
        } else if (time >= 1) {
          element.scrollLeft = scrollStart + length;
        }
      };
      requestAnimationFrame(animation);
    }
    this.isScrolling = false;
  };

  handleMouseUp = (e) => {
    e.preventDefault();
    const length = 100,
      step = e.target.classList.contains('scrolless__arrow_right') ? length : -length;
    if (!e.touches) {
      this.scrollAnimation({
        element: this.scroll.current,
        startScroll: this.startScroll,
        length: step
      });
    } else {
      this.scrollAnimation({
        element: this.scroll.current,
        length: step
      });
    }
  };

  scrollRegular = (element, direction) => {

    this.startScroll = performance.now();
    const step = direction === 'left' ? -1 : 1,
      maxScroll = element.scrollWidth - element.clientWidth,
      animation = (now) => {
        if (!this.isScrolling ||
          (direction === 'left' && element.scrollLeft === 0) ||
          (direction === 'right' && element.scrollLeft === maxScroll)) {
          this.isScrolling = false;
          return;
        }
        element.scrollLeft += now - this.startScroll < 150 ? 0 : step;
        requestAnimationFrame(animation);
      };
    this.isScrolling = true;
    requestAnimationFrame(animation);
  };

  handleMouseDown = (e) => {
    e.preventDefault();
    if (!this.isScrolling) {
      const direction = e.target.classList.contains('scrolless__arrow_right') ? 'right' : 'left';
      this.scrollRegular(this.scroll.current, direction);
    }
  };

  render() {
    const
      leftClass = 'scrolless__arrow scrolless__arrow_left' + (['none', 'right'].indexOf(this.state.overflow) > -1 ? ' scrolless__arrow_hidden' : ''),
      rightClass = 'scrolless__arrow scrolless__arrow_right' + (['none', 'left'].indexOf(this.state.overflow) > -1 ? ' scrolless__arrow_hidden' : '');
    return (
      <div className="scrolless">
        <div className="scrolless__btn scrolles__btn_left"
          onTouchStart={this.handleMouseUp}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}>
          <i className={leftClass} />
        </div>
        <div className="scrolless__track">
          <div className="scrolless__inner"
            style={{ marginBottom: this.scrollMargin }}
            ref={this.scroll}
            onScroll={this.handleScroll}>
            {this.props.output}
          </div>
        </div>
        <div className="scrolless__btn scrolles__btn_right"
          onTouchStart={this.handleMouseUp}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}>
          <i className={rightClass} />
        </div>
      </div>
    );
  }
}

export default Scrolless;