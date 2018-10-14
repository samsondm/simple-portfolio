import React from 'react';
import { shallow, mount } from 'enzyme';
import CitySearch from './CitySearch';


let wrapper;
const props = {
  onSearch: jest.fn()
};
const getWrapper = () => wrapper = shallow(<CitySearch {...props} />);

beforeEach(() => {
  getWrapper();
});

describe('CitySearch', () => {
  it('renders without crashing', () => {
  });

  it('initial renders with empty input, shows search button but doens\'t show clear button', () => {
    const input = wrapper.find('input[type="text"]');

    expect(input.length).toBe(1);
    expect(input.prop('value')).toBe('');

    const searchButton = wrapper.find('button[type="submit"]');
    expect(searchButton.length).toBe(1);
    expect(searchButton.children().length).toBe(1);
    expect(searchButton.childAt(0).name()).toBe('FontAwesomeIcon');
    expect(searchButton.childAt(0).prop('icon').iconName).toBe('search');

    const clearButton = wrapper.find('button[type="button"]');
    expect(clearButton.length).toBe(0);
  });

  it('shows proper input on typing and displays clear button and search button', () => {
    let input = wrapper.find('input[type="text"]');

    const inputText = 'test';
    input.simulate('change', { target: { value: inputText } });
    input = wrapper.find('input[type="text"]');
    expect(input.prop('value')).toBe(inputText);

    const clearButton = wrapper.find('button[type="button"]');
    expect(clearButton.length).toBe(1);
    expect(clearButton.children().length).toBe(1);
    expect(clearButton.childAt(0).name()).toBe('FontAwesomeIcon');
    expect(clearButton.childAt(0).prop('icon').iconName).toBe('times');

    const searchButton = wrapper.find('button[type="submit"]');
    expect(searchButton.length).toBe(1);
    expect(searchButton.children().length).toBe(1);
    expect(searchButton.childAt(0).name()).toBe('FontAwesomeIcon');
    expect(searchButton.childAt(0).prop('icon').iconName).toBe('search');
  });

  describe('with not empty input', () => {
    beforeEach(() => {
      const input = wrapper.find('input[type="text"]');
      const inputText = 'test';
      input.simulate('change', { target: { value: inputText } });
    });

    it('displays clear button and search button', () => {
      const clearButton = wrapper.find('button[type="button"]');
      expect(clearButton.length).toBe(1);
      expect(clearButton.children().length).toBe(1);
      expect(clearButton.childAt(0).name()).toBe('FontAwesomeIcon');
      expect(clearButton.childAt(0).prop('icon').iconName).toBe('times');

      const searchButton = wrapper.find('button[type="submit"]');
      expect(searchButton.length).toBe(1);
      expect(searchButton.children().length).toBe(1);
      expect(searchButton.childAt(0).name()).toBe('FontAwesomeIcon');
      expect(searchButton.childAt(0).prop('icon').iconName).toBe('search');
    });

    it('clear button click empties input and hides the button', () => {
      let clearButton = wrapper.find('button[type="button"]');
      clearButton.simulate('click', { preventDefault: jest.fn() });
      const input = wrapper.find('input[type="text"]');
      expect(input.prop('value')).toBe('');
      clearButton = wrapper.find('button[type="button"]');
      expect(clearButton.length).toBe(0);
    });

    it('search button click starts search and empties input and hides cancel button', () => {
      const spy = jest.fn();
      wrapper = mount(<CitySearch onSearch={spy} />);
      let input = wrapper.find('input[type="text"]');
      const inputText = 'test';
      input.simulate('change', { target: { value: inputText } });

      const searchButton = wrapper.find('button[type="submit"]');
      searchButton.simulate('submit');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(inputText);
      wrapper = wrapper.update();

      input = wrapper.find('input[type="text"]');
      expect(input.prop('value')).toBe('');
    });

    it('enter keydown starts search and empties input and hides cancel button', () => {
      const docEventListeners = {};
      document.addEventListener = jest.fn((eventType, callback) => docEventListeners[eventType] = callback);
      const spy = jest.fn();
      wrapper = mount(<CitySearch onSearch={spy} />);
      let input = wrapper.find('input[type="text"]');
      const inputText = 'test';
      input.simulate('change', { target: { value: inputText } });

      const event = { key: 'Enter', preventDefault: jest.fn() };
      docEventListeners['keydown'](event);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(inputText);
      wrapper = wrapper.update();

      input = wrapper.find('input[type="text"]');
      expect(input.prop('value')).toBe('');
    });

  });
});