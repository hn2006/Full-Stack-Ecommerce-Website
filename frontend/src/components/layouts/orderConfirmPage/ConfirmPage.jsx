import React from 'react';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import HouseIcon from '@mui/icons-material/House';
import { useSelector } from 'react-redux';
import CheckOutStatus from '../CheckOutStatus';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Divider, 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableRow, 
  TableCell,
  Button
} from '@mui/material';

const ConfirmPage = () => {
  const { user } = useSelector((state) => state.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = parseFloat((subtotal * 0.18).toFixed(2));
  const totalPrice = parseFloat((subtotal + tax + shippingCharges).toFixed(2));

  const proceedToPayment = () => {
    const data = { subtotal, shippingCharges, tax, totalPrice };
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/user/checkout/payment');
  };

  return (
    <>
      <CheckOutStatus value={1} />
      <Box sx={{ padding: '30px' }}>
        <Typography sx={{ fontSize: '36px', fontWeight: 600, textAlign: 'center', color: '#1976d2', marginBottom: '20px' }}>
          Order Confirmation
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Left Section */}
          <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Customer & Shipping Info */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px' }}>
              <Card sx={{ flex: 1, padding: '24px', borderRadius: '12px', borderLeft: '4px solid #1976d2' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <PermContactCalendarIcon sx={{ fontSize: '36px', color: '#1976d2', marginRight: '12px' }} />
                  <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Customer Information</Typography>
                </Box>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: 'none', fontSize: '16px', fontWeight: 500 }}>Name:</TableCell>
                      <TableCell sx={{ border: 'none', fontSize: '16px' }}>{user.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 'none', fontSize: '16px', fontWeight: 500 }}>Email:</TableCell>
                      <TableCell sx={{ border: 'none', fontSize: '16px' }}>{user.email}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>

              <Card sx={{ flex: 1, padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4caf50' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <HouseIcon sx={{ fontSize: '36px', color: '#4caf50', marginRight: '12px' }} />
                  <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Shipping Information</Typography>
                </Box>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: 'none', fontSize: '16px', fontWeight: 500 }}>Address:</TableCell>
                      <TableCell sx={{ border: 'none', fontSize: '16px' }}>{shippingInfo.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 'none', fontSize: '16px', fontWeight: 500 }}>City/State:</TableCell>
                      <TableCell sx={{ border: 'none', fontSize: '16px' }}>{`${shippingInfo.city}, ${shippingInfo.state}`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 'none', fontSize: '16px', fontWeight: 500 }}>Postal Code:</TableCell>
                      <TableCell sx={{ border: 'none', fontSize: '16px' }}>{shippingInfo.pincode}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 'none', fontSize: '16px', fontWeight: 500 }}>Country:</TableCell>
                      <TableCell sx={{ border: 'none', fontSize: '16px' }}>{shippingInfo.country}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </Box>

            {/* Order Items */}
            <Card sx={{ padding: '24px', borderRadius: '12px' }}>
              <Typography sx={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>Your Order Items</Typography>
              {cartItems.map((data) => (
                <Card key={data.id} sx={{ display: 'flex', padding: '16px', marginBottom: '16px', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
                  <Box sx={{ width: '80px', height: '80px', marginRight: '16px' }}>
                    <img src={data.image || '/images/second.jpg'} alt={data.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>{data.name}</Typography>
                    <Typography sx={{ fontSize: '16px', marginTop: '4px' }}>Quantity: {data.quantity}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>₹{data.price * data.quantity}</Typography>
                    <Typography sx={{ fontSize: '14px', color: '#616161' }}>(₹{data.price} × {data.quantity})</Typography>
                  </Box>
                </Card>
              ))}
            </Card>
          </Box>

          {/* Right Section */}
          <Box sx={{ width: { xs: '100%', md: '350px' } }}>
            <Card sx={{ padding: '24px', borderRadius: '12px' }}>
              <Typography sx={{ fontSize: '24px', fontWeight: 600, color: '#1976d2', marginBottom: '16px' }}>Order Summary</Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: 'none', fontSize: '16px' }}>Subtotal:</TableCell>
                    <TableCell sx={{ border: 'none', fontSize: '16px', textAlign: 'right' }}>₹{subtotal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', fontSize: '16px' }}>Tax (18%):</TableCell>
                    <TableCell sx={{ border: 'none', fontSize: '16px', textAlign: 'right' }}>₹{tax}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', fontSize: '16px' }}>Shipping:</TableCell>
                    <TableCell sx={{ border: 'none', fontSize: '16px', textAlign: 'right' }}>{shippingCharges === 0 ? 'FREE' : `₹${shippingCharges}`}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Divider sx={{ margin: '16px 0' }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Total:</Typography>
                <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#d32f2f' }}>₹{totalPrice}</Typography>
              </Box>

              <Button variant="contained" fullWidth sx={{ fontSize: '16px', padding: '12px' }} onClick={proceedToPayment}>
                Proceed to Payment
              </Button>

              <Typography sx={{ fontSize: '14px', color: '#757575', textAlign: 'right', marginTop: '12px' }}>*Free shipping on orders above ₹1000</Typography>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ConfirmPage;