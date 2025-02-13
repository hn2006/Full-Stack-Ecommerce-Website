import axios from 'axios';
import { CLEAR_FORGOT_PASSWORD_ERRORS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_RESET_STATE, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from '../constants/forgotPasswordConstants';

export const forgotPassword = (userData) => async (dispatch) => {

    try {

        dispatch({

            type: FORGOT_PASSWORD_REQUEST
        })

        const {data}=await axios.post('/user/forgotPassword', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({

            type:FORGOT_PASSWORD_SUCCESS,
            payload:data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.error.message

        })
    }
}

export const resetPassword = (token,userData) => async (dispatch) => {

    try {

        dispatch({

            type: RESET_PASSWORD_REQUEST
        })

        const {data}=await axios.post(`/user/resetPassword/${token}`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({

            type:RESET_PASSWORD_SUCCESS,
            payload:data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.error.message

        })
    }
}


export const clearForgotPasswordErrors = () => async (dispatch) => {


    dispatch({

        type: CLEAR_FORGOT_PASSWORD_ERRORS
    })

}
export const forgotPasswordReset = () => async (dispatch) => {


    dispatch({

        type: FORGOT_PASSWORD_RESET_STATE
    })

}