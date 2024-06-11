import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import img1 from '../assets/img1.jpg'
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Swal from 'sweetalert2'
import { FaAnglesRight } from "react-icons/fa6";
import Footer from "../helpers/Footer";
import { useNavigate } from "react-router-dom";
function Carts() {  
    const apiUrl=process.env.REACT_APP_API_URL;
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const { authState, setAuthState, cartCount, setCartCount } = useContext(AuthContext);
const navigate=useNavigate();
    const updatedItems = [...items];
    let total = 0;
    let shipmentFee = 100;


    function handleQuantity(increment = false, index = 0) {
        if (increment) {
            updatedItems[index].quantity += 1;
            console.log(items);
        }
        else {
            updatedItems[index].quantity -= 1; // Decrement quantity
            if (updatedItems[index].quantity < 0) {
                updatedItems[index].quantity = 0; // Ensure quantity doesn't go below 0
            }
        }
        setItems(updatedItems);
    }

    function handleDelete(id) {
        Swal.fire({
            title: 'Are you sure ',
            text: 'Do You Want to Remove item from cart?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
        }).then(
            (result) => {
                if (result.isConfirmed) {
                    axios.delete(`${apiUrl}/carts/delete/${id}`, { headers: { accessToken: sessionStorage.getItem('accessToken') } }).then(
                        (res) => {
                            if (res.data.error) {
                                alert('user not logged in');
                                console.log(res);
                                return;
                            }
                            else {
                                setCartCount(cartCount - 1);
                            }
                        }
                    ).catch(
                        (err) => { console.log(err); }
                    )

                    const filterlist = items.filter((item) => item.id != id)
                    setItems(filterlist);
                    console.log(id);
                }
                else {

                }

            }
        )

    }

    function addToPurchase(product) {
        Swal.fire({
            title: 'Thank You  ',
            text: `For Purchasing ${[product.name]}`,
            icon: 'success',
            confirmButtonText: 'OK',

        }).then(
            () => {
                axios.put(`${apiUrl}/carts/update/${product.id}`, { headers: { accessToken: sessionStorage.getItem('accessToken') } }).then(
                    (res) => {
                        if (res.data.error) {
                            alert('user not logged in');
                            console.log(res);
                            return;
                        }
                        else {
                            setCartCount(cartCount - 1)
                        }
                    }
                ).catch(
                    (err) => { console.log(err); }
                )

                const filterlist = items.filter((item) => item.id != product.id)
                setItems(filterlist);
                console.log(product.id);
            }
        )

    }

    useEffect(() => {
        axios.get(`${apiUrl}/carts/?user_id=${authState.user_id}`).then(
            (res) => { setItems(res.data); console.log(res.data); }
        )
    }, [authState])

    useEffect(() => {
        axios.get(`${apiUrl}/carts/categories`).then(
            (res) => setCategories(res.data)
        )
    }, [])

    return (
        <div>
            <div className="p-3 m-4 d-flex flex-column">
                <br></br>

                {items.length > 0 ? (<table className="table-striped" style={{ backgroundColor: '', width: '80%', marginLeft: '40px' }}>
                    <thead className="text-center  text-center" style={{ borderBottom: '3px solid aqua', padding: '10px', margin: '20px',backgroundColor:'#7AB2B2',color:'white' }}>
                        <tr className="" >
                            <th className="p-3">Sr No</th>
                            <th>Products</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Size</th>
                            <th>Total</th>
                            <th>Remove</th>
                            <th>Buy</th>
                            <th>View </th>
                        </tr>
                    </thead>
                    <tbody className="text-center" >
                        {
                            items.map((item, index) => {
                                total += item.price * item.quantity;
                                return (
                                    <tr style={{ borderBottom: '3px solid aqua', margin: '10px' }}>
                                        <td>{index + 1}</td>
                                        <td><img src={`http://localhost:4000/uploads/${item.image}`} style={{ height: '50px', width: '50px', margin: '10PX' }}></img></td>
                                        <td>{item.name}</td>
                                        <td>&#8377;{item.price}</td>
                                        <td><button style={{ color: 'black',backgroundColor:'#7AB2B2', border: "1px solid white", boxShadow: '1px 2px 9px #aaf4e5', borderRadius: '2px' }} onClick={() => handleQuantity(false, index)}>-</button>
                                            < span style={{ margin: '10px' }} >{item.quantity}</span>
                                            <button style={{ color: 'black', backgroundColor:'#7AB2B2', border: "1px solid white", boxShadow: '1px 2px 9px #aaf4e5', borderRadius: '2px' }} onClick={() => { handleQuantity(true, index) }} >+</button>
                                        </td>
                                        <td>{item.size}</td>

                                        <td>&#8377;{item.price * item.quantity}</td>
                                        <td style={{ cursor: 'pointer' }} onClick={() => { handleDelete(item.id) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                        </svg></td>
                                        <td><button className="btn" style={{ color: 'black', backgroundColor:'#7AB2B2', border: "1px solid white", boxShadow: '1px 2px 3px yellowgreen', borderRadius: '2px',color:'white',fontWeight:'700' }} onClick={() => addToPurchase(item)}>&nbsp;Buy&nbsp;</button></td>
                                        <td><button className="btn" style={{ color: 'black', backgroundColor:'#7AB2B2', border: "1px solid white", boxShadow: '1px 2px 3px yellowgreen', borderRadius: '2px', color:'white',fontWeight:'700'}} onClick={() => navigate(`/product/${item.product_id}`)}>&nbsp;View&nbsp;</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                ) : (<div className="bg-white" style={{ height: '90px', padding: '10px 20px' }}>
                    <h1 className="text-center">No Items in Cart</h1>
                </div>)}

                {
                    items.length != 0 &&
                    (

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                            <div className='left' style={{ borderRadius: '3px', margin: '40px', backgroundColor:'#7AB2B2',color:'white', border: '1px solid black' }}>
                                <div className="bg-light fw-bold text-dark text-center p-1">Coupon</div>
                                <div className="p-2">If you have any promo code please apply it here</div>
                                <div className="d-flex justify-content-between p-3 ">
                                    <input type="text" className="p-1 bg-dark" style={{letterSpacing:'1px',color:'#7AZ9Z2',border:'1px solid white',color:'white'}} placeholder="Enter Promo Code"></input>
                                    <input type="submit" className="bg-dark text-light" style={{ fontSize: '10px', width: '140px', fontWeight: 'bold', letterSpacing: '3px' }} value='APPLY COUPON'></input>
                                </div>
                            </div>

                            <div className='right' style={{ borderRadius: '3px', margin: '40px', backgroundColor:'#7AB2B2',color:'white', border: '1px solid black', width: '400px' }}>
                                <div className="bg-light text-dark fw-bold text-center p-1">Cart Total</div>
                                <div className="d-flex justify-content-between" style={{ padding: '2px 4px' }}>
                                    <div> Subtotal</div>
                                    <div> &#8377;{total}</div>
                                </div>
                                <div className="d-flex justify-content-between " style={{ padding: '2px 4px' }}>
                                    <div> Shipping</div>
                                    <div>&#8377;{shipmentFee}</div>
                                </div>
                                <hr style={{ color: 'black' }}></hr>
                                <div className="d-flex justify-content-between" style={{ padding: '2px 4px' }}>
                                    <div> Total</div>
                                    <div> <b>&#8377;{total + shipmentFee}</b></div>
                                </div>
                                <div className="text-center bg-dark text-light p-1" style={{ cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px', fontSize: '20px' }}>Procced to Checkout <FaAnglesRight /></div>
                            </div>

                        </div>

                    )
                }

            </div>
            <Footer />
        </div>
    )
}

export default Carts;