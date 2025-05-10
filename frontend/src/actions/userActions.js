import axios from 'axios';

import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, USER_REQUEST, USER_SUCCESS, USER_FAIL, CLEAR_USER_ERRORS, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, ADMIN_USERS_REQUEST, ADMIN_USERS_SUCCESS, ADMIN_USERS_FAIL } from '../constants/userConstants'
import { ADMIN_ORDERS_FAIL, ADMIN_ORDERS_REQUEST, ADMIN_ORDERS_SUCCESS, USER_ORDERS_FAIL, USER_ORDERS_REQUEST, USER_ORDERS_SUCCESS } from '../constants/userOrdersConstants';

export const registerUser = (userData) => async (dispatch) => {

    try {

        dispatch({

            type: REGISTER_USER_REQUEST
        })

        const { data } = await axios.post('/user/register', userData, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        localStorage.setItem('token', data.token);

        dispatch({

            type: REGISTER_USER_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: REGISTER_USER_FAIL,
            payload: error.response.data.error.message

        })
    }
}

export const login = (userData) => async (dispatch) => {
    
    try {

      dispatch({ type: USER_REQUEST });

      const { data } = await axios.post('/user/login', userData, {
        headers: { 'Content-Type': 'application/json' },
      });

      localStorage.setItem('token', data.token);

      dispatch({ type: USER_SUCCESS, payload: data.user });

    } catch (err) {

      dispatch({
        type: USER_FAIL,
        payload: err.response?.data?.error?.message || err.message,
      });

    }

  };


export const loaduser = () => async (dispatch) => {

    try {

        dispatch({

            type: LOAD_USER_REQUEST
        })

        const { data } = await axios.get('/user/profile');

        dispatch({

            type: LOAD_USER_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: LOAD_USER_FAIL,
            payload: error.response.data.error.message

        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
      await axios.get('/user/logout');
      localStorage.removeItem('token');
      dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch {
      dispatch({ type: LOGOUT_USER_FAIL, payload: 'Logout failed' });
    }
};

export const updateUser=(userdata) => async (dispatch) => {

    try {
        dispatch({

            type:UPDATE_USER_REQUEST
        })

        const {data}=await axios.put('/user/profile',userdata);

        dispatch({

            type: UPDATE_USER_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: UPDATE_USER_FAIL,
            payload: error.response.data.error.message

        })
    }
}
export const changepassword = (userData) => async (dispatch) => {

    try {

        dispatch({

            type: CHANGE_PASSWORD_REQUEST
        })

        const { data } = await axios.put('/user/changePassword', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({

            type: CHANGE_PASSWORD_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: CHANGE_PASSWORD_FAIL,
            payload: error.response.data.error.message

        })
    }
}
export const clearUserErrors = () => async (dispatch) => {


    dispatch({

        type: CLEAR_USER_ERRORS
    })

}

export const getuserorders= (userID) => async (dispatch) => {

    try {

        dispatch({

            type: USER_ORDERS_REQUEST
        })

        const { data } = await axios.get(`/order/${userID}`);

        dispatch({

            type: USER_ORDERS_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: USER_ORDERS_FAIL,
            payload: error.response.data.error.message

        })
    }
}

export const getadminUsers= () => async (dispatch) => {

    try {

        dispatch({

            type: ADMIN_USERS_REQUEST
        })

        const { data } = await axios.get(`/user/admin/getUsers`);

        dispatch({

            type: ADMIN_USERS_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: ADMIN_USERS_FAIL,
            payload: error.response.data.error.message

        })
    }
}


export const getAdminorders= () => async (dispatch) => {

    try {

        dispatch({

            type: ADMIN_ORDERS_REQUEST
        })

        const { data } = await axios.get(`/order/admin/getOrders`);

        dispatch({

            type: ADMIN_ORDERS_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: ADMIN_ORDERS_FAIL,
            payload: error.response.data.error.message

        })
    }
}