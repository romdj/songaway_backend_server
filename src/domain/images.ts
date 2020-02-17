import { readdirSync } from 'fs';

import config from '../config.json';

const main = {
  method: 'GET',
  path: '/images',
  handler: () => (readdirSync(config.locations.images, 'utf8')).filter(dir => dir[0] !== '.')
};

export { main };