import React, { useEffect } from 'react'
import './orderConfirmPage/confirm.css'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import HouseIcon from '@mui/icons-material/House';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions/orderActions';
import { useParams } from 'react-router-dom';
import Loader from './loader/loader';
import Header from './header/header';
import Footer from './footer/Footer';

const OrderDetails = () => {

    const { orderDetails, loading } = useSelector((state) => state.orderDetails);

    const { orderId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        if (orderId) {
            dispatch(getOrder(orderId));
        }

    }, [dispatch, orderId]);

    return (<>
        {(loading) ? (<Loader></Loader>) : (
            <>
                <Header></Header>
                <div className='main-confirm-container main-confirm-order-page-container'>
                    <h2 className='confirm-container-heading' style={{ color: 'cyan', fontSize: '5.2rem', marginTop: '60px' }}>Order Details<span style={{ color: 'grey', fontSize: '1.2rem' }}>Id#{orderDetails && orderDetails._id}</span></h2>
                    <div className='confirm-container order-details-page-container' style={{ border: '4px solid purple' }}>
                        <div className='confirm-left-div'>
                            <div className='order-details-user'>
                                <div className='details-box'>
                                    <h2>Customer details</h2>
                                    <span><PermContactCalendarIcon sx={{ position: 'absolute', right: '10px', top: '30px', fontSize: '6rem', color: 'orangered' }}></PermContactCalendarIcon></span>
                                    <div className='details'>
                                        <table cellSpacing={9} style={{ marginTop: '20px' }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: '40px' }}>Name:</td><td style={{ color: 'grey', fontWeight: '700' }}>{orderDetails && orderDetails.user.name}</td>
                                                </tr>
                                                <tr>
                                                    <td >Email:</td><td style={{ color: 'grey', fontWeight: '700' }}>{orderDetails && orderDetails.user.email}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className='details-box'>
                                    <h2>Shipping details</h2>
                                    <span><HouseIcon sx={{ position: 'absolute', right: '10px', top: '30px', fontSize: '7rem', color: 'orangered' }}></HouseIcon></span>
                                    <div className='details'>
                                        <h3>Address</h3>
                                        <div>{orderDetails && orderDetails.shippingInfo.address}</div>
                                        <div>{`${orderDetails && orderDetails.shippingInfo.city},${orderDetails && orderDetails.shippingInfo.state}-${orderDetails && orderDetails.shippingInfo.pincode},${orderDetails && orderDetails.shippingInfo.country}`}</div>
                                        <div>{orderDetails && orderDetails.shippingInfo.country}</div>
                                    </div>

                                </div>
                            </div>
                            <div className='order-items-container order-items-page-container'>

                                <h2 className='order-details-heading'>Order Items Details</h2>
                                {orderDetails && orderDetails.orderItems && orderDetails.orderItems.map((data) => {
                                    return (
                                        <div className='single-order-items-container' key={data._id}>
                                            <div className='order-product-image'>
                                                <img src='/images/second.jpg' alt='na'></img>
                                            </div>
                                            <div className='order-product-details'>
                                                <div className='order-items-product-name'>{data.name}</div>
                                                <div>Quantity : {data.quantity}</div>
                                                <div>Price : {data.price}</div>
                                            </div>
                                            <div className='order-product-price'>
                                                <h2>Price</h2>
                                                <div>Rs {data.price} x {data.quantity}</div>
                                                <div className='order-item-total-price'>Rs {data.price * data.quantity}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='confirm-right-div'>
                            <h2 style={{ color: 'orangered' }}>Order Summary</h2>
                            <div className='pricing-details'>
                                <div className='pricing-category'>
                                    <div className='pricing-label larger-label'>Order Price</div>
                                    <div className='pricing-info larger-pricing'>Rs {orderDetails && orderDetails.itemsPrice}</div>
                                </div>
                            </div>
                            <div className='pricing-details'>
                                <div className='pricing-category'>
                                    <div className='pricing-label'>18% GST</div>
                                    <div className='pricing-info'>Rs {orderDetails && orderDetails.itemTaxPrice}</div>
                                </div>
                            </div>
                            <div className='pricing-details'>
                                <div className='pricing-category'>
                                    <div className='pricing-label'>Shipping Charges*</div>
                                    <div className='pricing-info'>{orderDetails && orderDetails.shippingPrice}</div>
                                </div>
                            </div>

                            <div className='pricing-details' style={{ marginTop: '10px', borderTop: '3px solid black', fontSize: '1.8rem', paddingTop: '10px' }}>
                                <div className='pricing-category'>
                                    <div className='pricing-label larger-label'>Total Price</div>
                                    <div className='pricing-info larger-pricing'>Rs {orderDetails && orderDetails.TotalPrice}</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', color: 'grey', marginTop: '10px' }}>*shipping charges are not applicable on orders above rs 1000</div>
                            <div className='Payment-details-container'>
                                <h2>Payment Details</h2>
                                <div className='pricing-details'>
                                    <div className='pricing-category'>
                                        <div className='pricing-label'>Payment ID</div>
                                        <div className='pricing-info payment-id'>{orderDetails &&orderDetails.paymentInfo&& orderDetails.paymentInfo.id}</div>
                                    </div>
                                </div>
                                <div className='pricing-details'>
                                    <div className='pricing-category'>
                                        <div className='pricing-label'>Payment status</div>
                                        <div className= {(orderDetails &&orderDetails.paymentInfo&&orderDetails.paymentInfo.status==='succeeded')?'pricing-status-success pricing-info':'pricing-status-fail pricing-info'}>{orderDetails && orderDetails.paymentInfo.status}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </>
        )}
    </>
    )
}

export default OrderDetails