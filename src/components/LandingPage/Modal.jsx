import React from 'react';
import '../style.css';

const Modal = () => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-body p-0">
            <div className="container-fluid">
              <div className="row gy-4">
                <div className="col-lg-4 col-sm-12 bg-cover" style={{ backgroundImage: "url(img/c2.jpg)", minHeight: "300px" }}>
                  <div></div>
                </div>
                <div className="col-lg-8">
                  <form className="p-lg-5 col-12 row g-3">
                    <div>
                      <h1>Get in touch</h1>
                      <p>Feel free to contact us and we will get back to you as soon as possible</p>
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="userName" className="form-label">First name</label>
                      <input type="text" className="form-control" placeholder="Jon" id="userName" aria-describedby="emailHelp" />
                    </div>
                    <div className="col-lg-6">
                      <label htmlFor="userName" className="form-label">Last name</label>
                      <input type="text" className="form-control" placeholder="Doe" id="userName" aria-describedby="emailHelp" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="userName" className="form-label">Email address</label>
                      <input type="email" className="form-control" placeholder="Johndoe@example.com" id="userName" aria-describedby="emailHelp" />
                    </div>
                    <div className="col-12">
                      <label htmlFor="exampleInputEmail1" className="form-label">Enter Message</label>
                      <textarea name="" placeholder="This is looking great and nice." className="form-control" id="" rows="4"></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-brand">Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
