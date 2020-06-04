import { findElement } from '../helpers/helperDOM';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE, DEGREE_SIGN } from '../constants/constants';
import renderMap from '../render/renderMap';

export const sharedLocation = { latitudeNumber: 0, longitudeNumber: 0 };

const getCurrentGeocoding = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  let latitudeNumber;
  let longitudeNumber;


  return new Promise((resolve) => {
    const success = (data) => {
      const coordinates = data.coords;

      const latitudeText = findElement('.section__latitude--text');
      sharedLocation.latitudeNumber = coordinates.latitude;
      latitudeNumber = coordinates.latitude;

      const longitudeText = findElement('.section__longitude--text');
      sharedLocation.longitudeNumber = coordinates.longitude;
      longitudeNumber = coordinates.longitude;

      const source = [latitudeNumber, longitudeNumber];

      const convertToDMS = (src) => {
        const toDMS = (n) => {
          n = Math.abs(n);
          const d = Math.floor(n);
          n -= d;
          n *= 60;

          const m = Math.floor(n);
          n -= m;
          n *= 60;

          return `${d}${DEGREE_SIGN} ${m}'`;
        };

        latitudeText.innerHTML = `${toDMS(src[0])}`;
        longitudeText.innerHTML = `${toDMS(src[1])}`;
      };

      convertToDMS(source);

      resolve({ lat: latitudeNumber, long: longitudeNumber });
    };

    const error = () => {
      const latitudeText = findElement('.section__latitude--text');
      latitudeNumber = DEFAULT_LATITUDE;
      latitudeText.innerHTML = latitudeNumber;

      const longitudeText = findElement('.section__longitude--text');
      longitudeNumber = DEFAULT_LONGITUDE;
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
