import { Company } from '../services';

const fetchData = async (param) => {

  if(param.link_name && param.link_name !== 'undefined') {
    return {company : (await Company().getCompany(param)).data, param};
  }
  return { param };

};

export default fetchData;

