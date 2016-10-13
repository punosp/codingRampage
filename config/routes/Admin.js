'use strict';

module.exports.routes = {
  'get /admin/dashBoard': {
    controller: 'AdminController',
    action: 'dashBoard'
  },
  'get /admin/user/:id/show': {
    controller: 'AdminController',
    action: 'showUser'
  },
  'get /admin/user/list': {
    controller: 'AdminController',
    action: 'showAllUsers'
  },
  'post /admin/user/:userId/status': {
    controller: 'AdminController',
    action: 'updateStatus'
  }
};
