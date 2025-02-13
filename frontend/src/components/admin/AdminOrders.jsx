import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom'
import { getAdminorders} from '../../actions/userActions';
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../layouts/loader/loader';
import LaunchIcon from '@mui/icons-material/Launch';
import Sidebar from './Sidebar';

const AdminOrders = () => {

    const dispatch = useDispatch();

    const { orders, loading } = useSelector((state) => state.orders);

    useEffect(() => {

        dispatch(getAdminorders());
    }, [ dispatch])

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
                    <Link to={`/Admin/user/order/${params.row.id}`}>
                        <LaunchIcon sx={{ fontSize: '3.3rem' }} />
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
                <div className='dashboard-main-container'>
                    <Sidebar active={'orders'}></Sidebar>
                    <div className='dashboard-container'>
                        <h2 className='dashboard-heading'>Orders</h2>

                        <div className='table-component-products'>
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
                </div>
            )}
        </>
    )
}

export default AdminOrders