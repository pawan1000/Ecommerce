import React, { useContext, useState, useEffect } from "react";
import { FaCartPlus } from 'react-icons/fa';
import { CiLogout } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";
import { BsCaretDownFill } from "react-icons/bs";
import { GiRunningShoe } from "react-icons/gi";
import {  useNavigate } from "react-router-dom";
import LoadingSpinner from "../helpers/LoadingSpinner";
import { AuthContext } from "../helpers/AuthContext";
import axios from 'axios';

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [originalCategories, setOriginalCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const { authState, setAuthState, cartCount, setCartCount } = useContext(AuthContext);
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setIsVisible(!isVisible);
        document.getElementById('dropdownDiv').style.display = 'none';
    };

    function handleSearchInput(e) {
        const tempinput = e.target.value.toLowerCase();
        const filterArray = originalCategories.filter((cat) =>
            cat.name.toLowerCase().includes(tempinput)
        );
        setCategories(filterArray);
        const filterProducts = originalProducts.filter((product) =>
            product.name.toLowerCase().includes(tempinput)
        );
        setProducts(filterProducts);
    }

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:4000/categories/showCategories')
            .then((res) => {
                setCategories(res.data);
                setOriginalCategories(res.data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:4000/product')
            .then((res) => {
                setProducts(res.data);
                setOriginalProducts(res.data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:4000/carts/?user_id=${authState.user_id}`)
            .then((res) => {
                setCartCount(res.data.length);
                setLoading(false);
            });
    }, [authState, setCartCount]);

    function handleLogout(e) {
        e.preventDefault();
        sessionStorage.removeItem('accessToken');
        setAuthState({ username: '', status: false, userType: '' });
        document.getElementById('dropdownDiv').style.display = 'none';
    }

    function handleSearchDiv() {
        document.getElementById('dropdownDiv').style.display = 'flex';
    }

    if (loading) {
        return <LoadingSpinner />; // Show spinner while loading
    }

    return (
        <div className='d-flex flex-md-row flex-column align-items-center justify-content-between flex-wrap' style={{ margin: '0px', width: '100%', backgroundColor: '#CDE8E5' }}>
            <div className='' onClick={() => { document.getElementById('dropdownDiv').style.display = 'none'; navigate('/') }} style={{ width: '30%', position: 'relative', color: 'Black', fontFamily: 'arial', fontSize: '40px', cursor: 'pointer', textDecoration: 'none' }}>
                The Joota Store <GiRunningShoe style={{ position: 'absolute', bottom: '20%', transform: 'rotate(10deg)' }} />
            </div>

            <div className='' style={{ width: '30%', position: 'relative', zIndex: 101 }}>
                <div style={{ position: 'relative', width: '100%' }}>
                    <input type='text' className='inputSearch' onChange={handleSearchInput} id="searchDiv" onClick={handleSearchDiv} style={{ borderRadius: '20px', fontFamily: "sans-serif", fontSize: '15px', padding: '10px', height: '36px', border: '1px solid #7AB2B2', backgroundColor: '#7AB2B2', width: '100%', color: 'white' }} placeholder='Search Style,Brands & more... ' />
                    <IoSearchSharp style={{ height: '36px', position: 'absolute', left: '90%' }} />
                </div>
                <div id="dropdownDiv" style={{ zIndex: 1, width: '100%', height: '600px', position: 'absolute', top: '50px', backgroundColor: '#CDE8E5', display: 'none', justifyContent: 'space-between' }}>
                    <div className='left' style={{ backgroundColor: '#f9f9f9', width: '30%' }}>
                        <div className='div1' style={{ fontFamily: 'fantasy', marginLeft: '10px', marginRight: '1px', marginTop: '10px', color: '#7AB2B2', letterSpacing: '1px' }}>Trending<GiRunningShoe /></div>
                        <hr className='text-dark' />
                        {
                            categories.map((category) => (
                                <div key={category.name} className='dropdown-categ' onClick={() => { navigate(`/categories/${category.name}`); document.getElementById('dropdownDiv').style.display = 'none' }} style={{ marginLeft: '10px', cursor: 'pointer', textDecoration: 'none', color: '#7AB2B2', padding: '10px' }}>
                                    {category.name}
                                </div>
                            ))
                        }
                        <div style={{ marginBottom: '30px' }}></div>
                    </div>
                    <div className='right' style={{ display: 'flex', width: '100%', justifyContent: 'start', gap: '10px', flexWrap: 'wrap', padding: '20px' }}>
                        {
                            products.length === 0 ? (
                                <h1 className='text-dark'>No Products Found</h1>
                            ) : (
                                products.slice(0, 8).map((data) => (
                                    <div key={data.id} className='parent' style={{ cursor: 'pointer', display: 'flex', alignContent: 'space-around', gap: '10px', width: '90px', height: 'auto', justifyContent: 'space-around', fontSize: '15px' }}>
                                        <div className='div3 product-navlink' onClick={() => { navigate(`/product/${data.id}`); document.getElementById('dropdownDiv').style.display = 'none' }} style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#CDE8E5', color: 'black', textDecoration: 'none' }}>
                                            <div>
                                                <div><img src={`http://localhost:4000/uploads/${data.image}`} alt={data.name} style={{ height: '50px', width: '50px' }} /></div>
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
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>

            {!authState.status ? (
                <>
                    <div className='' style={{ position: 'relative', width: '10%', display: 'flex', justifyContent: 'flex-end' }}>
                        <div onClick={toggleDropdown} className='' style={{ cursor: 'pointer', fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20px', backgroundColor: '#7AB2B2', color: 'white', padding: '5px', borderRadius: '20px', textDecoration: 'none' }}>
                            REGISTER <BsCaretDownFill />
                        </div>
                        {isVisible && (
                            <ul style={{ cursor: 'pointer', position: 'absolute', top: '100%', left: '0', backgroundColor: '#7AB2B2', zIndex: '101', listStyleType: 'none' }}>
                                <li onClick={() => { navigate(`/Register`); setIsVisible(false) }}>Register</li>
                                <li onClick={() => { navigate(`/Register/seller`); setIsVisible(false) }}>Register as seller</li>
                            </ul>
                        )}
                    </div>
                    <div className='nav-item' style={{ width: '10%', display: 'flex', justifyContent: 'flex-end' }}>
                        <button className='btn' onClick={() => { document.getElementById('dropdownDiv').style.display = 'none'; navigate('/Login') }} style={{ color: 'white', width: '100px', fontWeight: 'bold', backgroundColor: '#7AB2B2', border: "1px solid white", borderRadius: '30px', boxShadow: '1px 2px 9px #aaf4e5' }}>LOGIN</button>
                    </div>
                </>
            ) : (
                <div className=' ' style={{ width: '15%', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className='btn' onClick={(e) => { handleLogout(e); navigate('/') }} style={{ color: '#EEF7FF', fontWeight: 'bold', backgroundColor: '#7AB2B2', border: "1px solid white", borderRadius: '20px', boxShadow: '1px 2px 9px #aaf4e5' }}>
                        <CiLogout color='#EEF7FF' size={25} /> LOGOUT ,{authState.username}
                    </button>
                </div>
            )}

            {authState.status && (
                <div className=' nav-item  position-relative' style={{ width: '5%', padding: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                    <div onClick={() => { document.getElementById('dropdownDiv').style.display = 'none'; navigate('/carts') }} style={{ color: 'yellow', cursor: 'pointer', fontFamily: 'Arial', fontSize: '25px', textDecoration: 'none' }}>
                        <FaCartPlus style={{ color: 'black', size: '40px' }} />
                        <span className="position-absolute translate-middle badge" style={{ top: '26%', left: '70%', color: '#7AB2B2' }}>
                            {cartCount}
                        </span>
                    </div>
                </div>
            )}

            {authState.userType === 'seller' && (
                <div className=' nav-item text-center' onClick={() => navigate('/Dashboard')} style={{ cursor: 'pointer', width: '10%', display: 'flex', justifyContent: 'flex-end', color: '#EEF7FF', padding: '5px 10px', fontWeight: 'bold', backgroundColor: '#7AB2B2', border: "1px solid white", borderRadius: '20px', boxShadow: '1px 2px 9px #aaf4e5', textDecorationLine: 'none' }}>
                    DASHBOARD
                </div>
            )}
        </div>
    );
};

export default Navbar;
