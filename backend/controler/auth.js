const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
  const { name, email, password, role, location } = req.body;
  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res
      .status(403)
      .json({ error: true, message: "Email is allready exist." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign({ id: email }, process.env.JWT_SECRETE);
  const newUser = await userModel.create({
    name,
    email,
    role,
    password: hashedPassword,
    location,
  });
  return res.status(200).json({
    success: true,
    message: "Signup successfully",
    token,
    data: { name, email, role, location },
  });
};

const SignIn = async (req, res) => {
  const { email, password } = req.body;
  const isUserExist = await userModel.findOne({ email });
  if (!isUserExist) {
    return res.status(404).json({ error: true, message: "User not exist." });
  }
  const isCurrectPassword = await bcrypt.compare(
    password,
    isUserExist?.password
  );
  if (!isCurrectPassword) {
    return res.status(401).json({ error: true, message: "Wrong credentials." });
  }

  const token = jwt.sign({ id: email }, process.env.JWT_SECRETE);

  return res.status(200).json({
    success: true,
    message: "Signin successfully",
    token,
    data: isUserExist,
  });
};

module.exports = {
  SignIn,
  SignUp,
};
