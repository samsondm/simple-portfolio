import React from 'react';
import { shallow, mount } from 'enzyme';
import PomodoroClock from './PomodoroClock';
import lolex from 'lolex';
import parseTimer, { minToSec } from './utility/parseTimer';

let shallowWrapper, props;

const wait = (ms = 0) => new Promise(resolve => setTimeout(() => resolve(), ms < 0 ? 0 : ms));

const getShallowWrapper = () => shallowWrapper = shallow(<PomodoroClock {...props} />);

const mockAudio = () => ({
  current: {
    play: jest.fn(),
    pause: jest.fn(),
    currentTime: 1
  }
});

beforeEach(() => {
  jest.useRealTimers();
  props = { session: 1, break: 1 };
  shallowWrapper = null;
});

afterEach(() => {
  shallowWrapper.unmount();
});

describe('PomodoroClock', () => {
  it('renders without crashing', () => {
    getShallowWrapper();
  });

  describe('instance', () => {

    it('gets proper state', () => {
      getShallowWrapper();
      const state = {
        timerLabel: 'session',
        timerFace: parseTimer(minToSec(props.session)),
        break: props.break,
        session: props.session,
        hasStarted: false,
        isRunning: false,
        animationLeftPercent: 100
      };
      expect(shallowWrapper.state()).toEqual(state);
    });

    it('timerStart starts timer', (done) => {
      jest.useFakeTimers();
      const instance = getShallowWrapper().instance();
      const { timerStart, timerUpdate, timeTillNextUpdate } = instance;
      instance.svgAnimation = jest.fn();
      timerStart();
      const { timeOfLastUpdate } = instance;
      expect(instance.isSvgAnimating).toBe(true);
      expect(shallowWrapper.state().hasStarted).toBe(true);
      expect(shallowWrapper.state().isRunning).toBe(true);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(timerUpdate, timeTillNextUpdate);
      window.requestAnimationFrame(() => {
        expect(instance.svgAnimation).toHaveBeenCalledTimes(1);
        expect(instance.svgAnimation).toHaveBeenCalledWith(expect.any(Number), timeOfLastUpdate);
        done();
      });
    });

    it('timerPause stops timer', () => {
      jest.useFakeTimers();
      const instance = getShallowWrapper().instance();
      const { timerStart, timerPause } = instance;
      instance.audio = mockAudio();
      timerStart();
      timerPause();
      expect(instance.state.isRunning).toBe(false);
      expect(instance.isSvgAnimating).toBe(false);
      expect(instance.audio.current.pause).toHaveBeenCalledTimes(1);
      expect(clearTimeout).toHaveBeenCalledTimes(1);
      expect(clearTimeout).toHaveBeenCalledWith(instance.timeoutID);
    });
  });

  describe('settings', () => {
    it('break TimerSetting increase and decrease break time', () => {
      const filter = node => node.name() === 'TimerSetting' && node.prop('label') === 'break';
      let breakSetting = getShallowWrapper().findWhere(filter);
      const instance = shallowWrapper.instance();
      const { breakIncrease, breakDecrease } = instance;

      expect(breakSetting.length).toBe(1);
      expect(breakSetting.prop('time')).toBe(props.break);
      expect(breakSetting.prop('onIncrease')).toBe(breakIncrease);
      expect(breakSetting.prop('onDecrease')).toBe(breakDecrease);

      breakSetting.simulate('increase');
      breakSetting = shallowWrapper.findWhere(filter);
      expect(breakSetting.prop('time')).toBe(props.break + 1);

      breakSetting.simulate('decrease');
      breakSetting = shallowWrapper.findWhere(filter);
      expect(breakSetting.prop('time')).toBe(props.break);
    });

    it('session TimerSetting increase and decrease session time', () => {
      const filter = node => node.name() === 'TimerSetting' && node.prop('label') === 'session';
      let sessionSetting = getShallowWrapper().findWhere(filter);
      const instance = shallowWrapper.instance();
      const { sessionIncrease, sessionDecrease } = instance;

      expect(sessionSetting.length).toBe(1);
      expect(sessionSetting.prop('time')).toBe(props.session);
      expect(sessionSetting.prop('onIncrease')).toBe(sessionIncrease);
      expect(sessionSetting.prop('onDecrease')).toBe(sessionDecrease);

      sessionSetting.simulate('increase');
      sessionSetting = shallowWrapper.findWhere(filter);
      expect(sessionSetting.prop('time')).toBe(props.session + 1);

      sessionSetting.simulate('decrease');
      sessionSetting = shallowWrapper.findWhere(filter);
      expect(sessionSetting.prop('time')).toBe(props.session);
    });

    it('session and break time are limited by 1 and 60', () => {
      props = { session: 1, break: 1 };
      getShallowWrapper();
      const sessionFilter = node => node.name() === 'TimerSetting' && node.prop('label') === 'session';
      let sessionSetting = shallowWrapper.findWhere(sessionFilter);
      const breakFilter = node => node.name() === 'TimerSetting' && node.prop('label') === 'break';
      let breakSetting = shallowWrapper.findWhere(breakFilter);

      sessionSetting.simulate('decrease');
      expect(sessionSetting.prop('time')).toBe(1);
      breakSetting.simulate('decrease');
      expect(breakSetting.prop('time')).toBe(1);

      props = { session: 60, break: 60 };
      getShallowWrapper();
      sessionSetting = shallowWrapper.findWhere(sessionFilter);
      breakSetting = shallowWrapper.findWhere(breakFilter);
      sessionSetting.simulate('increase');
      breakSetting.simulate('increase');
      sessionSetting = shallowWrapper.findWhere(sessionFilter);
      breakSetting = shallowWrapper.findWhere(breakFilter);

      expect(sessionSetting.prop('time')).toBe(60);
      expect(breakSetting.prop('time')).toBe(60);
    });

    it('sessoin and break TimerSetting can\'t be changed if timer has been started', () => {
      props = { session: 30, break: 49 };
      getShallowWrapper();
      const sessionFilter = node => node.name() === 'TimerSetting' && node.prop('label') === 'session';
      let sessionSetting = shallowWrapper.findWhere(sessionFilter);
      const breakFilter = node => node.name() === 'TimerSetting' && node.prop('label') === 'break';
      let breakSetting = shallowWrapper.findWhere(breakFilter);
      const { timerStart, timerPause } = shallowWrapper.instance();
      shallowWrapper.instance().audio = mockAudio();

      const checkChange = () => {
        sessionSetting.simulate('increase');
        expect(sessionSetting.prop('time')).toBe(props.session);
        sessionSetting.simulate('decrease');
        expect(sessionSetting.prop('time')).toBe(props.session);
        breakSetting.simulate('increase');
        expect(breakSetting.prop('time')).toBe(props.break);
        breakSetting.simulate('decrease');
        expect(breakSetting.prop('time')).toBe(props.break);
      };
      timerStart();
      checkChange();
      timerPause();
      checkChange();
    });

    it('IconButton with icon sync resets state', async () => {
      const filter = node => node.name() === 'IconButton' && node.prop('icon').iconName === 'sync';
      const iconButton = getShallowWrapper().findWhere(filter);
      const instance = shallowWrapper.instance();
      const { timerRefresh, timerStart } = instance;
      instance.initInstance = jest.fn();
      instance.audio = mockAudio();

      expect(iconButton.length).toBe(1);
      expect(iconButton.prop('onClick')).toBe(timerRefresh);
      timerStart();
      await wait(100);
      timerRefresh();
      expect(instance.audio.current.pause).toHaveBeenCalledTimes(1);
      expect(instance.audio.current.currentTime).toBe(0);
      expect(instance.initInstance).toHaveBeenCalledTimes(1);
      expect(instance.initInstance).toHaveBeenCalledWith(props);
    });
  });

  describe('timer', () => {
    it('Timer shows proper time and label', () => {
      props = { session: 1, break: 2 };
      let timer = getShallowWrapper().find('Timer');

      expect(timer.length).toBe(1);
      expect(timer.prop('label')).toBe('session');
      expect(timer.prop('time')).toBe('01:00');

    });

    it('Timer updates time when running and updates label when riching 00:00', () => {
      jest.useFakeTimers();
      props = { session: 1, break: 2 };
      let timer = getShallowWrapper().find('Timer');
      let instance = shallowWrapper.instance();
      const { timerStart, timerPause } = instance;
      instance.audio = mockAudio();

      const testUpdating = (label) => {
        testUpdating.called += 1;
        const seconds = minToSec(props[label]);
        let currentLabel, currentTimeLeft;
        timerStart();
        for (let i = 1; i <= seconds; i++) {
          jest.runOnlyPendingTimers();
          shallowWrapper = shallowWrapper.update();
          currentLabel = shallowWrapper.state().timerLabel;
          currentTimeLeft = seconds - i;
          if (currentTimeLeft === instance.audioDuration) {
            expect(instance.audio.current.play).toHaveBeenCalledTimes(testUpdating.called);
          }
          timer = shallowWrapper.find('Timer');
          expect(timer.prop('label')).toBe(currentLabel);
          expect(timer.prop('time')).toBe(parseTimer(currentTimeLeft));
        }
        timerPause();
      };
      testUpdating.called = 0;

      testUpdating('session');
      testUpdating('break');
      testUpdating('session');
      testUpdating('break');

    });

    it('Timer updates time every 1000ms', () => {
      let timer = getShallowWrapper().find('Timer');
      shallowWrapper.instance().audio = mockAudio();
      const { timerStart, timerPause } = shallowWrapper.instance();

      const msToSec = (ms) => Math.floor(ms / 1000);

      let currentTime = minToSec(props[shallowWrapper.state().timerLabel]);

      let clock = lolex.install();
      const performanceNow = global.performance.now;
      global.performance.now = clock.performance.now;
      const runTimer = (ms = 1000) => {
        const timeSinceLastUpdate = 1000 - shallowWrapper.instance().timeTillNextUpdate;
        timerStart();
        clock.tick(ms);
        timerPause();
        clock.next();
        const seconds = msToSec(timeSinceLastUpdate + ms);
        currentTime -= seconds;
        timer = shallowWrapper.find('Timer');
        expect(timer.prop('time')).toBe(parseTimer(currentTime));
        expect(shallowWrapper.instance().timeTillNextUpdate).toBeGreaterThan(1000 - (timeSinceLastUpdate + ms) % 1000 - 100);
        expect(shallowWrapper.instance().timeTillNextUpdate).toBeLessThan(1000 - (timeSinceLastUpdate + ms) % 1000 + 100);
      };
      runTimer(357);
      runTimer(468);
      runTimer(4793);
      global.performance.now = performanceNow;
      clock.uninstall();
    });

    it('TimerControl gets right properties', () => {
      const timerControl = getShallowWrapper().find('TimerControl');
      const { timerStart, timerPause, state: { isRunning } } = shallowWrapper.instance();
      expect(timerControl.prop('onStart')).toBe(timerStart);
      expect(timerControl.prop('onStop')).toBe(timerPause);
      expect(timerControl.prop('isRunning')).toBe(isRunning);
    });

    it('ProgressCircle gets right properties', () => {
      const progressCircle = getShallowWrapper().find('ProgressCircle');
      expect(progressCircle.prop('progressLeftPercent')).toBe(shallowWrapper.state().animationLeftPercent);
    });

    it('ProgressCircle properly animates', () => {
      props = { session: 3, break: 13 };
      let progressCircle = getShallowWrapper().find('ProgressCircle');
      const { timerStart, timerPause } = shallowWrapper.instance();
      shallowWrapper.instance().audio = mockAudio();

      const minToMs = (min = 0) => min * 1000 * 60;
      const secToMs = (sec = 0) => sec * 1000;

      let clock = lolex.install();
      const performanceNow = global.performance.now;
      global.performance.now = clock.performance.now;
      shallowWrapper.instance().timerRefresh();
      const runToUpdate = () => {
        let currentTimeLeft, animationLeftPercent;
        const currentLabel = shallowWrapper.state().timerLabel;
        const seconds = minToSec(props[currentLabel]);
        const animationPercentPerTick = 100 / minToMs(props[currentLabel]);
        timerStart();
        for (let i = 1; i <= seconds; i++) {
          clock.tick(1000);
          currentTimeLeft = seconds - i;
          progressCircle = shallowWrapper.find('ProgressCircle');
          animationLeftPercent = animationPercentPerTick * secToMs(currentTimeLeft);
          if (i === seconds) {
            expect([0, 100]).toContain(Math.round(progressCircle.prop('progressLeftPercent') * 10) / 10);
            return;
          }
          expect(progressCircle.prop('progressLeftPercent')).toBeGreaterThan(animationLeftPercent - animationPercentPerTick * 10);
          expect(progressCircle.prop('progressLeftPercent')).toBeLessThan(animationLeftPercent + animationPercentPerTick * 10);
        }
      };
      runToUpdate();
      runToUpdate();

      let animationLeftPercent = 100;
      shallowWrapper.instance().timerRefresh();
      clock.tick(1000);
      shallowWrapper = shallowWrapper.update();
      const testStartPause = (interval) => {
        timerStart();
        clock.tick(interval);
        timerPause();
        clock.next();
        progressCircle = shallowWrapper.find('ProgressCircle');
        animationLeftPercent -= 100 / minToMs(props.session) * (interval);
        expect(progressCircle.prop('progressLeftPercent')).toBeCloseTo(animationLeftPercent, 2);
      };
      for (let i = 0; i < 100; i++) {
        testStartPause(100);
      }

      global.performance.now = performanceNow;
      clock.uninstall();
    }, 20000);
  });
});