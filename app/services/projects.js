import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';
import { escape } from 'querystring'

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint, escape: true });
  return {
    getProjects: () => client.request({
      method: 'GET',
      url: '/api/project'
    }),
    getProject: ({link_name}) => client.request({
      method: 'GET',
      url: `/api/project/${escape(link_name)}`
    }),
    deleteProject: ({ id }) => client.request({
      method: 'DELETE',
      url: `/api/project/${id}`
    }),
    updateProject: ({ id, data }) => client.request({
      method: 'PUT',
      url: `/api/project/${id}`,
      data
    }),
    createProject: ({ id, data }) => client.request({
      method: 'POST',
      url: `/api/project/${id}`,
      data
    }),
    searchProjectsByName: ({keyword}) => client.request({
      method: 'GET',
      url: `/api/project/search/${keyword}`
    }),
  };
};

