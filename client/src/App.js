import Home from './pages/Home';
import Register from './pages/Register';
import logo from '../src/assets/logo.jpg'
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from '../src/pages/Login';
import Product from './pages/Product';
import Carts from '../src/pages/Carts';
import { AuthContext } from './helpers/AuthContext';
import SellerLogin from './pages/SellerLogin';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import LoadingSpinner from './helpers/LoadingSpinner';
import { FaArrowUp, FaCartPlus, FaShoppingCart } from 'react-icons/fa';
import { CiLogout } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";
import { BsCaretDownFill } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import Swal from 'sweetalert2';

function App() {
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState();
  const [showlist, setShowList] = useState([]);
  const [authState, setAuthState] = useState({ username: '', status: false, userType: 'buyer', user_id: null })
  const [isVisible, setIsVisible] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [originalCategories, setOriginalCategories] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [animate, setAnimate] = useState(false); // State to manage animation
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [orignalProducts, setOrignalProducts] = useState([]);
  const toggleDropdown = () => {
    setIsVisible(!isVisible);
    document.getElementById('dropdownDiv').style.display = 'none';
  };

  useEffect(() => {
    axios.get('http://localhost:4000/categories/showCategories').then(
      (res) => {
        setCategories(res.data);
        setOriginalCategories(res.data);
        setLoading(false); // Set loading to false after data is fetched
        setAnimate(true); // Trigger animation
      }
    ).catch(
      () => {
        setLoading(false);
      }
    )
  }, []);
  useEffect(() => {
    axios.get('http://localhost:4000/users/auth', { headers: { accessToken: sessionStorage.getItem('accessToken') } }).then(
      (res) => {
        console.log(res);
        if (res.data.error) {
          setAuthState({ ...authState, status: false })
        }
        else {
          setAuthState({ username: res.data.username, status: true, userType: res.data.userType, user_id: res.data.user_id })
        }
      }
    )
  }, [])


  useEffect(() => {
    axios.get('http://localhost:4000/product').then(
      (res) => { setProducts(res.data); setOrignalProducts(res.data); setLoading(false); setAnimate(true); }
    ).catch(
      () => {
        setLoading(false);
      }
    )
  }, []);


  useEffect(() => {
    axios.get(`http://localhost:4000/carts/?user_id=${authState.user_id}`).then(
      (res) => { setCartCount(res.data.length); console.log(res.data); }
    )
  }, [authState])

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  function handleSearchInput(e) {
    const tempinput = e.target.value.toLowerCase();
    console.log(tempinput);
    const filterArray = originalCategories.filter((cat) =>
      cat.name.toLowerCase().includes(tempinput)
    );
    setCategories(filterArray);

    const filterProducts = orignalProducts.filter((product) => {
      return product.name.toLowerCase().includes(tempinput);
    });
    setProducts(filterProducts)
    console.log(filterProducts);

  }





  function handleLogout(e) {
    e.preventDefault();
    sessionStorage.removeItem('accessToken');
    setAuthState({ username: '', status: false, userType: '' });
    document.getElementById('dropdownDiv').style.display = 'none'
  }


  function handleSearchDiv(e) {
    document.getElementById('dropdownDiv').style.display = 'flex';
  }


  return (
    <div className={`App ${animate ? 'fade-in' : ''}`}>
      <AuthContext.Provider value={{ authState, setAuthState, cartCount, setCartCount }}>
        <BrowserRouter>
          <nav className='row navbar align-items-center' style={{ height: '70px', width: '100%', margin: '0px' }} >
            <div className='col-md-3' style={{ position: 'relative' }}>
              <NavLink to='/' className='col-md-12' onClick={(e) => { document.getElementById('dropdownDiv').style.display = 'none' }} style={{ color: 'Black', fontFamily: 'arail', fontSize: '40px', textDecoration: 'none' }}>The Joota Store <GiRunningShoe style={{ position: 'absolute', right: '31%', bottom: '20%', transform: 'rotate(10deg)' }} />
              </NavLink>
            </div>

            <div className='col-md-3' style={{ position: 'relative', zIndex: 101 }}>
              <div style={{ position: 'relative', }}>
                <input type='text' onChange={handleSearchInput} id="searchDiv" onClick={handleSearchDiv} style={{ borderRadius: '20px', fontFamily: "sans-serif", fontSize: '15px', padding: '10px', height: '36px', border: '1px solid #7AB2B2', backgroundColor: '#7AB2B2', width: '80%', color: '#EEF7FF' }} className='text-light' placeholder='Search Style,Brands & more... '></input>
                < IoSearchSharp style={{ height: '36px', position: 'absolute', left: '70%' }} />
              </div>
              <div id="dropdownDiv" style={{ zIndex: 1, width: '150%', height: '600px', position: 'absolute', top: '50px', backgroundColor: '#CDE8E5', display: 'none', justifyContent: 'space-between' }}>
                <div className='left' style={{ backgroundColor: '#f9f9f9', width: '20%' }}>
                  <div className='div1' style={{ fontFamily: 'fantasy', marginLeft: '10px', marginRight: '1px', marginTop: '10px', color: '#7AB2B2', letterSpacing: '1px' }}>Trending<GiRunningShoe /> </div>
                  <hr className='text-dark'></hr>
                  {
                    categories.map((category) => {
                      return <div className='dropdown-categ'><NavLink to={`/categories/${category.name}`} onClick={(e) => { document.getElementById('dropdownDiv').style.display = 'none' }} style={{ marginLeft: '10px', textDecoration: 'none', color: '#7AB2B2', padding: '10px' }}>{category.name}</NavLink></div>
                    })
                  }
                  <div style={{ marginBottom: '30px' }}></div>
                </div>
                <div className='right' style={{ display: 'flex', width: '80%', justifyContent: 'start', gap: '10px', flexWrap: 'wrap', padding: '20px' }}>
                  {
                    products.length == 0 ? (<h1 className='text-dark'>No Products Found</h1>) : (products.slice(0, 8).map((data) => {
                      return (
                        <div className='parent' onClick={() => { }} style={{ cursor: 'pointer', display: 'flex', alignContent: 'space-around', gap: '10px', width: '90px', height: 'auto', justifyContent: 'space-around', fontSize: '15px' }}>
                          <div className='div3' style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#CDE8E5' }}>
                            <NavLink to={`/product/${data.id}`} onClick={(e) => { document.getElementById('dropdownDiv').style.display = 'none' }} style={{ color: 'black', textDecoration: 'none' }}>
                              <div className='' >
                                <div className=''><img src={`http://localhost:4000/uploads/${data.image}`} style={{ height: '50px', width: '50px', }} /></div>
                              </div>
                              <div>
                                <div className='name' style={{ fontFamily: 'fantasy' }}>{data.name}</div>
                                <div className='rating'> {[...Array(data.rating)].map((_, index) => (
                                  <span key={index}>&#9733;</span>
                                ))}</div>
                                <div className='price' style={{ fontFamily: "cursive" }}>{new Intl.NumberFormat('en-IN', {
                                  style: 'currency',
                                  currency: 'INR'
                                }).format(data.price)}</div>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      )
                    })
                    )
                  }
                </div>


              </div>
            </div>


            {!authState.status ? (
              <>
                <div className='col-md-2 justify-content-right nav-item' style={{ position: 'relative' }}>
                  <div onClick={toggleDropdown} className='text-center' style={{ cursor: 'pointer', fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20px', backgroundColor: '#7AB2B2', color: 'white', padding: '5px', borderRadius: '20px', width: '70%', textDecoration: 'none' }}>
                    REGISTER <BsCaretDownFill />
                  </div>
                  {isVisible && (
                    <ul style={{ position: 'absolute', top: '100%', left: '0', backgroundColor: '#7AB2B2', zIndex: '101', padding: '10px', margin: '0', listStyleType: 'none' }}>
                      <li >
                        <NavLink to="/Register" onClick={(e) => setIsVisible(false)} >Register</NavLink>
                      </li>
                      <li>
                        <NavLink to="/Register/seller" onClick={(e) => setIsVisible(false)}  >Register as seller</NavLink>
                      </li>
                    </ul>
                  )}
                </div>
                <div className='col-sm-1 justify-content-right nav-item'>
                  <NavLink to='/Login' onClick={(e) => { document.getElementById('dropdownDiv').style.display = 'none' }} style={{ color: 'yellow', fontFamily: 'Arial', fontSize: '25px', textDecoration: 'none' }}><button className='btn' style={{ color: '#EEF7FF', width: '100px', fontWeight: 'bold', backgroundColor: '#7AB2B2', border: "1px solid white", borderRadius: '20px', boxShadow: '1px 2px 9px #aaf4e5' }}>LOGIN</button></NavLink>
                </div>
              </>
            ) : (
              <div className='col-md-2 nav-item text-center'>
                <NavLink onClick={handleLogout} style={{ color: 'yellow', fontFamily: 'Arial', fontSize: '25px', textDecoration: 'none' }}><button className='btn' style={{ color: '#EEF7FF', fontWeight: 'bold', backgroundColor: '#7AB2B2', border: "1px solid white", borderRadius: '20px', boxShadow: '1px 2px 9px #aaf4e5' }}><CiLogout color='#EEF7FF' size={25} /> LOGOUT ,{authState.username}</button></NavLink>
              </div>
            )}

            {authState.status && (
              <div className='col-md-1 nav-item text-center position-relative'>
                <NavLink to='/carts' onClick={(e) => { document.getElementById('dropdownDiv').style.display = 'none' }} style={{ color: 'yellow', fontFamily: 'Arial', fontSize: '25px', textDecoration: 'none' }}>
                  <FaCartPlus style={{ color: 'black', size: '40px' }} />
                  <span className="position-absolute translate-middle badge" style={{ top: '10%', right: '20%', color: '#7AB2B2' }}>
                    {cartCount}
                  </span>
                </NavLink>
              </div>


            )}

            {authState.userType === 'seller' && (
              <div className='col-md-3 nav-item text-center'>
                <NavLink to='/Dashboard' className='col-md-2' style={{ color: '#EEF7FF', width: '60%', padding: '5px 10px', fontWeight: 'bold', backgroundColor: '#7AB2B2', border: "1px solid white", borderRadius: '20px', boxShadow: '1px 2px 9px #aaf4e5', textDecorationLine: 'none' }}>
                  DASHBOARD
                </NavLink>
              </div>
            )}
          </nav>

          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/Register' exact element={<Register />} />
            <Route path='/Register/:type' exact element={<Register />} />
            <Route path='/Login' exact element={<Login />} />
            <Route path='/product/:id' exact element={<Product />} />
            <Route path='/Carts' exact element={<Carts />} />
            <Route path='/Dashboard' exact element={<Dashboard />} />
            <Route path='/Categories/:name' exact element={<Categories />} />

          </Routes>

        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
