import fs from 'fs';
import Hapi from 'hapi';
import config from './config';
import _ from 'lodash';
import { Stream } from 'stream';


const server = Hapi.server({
  load: {
    sampleInterval: 1000
  },
  port: 1221
});

server.route({
  method: 'GET',
  path: '/artists',
  handler: () => fs.readdirSync(config.locations.music,'utf8')
});

server.route({
  method: 'GET',
  path: '/{artist}',
  handler: (request) => {
    return fs.readdirSync([config.locations.music,request.params.artist].join('/'),'utf8')
  }
});

server.route({
  method: 'GET',
  path: '/{artist}/{album}',
  handler: (request) => {
    return fs.readdirSync([config.locations.music,request.params.artist,request.params.album].join('/'),'utf8')
  }
});

server.route({
  method: 'GET',
  path: '/{artist}/{album}/{element}',
  options :{
    // payload:{
    //   output:'data'
    // }
  },
  handler: (request) => {
  //   if(fs.exists([config.locations.music,request.params.artist,request.params.album,request.params.element].join('/')))
  //     return new Stream()
  }
});

// server.route({
//   method: 'GET',
//   path: '/artists',
//   handler: () => fs.readdirSync([config.locations.music].join('/'),'utf8')
// });
// server.route({
//   method: 'GET',
//   path: '/artists',
//   handler: () => fs.readdirSync([config.locations.music].join('/'),'utf8')
// });


server.start();


console.log("Yoo! Let's hear some music y'all!");