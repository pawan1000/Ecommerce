import React, { useContext, useEffect, useState } from 'react'
import img1 from '../../src/assets/img1.jpg'
import homebanner from '../../src/assets/homebanner.png'
import img1homepage from '../../src/assets/img1homepage.avif'
import PngItem_1983964 from '../../src/assets/PngItem_1983964.png'
import sport3 from '../../src/assets/sport3.png'
import sneakerpng4 from '../../src/assets/sneakerpng4.png'
import img2 from '../../src/assets/img2.jpg'
import img3 from '../../src/assets/img3.jpg'
import { Card, Button } from 'react-bootstrap';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import ProductCard from '../helpers/ProductCard'
import Footer from '../helpers/Footer'
import { FaArrowUp, FaCartPlus,FaShoppingCart } from 'react-icons/fa';
import { TbTruckDelivery } from "react-icons/tb";
import { TfiMoney } from "react-icons/tfi";
import { FaArrowsRotate } from "react-icons/fa6";
import { AuthContext } from '../helpers/AuthContext'
import HomeNav from '../helpers/HomeNav'
const Home = () => {
  const [sneakers, setSneakers] = useState([]);
  const [sports, setSports] = useState([]);
  const navigate = useNavigate();
  


  function toggleAddToCartButton(btnId, hide = true) {
    const btn = document.getElementById(btnId);
    if (hide)
      btn.style.display = 'none';
    else
      btn.style.display = 'block';
  }

  useEffect(() => {
    axios.get('http://localhost:4000/categories/sneakers').then(
      (res) => { setSneakers(res.data.rows) }
    )
  }, [])
  useEffect(() => {
    axios.get('http://localhost:4000/categories/sport').then(
      (res) => { setSports(res.data.rows) }
    )
  }, [])

  return (
    <div className='home p-3' >
      <HomeNav />

      <hr></hr>
      <div className='div-1' style={{ boxShadow: '1px 2px 9px white', borderRadius: '10px' }}>
        <div style={{ cursor: 'pointer',color:'#7AB2B' }} onClick={() => navigate('/categories/sneakers')}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
        </svg> <b style={{color:'#7AB2B2'}}>Explore</b></div>
        <div className='text-center' style={{ color: 'black', fontFamily: 'fantasy', fontSize: '50px', textDecoration: 'underline' }}>Popular in Sneakers</div>
        <div className='parent' style={{ height: '500px', display: 'flex', flexDirection: 'row', gap: '2px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {
            sneakers.slice(0, 4).map((item, index) => {
              return (
                <ProductCard
                  type='sneaker'
                  item={item}
                  index={index}
                  toggleAddToCartButton={toggleAddToCartButton}
                />
              )
            })
          }
          {/* Div1 */}
        </div>
      </div>

      {/* third row */}
      <div className='div-1' style={{ boxShadow: '1px 2px 9px #aaf4e5', borderRadius: '10px' }}>
        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/categories/sport')}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
        </svg><b style={{color:'#7AB2B2'}}>Explore</b></div>
        <div className='text-center' style={{ fontFamily: 'fantasy', fontSize: '50px', textDecoration: 'underline', color: '' }}>Sports Shoes</div>
        <div className='parent' style={{ height: '500px', display: 'flex', flexDirection: 'row', gap: '2px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {
            sports.slice(0, 4).map((item, index) => {
              return (

                <ProductCard
                  type='sport'
                  item={item}
                  index={index}
                  toggleAddToCartButton={toggleAddToCartButton}
                />

              )
            })
          }

          {/* Div1 */}
        </div>
      </div>

      {/* Fourth row */}
      <div className='div-1' style={{ boxShadow: '1px 2px 9px #aaf4e5', borderRadius: '10px'}}>
          <img src={homebanner} width='100%' height='500px'></img>
          {/* Div1 */}
      </div>


      {/* Fifth row */}
        <div className="container " style={{ boxShadow: '1px 2px 9px #aaf4e5', borderRadius: '10px' }}>
          <div className="image-grid">
            <div className="image-left">
              <img
                src={PngItem_1983964}
                alt="Left"
                className="image card-img"
                height="130%"
                onClick={() => navigate('/product/56')}
              />
            </div>
            <div className="image-right">
              <img
                src={sport3}
                alt="Top Right"
                className="image card-img"
                onClick={() => navigate('/product/60')}
              />
              <img
                src={sneakerpng4}
                alt="Bottom Right"
                className="image card-img"
                onClick={() => navigate('product/55')}
              />
            </div>
          </div>
          <div style={{ transform: 'rotate(90deg)' }}>
            <h1 className='text-center text-info' style={{ letterSpacing: '20px', fontSize: '50px' }}>NEW ARRIVALS</h1>
          </div>
      </div>
      <div style={{display:'flex',gap:'30px',justifyContent:'center',margin:'60px',flexWrap:'wrap'}}>
        <div className='d-flex justify-content-center align-items-center flex-column'>
          <TbTruckDelivery  size={50} color='#7AB2B2'/>
          <p style={{fontFamily:'fantasy'}}>Secure Delivery</p>
        </div>
        <div className='d-flex justify-content-center align-items-center flex-column'>
          <FaArrowsRotate size={50} color='#7AB2B2' />
          <p style={{fontFamily:'fantasy'}}>Reverse Pickup</p>
        </div>
        <div className='d-flex justify-content-center align-items-center flex-column'>
          <TfiMoney size={50} color='#7AB2B2' />
          <p style={{fontFamily:'fantasy'}}>Cash on Delivery</p>
          </div>
      </div>
      <div className='text-center text-dark' style={{backgroundColor:'#CDE8E5'}} ><span style={{cursor:'pointer',backgroundColor:'#CDE8E5'}} onClick={()=>{window.scrollTo({ top: 0, behavior: 'smooth' });}}>Back To Top <FaArrowUp size={30} color="black" /></span></div>
      <Footer />

    </div>
  )
}

export default Home
