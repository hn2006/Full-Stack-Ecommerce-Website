const Orders = require('../models/orderModel');
const ErrorHandler = require('../utils/errorHandler');
const product = require('../models/productModel');


exports.createOrder = async (req, res, next) => {

    const { itemsPrice,
        itemTaxPrice,
        shippingPrice,
        TotalPrice,
        shippingInfo,
        orderItems,
        paymentInfo,
    } = req.body;

    const order = await Orders.create({
        itemsPrice,
        itemTaxPrice,
        shippingPrice,
        TotalPrice,
        shippingInfo,
        orderItems,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
        createdAt:Date.now()
    });

    await [...orderItems].forEach(async (element) => {

        const data = await product.findById(element.product);

        data.stock = data.stock - element.quantity;

        await data.save();
    })

    return res.status(201).json({

        success: true,
        message: "order has been created successfully",
        order
    })
}

exports.getSingleOrder = async (req, res, next) => {

    const order = await Orders.findById(req.params.id).populate('user', 'email name');

    console.log(order);

    if (!order) {

        return next(new ErrorHandler('product not found', 404));
    }

    return res.status(200).json({

        success: true,
        message: 'order fetched successfully',
        order
    })
}

exports.getUserOrders = async (req, res, next) => {


    const order = await Orders.find({ user: req.user._id }).populate('user', 'email name');


    return res.status(200).json({

        success: true,
        message: "order fetched successfully",
        order
    })


}

exports.getAllOrders = async (req, res, next) => {

    const order = await Orders.find().populate('user', 'name email');


    let sum = 0, cnt = 0;

    order.forEach((data) => {

        sum = sum + data.TotalPrice;
        cnt++;

    })

    return res.status(200).json({

        success: true,
        message: 'orders fetched successfully',
        order
    })
}

exports.updateOrder = async (req, res, next) => {

    const order = await Orders.findById(req.params.id);

    if (!order) {

        return next(new ErrorHandler(`not such exist with order id: ${req.params.orderId}`, 404));
    }

    if (order.status === 'Delivered') { return res.status(400).json({ success: false, message: 'your order is already delivered' }) }

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {

        order.deliveredAt = Date.now();
    }

    await order.save();

    return res.status(200).json({

        success: true,
        message: 'order status has been updated successfully'
    })
}

exports.deleteOdrer = async (req, res, next) => {

    const order = await Orders.findById(req.params.id);

    if (!order) {

        return next(new ErrorHandler(`no such order exist with order id: ${req.params.id}`, 404));
    }

    await Orders.findByIdAndDelete(req.params.id);

    return res.status(200).json({

        success: true,
        message: 'order has been deleted successfully'
    })
}