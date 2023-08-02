import React from 'react';
import './style.css';
import iconOne from "../../assets/img/icon1.png";
import iconTwo from "../../assets/img/icon2.png";
import iconThree from "../../assets/img/icon3.png";
import iconFour from "../../assets/img/icon4.png";
import iconFive from "../../assets/img/icon5.png";
import iconSix from "../../assets/img/icon6.png";

const Services = () => {
  const servicesData = [
    {
      icon: iconOne,
      title: "Empowering Developers",
      description: "We empower developers through knowledge sharing, skill showcasing, and career connections. Tap into a wealth of resources and expertise to enhance your professional growth."
    },
    {
      icon: iconTwo,
      title: "Talent Showcase",
      description: "Showcase your skills and expertise through detailed profiles and portfolios. Let your work speak for itself and attract exciting opportunities."
    },
    {
      icon: iconThree,
      title: "Community Collaboration",
      description: "Join a dynamic and supportive community of developers where collaboration is key. Exchange ideas, offer feedback, and engage in valuable discussions."
    },
    {
      icon: iconFour,
      title: "Client Connections",
      description: "Explore exciting client opportunities and collaborate directly with businesses seeking your skills. Build lasting relationships that lead to successful partnerships."
    },
    {
      icon: iconFive,
      title: "Flexible Hiring Options",
      description: "For businesses and clients, TechMeet offers flexible hiring options that save time and resources. Find the perfect match for your project's needs and scale your team accordingly."
    },
    {
      icon: iconSix,
      title: "Ethical and Safe Environment",
      description: "TechMeet prioritizes an ethical and safe environment for all users. We foster an inclusive and respectful culture, ensuring a positive and productive experience for everyone."
    }
  ];

  return (
    <section id="services" className="text-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="intro">
              <h6 className="text-2xl font-bold">Our Services</h6>
              <h1 className="text-2xl font-bold">What We Do?</h1>
              <p className="mx-auto">
                TechMeet is a dynamic platform uniting skilled developers for success, offering career growth, project collaborations, and networking opportunities. Join us to shape a future where developers unite for unprecedented achievements.
              </p>
            </div>
          </div>
        </div>
        <div className="row g-4">
          {servicesData.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="service">
                <img src={service.icon} alt="" className="imageCenter" />
                <h5 className="text-2xl font-bold">{service.title}</h5>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
