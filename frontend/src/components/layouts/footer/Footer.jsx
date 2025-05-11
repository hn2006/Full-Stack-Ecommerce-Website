import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { Email, Phone, LocationOn, Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#403f3d',
        color: 'white',
        py: 8,
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.25)',
        marginTop:'30px'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Left Section - Logo */}
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 4,
              transform: 'perspective(1000px)'
            }}>
              <img 
                src='/images/new_logo.jpg' 
                alt='logo'
                style={{
                  height: '60px',
                  width: '60px',
                  marginRight: '16px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
              />
              <Box>
                <Typography 
                  variant="h3" 
                  component="div"
                  sx={{
                    fontSize: '32px',
                    fontWeight: 800,
                    background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.2'
                  }}
                >
                  Blue Mart
                </Typography>
                <Typography 
                  sx={{
                    fontSize: '16px',
                    color: '#a0b3c6',
                    mt: '4px'
                  }}
                >
                  Premium E-commerce Solutions
                </Typography>
              </Box>
            </Box>
            <Typography 
              sx={{ 
                fontSize: '16px', 
                color: '#8a9fb5',
                mt: '24px'
              }}
            >
              © {new Date().getFullYear()} Blue Mart. All rights reserved.
            </Typography>
          </Grid>

          {/* Center Section - Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h4" 
              sx={{
                fontSize: '24px',
                fontWeight: 700,
                mb: '24px',
                color: 'white'
              }}
            >
              Contact Us
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ 
                  color: '#4fc3f7', 
                  fontSize: '28px', 
                  mr: '16px' 
                }} />
                <Box>
                  <Typography sx={{ fontSize: '18px', color: 'white', fontWeight: 600 }}>
                    2614 Shanti Nagar
                  </Typography>
                  <Typography sx={{ fontSize: '16px', color: '#a0b3c6', mt: '4px' }}>
                    Damohnaka, India
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ 
                  color: '#4fc3f7', 
                  fontSize: '28px', 
                  mr: '16px' 
                }} />
                <Typography sx={{ fontSize: '18px', color: 'white', fontWeight: 600 }}>
                  +91 8899008899456
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ 
                  color: '#4fc3f7', 
                  fontSize: '28px', 
                  mr: '16px' 
                }} />
                <Typography sx={{ fontSize: '18px', color: 'white', fontWeight: 600 }}>
                  jee2006@gmail.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Section - About + Social */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h4" 
              sx={{
                fontSize: '24px',
                fontWeight: 700,
                mb: '20px',
                color: 'white'
              }}
            >
              About Blue Mart
            </Typography>
            
            <Typography 
              sx={{ 
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#a0b3c6',
                mb: '24px'
              }}
            >
              We're revolutionizing e-commerce by providing premium products at affordable prices through our innovative low-margin business model.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <IconButton
                sx={{
                  backgroundColor: 'rgba(79, 195, 247, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(79, 195, 247, 0.2)' }
                }}
              >
                <Facebook sx={{ fontSize: '24px', color: '#4fc3f7' }} />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: 'rgba(79, 195, 247, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(79, 195, 247, 0.2)' }
                }}
              >
                <Twitter sx={{ fontSize: '24px', color: '#4fc3f7' }} />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: 'rgba(79, 195, 247, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(79, 195, 247, 0.2)' }
                }}
              >
                <Instagram sx={{ fontSize: '24px', color: '#4fc3f7' }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;