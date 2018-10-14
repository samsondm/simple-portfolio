import React from 'react';
import { shallow } from 'enzyme';
import TempButton from './TempButton';

it('renders single div with correct properties', () => {
  const props = { name: 'C', onClick: jest.fn() };
  const wrapper = shallow(<TempButton {...props} />);

  expect(wrapper.children().length).toBe(1);
  expect(wrapper.type()).toBe('div');
  expect(wrapper.text()).toBe(props.name);
  expect(wrapper.prop('onClick')).toBe(props.onClick);
});