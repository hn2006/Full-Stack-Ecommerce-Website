const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const Apifeatures = require('../utils/apifeatures');
const cloudinary = require('cloudinary');
const error = require('../middleware/error');

exports.createProduct = async (req, res, next) => {


    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    try {
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            }).catch(error => { console.log(error); return next(new ErrorHandler('Some server error occured', 404)) });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
        req.body.user = req.user.id;

        const product = await Product.create(req.body).catch(error => { console.log(error); return next(new ErrorHandler('Some server error occured', 404)) });
        res.status(201).json({
            success: true,
            product: product,
        });

    }

    catch{

        return next(new ErrorHandler('some server error occured', 400));
    }
}
exports.updateProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        try {
            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            req.body.images = imagesLinks;
        }
        catch {

            return next(new ErrorHandler('some server error occured', 400));
        }
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
}


exports.deleteProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
        success: true,
        message: "Product Delete Successfully",
    });
}

exports.getAllProducts = async (req, res, next) => {

    const resultPerPage = 9;

    let apifeatures = new Apifeatures(Product.find(), req.query).search().filter().filterByPrice();

    let product = await apifeatures.query;

    const count = product.length;

    let finalapifeatures = new Apifeatures(Product.find(), req.query).search().filter().filterByPrice().pagination(resultPerPage);

    product = await finalapifeatures.query;

    res.status(200).json({

        success: true,
        message: 'products fetched successfully',
        product,
        count
    })
}

exports.productDetails = async (req, res, next) => {

    try {
        const product = await Product.findById(req.params.id);

        return res.status(200).json({

            success: true,
            product
        })
    }

    catch {

        return next(new ErrorHandler('product not found', 400));
    }
}

exports.adminallproducts = async (req, res, next) => {

    const products = await Product.find();

    return res.status(200).json({
        success: true,
        products
    });
}