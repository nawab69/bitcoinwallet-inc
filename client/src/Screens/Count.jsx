import React from 'react'
import { Box, Code, Image, Layers, Layout, Monitor, Phone, Tablet, Terminal, Tool } from 'react-feather'

const Count = () => {
      return (
      <>
       <section className="section" id="services">
        <div className="container">
            <div className="row justify-content-center mb-5">
                <div className="col-lg-7 text-center">
                    <h2 className="head borderBottom">Summary</h2>
                              
                    {/* <p className="text-muted">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium totam rem ab illo inventore.</p> */}
                </div>
            </div>
            <div className="mb-5"></div>
            <div className="row overflow-hidden">
               
                <div className="col-lg-4" data-aos-delay="150" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos="fade-up">
                    <div className="text-center px-4 py-0 position-relative mb-4">
                        <div className="card service-box-content py-3">
                            <h1 className="font-size-44"> <strong>345+</strong></h1>
                            <h4 className="mb-3 font-size-22">Trades</h4>
                           
                        </div>
                    </div>
                  </div>
                          
                     <div className="col-lg-4" data-aos-delay="150" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos="fade-up">
                    <div className="text-center px-4 py-0 position-relative mb-4">
                        <div className="service-box-content">
                            <div className="card service-box-content py-3">
                            <h1 className="font-size-44"> <strong>345+</strong></h1>
                            <h4 className="mb-3 font-size-22">Transactions</h4>
                           
                        </div>
                           
                        </div>
                    </div>
                    </div>
                          
                    <div className="col-lg-4" data-aos-delay="150" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos="fade-up">
                    <div className="text-center px-4 py-0 position-relative mb-4">
                        <div className="service-box-content">
                           <div className="card service-box-content py-3">
                            <h1 className="font-size-44"> <strong>345+</strong></h1>
                            <h4 className="mb-3 font-size-22">Happy Customers</h4>
                           
                        </div>
                           
                        </div>
                    </div>
                </div>

              

             
            </div>
          
        </div>

    </section> 
</>
 )
}

export default Count
