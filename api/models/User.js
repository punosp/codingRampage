/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
'use strict';
var Q = require('q'),
  _ = require('lodash');
module.exports = {

  attributes: {
    name: {
      type: 'string',
      columnName: 'name'
    },
    email: {
      type: 'string',
      columnName: 'email',
      unique: true
    },
    phone: {
      type: 'integer',
      columnName: 'phone',
    },
    college: {
      type: 'string',
      columnName: 'college',
    },
    passYear: {
      type: 'integer',
      columnName: 'passYear',
    },
    isActive: {
      type: 'boolean',
      columnName: 'is_active',
      defaultsTo: true
    },
    isDeleted: {
      type: 'boolean',
      columnName: 'is_deleted',
      defaultsTo: false
    },
    role: {
      model: 'Role'
    },
    lastLoggedIn: {
      type: 'datetime',
      columnName: 'last_loggedIn'
    },
    isLoggedIn: {
      type: 'boolean',
      columnName: 'is_LoggedIn',
      defaultsTo: false
    },
    status: {
      type: 'boolean',
      defaultsTo: false
    },
  },
  registerUser: registerUser,
  loadUserByEmail: loadUserByEmail,
  createNewUser: createNewUser,
  getForEmailPasswordV2: getForEmailPasswordV2,
  getAllUsers: getAllUsers,
  getCountUser: getCountUser,
  getUserForId: getUserForId,
  updateInviteStateForUser: updateInviteStateForUser
};

function loadUserByEmail(email) {
  return Q.promise(function (resolve, reject) {
    var criteria = {
      email: email,
      isDeleted: false,
      isActive: true
    };
    User
      .findOne(criteria)
      /**
       * user = {
       * name:
       * email:
       * password:
       * role: {
       * name:
       * isDeleted:
       *
       * }
       * }
       */
      .populate("role")
      .then(function (user) {
        if (!user) {
          sails.log.silly('User#loadUserByEmail :: No user available for the given email :: ', email);
          return resolve(null);
        }
        return resolve(user);
      })
      .catch(function (err) {
        sails.log.error('User#loadUserByEmail :: Error querying DB :: ', err);
        return reject(err);
      });
  });
}

function registerUser(data) {
  return Q.promise(function (resolve, reject) {
    // check if user is already registered
    User
      .loadUserByEmail(data.email)
      .then(function (user) {
        if (user) {
          return reject({
            code: 422,
            message:  'Email Id already exists'

          });
        } else {
          // register new user in the database
          User
            .createNewUser(data)
            .then(function (user) {
              // create a default stacks and tags.handlebars

              return resolve(user);
            })
            .catch(function (err) {
              sails.log.error('User#registerUserV2 :: Error while registering user :: ', err);

              return reject({
                code: 500,
                message: 'Internal Server Error'
              });
            });
        }
      })
      .catch(function (err) {
        sails.log.error('User#registerUserV2 :: Error while registering user :: ', err);
        return reject({
          code: 500,
          message: 'Internal Server Error'
        });
      });
  });
}

function createNewUser(userData) {
  return Q.promise(function (resolve, reject) {

    var newUser =  {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      college: userData.college,
      passYear: userData.passYear
    }

    Role
      .getRoleByName("ROLE_USER")
      .then(function(role) {
      newUser.role = role.id;
      console.log(newUser.role.name);
      return User.create(newUser);
    })
    .then(function (user) {
      // create new profile
      return resolve(user);
    })
      .catch(function (err) {
        sails.log.error('User#createNewUserV2 :: Error while creating a new user :: ', err);
        return reject(err);
      });

  });
}

function getForEmailPasswordV2(data) {
  return Q.promise(function (resolve, reject) {
    // validate the fields
    if (!data) {
      sails.log.verbose('User#getForEmailPasswordV2 :: data null');
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    }
    // get the user for mail
    User
      .loadUserByEmail(data.email)
      .then(function (user) {
        if (!user) {
          sails.log.info('User#getForEmailPasswordV2 :: No user available for the given email :: ', data.email);
          // send response with user not found
          return reject({
            code: 404,
            message: 'LOGIN_USER_NOT_FOUND'
          });
        }
        // check for isMailOrSmsVerified
        // if (!user.isMailOrSmsVerified) {
        //   sails.log.info('User#getForEmailPasswordV2 :: User not verified email');
        //   // send response with user not found
        //   return reject({
        //     code: 403,
        //     message: 'LOGIN_USER_EMAIL_NOT_VERIFIED'
        //   });
        // }
        // if found check the password matching
        if(user.password!=data.password) {
          // update user with last logged in
          sails.log.info('User#getForEmailPasswordV2 :: Invalid password :: ', data.password);
          // send response with user not found
          return reject({
            code: 404,
            message: 'LOGIN_USER_NOT_FOUND'
          });
        }
        user.lastLoggedin = new Date();
        user.isLoggedIn = true;
        user.save(function () {
        });

        return resolve(user);

      })
      .catch(function (err) {
        sails.log.error('User#getForEmailPassword :: Error :: ', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });
  });
}


function getCountUser() {
  return Q.promise(function(resolve, reject) {
    User
      .count()
      // success block
      .then(function(count) {
        // do other tasks with new admin
        return resolve(count);
      })
      // error block
      .catch(function(err) {
        sails.log.error("User#getCountUser:: Error :: ", err);

        return reject({
          code: 500,
          message: "Internal Server Error"
        });
      });
  });

}

function getAllUsers() {
  return Q.promise(function(resolve, reject) {
    User
      .find()
      .populate('role')
      .sort({createdAt: 'desc'})
    // success block
      .then(function(users) {
        // do other tasks with new admin
        return resolve(users);
      })
      // error block
      .catch(function(err) {
        sails.log.error("Admin#getAllUsers:: Error :: ", err);

        return reject({
          code: 500,
          message: "Internal Server Error"
        });
      });
  });

}

function getUserForId(userId) {
  return Q.promise(function (resolve, reject) {
    if (!userId) {
      sails.log.error('User#getUserForId :: User id is null');
      return reject({
        code: 400,
        message: 'USER_INVALID_REQUEST'
      });
    }
    // criteria to load active user
    var criteria = {
      id: userId,
      isActive: true,
      isDeleted: false
    };
    User
      .findOne(criteria)
      .then(function (user) {
        if (!user) {
          return reject({
            code: 404,
            message: 'USER_NOT_FOUND'
          });
        } else {
          // convert the user
          return resolve(user);
        }
      })
      .catch(function (err) {
        // caught the error
        sails.log.error('User#getUserForId :: Error in query :: ', err);

        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });
  });
}

function updateInviteStateForUser(id,state) {
  return Q.promise(function (resolve, reject) {
    var updateCriteria = {
      id: id,
      isDeleted: false,
      isActive: true
    };
    var updateData = {
      status : state
    };
    User
      .update(updateCriteria, updateData)
      .then(function (users) {
        console.log(users[0]);
        return resolve();
      })
      .catch(function (err) {
        sails.log.verbose('Test#updatePublishedStateForTest :: query failed :: ', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      })

  });

}
