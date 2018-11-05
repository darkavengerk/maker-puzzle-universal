import React from 'react';
import Page from '../pages/Page';
import RootContainer from '../containers/Root';
import { title, meta, link } from './assets';

const Root = props => (
  <Page title={title} meta={meta} link={link}>
    <RootContainer {...props} />
  </Page>
);

export default Root;
