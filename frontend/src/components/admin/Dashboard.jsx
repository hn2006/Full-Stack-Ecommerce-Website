import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getdashboardDetails } from '../../actions/productActions'
import { toast } from 'react-toastify'
import {
  CurrencyRupee as CurrencyRupeeIcon,
  ShoppingBag as ShoppingBagIcon,
  AccountBox as AccountBoxIcon,
} from '@mui/icons-material'
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Loader from '../layouts/loader/loader'
import Sidebar from './Sidebar'
import ChartComponent from './ChartComponent'
import LineChart from './LineChart'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { dashboardData, error, loading } = useSelector((state) => state.dashboardDetails)

  useEffect(() => {
    dispatch(getdashboardDetails())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: 'dark' })
      navigate('/home')
    }
  }, [error, navigate])

  if (loading) return <Loader />
  const revenue = dashboardData?.totalRevenue[0]?.Revenue;
  const formattedRevenue = revenue ? revenue.toFixed(2) : '0.00';


  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', color: '#ffffff', bgcolor: '#0f1117' }}>
      <Sidebar active={'dashboard'} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { sm: '240px' },
          width: { sm: `calc(100% - 240px)` },
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            fontSize: '32px',
            fontWeight: 600,
            mb: 4,
            pb: 1,
            borderBottom: '2px solid #4a90e2',
          }}
        >
          Admin Dashboard
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <MotionBox>
              <Paper sx={cardStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <div>
                    <Typography sx={cardLabel}>Revenue</Typography>
                    <Typography sx={cardValue}>₹{formattedRevenue}</Typography>
                  </div>
                  <CurrencyRupeeIcon sx={iconStyle('#4CAF50')} />
                </Box>
              </Paper>
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={4}>
            <MotionBox delay={0.2}>
              <Paper sx={cardStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <div>
                    <Typography sx={cardLabel}>Orders</Typography>
                    <Typography sx={cardValue}>{dashboardData?.orderCount}</Typography>
                  </div>
                  <ShoppingBagIcon sx={iconStyle('#F44336')} />
                </Box>
              </Paper>
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={4}>
            <MotionBox delay={0.4}>
              <Paper sx={cardStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <div>
                    <Typography sx={cardLabel}>Users</Typography>
                    <Typography sx={cardValue}>{dashboardData?.userCount}</Typography>
                  </div>
                  <AccountBoxIcon sx={iconStyle('#FFC107')} />
                </Box>
              </Paper>
            </MotionBox>
          </Grid>
        </Grid>

        {/* Line Chart */}
        <MotionBox>
          <Paper sx={sectionPaper}>
            <Typography sx={sectionTitle}>Last 30 Days Revenue</Typography>
            <Box sx={{ height: 400 }}>
              <LineChart chartData={dashboardData?.revenueLastThirtyDays} />
            </Box>
          </Paper>
        </MotionBox>

        {/* Recent Orders Table */}
        <MotionBox>
          <Paper sx={tablePaper}>
            <Typography sx={sectionTitle}>Recent Orders</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#212b36' }}>
                    <StyledTableCell>Order ID</StyledTableCell>
                    <StyledTableCell align="right">Quantity</StyledTableCell>
                    <StyledTableCell align="right">Amount</StyledTableCell>
                    <StyledTableCell align="right">Status</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardData?.recentOrders.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#1e2a38',
                        },
                      }}
                    >
                      <StyledTableCell sx={{ color: '#4a90e2' }}>{row._id}</StyledTableCell>
                      <StyledTableCell align="right">{row.orderItems.length}</StyledTableCell>
                      <StyledTableCell align="right">₹{row.TotalPrice}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Box
                          component="span"
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            fontSize: '14px',
                            borderRadius: 1,
                            bgcolor: row.orderStatus === 'processing' ? '#FFF3E0' : '#C8E6C9',
                            color: row.orderStatus === 'processing' ? '#EF6C00' : '#2E7D32',
                          }}
                        >
                          {row.orderStatus}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </MotionBox>

        {/* Charts Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} lg={4}>
            <MotionBox>
              <Paper sx={sectionPaper}>
                <ChartComponent title="Product Status" chartdata={dashboardData?.stockChartData} fontSize="20px" />
              </Paper>
            </MotionBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MotionBox delay={0.2}>
              <Paper sx={sectionPaper}>
                <ChartComponent
                  title="Product Categories"
                  chartdata={dashboardData?.categoriesChartData}
                  fontSize="20px"
                />
              </Paper>
            </MotionBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MotionBox delay={0.4}>
              <Paper sx={sectionPaper}>
                <ChartComponent
                  title="Order Status"
                  chartdata={dashboardData?.orderStatusChartData}
                  fontSize="20px"
                />
              </Paper>
            </MotionBox>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

// Motion animation wrapper
const MotionBox = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
    {children}
  </motion.div>
)

// Shared styles
const cardStyle = {
  p: 3,
  bgcolor: '#1c1f26',
  borderRadius: 3,
  height: '100%',
  color: '#ffffff',
}

const iconStyle = (color) => ({
  fontSize: '60px',
  color,
})

const cardLabel = {
  fontSize: '18px',
  color: '#a0a0a0',
  mb: 1,
}

const cardValue = {
  fontSize: '28px',
  fontWeight: 700,
}

const sectionPaper = {
  p: 3,
  mb: 4,
  borderRadius: 3,
  bgcolor: '#1c1f26',
  color: '#ffffff',
}

const tablePaper = {
  p: 3,
  mb: 4,
  borderRadius: 3,
  bgcolor: '#2b2f3a',
  color: '#ffffff',
}

const sectionTitle = {
  fontSize: '24px',
  fontWeight: 600,
  mb: 2,
}

const StyledTableCell = (props) => (
  <TableCell
    {...props}
    sx={{
      fontSize: '14px',
      fontWeight: 500,
      color: '#ffffff',
      borderBottom: '1px solid #444',
    }}
  />
)

export default Dashboard
