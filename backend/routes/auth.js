const { SignIn, SignUp } = require("../controler/auth");
const { validate, wrapRequestHandler } = require("../utils");
const {
  signInValidation,
  signUpValidation,
} = require("../validation/validation");

const express = require("express");

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validate(signUpValidation),
  wrapRequestHandler(SignUp)
);
authRouter.post(
  "/signin",
  validate(signInValidation),
  wrapRequestHandler(SignIn)
);

module.exports = { authRouter };
