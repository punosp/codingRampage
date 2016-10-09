/* global module */

'use strict';
var mappings = {
  /************************ General Error Messages ****************************/
  INTERNAL_SERVER_ERROR: 'Encountered error, please try again',
  /************************ Registration Error Messages ***********************/
  REGISTRATION_FULL_NAME_REQUIRED: 'Full Name is required',
  REGISTRATION_EMAIL_REQUIRED: 'Email is required',
  REGISTRATION_INVALID_EMAIL: 'Invalid Email Id',
  REGISTRATION_PASSWORD_REQUIRED: 'Password is required',
  REGISTRATION_PASSWORD_MIN_LENGTH: 'Password must have atleast 6 characters',
  REGISTRATION_CONFIRM_PASSWORD_REQUIRED: 'Confirm Password field is required',
  REGISTRATION_CONFIRM_PASSWORD_MISMATCH: 'Confirm Password not matched',
  REGISTRATION_USER_ALREADY_EXISTS: 'The Email is already registered',
  REGISTRATION_PHONE_NO_REQUIRED: 'Phone No. is required',
  OLD_PASSWORD_REQUIRED:'Old Password is required',
  NEW_PASSWORD_REQUIRED: 'New Password is required',
  CONFIRM_PASSWORD_REQUIRED: 'Confirmation Password Required',
  NEW_PASSWORD_MIN_LENGTH:'New Password must have atleast 6 characters',
  OLD_PASSWORD_MIN_LENGTH:'Old Password must have atleast 6 characters',
  CONFIRM_PASSWORD_MIN_LENGTH:'Confirm Password must have atleast 6 characters',
  /************************ Login Error Messages ******************************/
  LOGIN_EMAIL_REQUIRED: 'Email is required',
  LOGIN_INVALID_EMAIL: 'Invalid Email Id',
  LOGIN_PASSWORD_REQUIRED: 'Password is required',
  LOGIN_USER_INVALID_DATA: 'Please provide email and password',
  LOGIN_USER_NOT_FOUND: 'User not found, please register or login with LinkedIn',
  LOGIN_USER_INVALID_CREDENTIALS: 'Invalid credentials',
  LOGIN_USER_EMAIL_NOT_VERIFIED: 'Please verify your email to login',
  /************************ Forgot-Password Error Messages ********************/
  FORGOTPASSWORD_EMAIL_REQUIRED: 'Email is required',
  FORGOTPASSWORD_INVALID_EMAIL: 'Invalid Email Id',
  FORGOTPASSWORD_USER_NOT_FOUND: 'User not found, please register or login with LinkedIn',
  /************************ Reset-Password Error Messages *********************/
  RESETPASSWORD_INVALID_REQUEST: 'Invalid Request, Url is invalid',
  RESETPASSWORD_USER_NOT_FOUND: 'User not found / Invalid request',
  RESETPASSWORD_INVALID_FORM: 'Errors while processising your request',
  RESETPASSWORD_NEW_PASSWORD_REQUIRED: 'New Password field is required',
  RESETPASSWORD_NEW_PASSWORD_MIN_LENGTH: 'New Password must have atleast 6 characters',
  RESETPASSWORD_CONFIRM_PASSWORD_REQUIRED: 'Confirm Password is required',
  RESETPASSWORD_CONFIRM_PASSWORD_MISMATCH: 'Confirm Password not matching',
  /************************ Change-Password Error Messages ********************/
  CHANGEPASSWORD_OLD_PASSWORD_REQUIRED: 'Old Password is required',
  CHANGEPASSWORD_NEW_PASSWORD_REQUIRED: 'New Password is required',
  CHANGEPASSWORD_NEW_PASSWORD_MIN_LENGTH: 'New Password must have atleast 6 characters',
  CHANGEPASSWORD_CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required',
  CHANGEPASSWORD_CONFIRM_PASSWORD_MISMATCH: 'Confirm password is not matching',
  CHANGEPASSWORD_OLD_PASSWORD_INCORRECT: 'The Old Password is incorrect',
  /************************ User Error Messages *******************************/
  USER_AUTHENTICATION_ERROR: 'Authentication required',
  USER_INVALID_AUTH: 'Invalid auth information',
  USER_INVALID_REQUEST: 'Invalid user request',
  USER_NOT_FOUND: 'User not found, please register or login with LinkedIn',
  /************************ Profile Error Messages ****************************/
  PROFILE_EMAIL_REQUIRED: 'Email is required',
  PROFILE_EMAIL_NOT_VALID: 'Invalid Email Id',
  PROFILE_IMAGE_UPLOAD_FAILED: 'Image upload failed',
  PROFILE_NOT_FOUND: 'Profile Not Found',
  PROFILE_COMPANYLOGO_UPLOAD_FAILED: 'Company logo upload failed',
  PROFILE_REFERENCEID_REQUIRED: 'Reference Id required',
  PROFILE_DEFAULTPROFILE_DELETE: 'Default profile cannot be deleted',
  PROFILE_ALREADY_DEFAULTPROFILE: 'Already default profile',
  PROFILE_DEFAULT_PROFILE_NOT_FOUND: 'Default profile not found',
  PROFILE_COMPANYLOGO_FAILED: 'Company logo upload failed',
  /************************ LinkedIn Error Messages ****************************/
  LINKEDIN_EMAIL_REQUIRED: 'Email is required',
  LINKEDIN_EMAIL_INVALID: 'Email is Invalid',
  LINKEDIN_ID_REQUIRED: 'LinkedIn Id is required',
  /************************ Contact Error Messages ****************************/
  CONTACT_REFERENCEID_REQUIRED: 'Reference Id is required',
  CONTACT_NOT_FOUND: 'Contact not found',
  CONTACT_CONTACTIMAGE_FAILED: 'Contact image upload failed',
  CONTACT_COMPANYLOGO_FAILED: 'Company logo upload failed',
  CONTACT_NOTES_INVALID_TYPE: 'Invalid note type',
  CONTACT_NOTE_IMAGE_FAILED: 'Uploading image failed, please try later',
  CONTACT_NOTE_AUDIO_FAILED: 'Uploading audio failed, please try later',
  CONTACT_NOTE_TEXT_REQUIRED: 'Content required for note',
  CONTACT_INVALID_REQUEST: 'Invalid request',
  CONTACT_NOTE_IMAGE_REQUIRED: 'Note Image required',
  CONTACT_NOTE_REMINDER_REQUIRED: 'Reminder required for note',
  CONTACT_NOTE_REMINDER_INVALID: 'Reminder invalid format',
  CONTACT_NOTE_REMINDER_PREVIOUS: 'Reminder date is past current date',
  CONTACT_NOTE_NOT_FOUND: 'Note not found',
  CONTACT_NOTE_REFERENCE_ID_REQUIRED: 'Note Reference Id required',
  /************************ QuickContact Error Messages ***********************/
  QUICKCONTACT_BUSINESSCARD_REQUIRED: 'Business card is required',
  QUICKCONTACT_REFERENCEID_REQUIRED: 'Reference Id is required',
  QUICKCONTACT_NOT_FOUND: 'Quick contact not found',
  /************************ Stack Error Messages *****************************/
  STACK_NAME_REQUIRED: 'Name is required for stack',
  STACK_REFERENCEID_REQUIRED: 'Reference Id required',
  STACK_NOT_FOUND: 'Stack not found',
  STACK_ALREADY_EXISTS: 'Stack already exists',
  /************************ Tag Error Messages *****************************/
  TAG_NAME_REQUIRED: 'Name is required for tag',
  TAG_REFERENCEID_REQUIRED: 'Reference Id required',
  TAG_NOT_FOUND: 'Tag not found',
  TAG_ALREADY_EXISTS: 'Tag already exists',
  /************************ Invalid format ********************/
  USER_NAME_NOT_VALID: 'Only letters are valid in [a-z]',
  DIFFICULTY_LEVEL_REQUIRED: 'Difficulty level required',
  TITLE_REQUIRED: 'Title required',
  CORRECT_CHOICE_REQUIRED: 'Correct choice field is required',
  QUESTION_REQUIRED: 'Question required',
  JUSTIFICATION_REQUIRED: 'Justification required',
  TAG_PARENT_NAME_REQUIRED: 'Tag parent name is required',
  NAME_REQUIRED: 'Name is required',
  ROLE_REQUIRED: 'User role is required',
  REGISTRATION_PHONE_MAX_LENGTH: 'Phone number should be of 10 digits',
  REGISTRATION_PHONE_MIN_LENGTH:'Phone number should be of 10 digits',
  MUST_BE_NUMBER: 'Enter a valid phone no',
  TEST_NAME_REQUIRED: 'Enter valid test name',
  MUST_BE_VALID_NUMBER: 'Enter a valid no.',
  EVERY_DIFFICULTY_LEVEL_REQUIRED: 'All fields are mandatory',
  INITIAL_CONFIG_DATA_REQUIRED: 'Don\'t change the hidden input',
  COURSE_NAME_REQUIRED: 'Please select valid course name from auto-complete field',
  EXAM_ENDED: 'Exam has ended',
  EXAM_NOT_FOUND: 'Exam not found',
  COLLEGE_REQUIRED: 'College name is required',
  PASS_YEAR_REQUIRED: 'Passing year from college is required',
  INVALID_PASS_YEAR: 'Please enter valid passing year'

};


module.exports = {
  mappings: mappings
};
