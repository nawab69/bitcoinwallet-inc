import React, { useState } from 'react'
import Particles from 'react-particles-js'
import { Play, ChevronsDown } from 'react-feather'

const Banner = () => {
    const [state, setstate] = useState(false)
    const handleClick = () => {
        document.getElementById('play').style.display = 'none';
        document.getElementById('frame').style.display = 'flex';
    }
    return (
        <div id="home">
            <div className="overflow-hidden" height="550px" width="100%">    
                <Particles
                    width="100%"
                    height="550px"
                params={{
                    particles: {
                        number: {
                            value: 80,
                        },
                        size: {
                            "value": 4
                        },
                        color: {
                            value: '#2e5aca'
                        },
                        opacity: {
                            value: 0.5,
                            anim: {
                                enable: true
                            }
                        },
                        line_linked: {
                            enable: true,
                            color: '#2e5aca'
                        },
                        move: {
                            speed: 0.2
                        }
                    }
                }}
               className="particle"
            />
            </div>
            

             <div className="container screen">
                <div className="row">
                    <div className="col-sm-12 col-md-6 d-flex justify-content-center flex-column">
                        <h1 className="text-white">Welcome to the world of Blockchain Lottery Games</h1>
                        <h6 className="text-white">Bitcoin Lottery bridges the gap between players and game creators using the Blockchain to guarantee independent trustless drawings.</h6>
                        <div className="d-flex justify-content-start mt-3">
                        <button className="animated-button10">How does it work?</button>
                        <button className="animated-button1">Register Now</button>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 py-5 d-flex flex-column justify-content-center align-items-center">
                         
                        <iframe width="350" height="200"
                            style={{borderRadius:10,display:'none'}}
                            src="https://www.youtube.com/embed/tgbNymZ7vqY"
                         id="frame">
                        
                        </iframe>
                        <div className="play" id="play">
                            <Play size={50} color={'#fff'} fill={'#fff'} onClick={handleClick}/>
                        </div>
                        <div style={{height:'8px',width:'80px',borderRadius:'10px',marginTop:'4px', background:'#fff'}}></div>
                    </div>
                </div>

                <div className="d-flex justify-content-center zIndex">
                    <div className="ul d-flex zIndex">
                        <div className="li zIndex">
                             <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icons/btc.png`}
                                alt=""
                                width="40"
                                height="40"
                                className="d-block mx-auto zIndex"
                            />
                        </div>
                        <div className="li">
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icons/eth.png`}
                                alt=""
                                width="40"
                                height="40"
                                className="d-block mx-auto"
                            />
                        </div>
                        <div className="li">
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icons/tether.png`}
                                alt=""
                                width="40"
                                height="40"
                                className="d-block mx-auto"
                            />
                        </div>
                        <div className="li">
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icons/escrToken.png`}
                                alt=""
                                width="40"
                                height="40"
                                className="d-block mx-auto"
                            />
                        </div>
                    </div>
                </div>

            <a href="#howitworks">
                <div className="zIndex">
                   <div class="mouse_scroll zIndex">
                            <div class="mouse zIndex">
                                <div class="wheel zIndex"></div>
                            </div>
                            <div>
                                <span class="m_scroll_arrows unu zIndex"></span>
                                <span class="m_scroll_arrows doi zIndex"></span>
                                <span class="m_scroll_arrows trei zIndex"></span>
                            </div>
                        </div>
                </div>
             </a>
            </div>

        </div>
    )
}

export default Banner
