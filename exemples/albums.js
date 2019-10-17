global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token: 'BQB8gYKM97PxNmFxTZmt1clfTHgOjL3T7S8DIjUAqPcf5_zQO4tc1h1JeREluch3_Fpqtb0YALBlCwuUkWugZNEN6_vVpy4CH37tsN7Xyu0gEHpGXQcBYoxL1NMOHiMpOEY8Sz3vJvc_97PoZcHjwc8yXJbtcsoMiITB-kObdMwryB5H3Eihh_9GA8I'});

const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
