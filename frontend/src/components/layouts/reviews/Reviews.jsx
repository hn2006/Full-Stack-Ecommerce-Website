import React from 'react'
import './Reviews.css'
import ReviewCard from './reviewCard/ReviewCard'
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';

const Reviews = ({reviewData}) => {
    return (
        <div className='all-reviews-container'>
            {
                (reviewData&&reviewData.length>0)?(reviewData.map((data)=>{return (<ReviewCard key={data._id} data={data}></ReviewCard>)})):(
                    <div className='no-review-till-now'>
                        <SpeakerNotesOffIcon sx={{fontSize:'8.2rem'}}></SpeakerNotesOffIcon>
                        <h2>No reviews yet!!</h2>
                    </div>
                )
            }

        </div>
    )
}

export default Reviews