const { body, query } = require("express-validator");

const createDepartmentValidation = [
  body("name").notEmpty().withMessage("Department name is required"),
  body("description")
    .notEmpty()
    .withMessage("Department description is required"),
];

const updateDepartmentValidation = [
  body("id").notEmpty().withMessage("Department Id is required"),
];

const deleteDepartmentValidation = [
  query("id").notEmpty().withMessage("Department Id is required"),
];

const newEmpAddValidation = [
  body("employeeId").notEmpty().withMessage("Employee Id is required "),
  body("departmentId").notEmpty().withMessage("Department Id is required "),
];

module.exports = {
  createDepartmentValidation,
  updateDepartmentValidation,
  deleteDepartmentValidation,
  newEmpAddValidation,
};
