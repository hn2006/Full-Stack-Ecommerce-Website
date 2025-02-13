const dotenv = require("dotenv").config();
const mongoose=require('mongoose');

const database=()=>{


    mongoose.connect(process.env.MONGO_URL).then((data)=>{

    console.log('connected to database successfully');

    })
    .catch((err)=>{


        console.log(err);
    })

}

module.exports=database;