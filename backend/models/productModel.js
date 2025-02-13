const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        // required:true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        maxLength: 8
    },

    rating: {

        type: Number,
        default: 0
    },

    images: [

        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {

        type: String,
        required: true
    },
    stock: {

        type: Number,
        required: true,
        default: 1
    },
    NumofReviews: {

        type: Number,
        default: 0
    },
    reviews: [

            {

                user:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User',
                    required:true
                },
                name: {
                    type: String,
                    required: true
                },
                rating: {
                    type: String,
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                }
            }
    ],
    createdAt: {

        type: Date,
        default: Date.now()
    }

})

module.exports=mongoose.model("Product",ProductSchema);