import React, { useState } from "react";
import Slider from "react-slick";
import "./style.css";
import teamOneImg from "../../assets/img/Aliyu_pix-removebg-preview.png";
import teamTwoImg from "../../assets/img/Waliyat_pix-removebg-preview.png";
import teamThreeImg from "../../assets/img/Taiwo Image.jpg";

const MeetDevelopers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const developers = [
    {
      name: "Aliyu",
      role: ".Net Developer",
      image: teamOneImg,
      review:
        "A skilled and passionate .Net developer with a strong background in designing and implementing robust software solutions.",
    },

    {
      name: "Waliyah Okunade",
      role: "React developer",
      image: teamTwoImg,
      review:
        "A passionate frontend developer focusing on React. With grate expertise in HTML, CSS, and JavaScript.",
    },
    {
      name: "Taiwo Raji",
      role: "React developer",
      image: teamThreeImg,
      review:
        "A passionate frontend developer focusing on React. With expertise in HTML, CSS, and JavaScript, I create clean code and user-centric designs.",
    },
    // Add more developers as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    customPaging: (i) => (
      <div className="dotPage">
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: i === currentSlide ? "#ff4d29" : "#ccc",
            display: "inline-block",
            margin: "0 5px",
          }}
        />
      </div>
    ),
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <section className="bg-light" id="reviews">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Slider {...settings}>
              {developers.map((developer, index) => (
                <div className="review" key={index}>
                  <div>
                    <div className="imageContain">
                      <img src={developer.image} alt="" className="image" />
                    </div>
                    <h5 className="text- font-bold">{developer.name}</h5>
                    <small className="text-2xl font-bold">
                      {developer.role}
                    </small>
                  </div>
                  <h3>{developer.review}</h3>
                  <div className="stars">
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star-half"></i>
                  </div>
                  <i className="bx bxs-quote-alt-left"></i>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetDevelopers;

// className="person"
