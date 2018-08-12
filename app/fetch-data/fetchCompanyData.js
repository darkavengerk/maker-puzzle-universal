import { Company } from '../services';

const fetchData = async (param) => {

  if(param.link_name) {
    return {company : (await Company().getCompany(param)).data, param};
  }
  return { param };

};

export default fetchData;

