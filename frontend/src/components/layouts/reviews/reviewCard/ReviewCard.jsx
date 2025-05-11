import React from 'react';
import { Card, CardHeader, Avatar, CardContent, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const ReviewCard = ({ data }) => (
  <Box sx={{ maxWidth: 345, m: 1 }}>
    <Card
      elevation={4}
      sx={{
        borderRadius: 2,
        overflow: 'visible',
        position: 'relative',
        pt: 4, // space for avatar
      }}
    >
      <Avatar
        sx={{
          bgcolor: 'primary.main',
          width: 64,
          height: 64,
          position: 'absolute',
          top: -32,
          left: '50%',
          transform: 'translateX(-50%)',
          boxShadow: 3,
        }}
      >
        <PersonIcon sx={{ fontSize: 40, color: 'white' }} />
      </Avatar>

      <CardHeader
        title={data.name}
        titleTypographyProps={{
          align: 'center',
          variant: 'h6',
          sx: { fontWeight: 600 },
        }}
        sx={{ pt: 0, pb: 1 }}
      />

      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', lineHeight: 1.5, fontSize:'20px' }}
        >
          {data.comment}
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default ReviewCard;
