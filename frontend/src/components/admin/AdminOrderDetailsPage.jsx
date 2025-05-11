import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions/orderActions';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
  Box,
  Typography,
  Card,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import HouseIcon from '@mui/icons-material/House';

import Header from '../layouts/header/header';
import Footer from '../layouts/footer/Footer';

const AdminOrderDetailsPage = () => {
  const { orderDetails, loading } = useSelector((state) => state.orderDetails);
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateBtn = useRef(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (orderId) dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (orderDetails) {
      // advance status step
      if (orderDetails.orderStatus === 'processing') setStatus('Shipped');
      else if (orderDetails.orderStatus === 'Shipped') setStatus('Delivered');
    }
  }, [orderDetails]);

  const handleUpdate = async () => {
    updateBtn.current.disabled = true;
    try {
      const { data } = await axios.put(
        `/order/admin/updateOrderStatus/${orderId}`,
        { status },
        { headers: { 'Content-Type': 'application/json' } }
      );
      toast.success(data.message, { theme: 'dark' });
      navigate('/admin/orders');
    } catch {
      toast.error('Some error occurred', { theme: 'dark' });
      updateBtn.current.disabled = false;
    }
  };

  const handleChange = (e) => setStatus(e.target.value);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <>
      <Header />

      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          mt: '110px',
          mb: '50px',
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Title */}
        <Typography
          sx={{
            textAlign: 'center',
            color: '#1976d2',
            fontSize: '48px',
            fontWeight: 600,
            mb: 1,
          }}
        >
          Order Details
        </Typography>
        <Typography
          component="span"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: '#757575',
            fontSize: '18px',
            mb: 3,
          }}
        >
          ID#{orderDetails?._id}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          {/* Left Column */}
          <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Customer & Shipping */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
              }}
            >
              <Card sx={{ flex: 1, p: 3, borderLeft: '4px solid #1976d2' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PermContactCalendarIcon
                    sx={{ color: '#1976d2', fontSize: 40, mr: 1.5 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Customer Details
                  </Typography>
                </Box>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{ border: 'none', p: '8px 0', fontWeight: 500 }}
                      >
                        Name:
                      </TableCell>
                      <TableCell sx={{ border: 'none', p: '8px 0' }}>
                        {orderDetails?.user?.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ border: 'none', p: '8px 0', fontWeight: 500 }}
                      >
                        Email:
                      </TableCell>
                      <TableCell sx={{ border: 'none', p: '8px 0' }}>
                        {orderDetails?.user?.email}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>

              <Card sx={{ flex: 1, p: 3, borderLeft: '4px solid #4caf50' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <HouseIcon sx={{ color: '#4caf50', fontSize: 40, mr: 1.5 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Shipping Details
                  </Typography>
                </Box>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{ border: 'none', p: '8px 0', fontWeight: 500 }}
                      >
                        Address:
                      </TableCell>
                      <TableCell sx={{ border: 'none', p: '8px 0' }}>
                        {orderDetails?.shippingInfo?.address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ border: 'none', p: '8px 0', fontWeight: 500 }}
                      >
                        City/State:
                      </TableCell>
                      <TableCell sx={{ border: 'none', p: '8px 0' }}>
                        {`${orderDetails?.shippingInfo?.city}, ${orderDetails?.shippingInfo?.state}`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ border: 'none', p: '8px 0', fontWeight: 500 }}
                      >
                        Postal Code:
                      </TableCell>
                      <TableCell sx={{ border: 'none', p: '8px 0' }}>
                        {orderDetails?.shippingInfo?.pincode}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ border: 'none', p: '8px 0', fontWeight: 500 }}
                      >
                        Country:
                      </TableCell>
                      <TableCell sx={{ border: 'none', p: '8px 0' }}>
                        {orderDetails?.shippingInfo?.country}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </Box>

            {/* Order Items */}
            <Card sx={{ p: 3, borderRadius: 2 }}>
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 600,
                  mb: 2,
                  pb: 1,
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                Order Items
              </Typography>

              {orderDetails?.orderItems?.map((item) => (
                <Card
                  key={item._id}
                  sx={{
                    display: 'flex',
                    p: 2,
                    mb: 2,
                    borderRadius: 1,
                    bgcolor: '#f5f5f5',
                  }}
                >
                  <Box sx={{ width: 80, height: 80, mr: 2 }}>
                    <img
                      src={item.image || '/images/second.jpg'}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography>Quantity: {item.quantity}</Typography>
                    <Typography>Price: ₹{item.price}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography>₹{item.price} × {item.quantity}</Typography>
                    <Typography sx={{ fontWeight: 600, color: '#d32f2f' }}>
                      ₹{item.price * item.quantity}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Card>
          </Box>

          {/* Right Column */}
          <Box sx={{ width: { xs: '100%', md: 350 }, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Summary */}
            <Card sx={{ p: 3, borderRadius: 2 }}>
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#1976d2',
                  mb: 2,
                  pb: 1,
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                Order Summary
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: 'none', p: '8px 0' }}>
                      Order Price:
                    </TableCell>
                    <TableCell
                      sx={{ border: 'none', p: '8px 0', textAlign: 'right' }}
                    >
                      ₹{orderDetails?.itemsPrice}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', p: '8px 0' }}>
                      18% GST:
                    </TableCell>
                    <TableCell
                      sx={{ border: 'none', p: '8px 0', textAlign: 'right' }}
                    >
                      ₹{orderDetails?.itemTaxPrice}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', p: '8px 0' }}>
                      Shipping:
                    </TableCell>
                    <TableCell
                      sx={{ border: 'none', p: '8px 0', textAlign: 'right' }}
                    >
                      {orderDetails?.shippingPrice === 0
                        ? 'FREE'
                        : `₹${orderDetails?.shippingPrice}`}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                  Total Price:
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 600, color: '#d32f2f' }}>
                  ₹{orderDetails?.TotalPrice}
                </Typography>
              </Box>
              <Typography
                sx={{
                  textAlign: 'right',
                  fontSize: 14,
                  color: '#757575',
                  mt: 1,
                }}
              >
                *Free shipping on orders above ₹1000
              </Typography>
            </Card>

            {/* Update Status */}
            {orderDetails?.orderStatus !== 'Delivered' && (
              <Card sx={{ p: 3, borderRadius: 2 }}>
                <Typography
                  sx={{
                    fontSize: 24,
                    fontWeight: 600,
                    mb: 2,
                    pb: 1,
                    borderBottom: '1px solid #e0e0e0',
                  }}
                >
                  Update Status
                </Typography>
                <Select
                  fullWidth
                  value={status}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                >
                  {orderDetails.orderStatus === 'processing' && (
                    <MenuItem value="Shipped">Shipped</MenuItem>
                  )}
                  <MenuItem value="Delivered">Delivered</MenuItem>
                </Select>
                <Button
                  ref={updateBtn}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Card>
            )}
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default AdminOrderDetailsPage;
