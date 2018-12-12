import axios from 'axios';
import { polyfill } from 'es6-promise';

import { appVersion, isProduction } from '../../config/app';

polyfill();

class RestApiClient {
  constructor(config) {
    this.client = axios.create(config);
  }

  request(options) {
    const { url } = options;
    
    if(url.startsWith('/api/')) {
      options.url = url.replace('/api/', `/api/${appVersion}/`);
    }
    return this.client.request(options).catch(err => {
      if(isProduction && err.response.status === 301) {
        window.location.reload();
      }
      else throw err;
    });
  }
}

const createRestApiClient = () => ({
  withConfig: config => new RestApiClient(config)
});

export default createRestApiClient;

