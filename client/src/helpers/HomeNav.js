import React from "react";
import { useNavigate, useParams } from "react-router-dom";
const HomeNav = () => {
    const params=useParams();
    const categoryName=(params.name)
    const navigate = useNavigate();
    return (
        <div className='div1 bg-dark text-light' style={{ display: 'flex', justifyContent: 'center', gap: '70px', position: 'sticky', top: '0', zIndex: '100', backgroundColor: 'white' }}>
            <div className={`nav-category hvr-underline-from-left  ${categoryName=='men' ? ' selected-category' :''} `} onClick={() => navigate('/categories/men')} >Mens</div>
            <div className={`nav-category hvr-underline-from-left  ${categoryName=='kids' ? ' selected-category' :''} `} onClick={() => navigate('/categories/kids')} >Kids</div>
            <div className={`nav-category hvr-underline-from-left  ${categoryName=='women' ? ' selected-category' :''} `} onClick={() => navigate('/categories/women')}>Womens</div>
            <div className={`nav-category hvr-underline-from-left  ${categoryName=='sandals' ? ' selected-category' :''} `} onClick={() => navigate('/categories/sandals')}>Sandals</div>
            <div className={`nav-category hvr-underline-from-left  ${categoryName=='summer-collection' ? ' selected-category' :''} `} onClick={() => navigate('/categories/summer-collection')}>Summer Collection</div>
            <div className={`nav-category hvr-underline-from-left  ${categoryName=='flat-40-off' ? ' selected-category' :''} `} onClick={() => navigate('/categories/flat-40-off')}>Flat 40% off</div>
        </div>
    )
}

export default HomeNav;