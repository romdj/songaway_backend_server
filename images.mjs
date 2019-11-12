import { readdirSync } from 'fs';

import './config.json';

const mainRoute = {
  method: 'GET',
  path: '/images',
  handler: () => (readdirSync(config.locations.images, 'utf8')).filter(dir => dir[0] !== '.')
};

export { mainRoute };