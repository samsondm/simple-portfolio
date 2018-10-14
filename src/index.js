import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'weathericons/css/weather-icons.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App/App';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <HashRouter basename={process.env.PUBLIC_URL}>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
registerServiceWorker();
