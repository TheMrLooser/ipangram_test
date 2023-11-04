const { authRouter } = require("./auth");

const express = require("express");
const { departmentRoute } = require("./department");
const { commanRoute } = require("./comman");
const { managerRoute } = require("./manager");
const { isAuthenticated, isManager } = require("../middleware");

const router = express.Router();

router.use("/auth", authRouter);
router.use(isAuthenticated);
router.use("/user", commanRoute);
router.use(isManager);
router.use("/manager", managerRoute);
router.use("/department", departmentRoute);

module.exports = { router };
