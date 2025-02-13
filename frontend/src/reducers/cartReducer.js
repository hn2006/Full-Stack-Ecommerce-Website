import { ADD_SHIPPING_INFO, ADD_TO_CART_FAIL, ADD_TO_CART_SUCCESS, CLEAR_CART_ERRORS, REMOVE_ALL_ITEMS_FROM_CART, REMOVE_FROM_CART } from '../constants/cartConstants';

const defaultStage = {};

export const cartReducer = (state = defaultStage, actions) => {

    switch (actions.type) {

        case ADD_TO_CART_SUCCESS: {

            const item = state.cartItems.find((data) => (data.id === actions.payload.id));

            console.log(item);

            let cartItem = [];

            if(item){

                cartItem=[...state.cartItems].map((data) => {
                    if (data.id === item.id) {
                        return actions.payload;
                    }
    
                    return data;
                })
            }
            else{

                cartItem=[...state.cartItems,actions.payload]
            }


            console.log(cartItem);

            localStorage.setItem('cartItems',JSON.stringify(cartItem));
            
            return {


                ...state,
                cartItems: cartItem,
                message:actions.message
            }
        }
        case ADD_TO_CART_FAIL: {

            return {

                ...state,
                error: actions.payload
            }
        }

        case REMOVE_ALL_ITEMS_FROM_CART: {

            localStorage.removeItem('cartItems');

            return {

                ...state,
                cartItems:[],
            }
        }

        case REMOVE_FROM_CART: {

            let cartItem=[...state.cartItems].filter((item)=>(item.id!==actions.payload));

            localStorage.setItem('cartItems',JSON.stringify(cartItem));

            return {

                ...state,
                cartItems:cartItem,
                message:actions.message
            }
        }

        case ADD_SHIPPING_INFO: {

            return {

                ...state,
                shippingInfo:actions.payload
            }
        }
        case CLEAR_CART_ERRORS: {

            return {

                ...state,
                error: null,
                message: undefined

            }
        }

        default: {

            console.log('default is called')

            return { ...state };
        }
    }


};