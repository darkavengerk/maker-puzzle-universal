/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { passport as passportConfig } from '../db';
import controllers from '../controllers';

const topicsController = controllers && controllers.topics;

const mainController = controllers && controllers.main;
const usersController = controllers && controllers.users;
const projectController = controllers && controllers.projects;
const companyController = controllers && controllers.companies;
const fileController = controllers && controllers.files;

export default (app) => {

  if (mainController) {
    app.get('/api/main/commands/:command', mainController.command);
    app.get('/api/main', mainController.main);
    app.get('/api/search/:keyword', mainController.search);
  }

  // user routes
  if (usersController) {
    app.get('/user/:id/:pid', usersController.single);
    app.get('/user/:id', usersController.single);
    app.get('/user', usersController.all);
    app.post('/user/:id/features', usersController.updateFeatures);
    app.post('/user/:id/portfolio', usersController.addPortfolio);
    app.post('/user/:id/follow', usersController.follow);
    app.post('/user/:id/unfollow', usersController.unfollow);
    app.post('/sessions', usersController.login);
    app.post('/users', usersController.signUp);
    app.delete('/user/:id/portfolio/:pid', usersController.deletePortfolio);
    app.delete('/sessions', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if(projectController) {
    app.get('/api/project', projectController.all);
    app.get('/api/project/search/:keyword', projectController.search);
    app.get('/api/project/:link_name', projectController.one);
    app.post('/project', projectController.add);
    app.put('/project/:id', projectController.update);
    app.delete('/project/:id', projectController.remove);
  } else {
    console.warn(unsupportedMessage('project routes'));
  }

  if(companyController) {
    app.get('/api/company/search/:keyword', companyController.search);
    app.get('/api/company/:link_name', companyController.one);
    app.get('/api/company', companyController.all);
    app.post('/api/company/:link_name/portfolio', companyController.addPortfolio);
    app.delete('/api/company/:link_name/portfolio/:pid', companyController.deletePortfolio);
    app.post('/api/company/:link_name/product', companyController.addProduct);
    app.post('/api/company', companyController.add);
    app.put('/api/company/:id', companyController.update);
    app.delete('/api/company/:id', companyController.remove);
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
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }

  app.post('/file', fileController.upload);
  app.get('/file/image/:image', fileController.image);
};
