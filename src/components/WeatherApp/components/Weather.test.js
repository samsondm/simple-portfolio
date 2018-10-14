import React from 'react';
import { shallow, mount } from 'enzyme';
import Weather from './Weather';
import wrapWithCancelToken from '../../../utility/wrapWithCancelToken';

let wrapper;
const testJSON = {
  "coord": { "lon": 159, "lat": 35 },
  "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399" }],
  "base": "stations",
  "main": { "temp": 22.59, "pressure": 1027.45, "humidity": 100, "temp_min": 22.59, "temp_max": 22.59, "sea_level": 1027.47, "grnd_level": 1027.45 },
  "wind": { "speed": 8.12, "deg": 246.503 },
  "rain": { "3h": 0.45 },
  "clouds": { "all": 92 },
  "dt": 1499521932,
  "sys": { "message": 0.0034, "sunrise": 1499451436, "sunset": 1499503246 },
  "id": 0,
  "name": "Test JSON",
  "cod": 200
};

const geocodeJSON = {
  "results": [
    {
      "address_components": [
        {
          "long_name": "1600",
          "short_name": "1600",
          "types": ["street_number"]
        },
        {
          "long_name": "Amphitheatre Pkwy",
          "short_name": "Amphitheatre Pkwy",
          "types": ["route"]
        },
        {
          "long_name": "Mountain View",
          "short_name": "Mountain View",
          "types": ["locality", "political"]
        },
        {
          "long_name": "Santa Clara County",
          "short_name": "Santa Clara County",
          "types": ["administrative_area_level_2", "political"]
        },
        {
          "long_name": "California",
          "short_name": "CA",
          "types": ["administrative_area_level_1", "political"]
        },
        {
          "long_name": "United States",
          "short_name": "US",
          "types": ["country", "political"]
        },
        {
          "long_name": "94043",
          "short_name": "94043",
          "types": ["postal_code"]
        }
      ],
      "formatted_address": "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
      "geometry": {
        "location": {
          "lat": 37.4224764,
          "lng": -122.0842499
        },
        "location_type": "ROOFTOP",
        "viewport": {
          "northeast": {
            "lat": 37.4238253802915,
            "lng": -122.0829009197085
          },
          "southwest": {
            "lat": 37.4211274197085,
            "lng": -122.0855988802915
          }
        }
      },
      "place_id": "ChIJ2eUgeAK6j4ARbn5u_wAGqWA",
      "types": ["street_address"]
    }
  ],
  "status": "OK"
};

const wait = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

jest.mock('../../../utility/wrapWithCancelToken', () => () => cb => cb);
const responseInit = {
  'status': '200',
  'statusText': 'test'
};
const blobBody = [JSON.stringify(testJSON)];
const blobType = { type: 'application/json' };
let response = new Response(new Blob(blobBody, blobType), responseInit);
window.fetch = jest.fn(() => response);

