import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAdminorders } from '../../actions/userActions'
import { DataGrid } from '@mui/x-data-grid'
import Loader from '../layouts/loader/loader'
import LaunchIcon from '@mui/icons-material/Launch'
import Sidebar from './Sidebar'
import { Box, Typography } from '@mui/material'

const AdminOrders = () => {
  const dispatch = useDispatch()
  const { orders, loading } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(getAdminorders())
  }, [dispatch])

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === 'Delivered' ? 'greenColor' : 'redColor'
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/Admin/user/order/${params.row.id}`}>
          <LaunchIcon sx={{ fontSize: '28px' }} />
        </Link>
      ),
    },
  ]

  const rows = orders
    ? orders.map((item) => ({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.TotalPrice,
      }))
    : []

  return loading ? (
    <Loader />
  ) : (
    <Box sx={{ display: 'flex' }}>
      <Sidebar active="orders" />
      <Box sx={{ flexGrow: 1, ml: '240px', p: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={3} fontSize="22px">
          Orders
        </Typography>
        <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, p: 2 }}>
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
            sx={{
              textAlign: 'center',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'primary.light',
                fontSize: '16px',
              },
              '& .MuiDataGrid-cell': {
                fontSize: '15px',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AdminOrders
