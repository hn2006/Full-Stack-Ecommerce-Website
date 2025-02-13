import React, { useEffect } from 'react';
import Header from '../layouts/header/header';
import HomeImage from '../layouts/homeImage/homeImage';
import Products from '../layouts/Products/products'
import './Home.css'
import Footer from '../layouts/footer/Footer';
import { clearErrors, getProducts } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layouts/loader/loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    const dispatch = useDispatch();
    const { product, error, loading } = useSelector(state => state.products);


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

            dispatch(getProducts());
        }

    }, [dispatch, error]);

    useEffect(()=>{

        return ()=>{

            dispatch(clearErrors());

            console.log('unmounted');
        }
    },[dispatch])

    return (
        <div>

            {(loading) ? (<Loader></Loader>) :

                (<div className='home-page'>
                    <Header></Header>
                    <HomeImage></HomeImage>
                    <div className='home-page-featured-products-heading'>
                        <h2>Featured Products</h2>
                    </div>
                    <Products products={product}></Products>
                    <Footer></Footer>
                </div>)}
        </div>
    )
}

export default Home