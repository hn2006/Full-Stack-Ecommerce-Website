import React from 'react'
import './confirm.css'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import HouseIcon from '@mui/icons-material/House';
import { useSelector } from 'react-redux';
import CheckOutStatus from '../CheckOutStatus';
import { useNavigate } from 'react-router-dom';

const ConfirmPage = () => {
    const { user } = useSelector((state) => state.user);
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const navigate=useNavigate();

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
        navigate('/user/checkout/payment');
      };
    return (<>
        <CheckOutStatus value={1}></CheckOutStatus>
        <div className='main-confirm-container'>
            <h2 className='confirm-container-heading'>Verify Order</h2>
            <div className='confirm-container'>
                <div className='confirm-left-div'>
                    <div className='order-details-user'>
                        <div className='details-box'>
                            <h2>Customer details</h2>
                            <span><PermContactCalendarIcon sx={{ position: 'absolute', right: '10px', top: '30px', fontSize: '6rem', color: 'orangered' }}></PermContactCalendarIcon></span>
                            <div className='details'>
                                <table cellSpacing={9} style={{ marginTop: '20px' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '40px' }}>Name:</td><td style={{ color: 'grey', fontWeight: '700' }}>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <td >Email:</td><td style={{ color: 'grey', fontWeight: '700' }}>{user.email}</td>
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
                                <div>{shippingInfo.address}</div>
                                <div>{`${shippingInfo.city},${shippingInfo.state}-${shippingInfo.pincode},${shippingInfo.country}`}</div>
                                <div>{shippingInfo.country}</div>
                            </div>

                        </div>
                    </div>
                    <div className='order-items-container'>

                        <h2 className='order-details-heading'>Order Details</h2>
                        {cartItems && cartItems.map((data) => {
                            return (
                                <div className='single-order-items-container' key={data.id}>
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
                    <h2 style={{color:'orangered'}}>Order Summary</h2>
                    <div className='pricing-details'>
                        <div className='pricing-category'>
                            <div className='pricing-label larger-label'>Order Price</div>
                            <div className='pricing-info larger-pricing'>Rs {subtotal}</div>
                        </div>
                    </div>
                    <div className='pricing-details'>
                        <div className='pricing-category'>
                            <div className='pricing-label'>18% GST</div>
                            <div className='pricing-info'>Rs {tax}</div>
                        </div>
                    </div>
                    <div className='pricing-details'>
                        <div className='pricing-category'>
                            <div className='pricing-label'>Shipping Charges*</div>
                            <div className='pricing-info'>{shippingCharges}</div>
                        </div>
                    </div>

                    <div className='pricing-details' style={{ marginTop: '10px', borderTop: '3px solid black', fontSize: '1.8rem', paddingTop: '10px' }}>
                        <div className='pricing-category'>
                            <div className='pricing-label larger-label'>Total Price</div>
                            <div className='pricing-info larger-pricing'>Rs {totalPrice}</div>
                        </div>
                    </div>

                    <button className="order-summary-submit-button" onClick={proceedToPayment}>Proceed to Payment</button>
                    <div style={{ textAlign: 'right', color: 'grey', marginTop: '10px' }}>*shipping charges are not applicable on orders above rs 1000</div>
                </div>
            </div>
        </div>

    </>
    )
}

export default ConfirmPage