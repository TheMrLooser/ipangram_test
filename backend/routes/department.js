const express = require("express");
const { wrapRequestHandler, validate } = require("../utils");
const {
  CreateNewDepartment,
  UpdateDepartment,
  GetDepartmentList,
  DeleteDepartment,
  AddNewEmployeeInDepartment,
} = require("../controler/department");
const {
  createDepartmentValidation,
  updateDepartmentValidation,
  deleteDepartmentValidation,
  newEmpAddValidation,
} = require("../validation/department");

const departmentRoute = express.Router();

departmentRoute.post(
  "/create",
  validate(createDepartmentValidation),
  wrapRequestHandler(CreateNewDepartment)
);

departmentRoute.put(
  "/update",
  validate(updateDepartmentValidation),
  wrapRequestHandler(UpdateDepartment)
);
departmentRoute.put("/update", wrapRequestHandler(UpdateDepartment));
departmentRoute.get("/get", wrapRequestHandler(GetDepartmentList));
departmentRoute.delete(
  "/delete",
  validate(deleteDepartmentValidation),
  wrapRequestHandler(DeleteDepartment)
);

departmentRoute.put(
  "/add-new-employee",
  validate(newEmpAddValidation),
  wrapRequestHandler(AddNewEmployeeInDepartment)
);

module.exports = { departmentRoute };
