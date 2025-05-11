import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
      } catch {
        toast.error('Some error occurred', { theme: 'dark' });
      }
    }
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Avatar alt="user image" src={params.row.image ? params.row.image : '/images/first.jpg'} />
        </div>
      ),
    },
    { field: 'id', headerName: 'User ID', minWidth: 300, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 150, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 250, flex: 1 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 100,
      flex: 0.5,
      cellClassName: (params) => (params.row.role === 'admin' ? 'greenColor' : ''),
    },
    {
      field: 'admin',
      flex: 0.3,
      headerName: 'Admin',
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Switch
          defaultChecked={params.row.role === 'admin'}
          disabled={params.row.role === 'admin'}
          onChange={(e) => changehandler(e, params.row.id)}
        />
      ),
    },
  ];

  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        image: item.avatar ? item.avatar.url : '',
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
          {/* Fixed-width Sidebar */}
          <div style={{ width: '240px', flexShrink: 0 }}>
            <Sidebar active="users" />
          </div>

          {/* Main Content */}
          <div
            style={{
              flexGrow: 1,
              padding: '2rem',
              boxSizing: 'border-box',
            }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Users
            </h2>

            <div
              style={{
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              }}
            >
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
                sx={{ textAlign: 'center' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUsers;
