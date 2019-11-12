import { readdirSync, lstatSync } from 'fs';
import Hapi from 'hapi';
import config from './config';


const main = {
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

// server.route({
//   method: 'GET',
//   path: '/lib/tree',
//   handler: (request) => {
//     // We assume that the structure is Artist/Album/[potential album]/Song therefore we don't specify artist, album or song keys
//     const currentPath = config.locations.music;
//     let itemTree = {};
//     validateFolder(readdirSync(currentPath, 'utf8'), currentPath).forEach((artist) => {
//       const currentPath = [config.locations.music, artist].join('/');
//       itemTree[artist] = {};
//       validateFolder(readdirSync(currentPath, 'utf8'), currentPath).forEach((album) => {
//         // TODO: handle case where more than 2 folder layer in tree
//         const currentPath = [config.locations.music, artist, album].join('/');
//         itemTree[artist][album] = validateMediaFile(readdirSync(currentPath, 'utf8'), currentPath);
//       });
//     });
//     return JSON.stringify(itemTree);
//   }
// });

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


console.log("Yoo! Let's hear some music y'all!");

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

export { main, artist, album, item };