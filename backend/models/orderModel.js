const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    shippingInfo: {

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },
        state: {

            type: String,
            required: true
        },
        country:{

            type:String,
            required:true
        },
        pincode: {

            type: Number,
            required: true
        },
        phoneNumber: {

            type: Number,
            required: true
        }
    },

    orderItems:[

        {

            name:{
                type:String,
                required:true
            },
            price:{

                type:Number,
                required:true
            },
            quantity:{

                type:Number,
                required:true
            },

            image:{

                type:String,
            },
            product:{

                type:mongoose.Types.ObjectId,
                ref:'Product',
                required:true
            }

        }
    ],

    user:{

        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    paymentInfo:{

        id:{type:String,required:true},
        status:{type:String,required:true}
    },

    paidAt:{

        type:Date,
        required:true

    },
    itemsPrice:{

        type:Number,
        required:true,
        default:0
    },
    itemTaxPrice:{

        type:Number,
        required:true,
        default:0
    },

    shippingPrice:{

        type:Number,
        required:true,
        default:0
    },
    TotalPrice:{

        type:Number,
        required:true,
        default:0
    },
    orderStatus:{
        type:String,
        required:true,
        default:'processing'
    },
    deliveredAt:Date,

    createdAt:{

        type:Date,
        required:true,
        default:Date.now()
    }
})

module.exports=mongoose.model('Orders',orderSchema);