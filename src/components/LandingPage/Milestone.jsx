import React from 'react';
import "../style.css";

const Milestone = () => {
  return (
    <section id="milestone">
      <div className="container">
        <div className="row text-center justify-content-center gy-4">
          <div className="col-lg-2 col-sm-6">
            <h1 className="display-4">90K+</h1>
            <p className="mb-0">Happy Clients</p>
          </div>
          <div className="col-lg-2 col-sm-6">
            <h1 className="display-4">45M</h1>
            <p className="mb-0">Lines of Code</p>
          </div>
          <div className="col-lg-2 col-sm-6">
            <h1 className="display-4">190</h1>
            <p className="mb-0">Total Downloads</p>
          </div>
          <div className="col-lg-2 col-sm-6">
            <h1 className="display-4">380K</h1>
            <p className="mb-0">YouTube Subscribers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Milestone;

