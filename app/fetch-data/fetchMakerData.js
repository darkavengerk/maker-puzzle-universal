import { Maker } from '../services';

const fetchData = async (param) => {
  if(param.id) {
    const source = param.pid ? Maker().getMakerProfile : Maker().getMaker;
    const fetched = await source(param);
    return {maker : fetched.data, param};
  }
  return { param };

};

export default fetchData;

