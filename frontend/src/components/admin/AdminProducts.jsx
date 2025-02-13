import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteAdminProduct, getAdminProducts } from '../../actions/productActions';
import Loader from '../layouts/loader/loader';
import { toast } from 'react-toastify';
import { ADMIN_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {

    const { user } = useSelector((state) => state.user);
    const { product,loading ,error,message} = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    useEffect(() => {

        if (user) {

            dispatch(getAdminProducts());
        }


    }, [dispatch, user]);

    useEffect(()=>{

        if(error){

            toast.error(error,{theme:'dark'});
            dispatch(clearErrors());
        }

        if(message){

            toast.success(message,{theme:'dark'});
            console.log('product deleted');
            dispatch({type:ADMIN_PRODUCT_RESET});
            navigate('/dashboard')
        }
    },[error,message,dispatch,navigate])

    const deleteProductHandler=(id)=>{

        dispatch(deleteAdminProduct(id));

    }

    const updateProductHandler=(id)=>{

        navigate(`/admin/updateproduct/${id}`);

    }


    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 300, flex: 1 },

        {
            field: "name",
            headerName: "Product Name",
            minWidth: 250,
            flex: 0.5,
        },
        {
            field: "stock",
            headerName: "stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.row.stock > 0
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "price",
            headerName: "price",
            type: "number",
            minWidth: 170,
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
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '90%' }}>
                        <EditIcon sx={{ fontSize: '2.3rem',color:'blue',backgroundColor:'yellowgreen' ,cursor:'pointer'}} onClick={()=>{updateProductHandler(params.row.id)}}></EditIcon>
                        <DeleteIcon sx={{ fontSize: '2.3rem' ,color:'blue',backgroundColor:'red' ,cursor:'pointer' }}  onClick={()=>{deleteProductHandler(params.row.id)}}></DeleteIcon>
                    </div>
                );
            },
        },
    ];
    const rows = [];

    product &&
        product.forEach((item, index) => {
            rows.push({
                name: item.name,
                id: item._id,
                stock: item.stock,
                price: item.price
            });
        });




    return (
        <>
            {(loading)?(<Loader></Loader>):(
                <div className='dashboard-main-container'>
            <Sidebar active={'products'}></Sidebar>
            <div className='dashboard-container'>
            <h2 className='dashboard-heading'>Products</h2>

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

export default AdminProducts