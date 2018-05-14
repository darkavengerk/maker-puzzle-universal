import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getMakers: () => client.request({
      method: 'GET',
      url: '/user'
    }),
    getMaker: ({id}) => client.request({
      method: 'GET',
      url: `/user/${id}`
    }),
    getMakerProfile: ({id, pid}) => client.request({
      method: 'GET',
      url: `/user/${id}/${pid}`
    })
  };
};

