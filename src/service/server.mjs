import {readdirSync, lstatSync} from 'fs';
import Hapi from 'hapi';

// import { main, artist, album, item } from '../domain/music';
// import * as images from '../domain/images';
// import * as videos from '../domain/videos';
import * as music from '../domain/music';
console.log('ok');
const server = Hapi.server({
  load: {
    sampleInterval: 1000
  },
  port: 1221
});
music.forEach(item => server.route(item));

server.start();

console.log("Yoo! Let's hear some music y'all!");
