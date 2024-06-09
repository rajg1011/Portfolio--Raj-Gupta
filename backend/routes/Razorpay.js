const express = require("express");
const {
  RazorpayOrder,
  paymentVerification,
} = require("../controllers/Razorpay/Razorpay.js");

const router = express.Router();

//RazorPay routes as- /api/...
router.post("/coffee", RazorpayOrder);
router.post("/paymentVerification", paymentVerification);
module.exports = router;
