import { Main } from '../services';

const fetchData = async (param) => {
  if(param.section) {
    const res = await Main().getMain();
    return { paramabc: param };
  }
  return { param };
};

export default fetchData;

