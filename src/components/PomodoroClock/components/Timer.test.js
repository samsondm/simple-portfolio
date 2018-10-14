import React from 'react';
import Timer from "./Timer";
import { shallow, mount } from 'enzyme';

describe('Timer', () => {
  let props, shallowWrapper;

  const shallowTimer = () => shallowWrapper ?
    shallowWrapper :
    shallowWrapper = shallow(<Timer {...props} />);

  beforeEach(() => {
    props = {};
    shallowWrapper = null;
  });

  it('renders without crashing', () => {
    shallowTimer();
  });

  it('renders root div with prop equal to props.className', () => {
    props.className = 'pomodoro-clock__timer__digital';
    shallowTimer();

    expect(shallowWrapper.type()).toBe('div');
    expect(shallowWrapper.hasClass(props.className)).toBe(true);
  });

  it('first child of the root div is a div with textContent equal to props.label', () => {
    props.label = 'session';
    const firstChild = shallowTimer().childAt(0);

    expect(firstChild.text()).toBe(props.label);
  });

  it('second child of the root div is a div with textContent equal to props.time', () => {
    props.time = '01:01';
    const secondChild = shallowTimer().childAt(1);

    expect(secondChild.text()).toBe(props.time);
  });
});