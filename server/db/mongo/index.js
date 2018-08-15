import connect from './connect';
import passport from './passport';
import session from './session';
import common from './common';

import Company, {autoComplete as companyAutoComplete} from './models/company';
import Project, {autoComplete as projectAutoComplete} from './models/project';
import Image from './models/image';
import Metadata from './models/metadata';
import Misc from './models/misc';
import Product from './models/product';
import User from './models/user';

const models = {
  Company,
  Image,
  Metadata,
  Misc,
  Product,
  Project,
  User,
  companyAutoComplete,
  projectAutoComplete
}

export default {
  connect,
  passport,
  session,
  common,
  models
};
