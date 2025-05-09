const ErrorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ErrorHandler('Login first to continue', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedData = jwt.verify(token, 'HHASHJKDHSHKHDHSAHHKSAHKHDHDHASKHKHNBSB');
    req.user = await User.findOne({ _id: decodedData.id });

    if (!req.user) {
      return next(new ErrorHandler('User not found', 404));
    }

    next();
  } catch (err) {
    return next(new ErrorHandler('Invalid or expired token', 401));
  }
};

module.exports = authentication;
