import React, { Component } from 'react';
import './PomodoroClock.scss';
import TimerSetting from './components/TimerSetting';
import parseTimer, { minToSec } from './utility/parseTimer';
import Timer from './components/Timer';
import TimerControl from './components/TimerControl';
import PropTypes from 'prop-types';
import Audio from './components/Audio';
import ProgressCircle from './components/ProgressCircle';
import faSync from '@fortawesome/fontawesome-free-solid/faSync';
import IconButton from './components/IconButton';

const getAnimationVelocity = (seconds, length = 100) => length / (seconds * 1000);

class PomodoroClock extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = this.initInstance(props);
    this.audio = React.createRef();
    this.audioDuration = 10;
  }

  initInstance = (props) => {
    this.timeoutID = null;
    this.rafID = null;
    this.beep = null;
    this.beepCount = 0;

    this.hasLabelUpdated = false;
    this.timeLeft = minToSec(props.session);
    this.animationVelocity = getAnimationVelocity(this.timeLeft);
    this.timeOfLastUpdate = null;
    this.pauseTime = null;
    this.timeTillNextUpdate = 1000;
    this.isSvgAnimating = false;

    return {
      timerLabel: 'session',
      timerFace: parseTimer(this.timeLeft),
      break: props.break,
      session: props.session,
      hasStarted: false,
      isRunning: false,
      animationLeftPercent: 100
    };
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    // this.audio.current.pause();
    // this.audio.current.currentTime = 0;
    clearTimeout(this.timeoutID);
  }

  changeSetting = (name, change) => {
    // dont' change settings if the clock has been started
    if (this.state.hasStarted) return;
    const [limit, step] = change === 'increase' ? [60, 1] : [1, -1];
    // dont't change settings if limit is riched
    if (this.state[name] !== limit) {
      // update the clock
      this.setState(prevState => {
        let timerFace;
        if (prevState.timerLabel === name) {
          this.timeLeft = minToSec(prevState[name] + step);
          this.animationVelocity = getAnimationVelocity(this.timeLeft);
          timerFace = parseTimer(this.timeLeft);
        } else {
          timerFace = prevState.timerFace;
        }
        return {
          timerFace,
          [name]: prevState[name] + step
        };
      });
    }
  }

  sessionDecrease = () => this.changeSetting('session', 'decrease');
  sessionIncrease = () => this.changeSetting('session', 'increase');
  breakDecrease = () => this.changeSetting('break', 'decrease');
  breakIncrease = () => this.changeSetting('break', 'increase');

  * beepGen(n, func) {
    while (n-- > 0) {
      yield func();
    }
  }

  svgAnimation = (curr, past) => {
    if (!this._isMounted) return;

    // take into account time between pause click and last rAF
    if (!this.isSvgAnimating) {
      this.setState(prevState => ({
        animationLeftPercent: prevState.animationLeftPercent - this.animationVelocity * (this.pauseTime - past)
      }));
      return;
    }

    // take into account animation speed difference during label change
    if (!this.timeLeft && this.hasLabelUpdated) {
      this.hasLabelUpdated = false;
      const intervalBeforeUpdate = this.state.animationLeftPercent / this.animationVelocity;
      const intervalAfterUpdate = (curr - past) - intervalBeforeUpdate;
      this.setState(prevState => {
        this.animationVelocity = prevState.timerLabel === 'break' ?
          getAnimationVelocity(minToSec(this.state.break)) :
          getAnimationVelocity(minToSec(this.state.session));
        return {
          animationLeftPercent: 100 - this.animationVelocity * intervalAfterUpdate
        };
      });
    } else {
      // normal animation
      this.setState(prevState => ({
        animationLeftPercent: prevState.animationLeftPercent - this.animationVelocity * (curr - past)
      }));
    }
    this.rafID = window.requestAnimationFrame(now => this.svgAnimation(now, curr));
  };

  timerUpdate = () => {
    if (!this._isMounted) return;
    const now = performance.now(),
      drift = now - (this.timeOfLastUpdate + this.timeTillNextUpdate);
    this.timeTillNextUpdate = 1000 - drift; // adjast setTimeout drift
    this.timeOfLastUpdate = now;

    this.timeLeft = this.timeLeft ?
      this.timeLeft - 1 :
      // changed clock label on previous update
      this.state.timerLabel === 'break' ?
        minToSec(this.state.break) - 1 :
        minToSec(this.state.session) - 1;
    // handle sound 
    if (this.timeLeft === this.audioDuration) {
      this.audio.current.play();
    }
    // handle change of clock state
    if (!this.timeLeft) {
      this.setState(prevState => ({
        timerLabel: prevState.timerLabel === 'session' ?
          'break' :
          'session',
        timerFace: parseTimer(this.timeLeft),
      }));
      this.hasLabelUpdated = true;
    } else {
      this.setState({
        timerFace: parseTimer(this.timeLeft)
      });
    }
    this.timeoutID = setTimeout(this.timerUpdate, this.timeTillNextUpdate);
  }

  timerStart = () => {
    if (!this.state.hasStarted) {
      this.setState({
        hasStarted: true
      });
    }
    if (this.state.isRunning) return;
    this.setState({
      isRunning: true
    });

    this.timeOfLastUpdate = performance.now();
    this.isSvgAnimating = true;
    this.rafID = window.requestAnimationFrame(now => this.svgAnimation(now, this.timeOfLastUpdate));

    this.timeoutID = setTimeout(this.timerUpdate, this.timeTillNextUpdate);
  };

  timerPause = () => {
    if (!this.state.isRunning) return;
    this.pauseTime = performance.now();
    this.setState({
      isRunning: false
    });
    this.isSvgAnimating = false;
    this.timeTillNextUpdate -= this.pauseTime - this.timeOfLastUpdate;
    this.audio.current.pause();
    clearTimeout(this.timeoutID);
  };

  timerRefresh = () => {
    clearTimeout(this.timeoutID);
    cancelAnimationFrame(this.rafID);
    this.audio.current.pause();
    this.audio.current.currentTime = 0;
    if (this.beep !== null) {
      this.beep.return();
    }
    this.setState((prevState, props) => this.initInstance(props));
  };

  render() {
    return (
      <div className="pomodoro-clock">
        {/* <div className="pomodoro-clock__label">Pomodoro Clock</div> */}
        <div className="pomodoro-clock__settings">
          <TimerSetting time={this.state.break} onDecrease={this.breakDecrease} onIncrease={this.breakIncrease} label="break" />
          <IconButton className="pomodoro-clock__button pomodoro-clock__button_reset" onClick={this.timerRefresh} icon={faSync} />
          <TimerSetting time={this.state.session} onDecrease={this.sessionDecrease} onIncrease={this.sessionIncrease} label="session" />
        </div>
        <div className="pomodoro-clock__timer">
          <Timer className="pomodoro-clock__timer__digital" time={this.state.timerFace} label={this.state.timerLabel} />
          <ProgressCircle className="pomodoro-clock__timer__circle" radius={150} strokeColor="white" strokeWidth={10} progressLeftPercent={this.state.animationLeftPercent} />
          <TimerControl onStart={this.timerStart} onStop={this.timerPause} isRunning={this.state.isRunning} />
        </div>
        <Audio ref={this.audio} id="beep" src="http://freesound.org/data/previews/107/107341_831592-lq.mp3" />
      </div>
    );
  }
}

PomodoroClock.propTypes = {
  session: PropTypes.number,
  break: PropTypes.number
};

PomodoroClock.defaultProps = {
  session: 25,
  break: 5
};

export default PomodoroClock;
