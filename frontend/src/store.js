import {createStore,combineReducers, applyMiddleware,} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { adminproductReducer, newProductReducer, productReducer } from './reducers/productReducer';
import {dashboardDetailsReducer, productDetailsReducer} from './reducers/productDetailsReducer'
import { adminUsersReducer, userOrdersReducer, userReducer } from './reducers/userReducer';
import { forgotPasswordReducer } from './reducers/forgotPasswordReducer';
import { cartReducer } from './reducers/cartReducer';
import { getOrderDetails, newOrderReducer } from './reducers/orderReducer';

const reducer=combineReducers({

    products:productReducer,
    productsDetails:productDetailsReducer,
    user:userReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder: newOrderReducer,
    orders:userOrdersReducer,
    orderDetails:getOrderDetails,
    users:adminUsersReducer,
    newProduct:newProductReducer,
    dashboardDetails:dashboardDetailsReducer,
    product:adminproductReducer
});

let initialState={

    cart:{

        cartItems:(localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]),
        shippingInfo:(localStorage.getItem('shippingInfo')?(JSON.parse(localStorage.getItem('shippingInfo'))):[])
    }
};

const middleware=[thunk];

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;