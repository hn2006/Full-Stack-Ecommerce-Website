const mongoose=require('mongoose');

const database=()=>{


    mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce').then((data)=>{

    console.log('connected to database successfully');

    })
    .catch((err)=>{


        console.log(err);
    })

}

module.exports=database;