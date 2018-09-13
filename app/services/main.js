import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  const escape = typeof escape === 'undefined'? require('querystring-browser').escape : escape;
  return {
    getMain: () => client.request({
      method: 'GET',
      url: '/api/main'
    }),
    search: (keyword) => client.request({
      method: 'GET',
      url: '/api/search/' + escape(keyword)
    })
  };
};

