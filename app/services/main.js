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
    getPolicy: () => client.request({
      method: 'GET',
      url: '/api/policy/'
    }),
    getMore: (params) => client.request({
      method: 'GET',
      url: `/api/more/${params.topic}/${params.subtype}/${params.sort}`
    }),
    loadMore: (params) => client.request({
      method: 'GET',
      url: `/api/more/${params.topic}/${params.subtype}/${params.sort}/${params.current}`
    }),
    count: ({ content, identifier }) => client.request({
      method: 'POST',
      url: '/api/count',
      data: { content, identifier }
    }),
    search: (keyword) => client.request({
      method: 'GET',
      url: '/api/search/' + escape(keyword)
    })
  };
};

