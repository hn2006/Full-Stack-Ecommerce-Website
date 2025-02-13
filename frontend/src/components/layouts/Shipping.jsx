import React, { useState } from 'react'
import '../CheckOutPage/checkout.css'
import CheckOutStatus from './CheckOutStatus'
import { useDispatch } from 'react-redux';
import { addshippinginfo } from '../../actions/cartActions';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {


    const [shippingData, setShippingData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const passwordhandler = (e) => {

        setShippingData({ ...shippingData, [e.target.name]: e.target.value });

    }
    const submitformhandler = () => {
        dispatch(addshippinginfo(shippingData));
        navigate('/user/checkout/confirm')

    }
    return (<div>

        <CheckOutStatus value={0}></CheckOutStatus>
        <div className='change-password-container'>
            <div className="checkout-form">
                <h2 style={{ fontSize: '1.9rem', textAlign: 'center', borderBottom: '2px solid white', paddingBottom: '10px' }}>Shipping Details</h2>
                <div className="input-container ic2">
                    <input className="input" name='phoneNumber' onChange={passwordhandler} type='text' placeholder=" " />
                    <div className="cut"></div>
                    <label htmlFor="Phone Number" className="placeholder" style={{ fontSize: '1.1rem' }}>Phone Number</label>
                </div>
                <div className="input-container ic2">
                    <input className="input Address" name='address' onChange={passwordhandler} type="text" placeholder=" " />
                    <div className="cut"></div>
                    <label htmlFor="address" className="placeholder">Address</label>
                </div>
                <div className='checkout-divider'>
                    <div className="input-container ic2">
                        <input className="input Address" name='city' onChange={passwordhandler} type="text" placeholder=" " />
                        <div className="cut"></div>
                        <label htmlFor="city" className="placeholder">City</label>
                    </div>
                    <div className="input-container ic2">
                        <input className="input Address" name='pincode' onChange={passwordhandler} type="text" placeholder=" " />
                        <div className="cut"></div>
                        <label htmlFor="pincode" className="placeholder">Pincode</label>
                    </div>
                </div>
                <div className='checkout-divider'>
                    <div className="input-container ic2">
                        <input className="input Address" name='state' onChange={passwordhandler} type="text" placeholder=" " />
                        <div className="cut"></div>
                        <label htmlFor="state" className="placeholder">State</label>
                    </div>
                    <div className="input-container ic2">
                        <input className="input Address" name='country' onChange={passwordhandler} type="text" placeholder=" " />
                        <div className="cut"></div>
                        <label htmlFor="country" className="placeholder">Country</label>
                    </div>
                </div>
                <button style={{ marginTop: '20px' }} type="text" onClick={submitformhandler} className="submit">submit</button>
            </div>
        </div>
    </div>
    )
}

export default Shipping