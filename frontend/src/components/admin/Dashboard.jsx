import React, { useEffect } from 'react'
import './dashboard.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Sidebar from './Sidebar';
import ChartComponent from './ChartComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getdashboardDetails } from '../../actions/productActions';
import { useNavigate } from 'react-router-dom';
import Loader from '../layouts/loader/loader';
import { toast } from 'react-toastify'
import LineChart from './LineChart';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { dashboardData, error, loading } = useSelector((state) => state.dashboardDetails);


    useEffect(() => {

        dispatch(getdashboardDetails());

    }, [dispatch]);

    useEffect(() => {

        if (error) {

            toast.error(error, { theme: 'dark' });

            navigate('/home');
        }
    }, [error, navigate])
    return (
        <>
            {(loading) ? (<Loader></Loader>) : (<div className='dashboard-main-container'>
                <Sidebar active={'dashboard'}></Sidebar>
                <div className='dashboard-container'>
                    <h2 className='dashboard-heading'>Admin Dashboard</h2>
                    <div className='dashboard-details-show-box'>
                        <div className='green-box dashboard-single-details-box'><div className='container-title-box'>Revenue</div>
                            <div className='symbol-box-container'><div className='amount'>Rs<span className='span'>{dashboardData && dashboardData.totalRevenue[0].Revenue}</span></div><div className='symbol-icon'><CurrencyRupeeIcon sx={{ fontSize: '6.2rem', position: 'relative', bottom: '50px', color: 'green' }}></CurrencyRupeeIcon></div></div>
                        </div>
                        <div className='dashboard-single-details-box'><div className='container-title-box'>Orders</div>
                            <div className='symbol-box-container'><div className='amount'><span className='span'>{dashboardData && dashboardData.orderCount}</span></div><div className='symbol-icon'><ShoppingBagIcon sx={{ fontSize: '6.2rem', position: 'relative', bottom: '50px', color: 'red' }}></ShoppingBagIcon></div></div>
                        </div>
                        <div className='dashboard-single-details-box yellow-box'><div className='container-title-box'>Users</div>
                            <div className='symbol-box-container'><div className='amount'><span className='span'>{dashboardData && dashboardData.userCount}</span></div><div className='symbol-icon'><AccountBoxIcon sx={{ fontSize: '6.2rem', position: 'relative', bottom: '50px', color: 'darkorange' }}></AccountBoxIcon></div></div>
                        </div>
                    </div>

                    <div className='Line-chart-styling-box'>

                        <h2 style={{ textAlign: 'center', width: '100%', fontSize: '3.1rem', marginTop: '20px' }} className='table-heading'>Last 30 Days Revenue</h2>

                        <LineChart chartData={dashboardData && dashboardData.revenueLastThirtyDays}></LineChart>
                    </div>


                    <div className='dashboard-table'>

                        <h2 className='table-heading'>Most Recent Orders</h2>


                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead className='table-row' sx={{ fontSize: '1.5rem' }}>
                                    <TableRow >
                                        <TableCell sx={{ fontSize: '2.1rem', fontWeight: '700' }}>Order id</TableCell>
                                        <TableCell sx={{ fontSize: '1.5rem', fontWeight: '700' }} align="right">quantity</TableCell>
                                        <TableCell sx={{ fontSize: '1.5rem', fontWeight: '700' }} align="right">amount</TableCell>
                                        <TableCell sx={{ fontSize: '1.5rem', fontWeight: '700' }} align="right">orderStatus</TableCell>
                                        <TableCell sx={{ fontSize: '1.5rem', fontWeight: '700' }} align="right">createdAt</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dashboardData && dashboardData.recentOrders.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{ fontSize: '1.1rem', fontWeight: '500', color: 'orangered' }} component="th" scope="row">
                                                {row._id}
                                            </TableCell>
                                            <TableCell align="right">{row.orderItems.length}</TableCell>
                                            <TableCell align="right">{row.TotalPrice}</TableCell>
                                            <TableCell className={(row.orderStatus === 'processing') ? 'yellow-color-state' : 'green-color-state'} align="right">{row.orderStatus}</TableCell>
                                            <TableCell align="right">{row.createdAt}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginBottom: '300px' }}>

                        {/* <h2 style={{ textAlign: 'center', width: '100%', fontSize: '3.1rem', marginTop: '20px' }} className='table-heading'>Statistics</h2> */}
                        <div className='charts'>
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2 }}
                                className='category-chart'
                            >
                                <ChartComponent titleName={'Product Status'} chartdata={dashboardData && dashboardData.stockChartData}></ChartComponent>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2 }}
                                className='category-chart'
                            >
                                <ChartComponent titleName={'Product Categories'} chartdata={dashboardData && dashboardData.categoriesChartData}></ChartComponent>
                           </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2 }}
                                className='category-chart'
                            >
                                <ChartComponent titleName={'Order Status'} chartdata={dashboardData && dashboardData.orderStatusChartData}></ChartComponent>
                           </motion.div>
                            
                        </div>
                    </div>


                </div>
            </div>)}

        </>
    )
}

export default Dashboard