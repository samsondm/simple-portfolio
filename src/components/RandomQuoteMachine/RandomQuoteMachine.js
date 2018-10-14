import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faQuoteLeft from '@fortawesome/fontawesome-free-solid/faQuoteLeft';
// import faQuoteRight from '@fortawesome/fontawesome-free-solid/faQuoteRight';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import './RandomQuoteMachine.css';
import store from './store/store';
import { getCachedQuote, fetchQuote } from './actions/actions';
import randomColor from './utility/randomColor';

class App extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.isTransitioning = true; // prevent genQuote on initial load
    this.state = {
      transitionState: 'fadein',
      bgColor: '#333',
      quoteContainerStyle: {
        height: '26px',
        transition: ``,
        WebkitTransition: ``,
      },
      authorContainerStyle: {
        height: '26px',
        transition: ``,
        WebkitTransition: ``,
      },
      tweetQuote: ''
    };

    this.authorRef = React.createRef();
    this.quoteRef = React.createRef();
    this.quoteTextRef = React.createRef();

    this.genQuote = this.genQuote.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.fetchQuote();
    setTimeout(() => {
      if (!this._isMounted) return;
      if (this.props.isFetching) this.props.getCachedQuote();
      const bgColor = randomColor();
      this.setState({
        transitionState: 'fadeout',
        bgColor
      });
      this.props.changeBackground(bgColor);
    }, 1000);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp = (e) => {
    if (!this.isTransitioning && e.key === 'Enter') {
      e.preventDefault();
      this.genQuote();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.isTransitioning &&
      nextState.bgColor === this.state.bgColor && // prevent render if background color hasn't changed
      nextState.transitionState === this.state.transitionState && // while transition state is the same 
      nextState.tweetQuote === this.state.tweetQuote) { // and we got the same quote
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.transitionState === 'fadeout' && prevState.transitionState === 'fadein') {
      this.setState({
        quoteContainerStyle: {
          transition: `height 1000ms linear`,
          WebkitTransition: `height 1000ms linear`,
          height: this.quoteRef.current.offsetHeight,
        },
        authorContainerStyle: {
          transition: `height 1000ms linear`,
          WebkitTransition: `height 1000ms linear`,
          height: this.authorRef.current.offsetHeight
        },
        tweetQuote: this.quoteTextRef.current.textContent
      });
    }
  }

  handleTransitionEnd = (e) => {
    if (!this._isMounted) return;
    if (this.state.transitionState === 'fadein') {
      if (this.props.isFetching) this.props.getCachedQuote();
      this.setState({
        transitionState: 'fadeout',
      });
    } else {
      this.isTransitioning = false;
      this.setState({
        quoteContainerStyle: {
          transition: ``,
          WebkitTransition: ``,
          height: 'auto',
        },
        authorContainerStyle: {
          transition: ``,
          WebkitTransition: ``,
          height: 'auto'
        },
      });
    }
  }

  genQuote(e) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    const bgColor = randomColor();

    this.setState({
      quoteContainerStyle: {
        height: this.quoteRef.current.offsetHeight,
      },
      authorContainerStyle: {
        height: this.authorRef.current.offsetHeight
      },
      transitionState: 'fadein',
      bgColor
    });
    this.props.changeBackground(bgColor);
    this.props.fetchQuote();
  }

  render() {
    const buttonStyle = {
      backgroundColor: this.state.bgColor
    },
      transitionState = this.state.transitionState,
      author = this.props.author,
      quote = this.props.quote;

    return (
      <div id="quote-box" className="container-fluid panel text-center">
        <div className="row h3 transition-height-container" style={this.state.quoteContainerStyle}>
          <div id="text" ref={this.quoteRef} className={"col-xs-12 text-center " + transitionState} onTransitionEnd={this.handleTransitionEnd}>
            <FontAwesomeIcon icon={faQuoteLeft} />
            <Quote quote={quote} ref={this.quoteTextRef} />
            {/* <FontAwesomeIcon icon={faQuoteRight} /> */}
          </div>
        </div>
        <div className="row h4 transition-height-container" style={this.state.authorContainerStyle}>
          <div id="author" ref={this.authorRef} className={"col-sm-offset-8 col-sm-4 col-xs-offset-7 col-xs-5 text-center " + transitionState}>
            <Author author={author} />
          </div>
        </div>
        <div className="clearfix">
          <div className="" style={{ float: 'left' }}>
            <TwitterPost style={buttonStyle} author={author} quote={this.state.tweetQuote} />
          </div>
          <div className="" style={{ float: 'right' }}>
            <button id="new-quote" className={"btn"} style={buttonStyle} onClick={this.genQuote}>
              Generate Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const Quote = React.forwardRef(({ quote }, ref) => (
  <span ref={ref} dangerouslySetInnerHTML={{ __html: quote }} />
));

const Author = ({ author }) => (
  <span dangerouslySetInnerHTML={{ __html: author }} />
);

const TwitterPost = ({ author, quote, style }) => {
  return (
    <a id="tweet-quote"
      className="btn"
      style={style}
      href={"https://twitter.com/intent/tweet?text=\"" + quote.replace(/\s/g, '%20') + "\" " + author.replace(/\s/g, '%20')}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faTwitter} />
    </a>
  );
};

function mapStateToProps(state) {
  return {
    author: state.author,
    quote: state.quote,
    isFetching: state.isFetching
  };
}

const Container = connect(mapStateToProps, { getCachedQuote, fetchQuote })(App);

class RandomQuoteMachine extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container {...this.props} />
      </Provider>
    );
  }
}

export default RandomQuoteMachine;
