import "./style.css";
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light">
      <div className="footer-top text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h4 className="navbar-brand">TechMeet<span className="dot">.</span></h4>
              <p>
              Your Gateway to Success in the World of Tech. Let's make an impact, together.</p>
              <div className="col-auto social-icons">
                <a href="#"><i className='bx bxl-facebook'></i></a>
                <a href="#"><i className='bx bxl-twitter'></i></a>
                <a href="#"><i className='bx bxl-instagram'></i></a>
                <a href="#"><i className='bx bxl-pinterest'></i></a>
              </div>
              <div className="col-auto conditions-section">
                <a href="#">privacy</a>
                <a href="#">terms</a>
                <a href="#">disclaimer</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <p className="mb-0">Copyright techmeet 2023. All rights Reserved</p> 
      </div>
    </footer>
  );
};

export default Footer;
