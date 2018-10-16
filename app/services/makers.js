import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getMakers: () => client.request({
      method: 'GET',
      url: '/api/user'
    }),
    getMaker: ({id}) => client.request({
      method: 'GET',
      url: `/api/user/${id}`
    }),
    getMakerProfile: ({id, pid}) => client.request({
      method: 'GET',
      url: `/api/user/${id}/${pid}`
    }),
    updateMakerFeatures: ({id, data}) => client.request({
      method: 'POST',
      url: `/api/user/${id}/features`,
      data
    }),
    addOwnCompany: ({id, data}) => client.request({
      method: 'POST',
      url: `/api/user/${id}/company`,
      data
    }),
    follow: ({id, data}) => client.request({
      method: 'POST',
      url: `/api/user/${id}/follow`,
      data
    }),
    unfollow: ({id, data}) => client.request({
      method: 'POST',
      url: `/api/user/${id}/unfollow`,
      data
    }),
    submitPortfolio: ({id, data}) => client.request({
      method: 'POST',
      url: `/api/user/${id}/portfolio`,
      data
    }),
    deletePortfolio: ({id, pid}) => client.request({
      method: 'DELETE',
      url: `/api/user/${id}/portfolio/${pid}`
    }),
  };
};

