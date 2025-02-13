import React from 'react'
import './checkout.css'
import Header from '../layouts/header/header'
import Footer from '../layouts/footer/Footer'
import { Outlet } from 'react-router-dom'

const CheckOutPage = () => {
    return (
        <div>
            <Header></Header>
            <Outlet/>
            <Footer></Footer>
        </div>
    )
}

export default CheckOutPage