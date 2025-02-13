import React, { Fragment, useEffect, useRef } from "react";
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
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CheckOutStatus from "../CheckOutStatus";
import { clearErrors, createOrder } from "../../../actions/orderActions";
import { Typography } from "@mui/material";
import { removeallitemsFromCart } from "../../../actions/cartActions";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate=useNavigate();

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const updatedOrderItems=[...cartItems].map((data)=>{return {product:data.id,name:data.name,price:data.price,quantity:data.quantity}})

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

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
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
            address:{
              city:'random'
            }
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message,{theme:'dark'});
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
          toast.error("There's some issue while processing payment ",{theme:'dark'});
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message,{theme:'dark'});
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error,{theme:'dark'});
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <CheckOutStatus value={2}></CheckOutStatus>
      <h2 style={{fontSize:'2.3rem',marginBottom:'30px',marginTop:'50px',textAlign:'center'}}>Payment</h2>
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;