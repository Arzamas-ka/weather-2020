import { findElement } from '../helpers/helperDOM';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../constants/constants';
import renderMap from '../render/renderMap';

const getCurrentGeocoding = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  return new Promise((resolve) => {
    const success = (data) => {
      const coordinates = data.coords;

      const latitudeText = findElement('.section__latitude--text');
      const latitudeNumber = coordinates.latitude.toFixed(3);
      latitudeText.innerHTML = latitudeNumber;

      const longitudeText = findElement('.section__longitude--text');
      const longitudeNumber = coordinates.longitude.toFixed(3);
      longitudeText.innerHTML = longitudeNumber;

      resolve({ lat: latitudeNumber, long: longitudeNumber });
    };

    const error = () => {
      const latitudeText = findElement('.section__latitude--text');
      const latitudeNumber = DEFAULT_LATITUDE;
      latitudeText.innerHTML = latitudeNumber;

      const longitudeText = findElement('.section__longitude--text');
      const longitudeNumber = DEFAULT_LONGITUDE;
      longitudeText.innerHTML = longitudeNumber;

      resolve({ lat: latitudeNumber, long: longitudeNumber });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  });
};

export const getCurrentMap = ({ lat, long }) => {
  renderMap({ lat, long });

  return { lat, long };
};

export default getCurrentGeocoding;
