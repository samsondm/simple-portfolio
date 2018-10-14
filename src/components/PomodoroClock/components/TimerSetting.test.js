import React from 'react';
import { shallow } from 'enzyme';
import TimerSetting from './TimerSetting';
import IconButton from './IconButton';

describe('TimerSettings', () => {
  let props, wrapper;

  const timerSettings = () => wrapper ?
    wrapper :
    wrapper = shallow(<TimerSetting {...props} />);

  props = {
    time: 1,
    onIncrease: jest.fn(),
    onDecrease: jest.fn(),
    label: 'label'
  };

  it('renders without crashing', () => {
    timerSettings();
  });

  it('root renders div with proper id and textContent as first child', () => {
    const firstChild = timerSettings().childAt(0);
    expect(firstChild.type()).toBe('div');
    expect(firstChild.prop('id')).toBe(props.label + '-label');
    expect(firstChild.text()).toBe(props.label);
  });

  it('root renders arrow-down IconButton with proper props as second child', () => {
    const secondChild = timerSettings().childAt(1);
    expect(secondChild.type()).toBe(IconButton);
    expect(secondChild.hasClass(props.label + '-decrement')).toBe(true);
    expect(secondChild.prop('onClick')).toBe(props.onDecrease);
    expect(secondChild.prop('icon').iconName).toBe('arrow-down');
  });

  it('root renders span with proper id and textContent as third child', () => {
    const thirdChild = timerSettings().childAt(2);
    expect(thirdChild.type()).toBe('span');
    expect(thirdChild.prop('id')).toBe(props.label + '-length');
    expect(thirdChild.text()).toBe(props.time.toString());
  });

  it('root renders arrow-up IconButton with proper props as fouth child', () => {
    const fouthChild = timerSettings().childAt(3);
    expect(fouthChild.type()).toBe(IconButton);
    expect(fouthChild.hasClass(props.label + '-increment')).toBe(true);
    expect(fouthChild.prop('onClick')).toBe(props.onIncrease);
    expect(fouthChild.prop('icon').iconName).toBe('arrow-up');
  });
});