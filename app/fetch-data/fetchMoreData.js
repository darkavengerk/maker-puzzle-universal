import { Main } from '../services';

const fetchData = async (param) => {
  const res = await Main().getMore(param);
  return {more : res.data, param};
};

export default fetchData;

