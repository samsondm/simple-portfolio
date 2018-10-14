import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

const withMemoryRouter = (Component) => <MemoryRouter><Component /></MemoryRouter>;

describe('App', () => {
  it('renders without crashing', () => {
    mount(withMemoryRouter(App));
  });

  it('snapshot', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});