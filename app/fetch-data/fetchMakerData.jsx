import { Maker } from '../services';

const fetchData = async (param) => {

  const source = param.pid ? Maker().getMakerProfile : Maker().getMaker;

  return {maker : (await source(param)).data};
};

export default fetchData;

