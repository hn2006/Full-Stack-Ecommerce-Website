const ErrorHandler = require('../utils/errorHandler');
const Product = require('../models/productModel');
const Users = require('../models/userModel');
const Orders = require('../models/orderModel');


exports.dashboardDetails = async (req, res, send) => {

    try {

        const orderCount = await Orders.find().count().catch((error) => console.log(error));

        const productCount = await Product.find().count().catch((error) => console.log(error));

        const userCount = await Users.find().count().catch((error) => console.log(error));

        const totalRevenue = await Orders.aggregate([{ $group: { _id: null, Revenue: { $sum: "$TotalPrice" } } }]).catch((error) => console.log(error));

        const categoriesChartData = await Product.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]).catch((error) => console.log(error));

        const orderStatusChartData = await Orders.aggregate([{ $group: { _id: "$orderStatus", count: { $sum: 1 } } }]).catch((error) => console.log(error));

        const productInstock = await Product.find({ stock: { $gt: 0 } }).count().catch((error) => console.log(error));

        const productOutofstock = productCount - productInstock;

        const stockChartData = [{ _id: 'In Stock', count: productInstock }, { _id: 'Out of Stock', count: productOutofstock }];

        const recentOrders = await Orders.find({}).sort({ createdAt: -1 }).limit(5).catch((error) => console.log(error));

        const revenueLastThirtyDays = await Orders.aggregate([{ $match: { paidAt: { $gt: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)) } } }, { $group: { _id: { day: { $dayOfMonth: "$paidAt" }, month: { $month: "$paidAt" } }, amount: { $sum: "$TotalPrice" } } },{$sort:{"_id.month":1,"_id.day":1}}]).catch((error) => console.log(error))

        return res.status(200).json({

            success: true,
            dashboardData: {
                orderCount,
                userCount,
                totalRevenue,
                recentOrders,
                categoriesChartData,
                orderStatusChartData,
                stockChartData,
                revenueLastThirtyDays
            }
        })
    }

    catch {

        return next(new ErrorHandler('some server error occured could not fetch dashboard data', 400));
    }

}