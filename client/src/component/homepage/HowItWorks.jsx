import React from 'react'

const HowItWorks = () => {
    return (
        <div style={{background:'#F5F5F5'}} id="howitworks">
            <div className="container">
                <div className="h1 text-center head pt-5">How does it work?</div>
                <div className="row py-5">
                    <div className="col-sm-12 col-md-8 d-flex flex-column justify-content-center"
                     data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos="fade-right">
                       <div className="">How does it works?</div>
                    </div>
                    <div className="col-sm-12 col-md-4 d-flex flex-column justify-content-center"
                     data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos="fade-left">
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/images/icons/eth.png`}
                            alt=""
                            width="300"
                            height="auto"
                            className="d-block mx-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks
