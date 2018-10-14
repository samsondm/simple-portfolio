import React, { Component } from 'react';
import TempButton from './TempButton';
import CitySearch from './CitySearch';
import Loading from './Loading';
import wrapWithCancelToken from '../../../utility/wrapWithCancelToken';
import { toCelsius, toFahrenheit } from '../utility/tempUnitsConverter';

class Weather extends Component {
  state = {
    temp: '',
    tempUnit: 'C',
    city: '',
    error: false,
    isLoading: true,
    isGeolocationBlocked: false,
    hasSearched: false,
    hasFound: false,
    iconID: '',
    description: ''
  };

  _isMounted = { value: false }; // cancel token
  isGoogleApiLoaded = 'google' in window;
  isGeolocationSupported = "geolocation" in navigator;

  componentDidMount() {
    this._isMounted.value = true;
    this.wrapWithCancel = wrapWithCancelToken(this._isMounted);
    if (this.isGeolocationSupported) {
      try {
        this.getWeather();
      } catch (e) {
        // console.error(e);
      }
    }
  }

  componentWillUnmount() {
    this._isMounted.value = false;
  }

  handleTemp = () => {
    let func, tempUnit;
    if (this.state.tempUnit === 'C') {
      func = toFahrenheit;
      tempUnit = 'F';
    } else {
      func = toCelsius;
      tempUnit = 'C';
    }
    this.setState({
      temp: Math.round(func(this.state.temp)),
      tempUnit
    });
  };

  getGoogleApi = async () => {
    try {
      return await new Promise((resolve, reject) => {
        const googleApi = document.createElement('script');
        const key = 'AIzaSyC3BmUjtcRlGyF4IXIuW0daNjoSFjDnRxA';
        googleApi.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
        googleApi.type = "text/javascript";
        googleApi.async = false;
        googleApi.onload = (e) => resolve('google api loaded');
        googleApi.onerror = (e) => reject(new Error(e));
        document.body.appendChild(googleApi);
      });
    } catch (err) {
      // console.error('google api script loading error caught', err);
      throw Object({ type: 'SCRIPT' });
    }
  }

  onSearch = async (search) => {
    try {
      this.setState({
        isLoading: true,
        hasSearched: true,
        error: false,
        hasFound: false
      });
      const [address, region] = search.split(',').map(name => name.trim());
      // load google api if not yet loaded
      if (!this.isGoogleApiLoaded) {
        await this.wrapWithCancel(this.getGoogleApi());
        this.isGoogleApiLoaded = true;
      }
      // get coordinates of searched address from google api
      let { formatted_address, geometry: { location: { lat, lng } } } = await this.wrapWithCancel(this.geocodeAddress(address, region));
      // get weather from fcc-weather-api
      if (typeof lat === 'function') {
        lat = lat();
        lng = lng();
      }
      await this.wrapWithCancel(this.getWeather(lat, lng, formatted_address));
    } catch (err) {
      // console.error('on search error caught', err);
      this.setState({
        isLoading: false
      });
      switch (err.type) {
        case 'CANCELED':
          break;
        case 'ADDRESS':
          this.setState({
            hasFound: false
          });
          break;
        case 'SCRIPT':
          break;
        default:
          this.setState({
            error: true
          });
      }
      return 'caught';
    }
  };

  geocodeAddress = async (address, region = '') => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      return await new Promise((resolve, reject) => {
        geocoder.geocode({ address, region }, (results, status) => {
          if (status === 'OK') {
            resolve(results[0]);
          } else {
            reject(status);
          }
        });
      });
    }
    catch (err) {
      // console.error('geocode address error caught', err);
      throw Object({ type: 'ADDRESS' });
    }
  }

  getWeather = async (latitude, longitude, address = '') => {
    try {
      // get current coordinates from geolocation api
      if (latitude === undefined) {
        ({ coords: { latitude, longitude } = {} } = await this.wrapWithCancel(this.getLocation()));
      }

      // fetch JSON from API
      const url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
      const response = await this.wrapWithCancel(fetch(url));
      if (!response.ok) throw Error(response.statusText);
      const weatherJSON = await this.wrapWithCancel(response.json());

      // check if we got address from geolocation
      let {
        name,
        sys: { country },
        main: { temp },
        weather: { // destructure array as object
          0: {
            icon,
            id,
            description
          }
        }
      } = weatherJSON;
      address = address ?
        address :
        !name ?
          '' :
          !country ?
            name :
            name + ', ' + country;
      // load 'defaults' if weather id, icon or description are missing but throw error on temp missing
      const iconID = id === undefined ? 500 : id,
        iconStateExec = !icon ? '' : /[dn](?=.png|$)/.exec(icon),
        iconState = !iconStateExec ?
          '' :
          iconStateExec[0] === 'd' ?
            'day' :
            'night';
      if (temp === undefined) throw new Error('Temp is missing from response');
      this.setState({
        isLoading: false,
        hasFound: true,
        temp: Math.round(temp),
        city: address,
        iconID,
        iconState,
        description
      });
      return 'getWeather fullfilled';
    }
    catch (err) {
      // console.error('get weather error caught', err);
      if (err.type === 'BLOCKED') this.setState({
        isLoading: false,
        isGeolocationBlocked: true
      });
    }
  }

  getLocation = async () => {
    try {
      const position =
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            location => resolve(location),
            () => reject(Error('geolocation blocked'))
          );
        });
      return position;
    }
    catch (err) {
      // console.error('get location caught', err);
      throw Object({ type: 'BLOCKED' });
    }
  }

  render() {
    const weatherDetailes = !this.isGeolocationSupported && !this.state.hasSearched ?
      <AppError text="Geolocation isn't supported. Use search." /> :
      this.state.isGeolocationBlocked && !this.state.hasSearched ?
        <AppError text="Geolocation is blocked. Use search." /> :
        this.state.error ?
          <AppError text="Loading error." /> :
          this.state.isLoading ?
            <Loading /> :
            this.state.hasSearched && !this.isGoogleApiLoaded ?
              <AppError text="Google API not reachable." /> :
              this.state.hasSearched && !this.state.hasFound ?
                <AppError text="Location not found." /> :
                <div className="weather-app__output weather">
                  <div className="weather__address">
                    {this.state.city}
                  </div>
                  <i className={`weather__icon wi wi-owm-${this.state.iconState ? this.state.iconState + '-' : ''}${this.state.iconID}`} />
                  <div className="weather__temp">
                    {this.state.temp}
                  </div>
                  <div className="weather__degree">
                    &deg;
                  </div>
                  <TempButton name={this.state.tempUnit} onClick={this.handleTemp} />
                  <div className="weather__description">
                    {this.state.description}
                  </div>
                </div>;

    return (
      <React.Fragment>
        <CitySearch onSearch={this.onSearch} />
        {weatherDetailes}
      </React.Fragment>
    );
  }
}

function AppError({ text = '' }) {
  return <div className="weather-app__error">{text}</div>;
}

export default Weather;