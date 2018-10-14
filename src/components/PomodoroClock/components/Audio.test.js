import React from 'react';
import { shallow } from 'enzyme';
import Audio from './Audio';

describe('Audio', () => {
  it('renders withour crashing', () => {
    shallow(<Audio />);
  });

  it('renders root audio with passed props', () => {
    const props = {
      id: 'id',
      src: 'src',
    };
    const wrapper = shallow(<Audio {...props} />);

    expect(wrapper.type()).toBe('audio');
    expect(wrapper.prop('id')).toBe(props.id);
    expect(wrapper.prop('src')).toBe(props.src);
  });
});