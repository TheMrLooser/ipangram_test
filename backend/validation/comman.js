const { query } = require("express-validator");
const { model } = require("mongoose");

const getEmpDetailValidation = [
  query("employeeId").notEmpty().withMessage("Employee Id is required"),
];

module.exports = {
  getEmpDetailValidation,
};
