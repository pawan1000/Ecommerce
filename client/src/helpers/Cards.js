import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Cards = ({image,heading,value}) => {
    return (
        <Card style={{ width: '10rem', backgroundColor: '#CDE8E5', border: "1px solid white", boxShadow: '1px 2px 9px grey', borderRadius: '20px' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body className="text-center">
                <div style={{ height: '60px' }}><Card.Title>{heading}</Card.Title></div>
                <Button style={{ color: 'white', fontStyle:'', fontWeight: 'bold', backgroundColor: '#7AB2B2', border: "1px solid white", boxShadow: '1px 2px 9px #aaf4e5' }}>{value}</Button>
            </Card.Body>
        </Card>
    )
}

export default Cards
