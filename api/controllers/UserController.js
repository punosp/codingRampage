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
  //homepage: homepageAction,
  registerNewUser: registerNewUserAction,
   registerUser: registerUserAction
  // activateUserAccount: activateUserAccountAction,
  // loginNewUser: loginNewUserAction,
  // loginUser: loginUserAction,
  // logoutUser: logoutUserAction,
  // dashBoard: dashBoardAction,
  //
  // forgotPassword: forgotPasswordAction,
  // resetPassword: resetPasswordAction,
  // resetPasswordSubmit: resetPasswordSubmitAction,
  // changePassword: changePasswordAction,
  // enterForgotPassword: enterForgotPasswordAction,
  // enterChangedPassword: enterChangedPasswordAction,
  // errorPage: errorPageAction


};

// function homepageAction(req, res) {
//   if(req.user) {
//
//
//     if (req.user.role.name == 'ROLE_ADMIN') {
//       return res.redirect('/admin/dashBoard');
//     }
//     if(req.user.role.name == 'ROLE_USER') {
//       return res.view('homepage', {
//         layout: 'userLayout'
//       });
//     }
//   }
//   else {
//     return res.view('homepage', {
//       layout: 'userLayout'
//     });
//   }
//
// }

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

// function loginNewUserAction(req, res) {
//   if(req.user)
//   {
//     if(req.user.role.name == 'ROLE_ADMIN')
//     {
//       res.redirect('/admin/dashBoard');
//     }
//     else
//     {
//       res.redirect('/user/dashBoard');
//     }
//   }
//   else {
//     res.view("user/new/login", {
//       alert: req.flash("alert"),
//       message: req.flash("message"),
//       errors: req.flash("errors"),
//       layout: 'userLayout'
//     });
//   }
//
// }
//
// function loginUserAction(req, res) {
//   // check for user role
//   // if admin
//   // redirect to /admin
//   // if user
//   // redirect to /app
//   if (req.user.role.name == 'ROLE_ADMIN') {
//     return res.redirect('/admin/dashBoard');
//   }
//   if(req.user.role.name == 'ROLE_USER'){
//     console.log("logging user");
//     return res.redirect('/user/dashBoard');
//   }
//   if(req.user.role.name == null)
//   {
//     req.logout();
//
//     res.redirect('/user/new/login');
//   }
// }
//
// function logoutUserAction(req, res) {
//
//   req.logout();
//   req.flash("message", 'Successfully logged out!');
//   res.redirect('/user/new/login');
//
// }
//
// function dashBoardAction(req, res) {
//   if(req.user) {
//     if (req.user.role.name == 'ROLE_ADMIN') {
//       return res.redirect("/admin/dashboard");
//     }
//     if (req.user.role.name == 'ROLE_USER') {
//       Tags
//         .getRootTags()
//         .then(function (tags) {
//           res.view("user/dashBoard", {
//             tags: tags,
//             message: req.flash("message"),
//             errors: req.flash("errors"),
//             user: req.user,
//             layout: 'loggedInUser'
//           });
//         })
//
//
//     }
//   }
//
//
//
// }
//
//
// function activateUserAccountAction(req, res) {
//   var email = req.param('email'),
//     uniqueKey = req.param('uniqueKey');
//   req.logout();
//   // validate user and activate account
//   User
//     .activateUserWithKey(email, uniqueKey)
//     .then(function (user) {
//       // user succesfully activated; show a success message with a deep linking url
//       return res.render('mailActivation/success', {
//         user: user,
//         layout: 'userLayout'
//       });
//     })
//     .catch(function (err) {
//       // error
//       sails.log.error('UserController#activateUserAccountAction :: cannot activate user :: ', err);
//       return res.render('mailActivation/failed',{
//         layout: 'userLayout'
//       });
//     });
//
// }
//
//
//
//
//
// /**
//  *  Sends password reset instructions to user on his/her email id
//  *
//  * @param req - Request Object
//  * @param res - Response Object
//  */
// function forgotPasswordAction(req, res) {
//   // get the user mail id from the form
//   var form = req.form;
//   console.log(req.form.email);
//   if(!form.isValid) {
//     // TODO: throw error
//     var flashMessages = ValidationService
//       .getFormFlashMessages(req.form.getErrors());
//     _.forEach(flashMessages, function (message) {
//       req.flash('errors', message);
//     });
//
//     return res.redirect('/user/new/forgotPassword');
//
//   }
//   // load the user for mail id and send a reset instructions mail
//   User
//     .forgotPasswordInit(req.form.email)
//     .then(function () {
//       // send success response
//       req.flash("alert", "Password Reset Instructions has been sent to your email id");
//
//       return res.redirect('/user/new/login');
//     })
//     .catch(function (err) {
//       sails.log.error('UserController#forgotPasswordAction :: Error ::', err);
//
//       // check for the error code and accordingly send the response
//       var errors = err.message;
//
//       req.flash("errors", errors);
//
//       return res.redirect('/user/new/forgotPassword');
//     });
// }
//
// /**
//  * Reset password request from a mail,
//  * Returns a web view that displays a form; asking for the new password
//  *
//  * @param req - Request Object
//  * @param res - Response Object
//  * @param email - Email of the user
//  * @param uniqueKey - Unique key for the reset password request
//  *
//  */
// function resetPasswordAction(req, res) {
//   // get the email and unique key and validate
//   var email = req.param('email'),
//     uniqueKey = req.param('uniqueKey');
//   req.logout();
//   // validate the email and unique key
//   User
//     .resetPasswordInit(email, uniqueKey)
//     .then(function (user) {
//       // form with unique key
//       // create a form and render the view
//       return res.view('forgotPassword/reset', {
//         message: req.flash("message"),
//         user: user,
//         errors: req.flash('errors'),
//         layout: 'userLayout'
//       });
//     })
//     .catch(function (err) {
//       sails.log.error('UserController#resetPasswordAction :: Error ::', err);
//
//       // check for the error code and accordingly send the response
//       return res.send("error")
//     });
// }
//
// function resetPasswordSubmitAction(req, res) {
//   // get the email and unique key and validate
//   var email = req.param('email'),
//     uniqueKey = req.param('uniqueKey');
//   req.logout();
//
//   // validate the email and unique key
//   User
//     .resetPasswordInit(email, uniqueKey)
//     .then(function (user) {
//       // check if the form is valid
//       if (!req.form.isValid) {
//         // not valid; throw an error with flash messages
//         var flashMessages = ValidationService
//           .getFormFlashMessages(req.form.getErrors());
//         _.forEach(flashMessages, function (message) {
//           req.flash('errors', message);
//         });
//
//         return res.redirect('/user/'+email+'/resetPassword/'+uniqueKey);
//       }
//       var newPassword = req.form.newPassword;
//       // update user password and send email
//       if(req.form.newPassword!==req.form.confirmPassword)
//       {
//         req.flash('errors','New and Confirm password do not match');
//         return res.redirect('/user/'+email+'/resetPassword/'+uniqueKey);
//       }
//       User
//         .resetPasswordUpdate(user, newPassword)
//         .then(function () {
//           // return with success
//           res.render('forgotPassword/success',{
//             message: req.flash("message"),
//             errors: req.flash("errors"),
//             layout: 'userLayout'
//
//           });
//         })
//         .catch(function (err) {
//           // log the error
//           sails.log.error('UserController#resetPasswordSubmitAction :: Error Updating user :: ', err);
//           // check for the error code and accordingly send the response
//           req.flash('errors',err);
//           return res.redirect('/user/'+email+'/resetPassword/'+uniqueKey);
//         });
//     })
//     .catch(function (err) {
//       sails.log.error('UserController#resetPasswordSubmitAction :: Error ::', err);
//
//       // check for the error code and accordingly send the response
//       req.flash('errors',err);
//       return res.redirect('/user/'+email+'/resetPassword/'+uniqueKey);
//     });
// }
//
// /**
//  * Updates user password with new one, if all fields are validated
//  *
//  * @param req
//  * @param res
//  */
// function changePasswordAction(req, res) {
//   // check if form is valid
//   var form = req.form;
//   console.log("inside changepassword action");
//   if(!form.isValid) {
//     // TODO: throw error
//     var flashMessages = ValidationService
//       .getFormFlashMessages(req.form.getErrors());
//     _.forEach(flashMessages, function (message) {
//       req.flash('errors', message);
//     });
//
//     return res.redirect('/user/new/changePassword');
//
//   }
//   // update password
//   User
//     .updatePassword(req.form, req.user)
//     .then(function () {
//       req.flash("message",'password successfully changed');
//       return res.redirect('user/dashBoard');
//     })
//     .catch(function (err) {
//       sails.log.error('UserController#changePasswordAction :: Updating user password error :: ', err);
//       // check for the error code and accordingly send the response
//
//       var errors = err.message.oldPassword;
//
//       req.flash("errors", errors);
//       return res.redirect('/user/new/changePassword');
//     });
// }
//
// function enterForgotPasswordAction(req, res) {
//
//   res.view("user/new/forgotPassword", {
//     message: req.flash("message"),
//     errors: req.flash("errors"),
//     layout: 'userLayout'
//   });
//
// }
//
// function enterChangedPasswordAction(req, res) {
//
//   if(req.user) {
//     if (req.user.role.name == 'ROLE_ADMIN') {
//       res.view("admin/changePassword", {
//         message: req.flash("message"),
//         errors: req.flash("errors"),
//         layout: 'layout'
//       });
//     }
//     if (req.user.role.name == 'ROLE_USER') {
//
//       res.view("user/new/changePassword", {
//         message: req.flash("message"),
//         errors: req.flash("errors"),
//         layout: 'userLayout'
//       });
//     }
//   }
//
//
//
// }
//
//
//
// function errorPageAction(req, res) {
//   req.logout();
//   var code = req.param('code');
//   if(code === '500') {
//     res.view("500", {
//       layout: 'userLayout'
//     });
//   }
//   else if(code === '404') {
//     res.view("404", {
//       layout: 'userLayout'
//     });
//   }
//   else if(code === '403') {
//     res.view("403", {
//       layout: 'userLayout'
//     });
//   }
//   else {
//     res.view("500", {
//       layout: 'userLayout'
//     });
//   }
//
// }
