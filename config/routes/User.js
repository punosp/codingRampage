'use strict';

module.exports.routes = {
  'get /user/new/register': {
    controller: 'UserController',
    action: 'registerNewUser'
  },
  'post /user/register': {
    controller: 'UserController',
    action: 'registerUser'
  }
};
