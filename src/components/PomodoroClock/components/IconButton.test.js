import React from 'react';
import { shallow } from 'enzyme';
import IconButton from './IconButton';


describe('IconButton', () => {
  let props, shallowWrapper;

  const iconButton = () => shallowWrapper ?
    shallowWrapper :
    shallowWrapper = shallow(<IconButton {...props} />);

  beforeEach(() => {
    props = { className: 'className', onClick: jest.fn(), icon: {} };
    shallowWrapper = null;
  });

  it('renders without crashing', () => {
    iconButton();
  });

  it('renders div with props equal to props.className and props.onClick', () => {
    const childDiv = iconButton().getElement();

    expect(childDiv.type).toBe('div');
    expect(childDiv.props.className).toBe(props.className);
    expect(childDiv.props.onClick).toBe(props.onClick);
  });

  it('renderes div with single child that has prop icon equal props.icon', () => {
    const children = iconButton().children(),
      child = shallowWrapper.childAt(0);

    expect(children.length).toBe(1);
    expect(child.prop('icon')).toBe(props.icon);
  });
});