import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  const escape = typeof escape === 'undefined'? require('querystring-browser').escape : escape;

  return {
    getCompanies: () => client.request({
      method: 'GET',
      url: '/api/companies'
    }),
    getCompany: ({ link_name }) => client.request({
      method: 'GET',
      url: `/api/company/${escape(link_name)}`
    }),
    updateCompanyFeatures: ({link_name, data}) => client.request({
      method: 'POST',
      url: `/api/company/${link_name}/features`,
      data
    }),
    getPortfolio: ({ id, pid }) => client.request({
      method: 'GET',
      url: `/api/company/${id}/portfolio/${pid}`,
    }),
    submitPortfolio: ({link_name, data}) => client.request({
      method: 'POST',
      url: `/api/company/${escape(link_name)}/portfolio`,
      data
    }),
    deletePortfolio: ({link_name, pid}) => client.request({
      method: 'DELETE',
      url: `/api/company/${escape(link_name)}/portfolio/${pid}`
    }),
    submitProduct: ({link_name, data}) => client.request({
      method: 'POST',
      url: `/api/company/${escape(link_name)}/product`,
      data
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
    }),
    searchCompaniesByName: ({keyword}) => client.request({
      method: 'GET',
      url: `/api/company/search/${keyword}`
    }),
    follow: ({link_name, data}) => client.request({
      method: 'POST',
      url: `/api/company/${link_name}/follow`,
      data
    }),
    unfollow: ({link_name, data}) => client.request({
      method: 'POST',
      url: `/api/company/${link_name}/unfollow`,
      data
    }),
  };
};

