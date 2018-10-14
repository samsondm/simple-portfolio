import React, { Component, Children } from 'react';
import Track from './Track';
import Slider from './Slider';
import Dots from './Dots';
import IconArrow from './IconArrow';
import './Carousel.css';
import ResizeObserver from 'resize-observer-polyfill';
import createPointerEvent from '../../utility/createPointerEvent';
import ElementInViewPortObserver from '../../utility/ElementInViewPortObserver';

class Carousel extends Component {

  _isMounted = false;

  isPointerSupported = Boolean(window.PointerEvent);

  carousel = React.createRef();
  carouseResizeObserver = null; // resize observer
  activeClone = 'none'; // store displayed cloned element for transitionend event listener
  pointerDown = false; // 
  pointerDownCoord = null; // initial pointer coordinates
  sliding = false; // carousel sliding
  scrolling = false; // page scrolling
  animating = false; // rAF mouse move animation
  state = {
    beenViewed: false,
    transitioning: false, //
    currentSlide: 0,
    slideCount: 0,
    slideWidth: 0,
    slideHeight: 0,
    trackStyle: {}
  };

  initCarousel = () => {
    const slideRect = this.carousel.current.getBoundingClientRect(),
      slideWidth = Math.round(slideRect.width * 100) / 100,
      slideHeight = slideRect.height,
      slideCount = Children.count(this.props.children),
      transform = `translateX(${-(1 + this.state.currentSlide) * slideWidth}px)`;
    this.setState({
      slideCount,
      slideWidth,
      slideHeight,
      trackStyle: { // order of properties matter for mobile ie ?
        transition: ``,
        WebkitTransition: ``,
        width: (2 + slideCount) * slideWidth,
        transform,
        WebkitTransform: transform,
        msTransform: transform
      }
    });

  }

  carouselBeenViewed = () => {
    if (this._isMounted && !this.beenViewed) {
      this.setState({
        beenViewed: true
      });
      this.carouselViewObserver.disconnect();
      this.carouselViewObserver = null;
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.initCarousel();
    this.carouselViewObserver = ElementInViewPortObserver(this.carouselBeenViewed, 30);
    this.carouselViewObserver.observe(this.carousel.current);

    // listen for resize event to handle browser zoom
    window.addEventListener('resize', this.initCarousel);
    // create resize observer to handle element resize
    this.carouseResizeObserver = new ResizeObserver(this.initCarousel);
    this.carouseResizeObserver.observe(this.carousel.current);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.initCarousel);
    this.carouseResizeObserver.disconnect();
  }

  handleArrowClick = (direction) => {
    if (!this.state.transitioning && !this.pointerDown) {
      const delta = direction === 'left' ? -1 : 1;
      this.changeSlide(delta);
    }
  }

  handleDotClick = (e) => {
    if (!this.state.transitioning) {
      const delta = +e.currentTarget.getAttribute('index') - this.state.currentSlide;
      this.changeSlide(delta);
    }
  }

  changeSlide = (delta) => {
    this.setState(prevState => {
      let nextSlide;
      // check if we are going to display cloned element on the right
      if (prevState.currentSlide === prevState.slideCount - 1 && delta === 1) {
        nextSlide = 0;
        this.activeClone = 'right';
        // check if we are going to display cloned element on the left
      } else if (prevState.currentSlide === 0 && delta === -1) {
        nextSlide = prevState.slideCount - 1;
        this.activeClone = 'left';
      } else {
        nextSlide = prevState.currentSlide + delta;
      }
      const transform = `translateX(${-(1 + prevState.currentSlide + delta) * prevState.slideWidth}px)`;
      return {
        transitioning: true,
        currentSlide: nextSlide,
        trackStyle: {
          // ...prevState.trackStyle,
          transition: `transform 500ms ease`,
          WebkitTransition: `-webkit-transform 500ms ease`,
          width: prevState.trackStyle.width,
          transform: transform,
          WebkitTransform: transform,
          msTransform: transform
        }
      };
    });
  }

  handleTransitionEnd = (e) => {
    if (!this._isMounted) return;
    this.setState(prevState => {
      const transform = this.activeClone === 'none' ?
        prevState.trackStyle.transform : // no translate
        this.activeClone === 'left' ?
          // translate from left clone to last slide without transition
          `translateX(${-prevState.slideCount * prevState.slideWidth}px)` :
          // translate from right clone to first slide without transition
          `translateX(${-prevState.slideWidth}px)`;
      this.activeClone = 'none';
      return {
        transitioning: false,
        trackStyle: {
          transition: ``,
          WebkitTransition: ``,
          width: prevState.trackStyle.width,
          transform,
          WebkitTransform: transform,
          msTransform: transform
        }
      };
    });
  }


  getPointerCoord = (e) =>
    e.changedTouches ? // check if touch event
      {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      } : {
        x: e.clientX,
        y: e.clientY
      };

  pointerMoveAnimation = (deltaX) => {
    if (!this._isMounted || !this.animating) return; // exit on pointerup

    const transform = `translateX(${-(1 + this.state.currentSlide) * this.state.slideWidth + deltaX}px)`;
    this.setState({
      trackStyle: {
        transition: ``,
        WebkitTransition: ``,
        width: this.state.trackStyle.width,
        transform: transform,
        WebkitTransform: transform,
        msTransform: transform
      }
    });
    this.animating = false;
  }

  handleTrackClick = (e) => {
    if (this.state.transitioning || this.scrolling) {
      e.preventDefault();
      this.scrolling = false;
    }
  }

