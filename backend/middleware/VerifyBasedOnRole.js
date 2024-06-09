const verifyUser = require("./verifyUser");
const verifyAdmin = require("./verifyAdmin");
//MiddleWare Based on admin Data from User
const VerifyBasedOnRole = (req, res, next) => {
  if (req.body.isAdmin) {
    verifyAdmin(req, res, next);
  } else {
    verifyUser(req, res, next);
  }
};

module.exports = VerifyBasedOnRole;
