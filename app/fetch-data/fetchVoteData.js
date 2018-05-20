import { voteService } from '../services';

const fetchData = async () => {
  return {vote: (await voteService().getTopics()).data};
};

export default fetchData;

