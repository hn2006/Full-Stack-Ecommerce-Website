import React from 'react'
import { Step, StepLabel, Stepper } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
const CheckOutStatus = ({value}) => {
    return (
        <div style={{ marginTop: '20vh', height: '30px', padding: '0px' }}>
            <Stepper alternativeLabel activeStep={value}>
                <Step key={'one'}>
                    <StepLabel><LocalShippingIcon sx={{ fontSize: '2.5rem', color: 'orange' }}></LocalShippingIcon></StepLabel>
                </Step>
                <Step key={'two'}>
                    <StepLabel><AssignmentTurnedInIcon sx={{ fontSize: '2.5rem', color: 'orange' }}></AssignmentTurnedInIcon></StepLabel>
                </Step>
                <Step key={'three'}>
                    <StepLabel><CreditCardIcon sx={{ fontSize: '2.5rem', color: 'orange' }}></CreditCardIcon></StepLabel>
                </Step>
            </Stepper>
        </div>
    )
}

export default CheckOutStatus