import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productActions';
import { 
  Box, 
  Card, 
  Chip, 
  CircularProgress, 
  Divider, 
  Grid, 
  Pagination, 
  Slider, 
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Container
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import Productcard from '../layouts/Products/productCard/Productcard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Header from '../layouts/header/header';
import Footer from '../layouts/footer/Footer';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { product, error, loading, productCount } = useSelector(state => state.products);
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 200000]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const pricing = [
    { value: 0, label: "₹0" },
    { value: 50000, label: "₹50k" },
    { value: 100000, label: "₹100k" },
    { value: 150000, label: "₹150k" },
    { value: 200000, label: "₹200k" },
  ];

  const categories = [
    'smartphones',
    'laptops',
    'home devices',
    'Books',
    'cars',
    'footwear',
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(getProducts(page, search, price, category));
  }, [dispatch, page, search, price, category]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePriceChange = (e, newValue) => {
    setPrice(newValue);
    setPage(1);
  };

  const handleCategoryClick = (cat) => {
    setCategory(cat === category ? '' : cat);
    setPage(1);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
    }}>
      <Header />
      
      <Container maxWidth="xl" sx={{ 
        py: 4,
        px: { xs: 2, sm: 3, md: 4, marginTop:'80px' } // Responsive padding
      }}>
        {/* Search Box */}
        <Card sx={{ 
          p: 3, 
          mb: 3,
          borderRadius: 2,
          boxShadow: 1
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: 1 }
            }}
          />
        </Card>

        {/* Mobile Filter Toggle */}
        <Box sx={{ 
          display: { xs: 'flex', md: 'none' }, 
          mb: 3,
          justifyContent: 'flex-end'
        }}>
          <IconButton 
            onClick={() => setMobileFiltersOpen(true)}
            color="primary"
            sx={{ 
              border: '1px solid',
              borderColor: 'primary.main'
            }}
          >
            <FilterAltIcon />
            <Typography variant="body2" sx={{ ml: 1 }}>Filters</Typography>
          </IconButton>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3
        }}>
          {/* Filters Box - Desktop */}
          <Card sx={{ 
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
            display: { xs: 'none', md: 'block' },
            width: 280,
            height: 'fit-content',
            position: 'sticky',
            top: 100,
            backgroundColor: 'white'
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Price Range</Typography>
            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={200000}
              step={10000}
              marks={pricing}
              sx={{ mb: 3 }}
            />
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Categories</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => handleCategoryClick(cat)}
                  variant={category === cat ? 'filled' : 'outlined'}
                  color="primary"
                  sx={{ mb: 1 }}
                />
              ))}
            </Box>
          </Card>

          {/* Products Box */}
          <Box sx={{ flex: 1 }}>
            {loading ? (
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px',
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 1,
                p: 4
              }}>
                <CircularProgress size={60} />
              </Box>
            ) : product?.length > 0 ? (
              <Grid container spacing={3}>
                {product.map((data) => (
                  <Grid item xs={12} sm={6} md={4} key={data._id}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link to={`/products/${data._id}`} style={{ textDecoration: 'none' }}>
                        <Productcard product={data} />
                      </Link>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Card sx={{ 
                p: 4,
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: 'white'
              }}>
                <Typography variant="h6">No products found</Typography>
              </Card>
            )}

            {/* Pagination */}
            {productCount > 0 && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 4,
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}>
                <Pagination
                  count={Math.ceil(productCount / 9)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                  size="large"
                  style={{backgroundColor: '#f5f5f5', borderRadius:'10px', padding:'10px'}}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile Filters */}
      {mobileFiltersOpen && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1300,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <Card sx={{
            width: '85%',
            height: '100%',
            p: 3,
            overflowY: 'auto',
            borderRadius: 0
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mb: 3,
              alignItems: 'center'
            }}>
              <Typography variant="h6">Filters</Typography>
              <IconButton onClick={() => setMobileFiltersOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>Price Range</Typography>
            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={200000}
              step={10000}
              marks={pricing}
              sx={{ mb: 3 }}
            />
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>Categories</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => handleCategoryClick(cat)}
                  variant={category === cat ? 'filled' : 'outlined'}
                  color="primary"
                  sx={{ mb: 1 }}
                />
              ))}
            </Box>
          </Card>
        </Box>
      )}

      <Footer />
    </Box>
  );
};

export default ProductsPage;