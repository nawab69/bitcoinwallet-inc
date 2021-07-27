import React from "react";
import {} from "react-feather";

const Aboutus = () => {
  return (
    <>
      <section
        style={{ background: "#FFFFFF" }}
        className="section overflow-hidden"
        id="aboutus"
      >
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7 text-center">
              <h2 className="head">About Us</h2>
            </div>
          </div>

          <div
            className="row align-items-center mb-5"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos="fade-right"
          >
            <div className="col-md-5 order-2 order-md-1 mt-md-0 mt-5">
              <h2 className="mb-4">Perfect Solution For Small Businesses</h2>
              <p className="text-muted mb-5">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium totam rem aperiam eaque ipsa
                quae ab illo inventore veritatis..
              </p>
              <a href="#" className="btn btn-golden">
                Find out more{" "}
                <i className="icon-xs ms-2" data-feather="arrow-right"></i>
              </a>
            </div>
            <div className="col-md-6 ms-md-auto order-1 order-md-2">
              <div className="position-relative">
                <div className="ms-5 features-img">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/icons/escrToken.png`}
                    alt=""
                    width="40"
                    height="40"
                    className="d-block mx-auto"
                  />
                </div>
                <img src="images/dot-img.png" alt="" className="dot-img-left" />
              </div>
            </div>
          </div>

          <div
            className="row align-items-center section pb-0"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos="fade-left"
          >
            <div className="col-md-6">
              <div className="position-relative mb-md-0 mb-5">
                <div className="me-5 features-img">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/icons/escrToken.png`}
                    alt=""
                    width="40"
                    height="40"
                    className="d-block mx-auto"
                  />
                </div>
                <img
                  src="images/dot-img.png"
                  alt=""
                  className="dot-img-right"
                />
              </div>
            </div>
            <div className="col-md-5 ms-md-auto">
              <h2 className="mb-4">
                Build community & conversion with our suite of social tool
              </h2>
              <p className="text-muted mb-5">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium totam rem aperiam eaque ipsa
                quae ab illo inventore veritatis..
              </p>
              <a href="#" className="btn btn-golden">
                Find out more{" "}
                <i className="icon-xs ms-2" data-feather="arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Aboutus;
