import { Project, Main } from '../services';

const fetchData = async (param) => {

  if(param.link_name && param.link_name !== 'undefined') {
    Main().count({ content: 'portfolio', param});
    return {project : (await Project().getProject(param)).data, param};
  }
  return { param };

};

export default fetchData;

