import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

it('renders proper FontAwesome icon', () => {
  const wrapper = shallow(<Loading />);
  expect(wrapper.children().length).toBe(1);
  const icon = wrapper.find('FontAwesomeIcon');
  expect(icon.exists()).toBe(true);
  expect(icon.prop('icon').iconName).toBe('spinner');
  expect(icon.prop('spin')).toBe(true);
});