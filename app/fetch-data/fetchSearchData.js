import { Main } from '../services';

const fetchData = async (param) => {
  const res = await Main().search(param.keyword);
  return {search : res.data, param};
};

export default fetchData;

