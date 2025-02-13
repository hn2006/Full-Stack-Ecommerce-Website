const express = require('express');
const app = express();
const dotenv = require("dotenv").config();

const cloudinary=require('cloudinary').v2;
const database = require('./config/database');
const productRouter = require('./routers/productRoute');
const userRouter = require('./routers/userRoute');
const orderRouter=require('./routers/orderRoute');
const paymentRouter=require('./routers/paymentRoute');
const errorMiddleware = require('./middleware/error')
const bodyparser = require('body-parser');
const cookieParser=require('cookie-parser');
const fileupload=require('express-fileupload');
const authentication = require('./controllers/auth');
const authRole = require('./utils/authrole');
const dashboard=require('./controllers/dashboardController');
const cors = require('cors');


app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileupload());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
database();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET_KEY,
    secure:true
});
        
app.use('/products', productRouter);
app.use('/dashboard',authentication,authRole('admin'),dashboard.dashboardDetails);
app.use('/user', userRouter);
app.use('/order',orderRouter);
app.use('/payment',paymentRouter);

app.use('/', (req, res) => {

    res.send('<h1>welcome to our website</h1>')
})
app.use(errorMiddleware);


app.listen(8000, () => {

    console.log("server is listening on port 8000");
})
