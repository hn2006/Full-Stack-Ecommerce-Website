import React, { useEffect } from 'react'
import Header from '../layouts/header/header'
import Footer from '../layouts/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserErrors, updateUser } from '../../actions/userActions'
import { toast } from 'react-toastify'
import './Accountpage.css'
import Button from '@mui/material/Button';
import { useState } from 'react'
import Loader from '../layouts/loader/loader'
import { Link } from 'react-router-dom'


const AccountPage = () => {

    const dispatch = useDispatch();
    const { message, error, user, loading } = useSelector((state) => state.user);
    const [updateflag, setupdateflag] = useState(false);
    const [updatedata, setupdatedata] = useState({});

    const updatehandler = (e) => {

        setupdatedata({ ...updatedata, [e.target.name]: e.target.value });

        console.log(updatedata);


    }

    const updateFinalData = () => {

        dispatch(updateUser(updatedata));

        setupdateflag(false);


    }
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

            dispatch(clearUserErrors());
        }

    }, [dispatch, error, message])

    return (
        <div>

            {(loading&&!loading) ? (<div>
                <Header></Header>

                <div className='profile-container'>
                    <div className='profile-container-image'>
                        <img src={(user.avatar)?user.avatar.url:'/images/second.jpg'} alt='could not load'></img>
                    </div>
                    <div className='profile-container-details'>
                        <div className='profile-page-name-email'>
                            <div className='profile-page-input-containers'>
                                <div className='profile-page-input-labels'>Name</div>
                                <input type='text' name='name' onChange={updatehandler} defaultValue={(updateflag) ? updatedata.name : user.name} ></input>
                            </div>
                            <div className='profile-page-input-containers'>
                                <div className='profile-page-input-labels'>Email</div>
                                <input type='email' name='email' onChange={updatehandler} defaultValue={(updateflag) ? updatedata.email : user.email} ></input>
                            </div>
                        </div>
                        {(updateflag) ? (<div className='button-group-profile-page'>
                            <Button onClick={updateFinalData} variant="contained" sx={{ margin: '3px', backgroundColor: 'purple',width:'50%' }} size='large'>Update</Button>
                            <Button variant="contained" sx={{ margin: '3px', backgroundColor: 'purple', width:'50%' }} size='large' onClick={() => { setupdateflag(false) }}>Cancel</Button>
                        </div>) :
                            <div className='button-group-profile-page'>
                                <Button onClick={() => { setupdateflag(true) }} variant="contained" sx={{ margin: '3px', backgroundColor: 'purple' }} size='large'>Update profile</Button>
                                <Link to={'/change-password'}><Button variant="contained" sx={{ margin: '3px', backgroundColor: 'purple' }} size='large'>Change password</Button></Link>
                            </div>}
                    </div>
                </div>
                <Footer></Footer>
            </div>) :
                (<Loader></Loader>)}
        </div>
    )
}

export default AccountPage