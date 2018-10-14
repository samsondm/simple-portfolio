import React, { Component } from 'react';
import './WeatherApp.css';
// import Header from './components/Header';
import Weather from './components/Weather';

class WeatherApp extends Component {
  componentDidMount() {
    // document.title = 'Weather App';
  }

  render() {
    return (
      <div className="weather-app">
        {/* <Header /> */}
        <Weather />
      </div>
    );
  }
}

export default WeatherApp;
