import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./orderSuccess.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/home">Return to Home</Link>
    </div>
  );
};

export default OrderSuccess;