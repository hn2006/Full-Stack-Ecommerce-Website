const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });
  
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  }

exports.sendStripeApiKey = async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_USER_KEY });
  }
