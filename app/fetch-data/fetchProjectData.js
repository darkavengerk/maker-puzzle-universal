import { Project } from '../services';

const fetchData = async (param) => {

  try {
    const result = await Project().getProject(param);
    return { project : result.data, param };
  }
  catch(e) {
    console.log('error', e);
    return { param };
  }

};

export default fetchData;

