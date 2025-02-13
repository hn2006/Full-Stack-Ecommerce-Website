import { CLEAR_FORGOT_PASSWORD_ERRORS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_RESET_STATE, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from '../constants/forgotPasswordConstants';

const defaultStage={};

export const forgotPasswordReducer=(state=defaultStage,actions)=>{

    switch(actions.type){

        case FORGOT_PASSWORD_REQUEST:{

            return {
                ...state,
                loading:true,
                
            }
        }
        case FORGOT_PASSWORD_SUCCESS:{

            return {

                ...state,
                loading:false,
                message:'email sent',
                isEmailSent:true,
            }
        }
        case FORGOT_PASSWORD_FAIL:{

            return {
                ...state,
                loading:false,
                error:actions.payload
            }
        }

        case RESET_PASSWORD_REQUEST:{

            return {
                ...state,
                loading:true,
                
            }
        }
        case RESET_PASSWORD_SUCCESS:{

            return {

                ...state,
                loading:false,
                message:'changed password successfully',
                issetPassword:true,
            }
        }
        case RESET_PASSWORD_FAIL:{

            return {
                ...state,
                loading:false,
                error:actions.payload
            }
        }

        case FORGOT_PASSWORD_RESET_STATE:{

            return {

                ...state,
                isEmailSent:undefined,
                issetPassword:undefined,
            }
        }
        case CLEAR_FORGOT_PASSWORD_ERRORS:{

            return{

                ...state,
                message:undefined,
                error:null

            }
        }

        default:{

            console.log('default is called')
            return {...state};
        }
    }


};
