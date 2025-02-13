import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getadminUsers } from '../../actions/userActions';
import { Avatar, Switch } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from './Sidebar';
import { ADMIN_USER_ROLE_UPDATE } from '../../constants/userConstants';
import Loader from '../layouts/loader/loader';



const AdminUsers = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, users } = useSelector((state) => state.users);
  useEffect(() => {

    if (user) {
      dispatch(getadminUsers());
    }


  }, [dispatch, user]);

  const changehandler = async (e, id) => {

    if (e.target.value) {
      try {

        const { data } = await axios.get(`/user/admin/changeRole/${id}`);

        toast.success(data.message, { theme: 'dark' });

        dispatch({ type: ADMIN_USER_ROLE_UPDATE, id });


      }
      catch {

        toast.error('some error occured', { theme: 'dark' });

      }
    }
  }

  const columns = [

    {
      field: "image", headerName: "image", minWidth: 100, flex: 1,

      renderCell: (params) => {
        return (
          <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
            <Avatar alt="user image" src={(params.row.image)?params.row.image:'/images/first.jpg'} />
          </div>
        );
      },
    },

    { field: "id", headerName: "User ID", minWidth: 300, flex: 1 },

    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },

    { field: "email", headerName: "Email", minWidth: 250, flex: 1 },

    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.role === "admin"
          ? "greenColor"
          : "";
      },
    },
    {
      field: "admin",
      flex: 0.3,
      headerName: "admin",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Switch defaultChecked={(params.row.role === 'admin') ? true : false} disabled={(params.row.role === 'admin') ? true : false} onChange={(e) => { changehandler(e, params.row.id) }}>
          </Switch>
        );
      },
    }
  ];
  const rows = [];
  users &&
    users.forEach((item, index) => {
      rows.push({



        image: (item.avatar)?(item.avatar.url):'',
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });
  return (
    <>
      {(loading) ? (<Loader></Loader>) : (
        <div className='dashboard-main-container'>
          <Sidebar active={'users'}></Sidebar>
          <div className='dashboard-container'>
            <h2 className='dashboard-heading'>Users</h2>

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

export default AdminUsers