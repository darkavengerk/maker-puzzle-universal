import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getCompanies: () => client.request({
      method: 'GET',
      url: '/company'
    }),
    deleteCompany: ({ id }) => client.request({
      method: 'DELETE',
      url: `/company/${id}`
    }),
    updateCompany: ({ id, data }) => client.request({
      method: 'PUT',
      url: `/company/${id}`,
      data
    }),
    createCompany: ({ id, data }) => client.request({
      method: 'POST',
      url: `/company/${id}`,
      data
    })
  };
};

