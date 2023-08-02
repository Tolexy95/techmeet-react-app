import React from 'react';
import "./style.css";
import projectFiveImg from "../../assets/img/project5.jpg";
import projectTwoImg from "../../assets/img/project2.jpg";
import projectFourImg from "../../assets/img/project4.jpg";

const Blog = () => {
  return (
    <section id="blog" className="py-5 backColor">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="intro">
              <h6>Blog</h6>
              <h1>Blog Posts</h1>
              <p className="mx-auto">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <article className="blog-post">
              <img src={projectFiveImg} alt="" />
              <a href="#" className="tag">Web Design</a>
              <div className="content">
                <small>01 Dec, 2022</small>
                <h5>Web Design trends in 2022</h5>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from
                </p>
              </div>
            </article>
          </div>
          <div className="col-md-4">
            <article className="blog-post">
              <img src={projectFourImg} alt="" />
              <a href="#" className="tag">Programming</a>
              <div className="content">
                <small>01 Dec, 2022</small>
                <h5>Web Design trends in 2022</h5>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from
                </p>
              </div>
            </article>
          </div>
          <div className="col-md-4">
            <article className="blog-post">
              <img src={projectTwoImg} alt="" />
              <a href="#" className="tag">Marketing</a>
              <div className="content">
                <small>01 Dec, 2022</small>
                <h5>Web Design trends in 2022</h5>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;




