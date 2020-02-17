import { readdirSync, lstatSync } from 'fs';

const config = require('../../config.json');


const rootMusic = {
  method: 'GET',
  path: '/music',
  handler: () => (readdirSync(config.locations.music, 'utf8')).filter(dir => dir[0] !== '.')
};

const artist = {
  method: 'GET',
  path: '/music/{artist}',
  handler: (request) => {
    return readdirSync([config.locations.music, request.params.artist].join('/'), 'utf8')
  }
};

const album = {
  method: 'GET',
  path: '/music/{artist}/{album}',
  handler: (request) => {
    return readdirSync([config.locations.music, request.params.artist, request.params.album].join('/'), 'utf8')
  }
};
const item = {
  method: 'GET',
  path: '/{artist}/{album}/{element}',
  options: {
    // payload:{
    //   output:'data'
    // }
  },
  handler: (request) => {
    //   if(exists([config.locations.music,request.params.artist,request.params.album,request.params.element].join('/')))
    //     return new Stream()
  }
};

function validateFolder(arrayFolder, contextPath) {
  const returnElement = [];
  arrayFolder.forEach((folder) => {
    if (folder[0] !== '.' && lstatSync([contextPath, folder].join('/')).isDirectory())
      returnElement.push(folder);
  });
  return returnElement;
}

// TODO Check with all possible audio/video extensions
function validateMediaFile(arrayFiles, contextPath) {
  const returnElement = [];
  arrayFiles.forEach((file) => {
    // if (file.split('.').pop() !== 'mp3')
    if (file[0] !== '.' && !lstatSync([contextPath, file].join('/')).isDirectory() && file.split('.').length >= 2)
      returnElement.push(file);
  });
  return returnElement;
}

export { rootMusic, artist, album, item };