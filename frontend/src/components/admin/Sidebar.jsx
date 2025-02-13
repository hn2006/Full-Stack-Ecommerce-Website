import React from 'react';
// import './dashboard.css';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../actions/userActions';
import { useDispatch } from 'react-redux';

const Sidebar = ({active}) => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    return (
        <div className='dashboard-sidebar-component'>
            <div className='sidebar-header'>
                <div className='Sidebar-heading'><span height='20px' width='20px' style={{position:'relative'}}><img style={{height:'38px',width:'35px',marginRight:'10px',borderRadius:'7px'}} src='/images/new_logo.jpg' alt='logo'></img></span><span>Blue</span> Mart</div>
            </div>
            <div className='sidebar-options'>
                <div className={(active&&active==='dashboard')?`active-link-sidebar`:`sidebar-options-design`}>
                    <div className='sidebar-options-logo'><DashboardIcon sx={{ fontSize: '2.7rem' }}></DashboardIcon></div>
                    <div className='sidebar-options-value'><Link to={'/dashboard'} style={{color:'white'}}>Dashboard</Link></div>
                </div>
                <div className={(active&&active==='users')?`active-link-sidebar`:`sidebar-options-design`}>
                    <div className='sidebar-options-logo'><PersonIcon sx={{ fontSize: '2.7rem' }}></PersonIcon></div>
                    <div className='sidebar-options-value'><Link to={'/admin/users'} style={{color:'white'}}>Users</Link></div>
                </div>
                <div className={(active&&active==='orders')?`active-link-sidebar`:`sidebar-options-design`}>
                    <div className='sidebar-options-logo'><LocalMallIcon sx={{ fontSize: '2.7rem' }}></LocalMallIcon></div>
                    <div className='sidebar-options-value'><Link to={'/admin/orders'} style={{color:'white'}}>Orders</Link></div>
                </div>
                <div className={(active&&active==='products')?`active-link-sidebar`:`sidebar-options-design`}>
                    <div className='sidebar-options-logo'><ClassIcon sx={{ fontSize: '2.7rem' }}></ClassIcon></div>
                    <div className='sidebar-options-value'><Link to={'/admin/products'} style={{color:'white'}}>Product</Link></div>
                </div>
            </div>
            <div className='sidebar-footer'>
                <div className=' sidebar-options-design sidebar-footer-div' style={{cursor:'pointer'}} onClick={()=>{dispatch(logoutUser());navigate('/home')}}>
                    <div className='sidebar-options-logo'><LogoutIcon></LogoutIcon></div>
                    <div className='sidebar-options-value dashboard-logout-options'>Logout</div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar