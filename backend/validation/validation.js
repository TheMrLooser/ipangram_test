const { body } = require("express-validator");

const signUpValidation = [
  body("name").notEmpty().withMessage("Please provide name"),
  body("email")
    .notEmpty()
    .withMessage("Please provide email")
    .isEmail()
    .withMessage("Enter valid email."),
  body("password").notEmpty().withMessage("Please provide password"),
  body("role").notEmpty().withMessage("Please provide role"),
];

const signInValidation = [
  body("email")
    .notEmpty()
    .withMessage("Please provide email")
    .isEmail()
    .withMessage("Enter valid email."),
  body("password").notEmpty().withMessage("Please provide password"),
];

module.exports = { signInValidation, signUpValidation };
