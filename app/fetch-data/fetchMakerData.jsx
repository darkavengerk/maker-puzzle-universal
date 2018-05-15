import { Maker } from '../services';

const fetchData = (param) => {
  let source = Maker().getMaker(param);

  if(param.pid) {
    source = Maker().getMakerProfile(param);
  }
  return source
    .then(res => ({maker : res.data}))
    // Returning [] as a placeholder now so it does not error out when this service
    // fails. We should be handling this in our DISPATCH_REQUEST_FAILURE
    .catch(() => ({}));
};

export default fetchData;

