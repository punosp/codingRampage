/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');
module.exports = {


  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  registerNewUser: registerNewUserAction,
  registerUser: registerUserAction,
  loginNewUser: loginNewUserAction,
  loginUser: loginUserAction,
  logoutUser: logoutUserAction
}



function registerNewUserAction(req, res) {

    res.view("user/new/register", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      layout: 'layout'
    });


}

 function registerUserAction(req, res) {
// form is not valid
  var form = req.form;
  console.log(req.form.email);
  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/user/new/register');

  }
  // create or find user in database and authenticate user
  User
    .registerUser(req.form)
    .then(function (user) {
      // send email to user to activate his mail
      //User.sendActivationMail(user);


      req.flash('message', "You have been successfully registered." +
        "Contest details will shared via email through Hackerearth");

      return res.redirect("/user/new/register");
    })
    .catch(function (err) {
      sails.log.error('UserController#registerAction :: Error registering user :: ', err);
      // check for the error code and accordingly send the response
      var errors = err.message;

      req.flash("errors", errors);

      return res.redirect('/user/new/register');
    });
}

function loginNewUserAction(req, res) {
  if(req.user)
  {
    if(req.user.role.name == 'ROLE_ADMIN')
    {
      res.redirect('/admin/dashBoard');
    }
  }
  else {
    res.view("user/new/login", {
      alert: req.flash("alert"),
      message: req.flash("message"),
      errors: req.flash("errors"),
      layout: 'layout'
    });
  }

}

function loginUserAction(req, res) {
  // check for user role
  // if admin
  // redirect to /admin
  // if user
  // redirect to /app

  if (req.user.role.name == 'ROLE_ADMIN') {
    console.log("hi");
    return res.redirect('/admin/dashBoard');
  }
  else
  {
    req.logout();

    res.redirect('/user/new/login');
  }
}

function logoutUserAction(req, res) {

  req.logout();
  req.flash("message", 'Successfully logged out!');
  res.redirect('/user/new/login');

}
