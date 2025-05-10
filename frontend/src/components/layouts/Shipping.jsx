import React, { useState } from 'react';
import CheckOutStatus from './CheckOutStatus';
import { useDispatch } from 'react-redux';
import { addshippinginfo } from '../../actions/cartActions';
import { useNavigate } from 'react-router-dom';

const states = [
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Delhi',
  'West Bengal',
];

const cityData = {
  Maharashtra: [
    { name: 'Mumbai', pincode: '400001' },
    { name: 'Pune', pincode: '411001' },
  ],
  Karnataka: [
    { name: 'Bengaluru', pincode: '560001' },
    { name: 'Mysore', pincode: '570001' },
  ],
  'Tamil Nadu': [
    { name: 'Chennai', pincode: '600001' },
    { name: 'Coimbatore', pincode: '641001' },
  ],
  Delhi: [
    { name: 'New Delhi', pincode: '110001' },
    { name: 'North Delhi', pincode: '110007' },
  ],
  'West Bengal': [
    { name: 'Kolkata', pincode: '700001' },
    { name: 'Darjeeling', pincode: '734101' },
  ],
};

const Shipping = () => {
  const [shippingData, setShippingData] = useState({
    phoneNumber: '',
    address: '',
    country: 'India',
    state: '',
    city: '',
    pincode: '',
  });
  const [phoneError, setPhoneError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));

    if (name === 'phoneNumber') {
      if (!/^[0-9]*$/.test(value) || value.length !== 10) {
        setPhoneError('Phone number must be 10 digits');
      } else {
        setPhoneError('');
      }
    }

    if (name === 'state') {
      setShippingData((prev) => ({ ...prev, city: '', pincode: '' }));
    }
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    const stateCities = cityData[shippingData.state] || [];
    const cityObj = stateCities.find((c) => c.name === cityName);

    setShippingData((prev) => ({
      ...prev,
      city: cityName,
      pincode: cityObj ? cityObj.pincode : '',
    }));
  };

  const submitFormHandler = () => {
    if (phoneError || !shippingData.phoneNumber) return;
    dispatch(addshippinginfo(shippingData));
    navigate('/user/checkout/confirm');
  };

  const fieldStyle = {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
  };

  return (
    <div style={{ padding: '20px'}}>
      <CheckOutStatus value={0} />
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.9rem', textAlign: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px', marginTop:'30px' }}>
          Shipping Details
        </h2>

        {/* Phone Number (text input) */}
        <input
          type="text"
          name="phoneNumber"
          value={shippingData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          style={fieldStyle}
          className="input-field"
        />
        {phoneError && <p style={{ color: 'red', fontSize: '0.9rem' }}>{phoneError}</p>}

        {/* Address (text input) */}
        <input
          type="text"
          name="address"
          value={shippingData.address}
          onChange={handleChange}
          placeholder="Address"
          style={fieldStyle}
          className="input-field"
        />

        {/* Country */}
        <select
          name="country"
          value="India"
          disabled
          style={fieldStyle}
          className="select-field"
        >
          <option value="India">India</option>
        </select>

        {/* State */}
        <select
          name="state"
          value={shippingData.state}
          onChange={handleChange}
          style={fieldStyle}
          className="select-field"
        >
          <option value="">Select State</option>
          {states.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>

        {/* City */}
        <select
          name="city"
          value={shippingData.city}
          onChange={handleCityChange}
          disabled={!shippingData.state}
          style={fieldStyle}
          className="select-field"
        >
          <option value="">Select City</option>
          {(cityData[shippingData.state] || []).map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>

        {/* Pincode */}
        <select
          name="pincode"
          value={shippingData.pincode}
          disabled
          style={fieldStyle}
          className="select-field"
        >
          <option value="">{shippingData.pincode || 'Pincode'}</option>
        </select>

        <button
          onClick={submitFormHandler}
          disabled={!!phoneError || !shippingData.phoneNumber}
          style={buttonStyle}
          className="submit-button"
        >Submit</button>
      </div>
    </div>
  );
};

export default Shipping;