import React, { useState } from 'react'
import './ChangePassword.css'
import Header from '../layouts/header/header'
import Footer from '../layouts/footer/Footer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changepassword } from '../../actions/userActions'

const ChangePassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [changePasswordData, setchangePasswordData] = useState({});

    const passwordhandler = (e) => {

        setchangePasswordData({ ...changePasswordData, [e.target.name]: e.target.value });

    }
    const submitformhandler = () => {

        dispatch(changepassword(changePasswordData));
        navigate('/account', { replace: true });

    }

    return (
        <div>
            <Header></Header>
            <div className='change-password-container' style={{marginTop:'180px',marginBottom:'100px'}}>
                <div className="change-password-form">
                    <div className="title">Welcome</div>
                    <div className="subtitle">Change Password Here!</div>
                    <div className="input-container ic1">
                        <input className="input old-password" name='oldPassword' onChange={passwordhandler} type="password" placeholder=" " />
                        <div className="cut"></div>
                        <label for="Old password" className="placeholder">Old password</label>
                    </div>
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
    )
}

export default ChangePassword