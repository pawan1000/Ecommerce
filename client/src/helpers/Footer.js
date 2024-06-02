import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Footer = (items) => {
  const navigate = useNavigate();
  return (
    <footer className="footer text-dark py-4" style={{ backgroundColor: '#CDE8E5' }}>
      <div className="container2 p-3">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p><strong>The Joota Store </strong>is dedicated to crafting comfortable and stylish footwear for every occasion. With a focus on quality materials and expert craftsmanship, we create shoes that support your every step with confidence and style.</p>
          </div>
          <div className="col-md-4">
            <h5>Useful Links</h5>
            <ul className="list-unstyled ">
              <li style={{ backgroundColor: '#CDE8E5', cursor: 'pointer' }}><a className='text-dark' onClick={() => navigate('/')} style={{ textDecoration: 'none' }}>Home</a></li>
              <li style={{ backgroundColor: '#CDE8E5', cursor: 'pointer' }}><a className='text-dark' onClick={() => { document.getElementById('searchDiv').focus(); document.getElementById('searchDiv').click() }} style={{ textDecoration: 'none' }}>Search</a></li>
              <li style={{ backgroundColor: '#CDE8E5', cursor: 'pointer' }}><a className='text-dark' onClick={() => navigate('categories/sandals')} style={{ textDecoration: 'none' }}>Sandals</a></li>
              <li style={{ backgroundColor: '#CDE8E5', cursor: 'pointer' }}><a className='text-dark' onClick={() => navigate('categories/flat-40-off')} style={{ textDecoration: 'none' }}>Sale</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Trending</h5>
            <ul className="list-unstyled" >
              <li style={{ backgroundColor: '#CDE8E5', cursor: 'pointer' }}><a className='text-dark' onClick={() => navigate('/categories/sneakers')} style={{ textDecoration: 'none' }}>Sneakers</a></li>
              <li style={{ backgroundColor: '#CDE8E5', cursor: 'pointer' }}><a className='text-dark' onClick={() => navigate('/categories/boots')} style={{ textDecoration: 'none' }}>Boots</a></li>
              <li style={{ backgroundColor: '#CDE8E5', cursor: 'pointer' }}><a className='text-dark' onClick={() => navigate('/categories/casual')} style={{ textDecoration: 'none' }}>Casual</a></li>
              <li style={{ backgroundColor: '#CDE8E5', cursor: 'pointer' }}><a className='text-dark' onClick={() => navigate('/categories/partyware')} style={{ textDecoration: 'none' }}>Partyware</a></li>
            </ul>
          </div>
          <div className="col-md-4 text-md-right">
            <h5>Subscribe to Our Newsletter</h5>
            <form className="form-inline">
              <div className="input-group mb-3 col-md-6">
                <input type="text" className="form-control col-md-6" placeholder="example@email.com" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                  <div className="input-group-append">
                    <button className="" style={{backgroundColor:'#7AB2B2',color:'white',border:'3px solid #7AB2B2'}} type="button">Subscribe</button>
                  </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
