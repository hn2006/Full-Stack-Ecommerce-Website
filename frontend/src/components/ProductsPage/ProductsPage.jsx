import React, { useEffect, useState } from 'react'
import './ProductsPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProducts } from '../../actions/productActions';
import { Pagination, Slider } from '@mui/material';
import Productcard from '../layouts/Products/productCard/Productcard';
import { toast } from 'react-toastify';
import Header from '../layouts/header/header';
import Footer from '../layouts/footer/Footer'
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'

const ProductsPage = () => {

    let search_val = '';

    const dispatch = useDispatch();
    const { product, error, loading, productCount } = useSelector(state => state.products);
    const [page, setpage] = useState(1);
    const [price, setPrice] = useState([0, 200000]);
    const [search, setsearch] = useState('');
    const [category, setcategory] = useState('');
    const pricing = [
        {
            value: 0,
            label: "0Rs",
        },
        {
            value: 50000,
            label: "50000Rs",
        },
        {
            value: 100000,
            label: "100000Rs",
        },
        // {
        //     value: 125000,
        //     label: "125000Rs",
        // },
        {
            value: 150000,
            label: "150000Rs",
        },
        {
            value: 200000,
            label: "200000Rs",
        },
        // {
        //     value: 25000,
        //     label: "25000Rs",
        // },
        // {
        //     value: 175000,
        //     label: "175000Rs",
        // },
        // {
        //     value: 75000,
        //     label: "75000Rs",
        // },

    ];


    const categories = [

        'smartphones',
        'laptops',
        'home devices',
        'Books',
        'cars',
        'footwear',
    ];



    const searchhandler = (event) => {

        search_val = event.target.value;
        console.log(search_val);
    }

    const formSubmitHandler = (e) => {

        e.preventDefault();
        setsearch(search_val);
    }
    const updateRange = (e, data) => {
        setPrice(data);
    };

    const pagehandler = (event, value) => {

        setpage(value);

    }


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
        else {

            dispatch(getProducts(page, search, price, category));
        }

    }, [dispatch, error, page, search, price, category]);

    useEffect(() => {

        return () => {

            dispatch(clearErrors());
        }
    }, [dispatch])

    return (

        <div>
            <Header></Header>
            <div className='products-search-bar-container'>
                <form className='search-box-form' onSubmit={formSubmitHandler}>
                    <input type='text' onChange={searchhandler} placeholder='Search your favourite products here...'></input>
                    <input type='submit' value={'Search'}></input>
                </form>
            </div>
            <div className='products-page-main-container'>
                <div className='products-page-products-filters'>
                    <div className='products-price-range'>
                        <h2>Price</h2>
                        <Slider valueLabelDisplay="auto" value={price} onChange={updateRange} min={0} max={200000} marks={pricing} step={25000} sx={{ color: 'white', marks: { color: 'red' } }}></Slider>
                    </div>
                    <div className='products-category-box'>
                        <h2>Category</h2>
                        <ul>
                            {categories.map(data => {

                                return <li key={data} onClick={() => { setcategory(data) }}>{data}</li>
                            })}
                        </ul>
                    </div>
                </div>

                <motion.div className='products-page-products-container' initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    viewport={{ once: true }}>
                    {(product && !loading) ? (product.map((data) => {

                        return <Link to={`/products/${data._id}`} key={data._id}><Productcard product={data} key={data._id}></Productcard></Link>
                    })) : <div>No products found</div>}
                </motion.div>
            </div>

            <div className='products-page-pagination-container'>
                <Pagination count={(productCount ? Math.ceil(productCount / 9) : 1)} color="secondary" onChange={pagehandler} page={page} size='large' sx={{ backgroundColor: 'rgb(211, 249, 141)', borderRadius: '60px', fontSize: '2rem', fontWeight: '700' }} />
            </div>

            <Footer></Footer>
        </div>
    )
}

export default ProductsPage