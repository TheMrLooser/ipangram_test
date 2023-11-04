const express = require("express");
const { wrapRequestHandler, validate } = require("../utils");
const {
  GetEmployeeList,
  CreateEmployee,
  UpdateEmployeeDetails,
  DeleteEmployee,
} = require("../controler/manager");
const {
  updateEmpValidation,
  addNewEmpValidation,
  deleteEmpValidation,
} = require("../validation/manager");

const managerRoute = express.Router();

managerRoute.get("/get-employee-list", wrapRequestHandler(GetEmployeeList));
managerRoute.post(
  "/add-employee",
  validate(addNewEmpValidation),
  wrapRequestHandler(CreateEmployee)
);
managerRoute.put(
  "/update-employee",
  validate(updateEmpValidation),
  wrapRequestHandler(UpdateEmployeeDetails)
);
managerRoute.delete(
  "/remove-employee",
  validate(deleteEmpValidation),
  wrapRequestHandler(DeleteEmployee)
);

module.exports = { managerRoute };
