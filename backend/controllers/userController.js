const errorHandler = require('../utils/errorHandler');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const sendJwtToken = require('../utils/jwttoken');
const sendEmail = require('../utils/sendEmail');
const { findByIdAndDelete } = require('../models/productModel');
const cloudinary = require('cloudinary');
const crypto = require('crypto');

exports.userRegister = async (req, res, next) => {

    const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars'
    }).catch((error) => { console.log(error) });


    const { name, email, password } = req.body;

    let encryptpassword;

    encryptpassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
        name, email, password: encryptpassword, avatar: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url
        }
    });

    // const user = await User.create({ name, email, password: encryptpassword});



    return sendJwtToken(user, 201, res);
}

exports.userLogin = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return next(new errorHandler("please enter email or password", 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (user) {

        const passwordMatched = await bcryptjs.compare(password, user.password);

        if (!passwordMatched) {

            console.log("invalid");

            return next(new errorHandler("wrong email or password", 400));
        }

        return sendJwtToken(user, 200, res);
    }

    return next(new errorHandler("invalid email or password", 400));

}


exports.logOut = async (req, res, next) => {

    return res.status(200).json({ success: true, message: "logout successful" });
}

exports.forgotPassword = async (req, res, next) => {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

        return next(new errorHandler('no email to be found with the entered email', 404));
    }


    const resetToken = user.getResetPasswordToken(user);


    await user.save();



    const url = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;


    console.log(url);


    const message = `your reset password token link is:\n\n ${url}\n\n if you have not requested it please try to secure your account`;

    try {


        await sendEmail({ email: user.email, subject: 'Project regarding password reset', message });


        console.log(message);


        return res.status(200).json({

            success: true,
            message: "email has been sent successfully"
        })

    } catch (error) {
        user.resertPasswordToken = undefined;

        user.resetTokenExpiration = undefined;

        await user.save();

        return next(new errorHandler(error.message, 500));
    }



}

exports.resetPassword = async (req, res, next) => {

    const token = req.params.token;

    console.log(token);

    const user = await User.findOne({ resertPasswordToken: token, resetTokenExpiration: { $gt: Date.now() } });

    if (!user) {

        return next(new errorHandler('token is invalid or has been expired', 400));
    }

    if (req.body.confirmPassword != req.body.newPassword) {

        return next(new errorHandler('confirm password and new password does not match', 400));
    }


    const encryptpassword = await bcryptjs.hash(req.body.newPassword, 10);

    user.password = encryptpassword;
    user.resertPasswordToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();

    return res.status(200).json({

        success: true,
        message: "password has been changed successfully"
    })
}


exports.getUserDetails = async (req, res, next) => {

    const user = await User.findById(req.user.id);

    return res.status(200).json({
        success: true,
        message: 'fetched user details successfully',
        user
    });
}

exports.changePassword = async (req, res, next) => {

    const user = await User.findOne({ email: req.user.email }).select('+password');

    if (req.body.confirmPassword != req.body.newPassword) {

        return next(new errorHandler('both passwords does not match please try again!', 400));
    }
    const oldPassword = req.body.oldPassword;

    const passwordMatched = await bcryptjs.compare(oldPassword, user.password);

    if (!passwordMatched) {

        return next(new errorHandler('invalid old password password could not be changed!', 400));
    }

    const newPassword = await bcryptjs.hash(req.body.newPassword, 10);

    user.password = newPassword;

    await user.save();

    return res.status(200).json({

        success: true,
        message: 'password has been changed successfully'
    })

}

exports.updateProfile = async (req, res, next) => {

    const updatedProfile = {

        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, updatedProfile, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return res.status(200).json({

        success: true,
        message: "profile changed successfully",
        user
    });
}


exports.getAllUsers = async (req, res, next) => {

    const users = await User.find();

    console.log(users);

    return res.status(200).json({

        success: true,
        message: "users fetched successfully",
        users
    });
}


exports.deleteUser = async (req, res, next) => {


    const user = await User.findById(req.params.id);

    if (!user) {

        return next(new errorHandler("user not found", 400));
    }


    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({

        success: true,
        message: "user has been removed",
        user
    })

}

exports.updateUserRole = async (req, res, next) => {

    const updatedRole = {

        role: 'admin'
    }

    const user = await User.findByIdAndUpdate(req.params.id, updatedRole, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return res.status(200).json({

        success: true,
        message: "Role changed successfully",
        user
    });
}


exports.addProductReview = async (req, res, next) => {

    const product = await Product.findById(req.body.prodId);
    // const isreviewed=product.reviews.find((ele)=>{return ele.user.toString()===req.user._id.toString()});

    let newReviewList;

    newReviewList = product.reviews.filter(element => {

        return (element.user.toString() !== req.user._id.toString());

    });

    const { comment, rating } = req.body;

    const review = { user: req.user._id, comment, rating: Number(rating), name: req.user.name };

    newReviewList.push(review);

    const newRating = (newReviewList.reduce((acc, ele) => { return (acc + Number(ele.rating)) }, 0)) / (newReviewList.length);

    console.log(newRating);

    console.log(newReviewList);

    product.rating = newRating;

    product.NumofReviews = newReviewList.length;

    product.reviews = newReviewList;

    await product.save();

    return res.status(200).json({

        success: true,
        message: "product has been reviewed successfully",
        review,
        newRating
    })
}


exports.deleteReview = async (req, res, next) => {

    const product = await Product.findById(req.query.ProdId);

    console.log(product.reviews);

    let newReviewList = product.reviews.filter((ele) => { ele.user.toString() !== req.user.id.toString() });

    console.log(newReviewList);

    let currentRating = product.rating;

    let numofReviews = product.NumofReviews;

    let rating;
    product.reviews.forEach(element => {

        if (element._id.toString() === req.user.id.toString()) {

            rating = element.rating;
        }

    });

    let newRating = (currentRating * numofReviews - rating) / (numofReviews - 1);

    if (numofReviews == 1) {

        newRating = 0;
    }

    const updatedList = await Product.findByIdAndUpdate(req.query.prodId, { rating: newRating, NumofReviews: numofReviews - 1, reviews: newReviewList }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    return res.status(200).json({

        success: true,
        message: "review has been deleted successfully",
        reviews: updatedList
    })

}


