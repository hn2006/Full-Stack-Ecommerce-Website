import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <section className='footer-container'>

            <footer className="footer-distributed">

                <div className="footer-left">

                <span height='80px' width='80px'  style={{position:'relative'}}><img style={{height:'50px',width:'50px',marginRight:'10px',borderRadius:'7px'}} src='/images/new_logo.jpg' alt='logo'></img><span style={{color:'cyan',fontSize:'6.2rem'}}>Blue<span style={{color:'white',marginLeft:'10px',fontSize:'4.2rem'}} >Mart</span></span></span>

                    

                    <p style={{marginTop:'20px',fontSize:'1.7rem',fontWeight:'700'}} className="footer-company-name">Blue Mart© 2023</p>
                </div>

                <div className="footer-center" style={{color:'chocolate'}}>

                    <div >
                        <i className="fa fa-map-marker"></i>
                        <p  style={{color:'wheat'}}><span>2614</span> shanti nagar damohnaka</p>
                    </div>

                    <div>
                        <i className="fa fa-phone"></i>
                        <p  style={{color:'wheat'}}>+1.555.555.5555</p>
                    </div>

                    <div>
                        <i className="fa fa-envelope"></i>
                        <p  style={{color:'wheat'}}>jee2006@gmail.com</p>
                    </div>

                </div>

                <div className="footer-right">

                    <p className="footer-company-about" style={{fontSize:'1.6rem',color:'blueviolet'}}>
                        <span style={{fontSize:'2.6rem',color:'white'}}>About the company</span>
                        A great startup to provide products at affordable price by taking less margins
                    </p>

                </div>

            </footer>
        </section>
    )
}

export default Footer