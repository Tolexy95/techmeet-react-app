import "../style.css";
import React from "react";
import projectOneImg from "../assets/img/project1.jpg";
import projectTwoImg from "../assets/img/project2.jpg";
import projectThreeImg from "../assets/img/project3.jpg";
import projectFourImg from "../assets/img/project4.jpg";
import projectFiveImg from "../assets/img/project5.jpg";


const Portfolio = () => {
  return (
    <section className="bg-light" id="portfolio">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="intro">
              <h6>Work</h6>
              <h1>Successful projects</h1>
              <p className="mx-auto">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="projects-slider" className="owl-theme owl-carousel">
        <div className="project">
          <div className="overlay"></div>
          <img src={projectOneImg} alt="" />
          <div className="content">
            <h2>Consulting Marketing</h2>
            <h6>Website Design</h6>
          </div>
        </div>
        <div className="project">
          <div className="overlay"></div>
          <img src={projectTwoImg} alt="" />
          <div className="content">
            <h2>Consulting Marketing</h2>
            <h6>Website Design</h6>
          </div>
        </div>
        <div className="project">
          <div className="overlay"></div>
          <img src={projectThreeImg} alt="" />
          <div className="content">
            <h2>Consulting Marketing</h2>
            <h6>Website Design</h6>
          </div>
        </div>
        <div className="project">
          <div className="overlay"></div>
          <img src={projectFourImg} alt="" />
          <div className="content">
            <h2>Consulting Marketing</h2>
            <h6>Website Design</h6>
          </div>
        </div>
        <div className="project">
          <div className="overlay"></div>
          <img src={projectFiveImg} alt="" />
          <div className="content">
            <h2>Consulting Marketing</h2>
            <h6>Website Design</h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
