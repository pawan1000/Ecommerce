import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ type, item, index, toggleAddToCartButton, }) => {
    const navigate = useNavigate();
    return (
        <div style={{ margin: '10px', position: 'relative' }} onMouseOver={(e) => { toggleAddToCartButton(`${type}${index + 1}`, false); }} onMouseOut={() => toggleAddToCartButton(`${type}${index + 1}`, true)}>
            <Card style={{ width: '20rem', background: '#e0f7fa', border: '1px solid white', borderRadius: '10px' }}>
                <div style={{ position: 'relative' }}>
                    {item.discount_40 === 'yes' && (
                        <span style={{ position: 'absolute', top: '5px', left: '5px' }}>
                            <button style={{ borderRadius: '30px', fontSize: '20px', transform: 'rotate(330deg)', color: 'white', backgroundColor: 'red', border: '1px solid red', boxShadow: '1px 1px 5px 2px yellow' }}>sale</button>
                        </span>
                    )}
                    <Card.Img className='card-img' variant="top" src={`http://localhost:4000/uploads/${item.image}`} style={{ height: '250px', objectFit: 'cover' }} onClick={(e) => navigate(`/product/${item.id}`)} />
                </div>
                <Card.Body>
                    <Card.Title className='product-name' style={{ fontWeight: 'bold' }}>{item.name}</Card.Title>
                    <Card.Text>
                        {item.discount_40 === 'yes' ? (
                            <>
                                <del style={{ color: 'darkgray' }}>&#8377;{item.price / 0.4}</del>  &#8377;{item.price}
                            </>
                        ) : (
                            <>&#8377;{item.price}</>
                        )}
                        <br />
                        <div className='rating'>
                            {[...Array(item.rating)].map((_, index) => (
                                <span key={index}>&#9733;</span>
                            ))}
                        </div>
                    </Card.Text>
                    <div className='d-flex justify-content-center'>
                        <button className='text-center add-to-cart' id={`${type}${index + 1}`} onClick={(e) => navigate(`/product/${item.id}`)}>View Product</button>
                    </div>
                </Card.Body>
            </Card>
        </div>


    )
}

export default ProductCard
