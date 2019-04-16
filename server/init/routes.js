/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { passport as passportConfig } from '../db';
import controllers from '../controllers';

import { appVersion } from '../../config/app';

const topicsController = controllers && controllers.topics;

const mainController = controllers && controllers.main;
const usersController = controllers && controllers.users;
const projectController = controllers && controllers.projects;
const companyController = controllers && controllers.companies;
const fileController = controllers && controllers.files;


export default (app) => {

  function GET(addr, fn) {
    httpRequest('get', addr, fn);
  }

  function POST(addr, fn) {
    httpRequest('post', addr, fn);
  }

  function PUT(addr, fn) {
    httpRequest('put', addr, fn);
  }

  function DELETE(addr, fn) {
    httpRequest('delete', addr, fn);
  }

  function addrHook(addr) {
    if(addr.startsWith('/api/')) {
      return addr.replace('/api/', `/api/${appVersion}/`);
    }
    if(addr.startsWith('/*api*')) {
      return `/api/*`;
    }

    return addr;
  }

  function httpRequest(method, addr, handler) {
    app[method](addrHook(addr), handler);
  }

  if (mainController) {
    GET('/batch/commands/:command', mainController.command);
    GET('/api/main', mainController.main);
    GET('/api/policy', mainController.policy);
    GET('/api/more/:topic/:subtype/:sort/:loaded', mainController.more);
    GET('/api/more/:topic/:subtype/:sort', mainController.more);
    POST('/api/count', mainController.increaseCount);
    GET('/api/search/:keyword/:current', mainController.search);
    GET('/api/search/:keyword', mainController.search);
  }

  // user routes
  if (usersController) {
    GET('/api/user/:id/password', usersController.passwordRequest);
    GET('/api/user/:id/:pid', usersController.single);
    GET('/api/user/:id', usersController.single);
    GET('/api/user', usersController.all);
    POST('/api/user/:id/features', usersController.updateFeatures);
    POST('/api/user/:id/company', usersController.addCompany);
    POST('/api/user/:id/portfolio', usersController.addPortfolio);
    POST('/api/user/:id/portfolios/order', usersController.changePortfolioOrder);
    POST('/api/user/:id/follow', usersController.follow);
    POST('/api/user/:id/unfollow', usersController.unfollow);
    POST('/api/user/:id/password/:auth', usersController.password);
    POST('/api/user/:id/password', usersController.password);
    POST('/api/user/:id', usersController.updateUser);
    POST('/api/users', usersController.signUp);
    POST('/sessions', usersController.login);
    DELETE('/sessions', usersController.logout);
    DELETE('/api/user/:id/portfolio/:pid', usersController.deletePortfolio);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if(projectController) {
    GET('/api/project', projectController.all);
    GET('/api/project/search/:keyword', projectController.search);
    GET('/api/project/:link_name', projectController.one);
    POST('/project', projectController.add);
    PUT('/project/:id', projectController.update);
    POST('/api/project/:link_name/features', projectController.updateFeatures);
    DELETE('/project/:id', projectController.remove);
  } else {
    console.warn(unsupportedMessage('project routes'));
  }

  if(companyController) {
    GET('/api/company/search/:keyword', companyController.search);
    GET('/api/company/:link_name', companyController.one);
    POST('/api/company/:link_name/features', companyController.updateFeatures);
    POST('/api/company/:link_name', companyController.updateCompany);
    GET('/api/company', companyController.all);
    POST('/api/company/:link_name/portfolio', companyController.addPortfolio);
    POST('/api/company/:link_name/portfolios/order', companyController.changePortfolioOrder);
    DELETE('/api/company/:link_name/portfolio/:pid', companyController.deletePortfolio);
    POST('/api/company/:link_name/product', companyController.addProduct);
    POST('/api/company', companyController.add);
    POST('/api/company/:link_name/follow', companyController.follow);
    POST('/api/company/:link_name/unfollow', companyController.unfollow);
  } else {
    console.warn(unsupportedMessage('project routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    GET('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    GET('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/refresh',
        failureRedirect: '/refresh'
      })
    );
  }

  if (passportConfig && passportConfig.facebook) {
    GET('/auth/facebook', passport.authenticate('facebook', {
      scope: ['public_profile', 'email']
    }));

    GET('/auth/facebook/callback',
      passport.authenticate('facebook', {
        successRedirect: '/refresh',
        failureRedirect: '/refresh'
      })
    );
  }

  // topic routes
  if (topicsController) {
    GET('/topic', topicsController.all);
    POST('/topic/:id', topicsController.add);
    PUT('/topic/:id', topicsController.update);
    DELETE('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }

  POST('/file', fileController.upload);
  GET('/file/image/:image', fileController.image);

  GET('/*api*', mainController.refresh);
};
