import { findElement } from '../helpers/helperDOM';
import { MAPBOX_API_TOKEN } from '../constants/constants';

const renderMap = ({ lat, long }) => {
  const mapElement = document.createElement('div');
  mapElement.id = 'map';
  findElement('.section-right__map').append(mapElement);

  window.mapboxgl.accessToken = MAPBOX_API_TOKEN;

  const map = new window.mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [`${long}`, `${lat}`],
    zoom: 10,
  });

  map.addControl(new window.mapboxgl.NavigationControl());

  // draw icon in map
  const size = 150;

  const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // get rendering context for the map canvas when layer is added to the map
    onAdd() {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },

    // called once before every frame where the icon will be used
    render() {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;

      // draw outer circle
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.beginPath();
      this.context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      this.context.fillStyle = `rgba(111, 170, 201, ${1 - t})`;
      this.context.fill();

      // draw inner circle
      this.context.beginPath();
      this.context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      this.context.fillStyle = 'rgba(0, 124, 191, 1)';
      this.context.strokeStyle = 'white';
      this.context.lineWidth = 2 + 4 * (1 - t);
      this.context.fill();
      this.context.stroke();

      this.data = this.context.getImageData(0, 0, this.width, this.height).data;

      map.triggerRepaint();

      return true;
    },
  };

  map.on('load', () => {
    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [long, lat],
              },
            },
          ],
        },
      },
      layout: {
        'icon-image': 'pulsing-dot',
      },
    });
  });
};

export default renderMap;
