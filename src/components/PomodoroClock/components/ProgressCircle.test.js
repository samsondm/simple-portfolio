import React from 'react';
import { shallow } from 'enzyme';
import ProgressCircle from './ProgressCircle';

describe('ProgressCircle', () => {
  it('renders without crashing', () => {
    shallow(<ProgressCircle />);
  });
});