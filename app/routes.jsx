import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router';

import { 
  fetchVoteData,
  fetchMainData,
  fetchSearchData,
  fetchMakerData,
  fetchProjectData,
  fetchCompanyData,
  fetchMoreData,
  fetchPolicyData
} from './fetch-data';

import { 
  Root,
  App, 
  Search, 
  Policy,
  Main, 
  Hello,
  Vote, 
  Dashboard, 
  About, 
  LoginOrRegister, 
  Maker, 
  Project, 
  Company, 
  More,
  Construction 
} from './pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={Root}>
      <IndexRoute component={Hello} />
      <Route path="/" component={App}>
        {/*<IndexRoute component={Construction} />*/}
        {/*<Route exact path="main" component={Main} fetchData={fetchMainData} />*/}
        <Route exact path="/main" component={Main} fetchData={fetchMainData} />
        <Route path="maker/:id/portfolio/:pid" component={Maker} fetchData={fetchMakerData} />
        <Route path="maker/:id" component={Maker} fetchData={fetchMakerData} />
        <Route path="search/:keyword" component={Search} fetchData={fetchSearchData} />
        <Route path="policy/:section" component={Policy} fetchData={fetchPolicyData} />
        <Route path="more/:topic/:subtype/:sort" component={More} fetchData={fetchMoreData} />
        <Route path="project/:link_name/maker/:mid/:pid" component={Project} fetchData={fetchProjectData} />
        <Route path="project/:link_name/company/:cid/:pid" component={Project} fetchData={fetchProjectData} />
        <Route path="project/:link_name" component={Project} fetchData={fetchProjectData} />
        <Route path="company/:link_name/portfolio/:pid" component={Company} fetchData={fetchCompanyData} />
        <Route path="company/:link_name/maker/:mid/:pid" component={Company} fetchData={fetchCompanyData} />
        <Route path="company/:link_name/product/:pid" component={Company} fetchData={fetchCompanyData} />
        <Route path="company/:link_name" component={Company} fetchData={fetchCompanyData} />
        {/*<Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
        <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
        <Route path="about" component={About} />*/}
      </Route>
    </Route>
  );
};
