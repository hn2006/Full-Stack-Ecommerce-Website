import React, { useEffect, useRef, useState } from 'react'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import HouseIcon from '@mui/icons-material/House';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions/orderActions';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../layouts/loader/loader';
import Header from '../layouts/header/header';
import Footer from '../layouts/footer/Footer';
import { Button, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminOrderDetailsPage = () => {

    const { orderDetails, loading } = useSelector((state) => state.orderDetails);

    const { orderId } = useParams();

    const dispatch = useDispatch();

    const navigate=useNavigate();

    const updateBtn=useRef(null);

    const [status, setstatus] = useState('');

    useEffect(() => {
        if (orderId) {
            dispatch(getOrder(orderId));
        }

    }, [dispatch, orderId]);

    useEffect(() => {

        if (orderDetails) {

            if (orderDetails.orderStatus === 'processing') {
                setstatus('Shipped');
            }
            if (orderDetails.orderStatus === 'Shipped') {
                setstatus('Delivered')
            }
        }
    }, [orderDetails])

    const changehandler = async () => {

        updateBtn.current.disabled=true;

        try {

            const { data } = await axios.put(`/order/admin/updateOrderStatus/${orderId}`, { status: status }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('status updated');

            toast.success(data.message,{theme:'dark'});

            navigate('/admin/orders');

        }
        catch(error) {

            toast.error('some error occured',{theme:'dark'});

            updateBtn.current.disabled=false;

        }
    }


    const handleChange = (e) => {

        setstatus(e.target.value);
        console.log(e.target.value)
    }

    return (<>
        {(loading) ? (<Loader></Loader>) : (
            <>
                <Header></Header>
                <div className='main-confirm-container main-confirm-order-page-container'>
                    <h2 className='confirm-container-heading' style={{ color: 'white', fontSize: '5.2rem', marginTop: '60px' }}>Order Details</h2>
                    <span style={{ color: 'grey', fontSize: '1.2rem' }}>Id#{orderDetails && orderDetails._id}</span>
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
                                <h2>Order Status</h2>
                                <div className='pricing-details'>
                                    <div className='pricing-category'>
                                        <div className='pricing-label'>Status</div>
                                        <div className='pricing-info payment-id'>{orderDetails && orderDetails.orderStatus}</div>
                                    </div>
                                </div>
                                <div className='pricing-details' style={{ width: '100%', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    <div className='pricing-category' style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <div className='pricing-label' style={{ width: '30%' }}>Update status</div>
                                        <div style={{ width: '70%' }}>
                                            {(orderDetails && orderDetails.orderStatus === "Delivered") ? (
                                                <>
                                                    Order is already delivered
                                                </>
                                            ) : (
                                                <>
                                                    {(orderDetails && orderDetails.orderStatus === 'processing') ? (
                                                        <>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Order status"
                                                                value={status}
                                                                onChange={handleChange}
                                                                sx={{ width: '100px', height: '35px' }}
                                                                color='secondary'
                                                                variant='outlined'
                                                            >
                                                                <MenuItem value={'Shipped'}>Shipped</MenuItem>
                                                                <MenuItem value={'Delivered'}>Delivered</MenuItem>
                                                            </Select>
                                                        </>
                                                    ) : (<div>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={status}
                                                            label="Order status"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={'Delivered'}>Delivered</MenuItem>
                                                        </Select>
                                                    </div>)}
                                                </>
                                            )}

                                        </div>

                                    </div>
                                    <Button ref={updateBtn} sx={{ width: '80%', height: '30px', backgroundColor: 'orangered' }} variant='contained' onClick={() => { changehandler() }}>Update</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </>
        )
        }
    </>
    )
}

export default AdminOrderDetailsPage