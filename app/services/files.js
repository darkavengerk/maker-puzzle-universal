import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });

  return {
    upload: ({ data }) => client.request({
      method: 'POST',
      url: `/file`,
      data
    }),
    loadImage: ({ imageid }) => client.request({
      method: 'GET',
      url: `/file/image/` + imageid
    }),
  };
};

