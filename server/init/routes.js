/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const topicsController = controllers && controllers.topics;

const usersController = controllers && controllers.users;
const projectController = controllers && controllers.project;

export default (app) => {
  // user routes
  if (usersController) {
    app.get('/user', usersController.all);
    app.post('/sessions', usersController.login);
    app.post('/users', usersController.signUp);
    app.delete('/sessions', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if(projectController) {
    app.get('/project', projectController.all);
    app.get('/project/:id', projectController.one);
    app.post('/project', projectController.add);
    app.put('/project/:id', projectController.update);
    app.delete('/project/:id', projectController.remove);
  } else {
    console.warn(unsupportedMessage('users routes'));
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

  app.post('/image', (req, res) => {
    const fs = require('fs-extra');
    const data = req.body;
    var chopper_index = 0; // safeguard

    var base64_marker = ';base64,';
    chopper_index = data.file.src.indexOf(base64_marker) + base64_marker.length;

    // Remove obsolete header
    var binary_buffer = Buffer.from(data.file.src.substr(chopper_index), 'base64');

    fs.outputFile('public/images/' + data.name, binary_buffer, 'Binary', (err, result) => {
      res.send('ok');
    });
  });
};
