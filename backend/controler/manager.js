const { default: mongoose } = require("mongoose");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const GetEmployeeList = async (req, res) => {
  const sortField = req.query.sortField || "name";
  const sortOrder = req.query.sortOrder || "asc";
  let query = {
    role: "employee",
  };
  const employees = await userModel.aggregate([
    {
      $match: query,
    },
    {
      $lookup: {
        from: "departments",
        localField: "department",
        foreignField: "_id",
        as: "departmentName",
        pipeline: [
          {
            $project: {
              name: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        departmentName: "$departmentName.name",
      },
    },
    {
      $sort: {
        [sortField]: sortOrder === "asc" ? 1 : -1,
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        role: 1,
        location: 1,
        department: 1,
        departmentName: 1,
        designation: 1,
      },
    },
  ]);
  return res.status(200).json({
    success: true,
    message: "Employee list fetched.",
    data: employees,
  });
};

const CreateEmployee = async (req, res) => {
  const { name, email, password, ...rest } = req.body;
  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res
      .status(403)
      .json({ error: true, message: "Email is allready exist." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.create({
    name,
    email,
    role: "employee",
    password: hashedPassword,
    ...rest,
  });
  return res
    .status(200)
    .json({ success: true, message: "New employee added successfully" });
};

const UpdateEmployeeDetails = async (req, res) => {
  const { name, email, role, id, department, designation, password, location } =
    req.body;
  const employee = await userModel.findById(id);
  if (!employee) {
    return res.status(404).json({ error: true, message: "Wrong employee Id" });
  }
  if (email) {
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist._id.toString() !== id) {
      return res
        .status(403)
        .json({ error: true, message: "Email is allready exist." });
    }
  }
  let hashedPassword = undefined;
  if (password) {
    hashedPassword = bcrypt.hash(password, 10);
  }
  await userModel.findByIdAndUpdate(id, {
    $set: {
      name,
      email,
      role,
      department,
      designation,
      password: hashedPassword ?? employee.password,
      location,
    },
  });
  return res.status(200).json({
    success: true,
    message: "Employee details updated successfully",
  });
};

const DeleteEmployee = async (req, res) => {
  const { id } = req.query;
  const employee = await userModel.findByIdAndDelete(id);
  if (!employee) {
    return res.status(404).json({
      error: true,
      message: "No employee exist with this id",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
};

module.exports = {
  GetEmployeeList,
  UpdateEmployeeDetails,
  CreateEmployee,
  DeleteEmployee,
};
