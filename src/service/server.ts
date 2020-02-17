import Hapi from 'hapi';

import { album, artist, item, rootMusic } from '../domain/music';
console.log('ok');
const server = new Hapi.Server({
  load: {
    sampleInterval: 1000
  },
  port: 1221
});
server.route(rootMusic);
server.route(artist);
server.route(album);
server.route(item);
server.start();

console.log("Yoo! Let's hear some music y'all!");
