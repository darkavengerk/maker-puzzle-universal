import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router';
import { fetchVoteData, fetchMainData, fetchMakerData, fetchProjectData, fetchCompanyData } from './fetch-data';
import { App, Main, Vote, Dashboard, About, LoginOrRegister, Maker, Project, Company } from './pages';

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
    <Route path="/" component={App}>
      <IndexRoute component={Vote} fetchData={fetchVoteData} />
      <Route exact path="main" component={Main} fetchData={fetchMainData} />
      <Route path="maker/:id/portfolio/:pid" component={Maker} fetchData={fetchMakerData} />
      <Route path="maker/:id" component={Maker} fetchData={fetchMakerData} />
      <Route path="project/:link_name/maker/:mid/:pid" component={Project} fetchData={fetchProjectData} />
      <Route path="project/:link_name" component={Project} fetchData={fetchProjectData} />
      <Route path="company/:link_name" component={Company} fetchData={fetchCompanyData} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="about" component={About} />
    </Route>
  );
};
