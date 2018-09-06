import { Main } from '../services';

const fetchData = async () => {
  const res = await Main().getMain();
  return {main : res.data};
};

export default fetchData;

