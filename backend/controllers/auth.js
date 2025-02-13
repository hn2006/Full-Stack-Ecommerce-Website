const ErrorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authentication = async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {

        return next(new ErrorHandler('login first to continue', 401));
    }

    const decodedData = jwt.verify(token, 'HHASHJKDHSHKHDHSAHHKSAHKHDHDHASKHKHNBSB');

    console.log(decodedData);

    req.user = await User.findOne({_id:decodedData.id});

    console.log(req.user.id);
    
    next();
}

module.exports=authentication;