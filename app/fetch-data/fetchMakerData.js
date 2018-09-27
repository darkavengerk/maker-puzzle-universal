import { Maker, Main } from '../services';

const fetchData = async (param) => {
  if(param.id && param.id !== 'undefined') {
    const source = param.pid ? Maker().getMakerProfile : Maker().getMaker;
    const fetched = await source(param);

    Main().count({ content: 'portfolio', param});

    return {maker : fetched.data, param};
  }
  return { param };

};

export default fetchData;

