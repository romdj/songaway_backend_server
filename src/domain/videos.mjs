import { readdirSync } from 'fs';

import config from '../../config.json';

const mainRoute = {
  method: 'GET',
  path: '/videos',
  handler: () => (readdirSync(config.locations.videos, 'utf8')).filter(dir => dir[0] !== '.')
};

export { mainRoute };
