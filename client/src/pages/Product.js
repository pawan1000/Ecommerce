import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import img1 from '../assets/img1.jpg'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import Swal from 'sweetalert2';
import ProductCard from '../helpers/ProductCard';
import Footer from '../helpers/Footer';
import FeedBack from '../helpers/FeedBack';
import { useDispatch, useSelector } from 'react-redux';
import { setCartCount } from '../redux/reducers/cartReducer';
const Product = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState([]);
  const [size, setSize] = useState(8);
  const [category, setCategory] = useState([]);
  let navigate = useNavigate();
  // const { authState, setAuthState, cartCount, setCartCount } = useContext(AuthContext) // used with context-api
  const user = useSelector(state => state.user);
  const cartCount = useSelector(state => state.cart)
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`${apiUrl}/product/${id}`).then(
      (res) => { setProduct(res.data); console.log(res.data); return res.data[0].category_id; }
    ).then(
      (categoryId) => {
        axios.get(`${apiUrl}/categories/id/${categoryId}`).then(
          (res) => {
            setCategory(res.data); console.log(res); console.log('in product page in category');
          }
        )
      }
    )
  }, [id])


  function toggleAddToCartButton(btnId, hide = true) {
    const btn = document.getElementById(btnId);
    if (hide)
      btn.style.display = 'none';
    else
      btn.style.display = 'block';
  }

  function addToCart(item) {
    item.user_id = user.user_id;
    console.log('in products addToCart function' + item);
    item = { ...item, size: size };
    axios.post(`${apiUrl}/carts/addToCart`, item, { headers: { 'accessToken': sessionStorage.getItem('accessToken') } }).then(
      (res) => {
        console.log(res);
        if (res.data.error) {
          Swal.fire({
            title: 'Please Login !',
            text: 'To Continue',
            timer: '1000'
          })
          return;
        }
        console.log(res.data);
        Swal.fire({
          title: 'Added to Cart Succesfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // setCartCount(cartCount + 1);  //for context api
            dispatch(setCartCount(cartCount + 1)) //for redux
            navigate('/carts');
          }
        })
      }
    )
  }

  function handleClick(id) {
    setSize(id);
    const sizeElements = document.getElementsByClassName('size');
    Array.from(sizeElements).forEach(item => {
      item.classList.remove('selected'); // Remove the selected class from all elements
    });
    document.getElementById(id).classList.add('selected'); // Add the selected class to the clicked element
  }
  return (
    <>
      <div className='parent p-3 m-4' style={{ display: 'flex', gap: '10px', backgroundColor: '' }}>
        <div className='div1' style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexDirection: 'column' }} >
        </div>
        <div className='div3' style={{ marginLeft: '60px', maxWidthidth: '700px', display: 'flex', flexDirection: 'row', gap: '100px' }}>
          {
            product.map((data) => {
              return (
                <>
                  <div className='' style={{ width: '600px', padding: '50px' }}>
                    <div className='' style={{ backgroundColor: '#e0f7fa' }} ><img className='img-product' src={`http://localhost:4000/uploads/${data.image}`} alt='no image' /></div>
                  </div>
                  <div>
                    <div className='name' style={{ fontFamily: 'fantasy', fontSize: '40px', letterSpacing: '3px', color: '#7AB2B2' }}>{data.name}</div>
                    <div className='gender' style={{ fontFamily: 'sans-serif', color: 'grey', fontSize: '20px' }}>{data.gender == 'male' ? (<>Mens</>) : (<>Womens</>)} Shoe</div>
                    <div className='rating'> {[...Array(data.rating)].map((_, index) => (
                      <span key={index}>&#9733;</span>
                    ))}</div>
                    <div className='price' style={{ fontFamily: "cursive" }}>{new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR'
                    }).format(data.price)}</div>

                    <div className='' style={{ display: 'flex', gap: '10px', justifyContent: 'left', flexDirection: 'column' }}>
                      size<br></br>
                      <div className='d-flex justify-content-start'>
                        {
                          Array.from({ length: data.maxsize - data.minsize + 1 }, (_, index) => {
                            const size = data.minsize + index;
                            return (
                              <div
                                key={size}
                                id={size}
                                onClick={() => handleClick(size)}
                                className='size-shoe d-flex justify-content-center me-3 size'
                              >
                                {size}
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                    <div className='Features' style={{ marginTop: '10px' }}>{data.description.slice(0, data.description.length - 1).split('.').map((feature) => {
                      return <li className='bg-light'>{feature}</li>
                    })}</div>

                    <br></br><br></br>
                    <div className='d-flex gap-4'>
                      <button className='add-to-cart' style={{ display: 'block', width: '50%' }} onClick={() => addToCart(data)}>Add to cart</button>
                      <button className='add-to-cart' style={{ display: 'block', width: '50%' }} onClick={() => addToCart(data)}>Buy Now</button>
                    </div>
                    <div className='feedback'>
                      <FeedBack />
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
      <hr></hr>
      <div >
        < span style={{ fontFamily: "fantasy", fontSize: '50px', textDecoration: 'none', borderBottom: '2px solid transparent', transition: 'border-color 0.3s' }} onMouseOver={(e) => e.target.style.borderColor = 'yellow'} onMouseOut={(e) => e.target.style.borderColor = 'transparent'}>You May Also Like</span>
      </div>


      <div style={{ display: 'flex', gap: '10px', flexDirection: 'row', flexFlow: 'wrap', flexWrap: 'nowrap' }} >
        {category.length > 0 &&
          (
            category.slice(0, 4).map((data, index) => {
              return (
                <ProductCard
                  type='sneaker'
                  item={data}
                  index={index}
                  toggleAddToCartButton={toggleAddToCartButton}
                />
              )
            })
          )
        }
      </div>
      <Footer />
    </>

  )
}

export default Product
