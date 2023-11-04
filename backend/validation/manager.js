const { body, query } = require("express-validator");

const updateEmpValidation = [
  body("id").notEmpty().withMessage("Employee Id id required"),
];
const deleteEmpValidation = [
  query("id").notEmpty().withMessage("Employee Id id required"),
];

const addNewEmpValidation = [
  body("name").notEmpty().withMessage("Please provide name"),
  body("email")
    .notEmpty()
    .withMessage("Please provide email")
    .isEmail()
    .withMessage("Enter valid email."),
  body("password").notEmpty().withMessage("Please provide password"),
];

module.exports = {
  updateEmpValidation,
  addNewEmpValidation,
  deleteEmpValidation,
};
