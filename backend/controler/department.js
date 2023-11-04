const Department = require("../model/department");
const userModel = require("../model/userModel");

const CreateNewDepartment = async (req, res) => {
  const { name, description } = req.body;
  const isAllreadyExist = await Department.findOne({ name });
  if (isAllreadyExist) {
    return res.status(403).json({
      error: true,
      message: "One Department allready exist with this name.",
    });
  }
  await Department.create({ name, description });
  return res
    .status(200)
    .json({ success: true, message: "New department created successfully" });
};

const UpdateDepartment = async (req, res) => {
  const { name, description, id } = req.body;
  const isAllreadyExist = await Department.findOne({ name });
  if (isAllreadyExist?.name === name && isAllreadyExist._id.toString() !== id) {
    return res.status(403).json({
      error: true,
      message: "One Department allready exist with this name.",
    });
  }
  const updatedData = await Department.findByIdAndUpdate(
    { _id: id },
    { $set: { name, description } }
  );

  return res.status(200).json({
    success: true,
    message: "Department updated successfully",
    data: updatedData,
  });
};

const GetDepartmentList = async (req, res) => {
  const list = await Department.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "department",
        as: "noOfEmployee",
        pipeline: [
          {
            $count: "count",
          },
          {
            $project: {
              count: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        employee: "$noOfEmployee.count",
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        _id: 1,
        employee: 1,
      },
    },
  ]);

  return res.status(200).json({
    success: true,
    message: "Department list fetched successfully",
    data: list,
  });
};

const DeleteDepartment = async (req, res) => {
  const { id } = req.query;
  const department = await Department.findByIdAndDelete(id);
  if (!department) {
    return res.status(404).json({
      error: true,
      message: "No department exist with this id",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Department deleted successfully",
  });
};

const AddNewEmployeeInDepartment = async (req, res) => {
  const { employeeId, departmentId } = req.body;
  const isDepartmentExist = await Department.findById(departmentId);
  const isEmployeeExist = await userModel.findById(employeeId);
  if (!isDepartmentExist) {
    return res.status(404).json({
      error: true,
      message: "No department exist with this id",
    });
  }
};

module.exports = {
  CreateNewDepartment,
  UpdateDepartment,
  GetDepartmentList,
  DeleteDepartment,
  AddNewEmployeeInDepartment,
};
