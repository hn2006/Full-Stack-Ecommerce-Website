import React, { useEffect } from 'react'
import './userCart.css'
import Header from '../layouts/header/header'
import Footer from '../layouts/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addToCart, clearCartErrors, removeFromCart, removeallitemsFromCart } from '../../actions/cartActions'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link, useNavigate } from 'react-router-dom'

const UserCart = () => {

  const navigate=useNavigate();


  const { cartItems, error, message } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const incrementhandler = (prodId, quantity, stock) => {

    if (quantity < stock) {

      dispatch(addToCart(prodId, quantity + 1));
    }
  }

  const decrementHandler = (prodId, quantity) => {

    if (quantity > 1) {

      dispatch(addToCart(prodId, quantity - 1));
    }
  }

  useEffect(() => {

    if (message) {

      toast.success(message, { theme: 'dark' });
      dispatch(clearCartErrors());
    }
    if (error) {
      toast.error(error);
      dispatch(clearCartErrors(), { theme: 'dark' });
    }
  }, [error, message, dispatch])
  return (
    <>
      <Header></Header>
      <div className='user-cart'>
        {(cartItems && cartItems.length > 0) ? (
          <div className="CartContainer">
            <div className="Header">
              <h3 className="Heading">Shopping Cart</h3>
              <h5 className="Action" onClick={() => {
                dispatch(removeallitemsFromCart())
              }}>Remove all</h5>
            </div>

            <div className='item-container'>
              {
                (cartItems && cartItems.length > 0) ? (
                  cartItems.map((cartItem) => {

                    return <div className="Cart-Items pad" key={cartItem.id}>
                      <div className="image-box">
                        <img src="/images/first.jpg" alt='na' style={{ height: "120px" }} />
                      </div>
                      <div className="about">
                        <h1 className="title">{cartItem.name}</h1>
                        <div className="single-product-price">price :{cartItem.price}</div>
                      </div>
                      <div className="counter">
                        <div className="btn" onClick={() => { incrementhandler(cartItem.id, cartItem.quantity, cartItem.stock) }}>+</div>
                        <div className="count">{cartItem.quantity}</div>
                        <div className="btn" onClick={() => { decrementHandler(cartItem.id, cartItem.quantity) }}>-</div>
                      </div>
                      <div className="prices">
                        <div className="amount">Rs {cartItem.price * cartItem.quantity}</div>
                        <div className="remove" onClick={() => {
                          dispatch(removeFromCart(cartItem.id))
                        }}><u>Remove</u></div>
                      </div>
                    </div>
                  })
                ) : ('')
              }
            </div>
            <hr />
            <div className="checkout">
              <div className="total">
                <div>
                  <div className="Subtotal">Sub-Total</div>
                  <div className="items">{cartItems.length} item</div>
                </div>
                <div className="total-amount">Rs {cartItems.reduce((acc, element) => { return acc + (element.price * element.quantity) }, 0)}</div>
              </div>
              <Link to='/user/checkout/shipping'><button className="button">Checkout</button></Link></div>
          </div>
        ) : (<div className='no-items-in-cart'>
          <RemoveShoppingCartIcon sx={{ fontSize: '8.3rem' }}></RemoveShoppingCartIcon>
          <h2>No items in the cart</h2>
          <button className="button" onClick={()=>{navigate('/home')}}>Back to Home</button>

        </div>)}
      </div>
      <Footer></Footer>
    </>
  )
}

export default UserCart