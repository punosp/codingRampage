'use strict';

module.exports.routes = {
  'get /user/new/register': {
    controller: 'UserController',
    action: 'registerNewUser'
  },
  'post /user/register': {
    controller: 'UserController',
    action: 'registerUser'
  },
  'get /user/new/login': {
    controller: 'UserController',
    action: 'loginNewUser'
  },
  'post /user/login': {
    controller: 'UserController',
    action: 'loginUser'
  },
  'get /user/logout': {
    controller: 'UserController',
    action: 'logoutUser'
  },
};
