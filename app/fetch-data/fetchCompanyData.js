import { Company } from '../services';

const fetchData = async (param) => {

  if(param.link_name) {
    const source = param.pid ? Company().getCompanyPortfolio : Company().getCompany;
    return {company : (await source(param)).data, param};
  }
  return { param };

};

export default fetchData;

