import React from 'react';
import './style.css';
import digitalIcon from '../../assets/img/icon6.png';
import emailIcon from "../../assets/img/icon4.png";
import businessIcon from "../../assets/img/icon5.png";
import aboutImg from "../../assets/img/about.png";

const About = () => {
  const infoBoxesData = [
    {
      icon: digitalIcon,
      title: "Empowering Innovation",
      description: "TechMeet empowers developers to showcase their creativity, expertise, and innovative solutions. It provides a platform to explore new possibilities, collaborate on cutting-edge projects, and drive technological advancements."
    },
    {
      icon: emailIcon,
      title: "Connecting Talent",
      description: "The TechMeet app connects talented developers with businesses and startups seeking their skills. It fosters meaningful connections, enabling developers to join exciting ventures and contribute to successful projects."
    },
    {
      icon: businessIcon,
      title: "Driving Success",
      description: "TechMeet drives success by providing a platform where developers can collaborate with like-minded individuals, build strong professional networks, and achieve remarkable results together. It's more than just an app; it's a catalyst for growth and achievement."
    }
  ];

  return (
    <section id="about">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 py-5">
            <div className="row">
              {infoBoxesData.map((infoBox, index) => (
                <div key={index} className="col-12 mt-4">
                  <div className="info-box">
                    <img src={infoBox.icon} alt="" />
                    <div className="ms-4">
                      <h5 className="text-2xl font-bold">{infoBox.title}</h5>
                      <p>{infoBox.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-5">
            <img src={aboutImg} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
