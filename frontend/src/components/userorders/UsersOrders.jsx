import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getuserorders } from '../../actions/userActions';
import { DataGrid } from '@mui/x-data-grid';
import './userorders.css'
import Loader from '../layouts/loader/loader';
import LaunchIcon from '@mui/icons-material/Launch';
import Header from '../layouts/header/header';
import Footer from '../layouts/footer/Footer';

const UsersOrders = () => {

    const dispatch = useDispatch();

    const { userId } = useParams();

    const { orders, loading } = useSelector((state) => state.orders);

    useEffect(() => {

        dispatch(getuserorders(userId));
    }, [userId, dispatch])

    if (orders) {

        console.log(orders);
    }

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.row.status === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/user/order/${params.row.id}`}>
                        <LaunchIcon sx={{fontSize:'3.3rem'}}/>
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.TotalPrice,
            });
        });
    return (
        <>
            {(loading) ? (<Loader></Loader>) : (
                <div>
                    <div className='my-orders-container'>
                        <Header></Header>
                        <h2 className='my-orders-heading'>My Orders</h2>
                        <div className='orders-data'>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSizeOptions={[5, 9]}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 9 },
                                    },
                                }}
                                autoHeight
                                className='order-table'
                                sx={{ textAlign: 'center' }}>
                            </DataGrid>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            )}
        </>
    )
}

export default UsersOrders