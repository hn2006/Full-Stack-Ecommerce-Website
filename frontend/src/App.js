import Login from './components/Login/Login';
import './App.css';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductDetails from './components/SingleProductsPage/ProductDetails';
import ProductsPage from './components/ProductsPage/ProductsPage';
import AccountPage from './components/AccountPage/AccountPage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserErrors, loaduser } from './actions/userActions';
import { toast } from 'react-toastify';
import ProtectedRoute from './components/routes/ProtectedRoute';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ForgotPassword from './components/ForgotPasswordPage/ForgotPassword';
import ResetPassword from './components/resetPassword/ResetPassword';
import UserCart from './components/Cart/UserCart';
import CheckOutPage from './components/CheckOutPage/CheckOutPage';
import Shipping from './components/layouts/Shipping';
import ConfirmPage from './components/layouts/orderConfirmPage/ConfirmPage';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from './components/layouts/payment/PaymentPage';
import OrderSuccess from './components/OrderSuccessPage/OrderSuccess';
import axios from 'axios';
import UsersOrders from './components/userorders/UsersOrders';
import OrderDetails from './components/layouts/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminProducts from './components/admin/AdminProducts';
import AdminProductCreate from './components/admin/AdminProductCreate';
import UpdateProduct from './components/admin/UpdateProduct';
import AdminOrders from './components/admin/AdminOrders';
import AdminOrderDetailsPage from './components/admin/AdminOrderDetailsPage';

function App() {
  axios.defaults.baseURL = 'https://full-stack-ecommerce-website-backend-mnja.onrender.com';
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/payment/getPaymentApiKey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {

    dispatch(loaduser());
    getStripeApiKey();
  }, [dispatch])

  useEffect(() => {

    if (message) {

      toast.success(message, {

        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(clearUserErrors());


    }
  }, [dispatch, message])

  return (
    <div className='main-app-container'>

      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='home' element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='products' element={<ProductsPage></ProductsPage>}></Route>
          <Route path='products/:productId' element={<ProductDetails></ProductDetails>}></Route>
          <Route path='account' element={<ProtectedRoute><AccountPage></AccountPage></ProtectedRoute>}></Route>
          <Route path='change-password' element={<ProtectedRoute><ChangePassword></ChangePassword></ProtectedRoute>}></Route>
          <Route path='user/cart' element={<ProtectedRoute><UserCart></UserCart></ProtectedRoute>}></Route>
          <Route path='forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>
          <Route path='resetpassword/:token' element={<ResetPassword></ResetPassword>}></Route>
          <Route path='user/checkout' element={<CheckOutPage></CheckOutPage>}>
            <Route index='true' path='shipping' element={<Shipping></Shipping>}></Route>
            <Route path='confirm' element={<ConfirmPage></ConfirmPage>}></Route>
            {stripeApiKey && (
              <Route exact path="payment" element={<Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute><Payment></Payment></ProtectedRoute></Elements>} />
            )}
          </Route>
          <Route path='/success' element={<ProtectedRoute><OrderSuccess></OrderSuccess></ProtectedRoute>}></Route>
          <Route path='/orders/:userId' element={<ProtectedRoute><UsersOrders></UsersOrders></ProtectedRoute>}></Route>
          <Route path='/user/order/:orderId' element={<ProtectedRoute><OrderDetails></OrderDetails></ProtectedRoute>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/admin/users' element={<AdminUsers></AdminUsers>}></Route>
          <Route path='/admin/products' element={<AdminProducts></AdminProducts>}></Route>
          <Route path='/admin/createproduct' element={<AdminProductCreate></AdminProductCreate>}></Route>
          <Route path='/admin/updateproduct/:productId' element={<UpdateProduct></UpdateProduct>}></Route>
          <Route path='/admin/orders' element={<AdminOrders></AdminOrders>}></Route>
          <Route path='/Admin/user/order/:orderId' element={<AdminOrderDetailsPage></AdminOrderDetailsPage>}></Route>

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
