const express = require("express");
const { wrapRequestHandler, validate } = require("../utils");
const { GetEmployeeDetail } = require("../controler/comman");
const { getEmpDetailValidation } = require("../validation/comman");

const commanRoute = express.Router();
commanRoute.get(
  "/get-employee-detail",
  validate(getEmpDetailValidation),
  wrapRequestHandler(GetEmployeeDetail)
);

module.exports = { commanRoute };
