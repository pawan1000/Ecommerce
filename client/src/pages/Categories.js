import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import img1 from '../assets/img1.jpg'
import Footer from "../helpers/Footer";
import Pagination from "../helpers/Pagination";
import ProductCard from "../helpers/ProductCard";
import Swal from "sweetalert2";
import HomeNav from "../helpers/HomeNav";
function Categories() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [category, setCategory] = useState([]);
    const { name } = useParams();
    const [categoryCount, setCategoryCount] = useState(0);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    let page = searchParams.get('page') || 0;

    function toggleAddToCartButton(btnId, hide = true) {
        const btn = document.getElementById(btnId);
        if (hide)
            btn.style.display = 'none';
        else
            btn.style.display = 'block';
    }


    function showAlert() {
        Swal.fire({
            title: 'Item added to cart Succesfully',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/carts');
            }
        });
    }


    useEffect(
        () => {
            console.log(name)
            if (name == 'men' || name == 'women' || name == 'summer-collection' || name == 'flat-40-off') {
                axios.get(`${apiUrl}/product/filter/${name}?page=${page}`).then(
                    (res) => { setCategory(res.data.rows); setCategoryCount(res.data.total) }
                )
            }
            else {
                axios.get(`${apiUrl}/categories/${name}?page=${page}`).then(
                    (res) => {
                        setCategory(res.data.rows); setCategoryCount(res.data.total); console.log(res);
                    }
                )
            }
        }
        , [name, page]
    )

    if (category && category.length == 0) {
        return (
            <div className="d-flex  flex-column">
                <HomeNav />
                <Footer />
            </div>
        )
    }
    return (
        <div>
            <HomeNav />

            <div style={{ display: 'flex', gap: '40px', flexDirection: 'row', flexFlow: 'wrap', justifyContent: 'start', margin: '30px' }}>
                {
                    category.map((item, index) => {
                        return (
                            <ProductCard
                                type={name}
                                item={item}
                                index={index}
                                toggleAddToCartButton={toggleAddToCartButton}
                                showAlert={showAlert}
                            />
                        )
                    })
                }
            </div>

            {
                categoryCount > 0 ? (<Pagination totalRecords={categoryCount} />) : ''
            }


            <Footer />

        </div>
    )
}

export default Categories;



