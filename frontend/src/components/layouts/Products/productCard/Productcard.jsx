import React from 'react'
import { Rating } from '@mui/material'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './ProductCard.css'
import { motion } from 'framer-motion';

const Productcard = (props) => {
    return (
        <motion.div initial={{ opacity: 0 }}
            whileInView={{ opacity: 1}}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }} className='product-card-container' key={props.product._id}>

            <div className='product-card-image-container'>
                <img className='product-card-image' style={{height:'100%'}} src={(props.product&&props.product.images&&props.product.images[0])?props.product.images[0].url:'/images/second.jpg'} alt='error'></img>
            </div>
            <h3 className='product-card-product-name'>{props.product.name}</h3>

            <div className='product-card-rating'>
                <div className='product-card-rating-container'>
                    <Rating name="read-only" value={props.product.rating} sx={{ fontSize: '1.9rem' }}></Rating>
                    <span className='rating-reviews'> ({props.product.NumofReviews}) reviews</span>
                </div>
                <div className='product-card-price'>
                    <CurrencyRupeeIcon sx={{ color: 'black', fontSize: '2.0rem' }}></CurrencyRupeeIcon>
                    <span>{props.product.price}</span>
                </div>
            </div>

        </motion.div>
    )
}

export default Productcard