import { Maker } from '../services';

const fetchData = async (param) => {

  if(param.id) {

    const source = param.pid ? Maker().getMakerProfile : Maker().getMaker;
    return {maker : (await source(param)).data};
  }
  return {};

};

export default fetchData;

