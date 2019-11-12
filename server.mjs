import {readdirSync, lstatSync} from 'fs';
import Hapi from 'hapi';
import config from './config';


const server = Hapi.server({
  load: {
    sampleInterval: 1000
  },
  port: 1221
});

server.start();

console.log("Yoo! Let's hear some music y'all!");