  handleGestureStart = (e) => {
    e.preventDefault();

    if (e.touches && e.touches.length > 1) {
      return;
    }

    // Add the move and end listeners
    if (window.PointerEvent) {
      e.currentTarget.setPointerCapture(e.pointerId);
    } else {
      // Add Mouse Listeners
      document.addEventListener('mousemove', this.handleGestureMove, true);
      document.addEventListener('mouseup', this.handleGestureEnd, true);
    }

    if (!this.state.transitioning) {
      this.pointerDown = true;
      this.pointerDownCoord = this.getPointerCoord(e);
    }
  }

  handleGestureMove = (e) => {
    e.preventDefault();

    if (!this.pointerDownCoord) return;

    if (!this.scrolling && this.pointerDown) {
      const pointerCurrCoord = this.getPointerCoord(e),
        deltaX = pointerCurrCoord.x - this.pointerDownCoord.x,
        deltaY = pointerCurrCoord.y - this.pointerDownCoord.y;
      if (!this.sliding &&
        Math.abs(deltaY / this.state.slideHeight) > 0.01 && // trigger document scrolling on <1% Y && >10% X pointer move
        Math.abs(deltaX / this.state.slideWidth) < 0.1) { // possible bug(simultanious slide & doc scolling) on different values
        this.scrolling = true;
      } else if (this.sliding || Math.abs(deltaX / this.state.slideWidth) > 0.01) {
        this.sliding = true;
        // stop touch move when cursor's relative horizontal traveled distance is greater than 90% of slide width
        if ((e.touches || e.pointerType) && Math.abs(deltaX) > this.state.slideWidth * 0.90) {
          const params = {
            bubbles: true,
            cancelable: true,
            composed: true,
            pointerId: e.pointerId,
            pointerType: e.pointerType,
            clientX: e.clientX,
            clientY: e.clientY
          },
            pointerEvent = createPointerEvent('pointercancel', params);
          // e.currentTarget.dispatchEvent(new Event('touchend', { bubbles: true }));
          e.currentTarget.dispatchEvent(pointerEvent);
          return;
        }
        if (!this.animating) {
          if (deltaX === 0) return; // prevent transitionend not triggering if no change in transform
          this.animating = true;
          window.requestAnimationFrame(() => this.pointerMoveAnimation(deltaX));
        }
      }
    }
  }


  handleGestureEnd = (e) => {
    e.preventDefault();
    if (e.touches && e.touches.length > 0) {
      return;
    }

    if (this.pointerDown) {
      this.pointerDown = false;
      this.animating = false;
      this.sliding = false;
      // defer scrolling disable for mouse click event
      if (e.touches || e.pointerType !== 'mouse') {
        this.scrolling = false;
      }
      const currTrackCoord = this.state.trackStyle.transform.match(/-?\d+(?:\.\d+)?/)[0], // match track coord
        deltaPercent = (currTrackCoord - (-(1 + this.state.currentSlide) * this.state.slideWidth)) / this.state.slideWidth;
      if (deltaPercent !== 0)
        (Math.abs(deltaPercent) < 0.20 ?
          this.changeSlide(0) : // don't change slide when cursor's relative horizontal traveled distance was less than 20% of slide width
          deltaPercent > 0 ?
            this.changeSlide(-1) : // show left slide on moving right
            this.changeSlide(1));  // show right slide on moving left
    }

    // Remove Event Listeners
    if (window.PointerEvent) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } else {
      // Remove Mouse Listeners
      document.removeEventListener('mousemove', this.handleGestureMove, true);
      document.removeEventListener('mouseup', this.handleGestureEnd, true);
    }

    this.pointerDownCoord = null;
  }

  // determine which props should be passed to Track
  handleGesture = this.isPointerSupported ?
    {
      onPointerDownCapture: this.handleGestureStart,
      onPointerMoveCapture: this.handleGestureMove,
      onPointerUpCapture: this.handleGestureEnd,
      onPointerCancelCapture: this.handleGestureEnd
    } : {
      onMouseDownCapture: this.handleGestureStart,
      // onMouseMoveCapture: this.handleGestureMove,
      // onMouseUpCapture: this.handleGestureEnd,
      // onMouseLeaveCapture: this.handleGestureEnd,
      onTouchStartCapture: this.handleGestureStart,
      onTouchMoveCapture: this.handleGestureMove,
      onTouchEndCapture: this.handleGestureEnd,
    };

  render() {
    return (
      <div ref={this.carousel} className="carousel-wrapper">
        <div className="arrow slide-prev">
          <IconArrow direction="left" onClickCapture={() => this.handleArrowClick('left')} />
        </div>
        <Slider>
          <Track
            beenViewed={this.state.beenViewed}
            transitioning={this.state.transitioning}
            currentSlide={this.state.currentSlide}
            style={this.state.trackStyle}
            slideWidth={this.state.slideWidth}
            onTransitionEnd={this.handleTransitionEnd}
            onClick={this.handleTrackClick}
            handleGesture={this.handleGesture}
            children={this.props.children}
          />
        </Slider>
        <div className="arrow slide-next">
          <IconArrow direction="right" onClickCapture={() => this.handleArrowClick('right')} />
        </div>
        <Dots slideCount={this.state.slideCount} currentSlide={this.state.currentSlide} onClick={this.handleDotClick} />
      </div>
    );
  }
}

export default Carousel;