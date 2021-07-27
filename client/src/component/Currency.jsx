import React from 'react'
import { Box, Code, Image, Layers, Layout, Monitor, Phone, Tablet, Terminal, Tool } from 'react-feather'

const Currency = () => {
      return (
      <>
       <section className="section" id="services">
        <div className="container">
            <div className="row justify-content-center mb-5">
                <div className="col-lg-7 text-center">
                    <h2 className="head borderBottom">Supported Currencies</h2>
                              
                    {/* <p className="text-muted">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium totam rem ab illo inventore.</p> */}
                </div>
            </div>
            <div className="mb-5"></div>
            <div className="row overflow-hidden">
               
                <div className="col-lg-3" data-aos-delay="150" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos="fade-up">
                    <div className="text-center px-4 py-0 position-relative mb-4">
                        <div className="service-box-content">
                            <div className="icon-mono service-icon service-bg-5 avatar-md mx-auto mb-4">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/icons/eth.svg`} alt="" width="300" height="auto" className="img-fluid d-block mx-auto" />
                            </div>
                            <h4 className="mb-3 font-size-22">ETH</h4>
                           
                        </div>
                    </div>
                  </div>
                          
                     <div className="col-lg-3" data-aos-delay="150" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos="fade-up">
                    <div className="text-center px-4 py-0 position-relative mb-4">
                        <div className="service-box-content">
                            <div className="icon-mono service-icon service-bg-5 avatar-md mx-auto mb-4">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/icons/bnb.svg`} alt="" width="100" height="auto" className="d-block mx-auto" />
                            </div>
                            <h4 className="mb-3 font-size-22">BNB</h4>
                           
                        </div>
                    </div>
                    </div>
                          
                    <div className="col-lg-3" data-aos-delay="150" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos="fade-up">
                    <div className="text-center px-4 py-0 position-relative mb-4">
                        <div className="service-box-content">
                            <div className="icon-mono service-icon service-bg-5 avatar-md mx-auto mb-4">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/icons/usdt.svg`} alt="" width="300" height="auto" className="img-fluid d-block mx-auto" />
                            </div>
                            <h4 className="mb-3 font-size-22">USDT</h4>
                           
                        </div>
                    </div>
                </div>

                    <div className="col-lg-3" data-aos-delay="150" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos="fade-up">
                    <div className="text-center px-4 py-0 position-relative mb-4">
                        <div className="service-box-content">
                            <div className="icon-mono service-icon service-bg-5 avatar-md mx-auto mb-4">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/icons/busd.svg`} alt="" width="300" height="auto" className="img-fluid d-block mx-auto" />
                            </div>
                            <h4 className="mb-3 font-size-22">BUSD</h4>
                           
                        </div>
                    </div>
                </div>

             
            </div>
          
        </div>

    </section> 
</>
 )
}

export default Currency
