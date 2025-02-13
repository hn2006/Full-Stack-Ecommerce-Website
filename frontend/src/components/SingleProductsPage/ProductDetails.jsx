import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './productDetails.css'
import Header from '../layouts/header/header'
import Footer from '../layouts/footer/Footer'
import { Box, Button, Modal, Rating, TextField } from '@mui/material'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Reviews from '../layouts/reviews/Reviews'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../layouts/loader/loader'
import { addProductReview, getProductsDetails } from '../../actions/productActions'
import { addToCart } from '../../actions/cartActions'
import axios from 'axios'
import {motion} from 'framer-motion';

const ProductDetails = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '300px',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid orangered',
        boxShadow: 24,
        padding: '10px',
        borderRadius: '5px'
    };


    const dispatch = useDispatch();
    const { productId } = useParams();
    const { product, error, loading } = useSelector(state => state.productsDetails);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [value, setvalue] = useState(1);
    const [open, setopen] = useState(false);
    const handleOpen = () => setopen(true);
    const handleClose = () => setopen(false);
    const [review, setReview] = useState({ rating: 0 });

    const submithandler = async () => {


        if (!user) {

            setopen(false);

            return toast.error('login first to add a review', { theme: 'dark' });
        }

        try {
            const { data } = await axios.post('/user/review', { ...review, prodId: productId }, {
                headers: {
                    "Content-Type": "application/json",
                },
            })

            console.log('success');

            dispatch(addProductReview(product, data.review, data.newRating));

            toast.success('review added successfully', { theme: "dark" });

            setopen(false);

            setReview({ rating: 0 });
        }
        catch {

            toast.error('review could not be added', { theme: 'dark' });

            setopen(false);


        }
    }

    const addtocarthandler = (prodId) => {

        dispatch(addToCart(prodId, value));
        navigate('/user/cart');
    }

    const incrementhandler = () => {

        if (value < product.stock) {

            setvalue(value + 1);
        }
    }
    const decrementHandler = () => {

        if (value > 1) {

            setvalue(value - 1);
        }
    }

    useEffect(()=>{
        dispatch(getProductsDetails(productId));
    },[dispatch,productId]);


    useEffect(() => {

        if (error) {

            toast.error(error, {

                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }, [error]);
    return (

        (loading) ? (<Loader></Loader>) : (
            <motion.div initial={{ opacity: 0}}
            whileInView={{ opacity: 1}}
            transition={{duration:1.2}}>
                <Header></Header>

                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style}>

                        <div><Rating
                            name="simple-controlled"
                            value={review.rating}
                            sx={{ fontSize: '4.2rem' }}
                            onChange={(event, newValue) => {
                                setReview({ ...review, rating: newValue });
                            }}
                        /></div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Comment"
                            multiline
                            rows={8}
                            name='comment'
                            sx={{ width: '270px', fontSize: '3rem' }}
                            onChange={(event) => { setReview({ ...review, [event.target.name]: event.target.value }) }}
                        />

                        <div style={{ width: '98%', height: '40px', display: 'flex', justifyContent: 'space-between' }}><Button onClick={() => { submithandler() }} variant="contained" sx={{ width: '48%', backgroundColor: 'orangered' }}>Submit</Button><Button variant="contained" sx={{ width: '48%', backgroundColor: 'orangered' }} onClick={() => { setopen(false); setReview({ rating: 0 }); }}>Cancel</Button></div>

                    </Box>
                </Modal>
                <div className='details-page-main-container'>
                    <div className='details-page-carousal-images'>

                        <Carousel sx={{ height: '95%', width: '95%', margin: 'auto' }}>
                            {(product && product.images && product.images.length > 0) ? (
                                product.images.map((ele) => {
                                    return <img src={ele.url} alt='one' className='carousal-image'></img>
                                })
                            ) : (
                                <img src='/images/first.jpg' alt='one' className='carousal-image'></img>

                            )}
                        </Carousel>

                    </div>
                    <div className='details-page-product-details'>
                        <h2>{product&&product.name}</h2>

                        <div className='rating-review-details'>
                            <div><Rating name="disabled" value={product&&product.rating} size='large' sx={{ color: 'red', fontSize: '20px' }} readOnly></Rating></div>
                            <div>({product&&product.NumofReviews})</div>
                        </div>

                        <p>{product&&product.description}</p>

                        <div className='price-details-and-add-to-cart'>

                            <div className='price'><span><CurrencyRupeeIcon fontSize='large'></CurrencyRupeeIcon></span><span>{product&&product.price}</span></div>

                            <div className={(product&&product.stock > 0) ? ' status InStock' : 'status OutOfStock'} >{(product&&product.stock > 0) ? 'Instock' : 'Out of Stock'}</div>

                            <div className='purchase'>
                                <div className='quantity'>
                                    <div onClick={incrementhandler}>+</div>
                                    <input type='text' readOnly value={value}></input>
                                    <div onClick={decrementHandler}>-</div>
                                </div>
                                <button disabled={(product&&product.stock > 0) ? false : true} onClick={() => {
                                    addtocarthandler(product._id);
                                }}>Add to cart</button>
                            </div>
                        </div>

                        <button style={{ height: '50px', width: '200px', position: 'relative', bottom: '20px', right: '23px' }} className='reviews-button' onClick={() => {
                            handleOpen();
                        }}>Add Review</button>

                    </div>
                </div>

                <h2 className='review-heading'>Reviews</h2>
                <Reviews reviewData={product&&product.reviews}></Reviews>


                <Footer></Footer>
            </motion.div>
        )
    )
}

export default ProductDetails