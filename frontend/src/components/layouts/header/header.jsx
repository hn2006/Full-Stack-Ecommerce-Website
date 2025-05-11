import './header.css';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../actions/userActions';

const actions = [
    { icon: <AccountBoxIcon />, name: 'account' },
    { icon: <HomeIcon />, name: 'home' },
    { icon: <DashboardIcon />, name: 'dashboard' },
    { icon: <LocalMallIcon />, name: 'orders' },
    { icon: <LogoutIcon />, name: 'logout' },
];

const Header = () => {
    const { isauthenticated, user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        navigate('/home');
        dispatch(logoutUser());
    };

    const avatarSrc = user?.avatar?.url || '/images/second.jpg';

    return (
        <header className="header">
            <li className='header-logo'>
                <span style={{ position: 'relative' }}>
                    <img
                        style={{ height: '30px', width: '30px', marginRight: '10px', borderRadius: '7px' }}
                        src='/images/new_logo.jpg'
                        alt='logo'
                    />
                </span>
                <span>Blue</span> Mart
            </li>

            <nav className="navbar">
                <Link to="/home"><li className="header-items">Home</li></Link>
                <Link to="/aboutus"><li className="header-items">About us</li></Link>
                <Link to="/products"><li className="header-items">Products</li></Link>
                <Link to="/contactUs"><li className="header-items">Contact us</li></Link>
            </nav>

            <div className='nav-icons'>
                <Link to="/user/cart">
                    <LocalMallIcon
                        fontSize="large"
                        sx={{ cursor: 'pointer', marginRight: '2.2rem', color: 'white', fontSize: '3.2rem' }}
                    />
                </Link>

                {!isauthenticated ? (
                    <Link to="/account">
                        <AccountBoxIcon
                            fontSize="large"
                            sx={{ cursor: 'pointer', fontSize: '3.2rem', color: 'white' }}
                        />
                    </Link>
                ) : (
                    <SpeedDial
                        ariaLabel="User Menu"
                        sx={{ position: 'fixed', top: 16, right: 80, color: 'purple' }}
                        icon={
                            <img
                                height={50}
                                width={50}
                                style={{borderRadius: '50%' }}
                                src={avatarSrc}
                                alt="User avatar"
                            />
                        }
                        direction="down"
                    >
                        {actions.map((action) => {
                            if (action.name === 'logout') {
                                return (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        onClick={logoutHandler}
                                        className="speeddial"
                                    />
                                );
                            } else {
                                const path = action.name === 'orders'
                                    ? `/${action.name}/${user?._id}`
                                    : `/${action.name}`;

                                return (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={<Link to={path}>{action.icon}</Link>}
                                        tooltipTitle={action.name}
                                    />
                                );
                            }
                        })}
                    </SpeedDial>
                )}
            </div>
        </header>
    );
};

export default Header;
