import React from 'react'
import './ReviewCard.css'
import PersonIcon from '@mui/icons-material/Person';

const ReviewCard = ({data}) => {
  return (
    <div className='review-card-container'>
        <div className='reviewer-image'><PersonIcon sx={{fontSize:'6.2rem',color:'blueviolet'}}></PersonIcon></div>
        <div className='reviewer-name'>{data.name}</div>
        <div className='review'>{data.comment}</div>
    </div>
  )
}

export default ReviewCard