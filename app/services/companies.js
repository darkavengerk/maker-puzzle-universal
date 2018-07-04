import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getCompanies: () => client.request({
      method: 'GET',
      url: '/api/companies'
    }),
    getCompany: ({ id }) => client.request({
      method: 'GET',
      url: `/api/company/${id}`,
    }),
    getCompanyPortfolio: ({ id, pid }) => client.request({
      method: 'GET',
      url: `/api/company/${id}/${pid}`,
    }),
    deleteCompany: ({ id }) => client.request({
      method: 'DELETE',
      url: `/api/company/${id}`
    }),
    updateCompany: ({ id, data }) => client.request({
      method: 'PUT',
      url: `/api/company/${id}`,
      data
    }),
    createCompany: ({ id, data }) => client.request({
      method: 'POST',
      url: `/api/company/${id}`,
      data
    })
  };
};

