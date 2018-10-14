import React from 'react';
import { shallow } from 'enzyme';
import TimerControl from './TimerControl';
import IconButton from './IconButton';

describe('TimerControl', () => {
  let props, wrapper;

  const timerControl = () => wrapper ?
    wrapper :
    wrapper = shallow(<TimerControl {...props} />);

  beforeEach(() => {

    props = {
      onStop: jest.fn(),
      onStart: jest.fn(),
      isRunning: new Boolean()
    };
    wrapper = null;
  });

  it('renders without crashing', () => {
    timerControl();
  });

  it('renders play <IconButton /> if isRunning true', () => {
    props = Object.assign(props, { isRunning: true });
    const wrapper = shallow(<TimerControl {...props} />),
      child = wrapper.childAt(0);
    expect(wrapper.children().length).toBe(1);
    expect(child.type()).toBe(IconButton);
    expect(child.prop('onClick')).toBe(props.onStop);
    expect(child.prop('icon').iconName).toBe('pause');
  });

  it('renders stop <IconButton /> if isRunning false', () => {
    props = Object.assign(props, { isRunning: false });
    const wrapper = shallow(<TimerControl {...props} />),
      child = wrapper.childAt(0);
    expect(wrapper.children().length).toBe(1);
    expect(child.getElement().type).toBe(IconButton);
    expect(child.prop('onClick')).toBe(props.onStart);
    expect(child.prop('icon').iconName).toBe('play');
  });
});