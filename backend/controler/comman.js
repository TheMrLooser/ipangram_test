const userModel = require("../model/userModel");

const GetEmployeeDetail = async (req, res) => {
  const { employeeId } = req.query;

  const detail = await userModel.findById(employeeId, { password: 0 });
  if (!detail) {
    return res.status(404).json({ error: true, message: "Wrong employee Id" });
  }
  return res.status(200).json({
    message: true,
    message: "Employee details fetched successfully",
    data: detail,
  });
};

module.exports = {
  GetEmployeeDetail,
};
