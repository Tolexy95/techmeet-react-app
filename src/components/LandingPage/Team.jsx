import "./style.css";
import React from 'react';
import teamOneImg from "../../assets/img/Toyin_picture-removebg-preview.png";
import teamTwoImg from "../../assets/img/Victor_pix-removebg-preview.png";
import teamThreeImg from "../../assets/img/Bolu_pix-removebg-preview.png";

const Team = () => {
  const teamMembers = [
    {
      name: "Oluwatoyin Olubayo",
      role: "Frontend Developer",
      image: teamOneImg,
    },
    {
      name: "Victor Ndulue",
      role: "Backend Developer",
      image: teamTwoImg,
    },
    {
      name: "Bolu Abolade",
      role: "Backend Developer",
      image: teamThreeImg,
    },
  ];

  return (
    <section id="team" className="backStyle">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="intro">
              <h6 className="text-2xl font-bold">Team</h6>
              <h1 className="text-2xl font-bold">Team Members</h1>
              <p className="mx-auto">
                Introducing our talented team of developers, masterminds behind this extraordinary website. Their skillful collaboration brings innovation to life, delivering a seamless user experience. Meet the minds that drive excellence.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-lg-4 col-md-8">
              <div className="team-member">
                <div className="image">
                  <img src={member.image} alt="" className="teamImg" />
                  <div className="social-icons">
                    <a href="#"><i className='bx bxl-facebook'></i></a>
                    <a href="#"><i className='bx bxl-twitter'></i></a>
                    <a href="#"><i className='bx bxl-instagram'></i></a>
                    <a href="#"><i className='bx bxl-pinterest'></i></a>
                  </div>
                  <div className="overlay"></div>
                </div>

                <h5 className="text-2xl font-bold">{member.name}</h5>
                <p className="">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
