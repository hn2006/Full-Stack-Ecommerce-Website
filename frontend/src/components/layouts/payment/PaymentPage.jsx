import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CheckOutStatus from "../CheckOutStatus";
import { clearErrors, createOrder } from "../../../actions/orderActions";
import { Typography, Box, Card, Divider, useTheme } from "@mui/material";
import { removeallitemsFromCart } from "../../../actions/cartActions";

const Payment = () => {
  const theme = useTheme();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const updatedOrderItems = [...cartItems].map((data) => ({
    product: data.id,
    name: data.name,
    price: data.price,
    quantity: data.quantity,
  }));

  const order = {
    shippingInfo,
    orderItems: updatedOrderItems,
    itemsPrice: orderInfo.subtotal,
    itemTaxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    TotalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "/payment/createPaymentIntent",
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: { city: shippingInfo.city },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        setIsProcessing(false);
        toast.error(result.error.message, { theme: "dark" });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          dispatch(removeallitemsFromCart());
          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment", {
            theme: "dark",
          });
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      setIsProcessing(false);
      toast.error(error.response?.data?.message || "Payment failed", {
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <CheckOutStatus value={2} />

      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: { xs: "15px", md: "30px" },
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: 700,
            color: 'blue',
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          Secure Payment Gateway
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <Card
            sx={{
              flex: 1,
              p: { xs: 2, md: 4 },
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 600,
                fontSize: "2.5rem",
                color: theme.palette.text.primary,
              }}
            >
              Payment Details
            </Typography>

            <form className="paymentForm" onSubmit={submitHandler}>
              {/* Card Info */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 2,
                    fontWeight: 500,
                    fontSize: "1.5rem",
                    color: theme.palette.text.primary,
                  }}
                >
                  Card Information
                </Typography>
                <Box className="inputWrapper">
                  <CreditCardIcon className="inputIcon" />
                  <CardNumberElement
                    options={{
                      style: {
                        base: {
                          fontSize: "18px",
                          fontFamily: "Roboto, sans-serif",
                        },
                        invalid: { color: "#e53935" },
                      },
                    }}
                    className="paymentInput"
                  />
                </Box>
              </Box>

              {/* Expiry & CVC */}
              <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 2, fontWeight: 500,fontSize: "1.5rem", }}
                  >
                    Expiry Date
                  </Typography>
                  <Box className="inputWrapper">
                    <EventIcon className="inputIcon" />
                    <CardExpiryElement
                      options={{
                        style: {
                          base: { fontSize: "18px", fontFamily: "Roboto" },
                          invalid: { color: "#e53935" },
                        },
                      }}
                      className="paymentInput"
                    />
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 2, fontWeight: 500, fontSize: "1.5rem", }}
                  >
                    CVC
                  </Typography>
                  <Box className="inputWrapper">
                    <VpnKeyIcon className="inputIcon" />
                    <CardCvcElement
                      options={{
                        style: {
                          base: { fontSize: "18px", fontFamily: "Roboto" },
                          invalid: { color: "#e53935" },
                        },
                      }}
                      className="paymentInput"
                    />
                  </Box>
                </Box>
              </Box>

              <button
                type="submit"
                ref={payBtn}
                className="paymentFormBtn"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner"></span>
                    Processing Payment...
                  </>
                ) : (
                  `Pay ₹${orderInfo && orderInfo.totalPrice}`
                )}
              </button>

              <Box className="paymentMethodsWrapper">
                <img
                  src="https://miro.medium.com/v2/resize:fit:558/1*GuiDwdGSIGeT1fxj4-zDOQ.png"
                  alt="Accepted payment methods"
                  className="paymentMethods"
                />
              </Box>
            </form>
          </Card>

          {/* Order Summary */}
          <Card
            sx={{
              width: { xs: "100%", md: "400px" },
              p: { xs: 3, md: 4 },
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.05)",
              backgroundColor: "#fafafa",
            }}
          >
            {/* Main Heading */}
            <Typography
              variant="h4"
              sx={{ 
                mb: 4, 
                fontWeight: 800, 
                fontSize: { xs: "2rem", md: "2.5rem" },
                lineHeight: 1.2
              }}
            >
              Order Summary
            </Typography>

            {/* Shipping Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  fontSize: { xs: "1.5rem", md: "1.6rem" }
                }}
              >
                Shipping to:
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  lineHeight: 1.6, 
                  fontSize: { xs: "1.2rem", md: "1.3rem" },
                  fontWeight: 400
                }}
              >
                {shippingInfo.address},<br />
                {shippingInfo.city}, {shippingInfo.state}<br />
                {shippingInfo.pinCode}<br />
                {shippingInfo.country}
              </Typography>
            </Box>

            <Divider sx={{ 
              my: 4, 
              borderColor: 'rgba(0,0,0,0.1)',
              borderWidth: '2px'
            }} />

            {/* Items Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ 
                  fontWeight: 700, 
                  mb: 3,
                  fontSize: { xs: "1.5rem", md: "1.6rem" }
                }}
              >
                Your Items:
              </Typography>
              {cartItems.map((item) => (
                <Box
                  key={item.product}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                    alignItems: "center",
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: "1.2rem", md: "1.3rem" }
                    }}
                  >
                    {item.name} × {item.quantity}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: "1.2rem", md: "1.3rem" }
                    }}
                  >
                    ₹{item.price * item.quantity}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ 
              my: 4, 
              borderColor: 'rgba(0,0,0,0.1)',
              borderWidth: '2px'
            }} />

            {/* Totals Section */}
            {[
              { label: "Subtotal", value: orderInfo.subtotal },
              { label: "Shipping", value: orderInfo.shippingCharges },
              { label: "Tax", value: orderInfo.tax },
            ].map((row) => (
              <Box
                key={row.label}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2.5,
                }}
              >
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: "1.2rem", md: "1.3rem" },
                    fontWeight: 500
                  }}
                >
                  {row.label}:
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: "1.2rem", md: "1.3rem" },
                    fontWeight: 500
                  }}
                >
                  ₹{row.value}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ 
              my: 4, 
              borderColor: 'rgba(0,0,0,0.1)',
              borderWidth: '2px'
            }} />

            {/* Grand Total */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: "1.6rem", md: "1.8rem" }
                }}
              >
                Total:
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: "1.6rem", md: "1.8rem" }
                }}
              >
                ₹{orderInfo.totalPrice}
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Payment;
