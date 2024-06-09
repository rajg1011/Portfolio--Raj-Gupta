require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const prisma = require("../../config/Prisma.js");

//Creating Order
const RazorpayOrder = async function (req, res) {
  try {
    //Creating instance of Order
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    //Different Options to be send to Razorpay
    const options = {
      amount: +(req.body.amount * 100),
      currency: "INR",
      receipt: req.body.id,
    };

    //Creating Order
    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("Error in RazorPayOrder of Razorpay.js", error);
    res.status(500).send(error);
  }
};

//Verify is payment is legit
const paymentVerification = async function (req, res) {
  try {
    const { name, razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    //Creating Order in DB with default status as Pending
    const orderInDB = await prisma.razorpay.create({
      data: {
        name: name,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      },
    });
    // Making digest of order id and payment id using hashing algorithm
    const digest = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (digest !== razorpay_signature) {
      //Updating status of order as Invalid
      await prisma.razorpay
        .update({
          where: {
            razorpay_signature: razorpay_signature,
          },
          data: {
            status: "Invalid",
          },
        })
        .then(() => {
          res.send("Coffee Invalid");
        });
    }

    //Updating status to success
    await prisma.razorpay
      .update({
        where: {
          id: orderInDB.id,
          razorpay_signature: razorpay_signature,
        },
        data: {
          status: "Success",
        },
      })
      .then(() => {
        res.send("Coffee Success");
      });
  } catch (error) {
    console.log("Error in paymentVerification of Razorpay.js", error);
    res.send("Coffee Failed");
  }
};

module.exports = {
  RazorpayOrder,
  paymentVerification,
};
