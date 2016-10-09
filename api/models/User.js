/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
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
    }
  },
  registerUser: registerUser,
  loadUserByEmail: loadUserByEmail,
  createNewUser: createNewUser
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

    User
      .create(newUser)
      .then(function (user) {
        return resolve(user);
      })
      .catch(function (err) {
        sails.log.error('User#createNewUserV2 :: Error while creating a new user :: ', err);
        return reject(err);
      });

  });
}
