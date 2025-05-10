import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions/orderActions';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  Divider, 
  Table, 
  TableBody, 
  TableRow, 
  TableCell,
  CircularProgress
} from '@mui/material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import HouseIcon from '@mui/icons-material/House';
import Header from './header/header';
import Footer from './footer/Footer';

const OrderDetails = () => {
  const { orderDetails, loading } = useSelector((state) => state.orderDetails);
  const { orderId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderId) dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress size={80} />
    </Box>
  );

  return (
    <>
      <Header />
      <Box sx={{
        maxWidth: '1200px',
        margin: '40px auto 0',
        padding: { xs: '20px', md: '30px' },
        marginTop:'110px',
        marginBottom:'50px'
      }}>
        <Typography sx={{
          textAlign: 'center',
          color: '#1976d2',
          fontSize: '48px',
          fontWeight: 600,
          marginBottom: '24px'
        }}>
          Order Details
        </Typography>
        <Typography component="span" sx={{
          display: 'block',
          color: '#757575',
          fontSize: '18px',
          marginTop: '12px',
          textAlign: 'center'
        }}>
          ID#{orderDetails?._id}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '30px', marginTop: '30px' }}>
          {/* Left Section */}
          <Box sx={{ flex: 2 }}>
            {/* Customer & Shipping Info */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '20px', marginBottom: '30px' }}>
              {/* Customer Card */}
              <Card sx={{ flex: 1, padding: '24px', borderRadius: '12px', borderLeft: '4px solid #1976d2' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <PermContactCalendarIcon sx={{ color: '#1976d2', fontSize: '40px', marginRight: '15px' }} />
                  <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Customer Details</Typography>
                </Box>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px', fontWeight: 500 }}>Name:</TableCell>
                      <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px' }}>{orderDetails?.user?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px', fontWeight: 500 }}>Email:</TableCell>
                      <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px' }}>{orderDetails?.user?.email}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>

              {/* Shipping Card */}
              <Card sx={{ flex: 1, padding: '24px', borderRadius: '12px', borderLeft: '4px solid #4caf50' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <HouseIcon sx={{ color: '#4caf50', fontSize: '40px', marginRight: '15px' }} />
                  <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Shipping Details</Typography>
                </Box>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px', fontWeight: 500 }}>Address:</TableCell>
                      <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px' }}>{orderDetails?.shippingInfo?.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px', fontWeight: 500 }}>City/State:</TableCell>
                      <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px' }}>
                        {`${orderDetails?.shippingInfo?.city}, ${orderDetails?.shippingInfo?.state}`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px', fontWeight: 500 }}>Postal Code:</TableCell>
                      <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px' }}>{orderDetails?.shippingInfo?.pincode}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px', fontWeight: 500 }}>Country:</TableCell>
                      <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px' }}>{orderDetails?.shippingInfo?.country}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </Box>

            {/* Order Items */}
            <Card sx={{ padding: '24px', borderRadius: '12px' }}>
              <Typography sx={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e0e0e0' }}>
                Order Items
              </Typography>
              {orderDetails?.orderItems?.map((item) => (
                <Card key={item._id} sx={{ display: 'flex', padding: '16px', marginBottom: '16px', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
                  <Box sx={{ width: '80px', height: '80px', marginRight: '20px' }}>
                    <img
                      src={item.image || '/images/second.jpg'}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>{item.name}</Typography>
                    <Typography sx={{ fontSize: '16px' }}>Quantity: {item.quantity}</Typography>
                    <Typography sx={{ fontSize: '16px' }}>Price: ₹{item.price}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>₹{item.price} × {item.quantity}</Typography>
                    <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#d32f2f' }}>₹{item.price * item.quantity}</Typography>
                  </Box>
                </Card>
              ))}
            </Card>
          </Box>

          {/* Right Section - Order Summary */}
          <Box sx={{ width: { xs: '100%', md: '350px' } }}>
            <Card sx={{ padding: '24px', borderRadius: '12px' }}>
              <Typography sx={{ fontSize: '24px', fontWeight: 600, color: '#1976d2', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e0e0e0' }}>
                Order Summary
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px' }}>Order Price:</TableCell>
                    <TableCell sx={{ border: 'none', padding: '8px 0', textAlign: 'right', fontSize: '16px' }}>₹{orderDetails?.itemsPrice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px' }}>18% GST:</TableCell>
                    <TableCell sx={{ border: 'none', padding: '8px 0', textAlign: 'right', fontSize: '16px' }}>₹{orderDetails?.itemTaxPrice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px' }}>Shipping:</TableCell>
                    <TableCell sx={{ border: 'none', padding: '8px 0', textAlign: 'right', fontSize: '16px' }}>{orderDetails?.shippingPrice === 0 ? 'FREE' : `₹${orderDetails?.shippingPrice}`}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Divider sx={{ margin: '15px 0' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>Total Price:</Typography>
                <Typography sx={{ fontSize: '20px', fontWeight: 600, color: '#d32f2f' }}>₹{orderDetails?.TotalPrice}</Typography>
              </Box>
              <Typography sx={{ display: 'block', textAlign: 'right', marginTop: '12px', fontSize: '14px', color: '#757575' }}>*Free shipping on orders above ₹1000</Typography>
            </Card>

            {/* Payment Details */}
            <Card sx={{ padding: '24px', borderRadius: '12px', marginTop: '20px' }}>
              <Typography sx={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #e0e0e0' }}>Payment Details</Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px' }}>Payment ID:</TableCell>
                    <TableCell sx={{ border: 'none', padding: '8px 0', textAlign: 'right', fontSize: '16px', wordBreak: 'break-word' }}>
                      {orderDetails?.paymentInfo?.id || 'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', padding: '8px 0', fontSize: '16px' }}>Status:</TableCell>
                    <TableCell sx={{ border: 'none', padding: '8px 0', textAlign: 'right', fontSize: '16px', color: orderDetails?.paymentInfo?.status === 'succeeded' ? '#4caf50' : '#f44336', fontWeight: 500 }}>
                      {orderDetails?.paymentInfo?.status?.toUpperCase() || 'N/A'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default OrderDetails;