import React, { useContext, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";
import sold_img from '../assets/sold_img.png'
import topselling_img from '../assets/topselling_img.png'
import avg from '../assets/avg.png'
import axios from "axios";
import { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import sneaker_form from '../assets/sneaker_form.png';
import Swal from "sweetalert2";
import Cards from "../helpers/Cards";
import PieChart from "../helpers/PieChart";
import BarChart from "../helpers/BarChart";
function Dashboard() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { authState, setAuthState } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [insights, setInsights] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('male');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(1);
    const [UpdateTable, setUpdateTable] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(1);
    const [productsPerMonth,setProductsPerMonth]=useState([]);
    const [productsByCategory,setProductByCategory]=useState([]);
    const [productsByGender,setProductByGender]=useState([]);
    useEffect(() => {
        if (authState.userType !== 'seller') {
            navigate('/');
            return;
        }
    })

    useEffect(() => {
        axios.get(`${apiUrl}/carts/insights/${authState.user_id}?month=${currentMonth}`).then(
            res => {
                console.log(res);
                setInsights(res.data);
            }
        )
    }, [authState, UpdateTable, currentMonth])

    useEffect(()=>{
        axios.get(`${apiUrl}/product/insights/monthwise`).then((res)=>{
            setProductsPerMonth(res.data)
        });
        axios.get(`${apiUrl}/product/insights/productByCategories`).then((res)=>{
            setProductByCategory(res.data)
        });
        axios.get(`${apiUrl}/product/insights/productByGender`).then((res)=>{
            setProductByGender(res.data)
        });
    })
    useEffect(() => {
        axios.get(`${apiUrl}/categories/showCategories`).then(
            (res) => setCategories(res.data)
        )
    }, [UpdateTable])

    useEffect(() => {
        const month = new Date().getMonth() + 1;
        setCurrentMonth(month);
        console.log('current month is ' + month);
    }, [])

    function deleteProduct(id) {
        Swal.fire({
            title: 'Are you sure ',
            text: 'Do You Want to Delete ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
        }).then(
            (result) => {
                if (result.isConfirmed) {
                    axios.delete(`${apiUrl}/product/delete/${id}`, { headers: { accessToken: sessionStorage.getItem('accessToken') } }).then(
                        (res) => {
                            if (res.data.error) {
                                alert('user not logged in');
                                console.log(res);
                                return;
                            }
                            setUpdateTable(!UpdateTable)
                        }
                    ).catch(
                        (err) => { console.log(err); }
                    )
                    console.log(id);
                }
                else {

                }

            }
        )
    }

    async function handleUpdate(msg, value, field, id, inputType) {
        const { value: newPrice, isConfirmed } = await Swal.fire({
            title: 'Update',
            input: inputType,
            inputLabel: msg,
            inputValue: value,
            showCancelButton: true,
            inputAttributes: {
                min: 1,
                step: 1
            }
        });
        if (isConfirmed) {
            axios.put(`${apiUrl}/product/${id}`, { field: field, value: newPrice }).then((res) => {
                setUpdateTable(true);
                console.log('updatded')
                console.log(res.data);
            })
        }

    }
    function handleForm(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('category', category);
        formData.append('gender', gender);
        formData.append('description', description);
        formData.append('rating', rating);

        formData.append('seller_id', authState.user_id)

        axios.post(`${apiUrl}/product/addProduct`, formData).then((res) => {
            console.log(res)
            if (res.data) {
                alert('Product added Succesfully');
                return res.data;
            }
        }).then
            (
                (id) => navigate(`/product/${id.insertId}`)
            ).catch((err) => console.log(err))

    }

    return (
        <div className="p-3 m-4" >
            <div style={{ display: 'flex', flexDirection: 'row', gap: '60px', justifyContent: 'center', padding: '10px', marginTop: '50px' }}>
                <div>
                    <select className="form-control" value={currentMonth} onChange={(e) => setCurrentMonth(e.target.value)}>
                        <option value='0' >Gross</option>
                        <option value='1'>January</option>
                        <option value='2'>Feburary</option>
                        <option value='3'>March</option>
                        <option value='4'>April</option>
                        <option value='5'>May</option>
                        <option value='6'>June</option>
                        <option value='7'>July</option>
                        <option value='8'>August</option>
                        <option value='9'>September</option>
                        <option value='10'>October</option>
                        <option value='11'>November</option>
                        <option value='12'>December</option>
                    </select>
                </div>
                <Cards
                    image={sold_img}
                    heading='Total Items Sold'
                    value={insights.total_purchase}
                />
                <Cards
                    image={avg}
                    heading='Total Return'
                    value={insights.total_return}
                />
                <Cards
                    image={avg}
                    heading='Average Price'
                    value={insights.avg_price}
                />
                <Cards
                    image={topselling_img}
                    heading='Top Selling Product'
                    value={insights.top_selling_product}
                />
                <Cards
                    image={sold_img}
                    heading='Total Products'
                    value={insights.total_products ? insights.total_products.length : 0}
                />
            </div>
            <br></br>
            <br></br>

            <div className="d-flex justify-content-center gap-5 m-4">
                <div className="graph p-3" >
                    <h1 style={{backgroundColor:'#cae9ef'}}>Products Per Month</h1>
                    {productsPerMonth &&  <PieChart data={productsPerMonth} ></PieChart>}
                </div>
                <div className="graph p-3" >
                <h1 style={{backgroundColor:'#cae9ef'}}>Products Per Category</h1>
                {productsByCategory &&  <BarChart data={productsByCategory} ></BarChart>}
                </div>
                <div className="graph p-3">
                <h1 style={{backgroundColor:'#cae9ef'}}>Products Per Gender</h1>
                {productsByGender &&  <PieChart data={productsByGender} ></PieChart>}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '700px', alignItems: 'center', boxShadow: '1px 2px 9px grey', borderRadius: '10px', padding: '10px', backgroundColor: '#CDE8E5' }} >
                    <div style={{ height: 'auto' }} >
                        <img src={sneaker_form} style={{ height: '200px', width: '200px' }} ></img>
                    </div>
                    <div style={{ width: '300px' }}>
                        <form onSubmit={handleForm} encType='multipart/form-data'>
                            <div className="form-group">
                                <label>Enter Product Name</label>
                                <input required className="form-control" type="text" onChange={(e) => setName(e.target.value)} ></input>
                            </div>
                            <br></br>

                            <div className="form-group">
                                <label>Enter Price</label>
                                <input required className="form-control" type="number" min="0" onChange={(e) => setPrice(e.target.value)} ></input>
                            </div>
                            <br></br>

                            <div className="form-group">
                                <label>Attach Product Image</label>
                                <input required className="form-control" type="file" onChange={(e) => setImage(e.target.files[0])} ></input>
                            </div>
                            <br></br>

                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" onChange={(e) => setCategory(e.target.value)} >
                                    <option value="choose">Choose</option>
                                    {
                                        categories.map((category) => {
                                            return <option value={category.id}>{category.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label>Enter Description </label>
                                <textarea required onChange={(e) => setDescription(e.target.value)} className="form-control" type="number" min="0" defaultValue="Elevate your performance with our cutting-edge sports shoes designed to push boundaries and unlock your full potential. Crafted with precision engineering and innovative technology, our shoes offer unparalleled comfort, support, and durability, ensuring you stay at the top of your game during every workout or competition. Whether you're hitting the track, dominating the court, or conquering the trails, our sports shoes will be your ultimate companion, empowering you to go further, faster, and stronger than ever before. Step into greatness and unleash your athletic prowess with our premium sports shoes." ></textarea>
                            </div>
                            <br></br>

                            <div className="form-group">
                                <label>Select Gender</label>
                                <select className="form-control" onChange={(e) => setGender(e.target.value)}>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>
                            <br></br>

                            <div className="form-group">
                                <label >Give Rating</label>
                                <select className="form-control" onChange={(e) => setRating(e.target.value)}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </select>
                            </div>
                            <br></br>


                            <div className="form-group text-center">
                                <label> </label>
                                <input style={{ background: '#7AB2B2', border: "5px solid white", boxShadow: '1px 2px 9px #aaf4e5', borderRadius: '20px', color: 'white', fontWeight: '600' }} className="btn btn-success" type="submit" value="Add Product"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <hr></hr>

            {insights.total_products && insights.total_products.length > 0 && (<div id='table-products' >
                <table className="table-striped " style={{ backgroundColor: '', width: '100%' }}>
                    <thead style={{ borderBottom: '3px solid aqua', backgroundColor: '#7AB2B2', color: 'white' }}>
                        <tr className="text-center">
                            <th>Sr.No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Min&nbsp;Size</th>
                            <th>Max&nbsp;Size</th>
                            <th>Gender</th>
                            <th>Summer Collection</th>
                            <th>40% Off</th>
                            <th>Delete</th>
                            <th>View</th>

                        </tr>
                    </thead>
                    <tbody>
                        {insights.total_products && insights.total_products.length > 0 && (
                            insights.total_products.map((product, index) => (
                                <tr key={index} style={{ borderBottom: '3px solid aqua' }}>
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3"> <img src={`http://localhost:4000/uploads/${product.image}`} style={{ height: '100px', width: '100px' }} /></td>
                                    <td className="p-3">{product.name}</td>
                                    <td className="p-3" style={{ cursor: 'pointer' }} onClick={() => handleUpdate('enter price', product.price, 'price', product.id, 'number')} >&#8377;{product.price}</td>
                                    <td className="p-3">{product.description.slice(0, 100)}</td>
                                    <td className="p-3">{product.minsize}</td>
                                    <td className="p-3">{product.maxsize}</td>
                                    <td className="p-3" style={{ cursor: 'pointer' }} onClick={() => handleUpdate('enter price', product.gender, 'gender', product.id, 'text')}>{product.gender}</td>
                                    <td className="p-3" style={{ cursor: 'pointer' }} onClick={() => handleUpdate('Add To Summer Collection ? yes/no', product.summer_collection, 'summer_collection', product.id, 'text')}>{product.summer_collection}</td>
                                    <td className="p-3" style={{ cursor: 'pointer' }} onClick={() => handleUpdate('Want to give 40 % off ? yes/no', product.discount_40, 'discount_40', product.id, 'text')}>{product.discount_40}</td>
                                    <td className="p-3"><button style={{ color: 'red', backgroundColor: '#7AB2B2', border: "1px solid white", boxShadow: '1px 2px 3px yellowgreen', borderRadius: '2px', fontWeight: '700' }} onClick={() => deleteProduct(product.id)} className="btn ">Delete</button></td>
                                    <td><button className="btn" style={{ color: 'black', backgroundColor: '#7AB2B2', border: "1px solid white", boxShadow: '1px 2px 3px yellowgreen', borderRadius: '2px', color: 'white', fontWeight: '700' }} onClick={() => navigate(`/product/${product.id}`)}>&nbsp;View&nbsp;</button></td>


                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>)}
        </div>
    )
}

export default Dashboard;