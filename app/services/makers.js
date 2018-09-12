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
    }),
    updateMakerFeatures: ({id, data}) => client.request({
      method: 'POST',
      url: `/user/${id}/features`,
      data
    }),
    follow: ({id, data}) => client.request({
      method: 'POST',
      url: `/user/${id}/follow`,
      data
    }),
    unfollow: ({id, data}) => client.request({
      method: 'POST',
      url: `/user/${id}/unfollow`,
      data
    }),
    submitPortfolio: ({id, data}) => client.request({
      method: 'POST',
      url: `/user/${id}/portfolio`,
      data
    }),
    deletePortfolio: ({id, pid}) => client.request({
      method: 'DELETE',
      url: `/user/${id}/portfolio/${pid}`
    }),
  };
};

