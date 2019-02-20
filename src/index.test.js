import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './components/App/App';

jest.mock('react-dom');

describe('index', () => {
  it('calls ReactDom.render with props', () => {
    const render = ReactDom.render.mockImplementation(() => jest.fn());
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    require('index.js');
    expect(render).toHaveBeenCalledWith(
      <HashRouter>
        <App />
      </HashRouter>,
      root,
    );
  });
});
