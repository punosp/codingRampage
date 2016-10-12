/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

var _ = require('lodash');

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },
  showUser: showUserAction,
  showAllUsers: showAllUsersAction,
  dashBoard: dashBoardAction
};
function dashBoardAction(req, res) {
  User
    .getCountUser()
    .then(function (count) {

      res.view("admin/dashBoard", {
        message: req.flash("message"),
        countUser: count,
        errors: req.flash("errors"),
        layout: 'adminLayout'
      });

    })
    .catch(function (err) {
      console.log('dashBoard ::',err);
    })



}

function showAllUsersAction(req, res) {

  User
    .getAllUsers()
    .then(function (users) {
      // redirect to show page
      res.view("admin/user/list", {
        message: req.flash("message"),
        users: users,
        errors: req.flash("errors"),
        layout: 'adminLayout'
      });
    })
    /**
     * err = {
     *   code: ""
     *   message: ""
     * }
     */
    .catch(function (err) {
      var errors = err.message;
      req.flash("errors", errors);

      res.view("admin/user/list", {
        errors: req.flash("errors"),
        layout: 'adminLayout'
      });
    });

}

function showUserAction(req, res) {


  User
    .getUserForId(req.param('id'))
    .then(function (user) {
      // redirect to show page
      res.view("admin/user/show", {
        message: req.flash("message"),
        user: user,
        layout: 'adminLayout'
      });
    })
    /**
     * err = {
     *   code: ""
     *   message: ""
     * }
     */
    .catch(function (err) {
      var errors = err.message;


      req.flash("errors", errors);

      res.redirect('/admin/user/list');
    });


}
