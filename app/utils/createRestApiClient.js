import axios from 'axios';
import { polyfill } from 'es6-promise';

import { appVersion } from '../../config/app';

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
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.request(options);
        console.log(result, result.status === 301);
        if(result.status === 301) {
          alert('Old version detected. Will refresh the page.');
          window.location.reload();
        }
        resolve(result);
      }
      catch(e) {
        reject(e);
      }
    });
  }
}

const createRestApiClient = () => ({
  withConfig: config => new RestApiClient(config)
});

export default createRestApiClient;

