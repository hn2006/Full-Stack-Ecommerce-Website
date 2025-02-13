import React from 'react'
import Productcard from './productCard/Productcard'
import './products.css'
import { Link } from 'react-router-dom'

const products = (props) => {

  console.log(props);
  return (
    <div className='products-main-container'>
        
        {(props.products)?(props.products.map((data)=>{
          return <Link to={`/products/${data._id}`} key={data._id}><Productcard product={data}></Productcard></Link>
        })):''}
    </div>
  )
}

export default products