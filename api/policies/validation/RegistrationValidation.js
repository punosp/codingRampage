/* global module */
'use strict';

var form = require('express-form'),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('name'),
  field('email'),
  field('phone'),
  field('college'),
  field('passYear'),
  validate('email')
    .required("", "REGISTRATION_EMAIL_REQUIRED")
    .isEmail("REGISTRATION_INVALID_EMAIL"),
  validate('college')
    .required("", "COLLEGE_REQUIRED"),
  validate('passYear')
    .required("", "PASS_YEAR_REQUIRED"),
  validate('phone')
    .isNumeric("PHONE_MUST_BE_NUMBER")
    .required("", "REGISTRATION_PHONE_NO_REQUIRED")
    .minLength(10, "REGISTRATION_PHONE_MIN_LENGTH")
    .maxLength(10, "REGISTRATION_PHONE_MAX_LENGTH"),
  validate('name')
    .required("", "NAME_REQUIRED")



);
