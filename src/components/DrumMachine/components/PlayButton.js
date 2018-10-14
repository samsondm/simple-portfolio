import React, { Component } from 'react';

export default class PlayButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      lastUrl: null
    };
    this.isKeyRepeated = false;
    this.audio = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    this.audio.current.addEventListener('ended', this.changeActive);
    // this.audio.current.addEventListener('play', this.changeActive);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    this.audio.current.removeEventListener('ended', this.changeActive);
    // this.audio.current.removeEventListener('play', this.changeActive);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.url !== prevState.lastUrl) {
      return {
        active: false,
        lastUrl: nextProps.url
      };
    }
    return null;
  }

  handleClick = (e) => {
    e.preventDefault();
    if (this.props.power) {
      this.playAudio(this.audio.current);
    }
  }

  handleKeyUp = (e) => {
    if (e.keyCode === this.props.keyCode) {
      e.preventDefault();
      this.isKeyRepeated = false;
    }
  }

  handleKeyDown = (e) => {
    if (this.props.power && e.keyCode === this.props.keyCode && !e.repeat && !this.state.active && !this.isKeyRepeated) {
      e.preventDefault();
      this.isKeyRepeated = true;
      this.playAudio(this.audio.current);
    }
  }

  changeActive = (e) => {
    this.setState({ active: false });
  }

  playAudio = (audio) => {
    this.setState({ active: true });
    audio.volume = this.props.volume;
    audio.play();
    this.props.showName(this.props.clipName);
  }

  render() {
    const active = this.state.active ? ' active' : '';
    return (
      <div id={this.props.clipName} className={'drum-pad' + active} onClick={this.handleClick}>
        {this.props.keyName}
        <audio ref={this.audio}
          className='clip'
          id={this.props.keyName}
          src={this.props.url} />
      </div>
    );
  }
}