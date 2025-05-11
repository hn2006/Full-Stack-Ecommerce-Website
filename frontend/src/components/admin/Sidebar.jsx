import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../actions/userActions'
import { useDispatch } from 'react-redux'
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  LocalMall as LocalMallIcon,
  Class as ClassIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'

const Sidebar = ({ active }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const menuItems = [
    { name: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard', path: '/dashboard' },
    { name: 'users', icon: <PersonIcon />, label: 'Users', path: '/admin/users' },
    { name: 'orders', icon: <LocalMallIcon />, label: 'Orders', path: '/admin/orders' },
    { name: 'products', icon: <ClassIcon />, label: 'Products', path: '/admin/products' },
  ]

  return (
    <Box sx={{
      width: 240,
      flexShrink: 0,
      bgcolor: 'background.paper',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      borderRight: '1px solid',
      borderColor: 'divider',
      boxShadow: 3
    }}>
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            textDecoration: 'none',
            color: 'text.primary'
          }}
          component={Link}
          to="/"
        >
          <img
            src="/images/new_logo.jpg"
            alt="Logo"
            style={{ height: 40, width: 40, borderRadius: 8 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '20px' }}>
            Blue Mart
          </Typography>
        </Box>
      </Box>

      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={active === item.name}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'primary.light' }
                }
              }}
            >
              <ListItemIcon sx={{
                minWidth: 40,
                color: active === item.name ? 'primary.main' : 'text.secondary'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: active === item.name ? 600 : 400,
                  color: active === item.name ? 'primary.main' : 'text.primary',
                  fontSize: '16px'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              dispatch(logoutUser())
              navigate('/home')
            }}
            sx={{
              borderRadius: 2,
              mt: 2,
              color: 'error.main',
              '&:hover': { bgcolor: 'error.light' }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: '16px'
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default Sidebar
