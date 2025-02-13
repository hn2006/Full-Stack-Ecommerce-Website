import React, { useEffect, useState } from 'react'
import '../ChangePassword/ChangePassword.css'
import Header from '../layouts/header/header'
import Footer from '../layouts/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearForgotPasswordErrors, forgotPassword, forgotPasswordReset } from '../../actions/forgotPasswordActions'
import Loader from '../layouts/loader/loader'

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, message, isEmailSent } = useSelector((state) => state.forgotPassword);

    useEffect(() => {

        if (error) {

            toast.error(error, {

                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            dispatch(clearForgotPasswordErrors());
        }

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

            dispatch(clearForgotPasswordErrors());
        }

        if (isEmailSent) {

            navigate('/home');

            dispatch(forgotPasswordReset());
        }
    }, [error, message, navigate, dispatch,isEmailSent])
    const [forgotPasswordData, setforgotPasswordData] = useState({});

    const passwordhandler = (e) => {

        setforgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });

    }
    const submitformhandler = () => {

        dispatch(forgotPassword(forgotPasswordData));
    }

    return (
        <div>
            {(!loading) ? (
                <div>
                    <Header></Header>
                    <div className='change-password-container' style={{marginTop:'180px',marginBottom:'100px'}}>
                        <div className="change-password-form">
                            <div className="title">Welcome</div>
                            <div className="subtitle">Enter email for reset password here!!</div>
                            <div className="input-container ic1">
                                <input className="input email" name='email' onChange={passwordhandler} type="email" placeholder=" " />
                                <div className="cut"></div>
                                <label htmlFor="Old password" className="placeholder">Email</label>
                            </div>
                            <button type="text" onClick={submitformhandler} className="submit">submit</button>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            ) : (<Loader></Loader>)}
        </div>
    )
}

export default ForgotPassword