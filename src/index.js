import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import 'weathericons/css/weather-icons.css';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App/App';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
registerServiceWorker();
