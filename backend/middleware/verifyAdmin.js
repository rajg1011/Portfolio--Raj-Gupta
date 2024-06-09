require("dotenv").config();
var jwt = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
  try {
    //Get admin token
    const admin_token = req.cookies.admin_token;
    if (!admin_token) {
      return res.send({
        status: false,
        message: "Not An Admin",
      });
    } else {
      //decoding JWT token
      await jwt.verify(admin_token, process.env.JWT_SECRET_ADMIN);
      next();
    }
  } catch (e) {
    res.send({
      status: false,
      message: "Invalid token",
    });
  }
};

module.exports = verifyAdmin;
