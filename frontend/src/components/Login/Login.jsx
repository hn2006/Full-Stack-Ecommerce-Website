import React, { useEffect, useState } from 'react'
import './Login.css'
import Header from '../layouts/header/header';
import Footer from '../layouts/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserErrors, login, registerUser} from '../../actions/userActions';
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../layouts/loader/loader';




const Login = () => {

    const [register, setregister] = useState(false);
    const [loginData, setLoginData] = useState({});
    const [registerData, setRegisterData] = useState({});
    const [avatarPreview, setAvatarPreview] = useState();
    const [avatar, setAvatar] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isauthenticated, loading } = useSelector((state) => state.user);

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

        if (isauthenticated) {

            navigate('/account');

        }
    }, [isauthenticated, navigate, dispatch, error]);
    const setregisterHandlertrue = () => {

        setregister(true);
    }
    const setregisterHandlerfalse = () => {

        setregister(false);
    }

    const loginDataHandler = (event) => {

        setLoginData({ ...loginData, [event.target.name]: event.target.value });
        console.log(loginData);

    }
    const loginhandler = (e) => {


        e.preventDefault();
        dispatch(login(loginData));


    }
    const registerUserHandler = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.set("name", registerData.name);
        formData.set("email", registerData.email);
        formData.set("password", registerData.password);
        formData.set("avatar", avatar);

        dispatch(registerUser(formData));
    }
    const registerUserhandler = (e) => {

        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {

                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                    console.log(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);


        }
        else {

            setRegisterData({ ...registerData, [e.target.name]: e.target.value });
        }
    }


    return (
        <>

            {(!loading) ? (
                <>
                    <Header></Header>

                    <div className="container">
                        <div className="screen">

                            <div className="screen__content">
                                <div className='authentication-page-options'>
                                    <div className={(!register) ? 'active' : ''} onClick={setregisterHandlerfalse}>Login</div>
                                    <div className={(register) ? 'active' : ''} onClick={setregisterHandlertrue}>Register</div>
                                </div>
                                {(!register) ? (

                                    <div>
                                        <form className="login" onSubmit={loginhandler}>
                                            <div className="login__field">
                                                <i className="login__icon fas fa-user"></i>
                                                <input type="email" className="login__input" name='email' placeholder="Email" onChange={loginDataHandler} />
                                            </div>
                                            <div className="login__field">
                                                <i className="login__icon fas fa-lock"></i>
                                                <input type="password" className="login__input" name='password' placeholder="Password" onChange={loginDataHandler} />
                                            </div>
                                            <button className="button login__submit">
                                                <span className="button__text">Log In Now</span>
                                                <i className="button__icon fas fa-chevron-right"></i>
                                            </button>
                                        </form>
                                        <Link to={'/forgotPassword'}><div className='forgot-password'>forgot password?</div></Link>
                                    </div>
                                ) : (
                                    <form className="login" onSubmit={registerUserHandler}>
                                        <div className="login__field">
                                            <input type="text" name='name' className="login__input" placeholder="User name" onChange={registerUserhandler} />
                                        </div>
                                        <div className="login__field">
                                            <input type="email" name='email' className="login__input" placeholder="Email" onChange={registerUserhandler} />
                                        </div>
                                        <div className="login__field">
                                            <input type="password" name='password' className="login__input" placeholder="Password" onChange={registerUserhandler} />
                                        </div>
                                        <div className="login__field avatar-field">
                                            <Avatar alt='avatar' src={avatarPreview}></Avatar>
                                            <input type="file" name='avatar' accept='image/*' className="login__input" placeholder="File" onChange={registerUserhandler} />
                                        </div>

                                        <button className="button login__submit">
                                            <span className="button__text">Register</span>
                                            <i className="button__icon fas fa-chevron-right"></i>
                                        </button>
                                    </form>
                                )}
                            </div>
                            <div className="screen__background">
                                <span className="screen__background__shape screen__background__shape4"></span>
                                <span className="screen__background__shape screen__background__shape3"></span>
                                <span className="screen__background__shape screen__background__shape2"></span>
                                <span className="screen__background__shape screen__background__shape1"></span>
                            </div>
                        </div>
                    </div>

                    <Footer></Footer>
                </>
            ) : (<Loader></Loader>)}

        </>
    )
}

export default Login