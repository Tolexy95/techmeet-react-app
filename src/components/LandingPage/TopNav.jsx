import React from 'react';
import '../style.css';

const TopNav = () => {
  return (
    <div className="top-nav" id="home">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-auto">
            <p> <i className='bx bxs-envelope'></i> info@example.com</p>
            <p> <i className='bx bxs-phone-call'></i> 123 456-7890</p>
          </div>
          <div className="col-auto social-icons">
            <a href="#"><i className='bx bxl-facebook'></i></a>
            <a href="#"><i className='bx bxl-twitter'></i></a>
            <a href="#"><i className='bx bxl-instagram'></i></a>
            <a href="#"><i className='bx bxl-pinterest'></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
