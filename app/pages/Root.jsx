import React from 'react';
import Page from '../pages/Page';
import RootContainer from '../containers/Root';
import BrowserWarning from '../components/BrowserWarning';
import { title, meta, link } from './assets';

const Root = props => (
  <Page title={title} meta={meta} link={link}>
    <BrowserWarning />
    <RootContainer {...props} />
  </Page>
);

export default Root;
