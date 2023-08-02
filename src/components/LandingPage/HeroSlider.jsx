import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true, // Set centerMode to true
    centerPadding: "0", // Remove the padding for centerMode
    arrows: false, // Remove the default arrows
  };

  return (
    <div className="text">
      <Slider {...settings}>
        <div className="slide slide1">
          <div className="container">
            <div className="row wordAdjust">
              <div className="col-12 text-center text-white">
                <h1 className="display-3 my-4">
                  Embrace Boundless Opportunities
                </h1>
                <p className="text-white pSize">
                  TechMeet Talent Cloud, Uniting Global Technical Talent -
                  Source, Assess <br></br> Connect, Hire, and Collaborate, All in One
                  Place  </p>
                <a href="#" className="btn btn-brand">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="slide slide2">
          <div className="container">
            <div className="row wordAdjust">
              <div className="col-12 col-lg-10 offset-lg-1 text-white">
                
                <h1 className="display-3 my-4">
                  Unlock Limitless Opportunities with TechMeet
                </h1>
                <p className="text-white pSize">
                  TechMeet Talent Cloud: Your All-in-One Hub for Global<br></br>
                  Technical Talent - Connect, Collaborate, and Succeed
                </p>
                <a href="#" className="btn btn-brand">
                  Get Started
                </a>
               
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HeroSlider;
