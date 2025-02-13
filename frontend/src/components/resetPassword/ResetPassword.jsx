import React, { useEffect, useState } from 'react'
import '../ChangePassword/ChangePassword.css'
import Header from '../layouts/header/header'
import Footer from '../layouts/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearForgotPasswordErrors, forgotPasswordReset, resetPassword } from '../../actions/forgotPasswordActions'
import Loader from '../layouts/loader/loader'

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token}=useParams();

    const { loading, error, message, issetPassword } = useSelector((state) => state.forgotPassword);

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

        if (issetPassword) {

            navigate('/home');

            dispatch(forgotPasswordReset());
        }
    }, [error, message, navigate, dispatch, issetPassword])
    const [forgotPasswordData, setforgotPasswordData] = useState({});

    const passwordhandler = (e) => {

        setforgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });

    }
    const submitformhandler = () => {

        dispatch(resetPassword(token,forgotPasswordData));
    }

    return (
        <div>
            {(!loading) ? (
                <div>
                    <Header></Header>
                    <div className='change-password-container' style={{marginTop:'180px',marginBottom:'100px'}}>
                        <div className="change-password-form">
                            <div className="title">Hey User</div>
                            <div className="subtitle">Reset your Password!!</div>
                            <div className="input-container ic2">
                                <input className="input new-password" name='newPassword' onChange={passwordhandler} type="password" placeholder=" " />
                                <div className="cut"></div>
                                <label for="New password" className="placeholder">New password</label>
                            </div>
                            <div className="input-container ic2">
                                <input className="input old-password" name='confirmPassword' onChange={passwordhandler} type="password" placeholder=" " />
                                <div className="cut"></div>
                                <label for="confirm Password" className="placeholder">Confirm Password</label>
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

export default ResetPassword