import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearErrors,
  deleteAdminProduct,
  getAdminProducts,
} from '../../actions/productActions'
import Loader from '../layouts/loader/loader'
import { toast } from 'react-toastify'
import { ADMIN_PRODUCT_RESET } from '../../constants/productConstants'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'

const AdminProducts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.user)
  const { product, loading, error, message } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    if (user) {
      dispatch(getAdminProducts())
    }
  }, [dispatch, user])

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: 'dark' })
      dispatch(clearErrors())
    }

    if (message) {
      toast.success(message, { theme: 'dark' })
      dispatch({ type: ADMIN_PRODUCT_RESET })
      navigate('/dashboard')
    }
  }, [error, message, dispatch, navigate])

  const deleteProductHandler = (id) => {
    dispatch(deleteAdminProduct(id))
  }

  const updateProductHandler = (id) => {
    navigate(`/admin/updateproduct/${id}`)
  }

  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 300, flex: 1 },
    {
      field: 'name',
      headerName: 'Product Name',
      minWidth: 250,
      flex: 0.5,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) =>
        params.row.stock > 0 ? 'greenColor' : 'redColor',
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 170,
      flex: 0.5,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <EditIcon
            sx={{
              fontSize: '2rem',
              color: '#fff',
              backgroundColor: 'green',
              borderRadius: '4px',
              padding: '4px',
              cursor: 'pointer',
            }}
            onClick={() => updateProductHandler(params.row.id)}
          />
          <DeleteIcon
            sx={{
              fontSize: '2rem',
              color: '#fff',
              backgroundColor: 'crimson',
              borderRadius: '4px',
              padding: '4px',
              cursor: 'pointer',
            }}
            onClick={() => deleteProductHandler(params.row.id)}
          />
        </Box>
      ),
    },
  ]

  const rows = product
    ? product.map((item) => ({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
      }))
    : []

  return loading ? (
    <Loader />
  ) : (
    <Box sx={{ display: 'flex' }}>
      <Sidebar active="products" />
      <Box sx={{ flexGrow: 1, ml: '240px', p: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={3} fontSize="22px">
          Products
        </Typography>

        {/* Add Product Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/admin/createproduct')}
          sx={{
            mb: 3,
            backgroundColor: 'teal',
            '&:hover': {
              backgroundColor: 'darkcyan',
            },
          }}
        >
          Add Product
        </Button>

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

export default AdminProducts
