import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getProjects: () => client.request({
      method: 'GET',
      url: '/project'
    }),
    deleteProject: ({ id }) => client.request({
      method: 'DELETE',
      url: `/project/${id}`
    }),
    updateProject: ({ id, data }) => client.request({
      method: 'PUT',
      url: `/project/${id}`,
      data
    }),
    createProject: ({ id, data }) => client.request({
      method: 'POST',
      url: `/project/${id}`,
      data
    })
  };
};

