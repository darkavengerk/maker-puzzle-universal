import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    login: ({ email, password }) => client.request({
      method: 'POST',
      url: '/sessions',
      data: {
        email,
        password
      }
    }),
    signUp: data => client.request({
      method: 'POST',
      url: '/api/users',
      data
    }),
    signOff: ({ userid }) => client.request({
      method: 'POST',
      url: `/api/user/${userid}/remove`
    }),
    changePassword: ({ id, password, hash }) => client.request({
      method: 'POST',
      url: `/api/user/${id}/password`,
      data: { password, hash }
    }),
    requestPasswordChange: ({ email }) => client.request({
      method: 'GET',
      url: `/api/user/${email}/password`
    }),
    logOut: () => client.request({
      method: 'DELETE',
      url: '/sessions'
    })
  };
};