describe('Weather', () => {
  it('renders without crashing', () => {
    wrapper = mount(<Weather />);
  });

  it('renders appropriate message if geolocation isn\'t supported', async () => {
    wrapper = shallow(<Weather />);
    await wait();
    expect(wrapper.children().length).toBe(2);
    expect(wrapper.childAt(1).name()).toBe('AppError');
    expect(wrapper.childAt(1).prop('text')).toBe("Geolocation isn't supported. Use search.");
  });

  describe('with geolocation support', () => {
    beforeEach(() => {
      window.navigator.geolocation = { getCurrentPosition: jest.fn((success, error) => success(testJSON.name)) };
      response = new Response(new Blob(blobBody, blobType), responseInit);
    });

    it('renders loading icon while fetching data', async () => {
      wrapper = shallow(<Weather />);
      expect(wrapper.children().length).toBe(2);
      expect(wrapper.childAt(1).name()).toBe('Loading');
      await wait();
      expect(wrapper.find('Loading').exists()).not.toBe(true);
    });

    it('renders current location weather with geolocation supported and unlocked', async () => {
      wrapper = shallow(<Weather />);
      await wait();

      expect(wrapper.find('.weather-app__output').exists()).toBe(true);
      expect(wrapper.find('.weather__address').text()).toBe(testJSON.name);
      expect(wrapper.find('.weather__icon').hasClass('wi-owm-night-500'));
      expect(wrapper.find('.weather__temp').text()).toBe(Math.round(testJSON.main.temp).toString());
      expect(wrapper.find('.weather__degree').text()).toBe('°');
      expect(wrapper.find('.weather__description').text()).toBe(testJSON.weather[0].description);
    });

    it('changes temp unit symbol on TempButton click', async () => {
      wrapper = shallow(<Weather />);
      await wait();

      let tempButton = wrapper.find('TempButton');
      expect(tempButton.prop('name')).toBe('C');
      tempButton.simulate('click');
      wrapper = wrapper.update();
      tempButton = wrapper.find('TempButton');
      expect(tempButton.prop('name')).toBe('F');
    });

    it('renders appropriate message if geolocation is blocked', async () => {
      window.navigator.geolocation.getCurrentPosition = jest.fn((success, error) => error());
      wrapper = shallow(<Weather />);
      await wait();

      expect(wrapper.children().length).toBe(2);
      expect(wrapper.childAt(1).name()).toBe('AppError');
      expect(wrapper.childAt(1).prop('text')).toBe("Geolocation is blocked. Use search.");
    });
  });

  describe('after searching for location', () => {

    const simulateSearch = async (msg = 'test', shouldUpdate = true) => {
      const input = wrapper.find('input[name="search"]');
      input.simulate('change', { target: { value: msg } });
      wrapper = wrapper.update();
      const search = wrapper.find('button[type="submit"]');
      search.simulate('submit');
      await wait();
      if (shouldUpdate) {
        wrapper = wrapper.update();
        await wait();
      }
    };

    beforeEach(async () => {
      wrapper = mount(<Weather />);
      await wait();
    });

    it('renders loading icon while fetching data', async () => {
      wrapper.instance().getGoogleApi = jest.fn().mockRejectedValue(new Object({ type: 'SCRIPT' }));

      await simulateSearch('test', false);

      expect(wrapper.children().length).toBe(2);
      expect(wrapper.childAt(1).name()).toBe('Loading');

      wrapper = wrapper.update();
      await wait();
      expect(wrapper.find('Loading').exists()).not.toBe(true);
    });

    it('renders appropriate message if unspecified error was thrown', async () => {
      wrapper.instance().getGoogleApi = jest.fn().mockRejectedValue(new Error('error'));
      wrapper = wrapper.update();

      await simulateSearch();

      expect(wrapper.children().length).toBe(2);
      expect(wrapper.childAt(1).name()).toBe('AppError');
      expect(wrapper.childAt(1).prop('text')).toBe('Loading error.');
    });

    it('renders appropriate message if google API script cant be loaded ', async () => {
      wrapper.instance().getGoogleApi = jest.fn().mockRejectedValue(new Object({ type: 'SCRIPT' }));
      wrapper = wrapper.update();

      await simulateSearch();

      expect(wrapper.children().length).toBe(2);
      expect(wrapper.childAt(1).name()).toBe('AppError');
      expect(wrapper.childAt(1).prop('text')).toBe('Google API not reachable.');
    });

    it('renders appropriate message if address was not found', async () => {
      wrapper.instance().isGoogleApiLoaded = true;
      wrapper.instance().geocodeAddress = jest.fn().mockRejectedValue(new Object({ type: 'ADDRESS' }));
      wrapper = wrapper.update();

      await simulateSearch();

      expect(wrapper.children().length).toBe(2);
      expect(wrapper.childAt(1).name()).toBe('AppError');
      expect(wrapper.childAt(1).prop('text')).toBe('Location not found.');
    });

    it('renders weather details for searched address', async () => {
      wrapper.instance().isGoogleApiLoaded = true;
      const geocodeSpy = jest.fn((obj, cb) => cb(geocodeJSON.results, geocodeJSON.status));
      window.google = {
        maps: {
          Geocoder: jest.fn(() => ({
            geocode: geocodeSpy
          }))
        }
      };
      wrapper = wrapper.update();

      await simulateSearch();

      expect(window.google.maps.Geocoder).toHaveBeenCalledTimes(1);
      expect(geocodeSpy).toHaveBeenCalledTimes(1);

      expect(wrapper.find('.weather-app__output').exists()).toBe(true);
      expect(wrapper.find('.weather__address').text()).toBe(geocodeJSON.results[0].formatted_address);
      expect(wrapper.find('.weather__icon').hasClass('wi-owm-night-500'));
      expect(wrapper.find('.weather__temp').text()).toBe(Math.round(testJSON.main.temp).toString());
      expect(wrapper.find('.weather__degree').text()).toBe('°');
      expect(wrapper.find('.weather__description').text()).toBe(testJSON.weather[0].description);
    });

  });
});