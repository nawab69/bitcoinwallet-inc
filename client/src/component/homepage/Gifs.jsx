import React, { Component } from "react";
import Lottie from "../Lottie";
import arrows_final from "../../lottie/arrows_final.json";
import rocket_final from "../../lottie/rocket_final";
import nodes_final from "../../lottie/nodes_final";
import contract_final from "../../lottie/contract_final";

export default class Gifs extends Component {
  render() {
    return (
      <div className="screen" style={{ background: "#FFFFFF" }}>
        <div className="container py-5">
          <div className="h1 text-center head py-4">Our Services</div>
          <div
            className="row d-flex justify-content-center"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos="fade-up"
          >
            <div className="col-sm-12 col-md-6 col-lg-3 pb-4">
              <Lottie animationData={nodes_final} />
              <div className="h5 py-3 text-center">Decentralised</div>
              <div className="p text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 pb-4">
              <Lottie animationData={rocket_final} />
              <div className="h5 py-3 text-center">The future is now</div>
              <div className="p text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 pb-4">
              <Lottie animationData={arrows_final} />
              <div className="h5 py-3 text-center">Fast Transections</div>
              <div className="p text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 pb-4">
              <Lottie animationData={contract_final} />
              <div className="h5 py-3 text-center">Smart Contracts</div>
              <div className="p text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
