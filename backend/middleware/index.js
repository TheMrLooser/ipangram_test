const { verify } = require("jsonwebtoken");
const userModel = require("../model/userModel");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    let verified = verify(token, process.env.JWT_SECRETE);
    if (!verified) {
      return res
        .status(401)
        .json({ error: true, message: "Your token is expired or invalid." });
    }

    const user = await userModel.findOne(
      { email: verified.id },
      { password: 0 }
    );
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, message: "You are unAuthorised" });
  }
};

const isManager = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "manager") {
      return res.status(401).json({ error: true, message: "Access denide" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
};

module.exports = {
  isAuthenticated,
  isManager,
};
