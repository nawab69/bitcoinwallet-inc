import React from 'react'
import { Facebook, Instagram } from 'react-feather'

const RegisterButton = () => {
    return (
        <div style={{ background:'#F5F5F5'}}>     
        <div  className="container d-flex flex-column justify-content-center align-items-center py-5">
                <div className="h4 text-center">Become the part of the journey</div>
                 <div className="p text-center">We currently can accomodate 500 people</div>
                <button className="animated-button11">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                    Register Now</button>
                
                <div style={{width:'300px'}} className="ul d-flex justify-content-around">
                    <div className="li">
                        <i class="fab fa-facebook-f fa-2x"></i>
                   </div>
                    <div className="li">
                        <i class="fab fa-twitter fa-2x"></i>
                   </div>
                    <div className="li">
                        <i class="fab fa-telegram fa-2x"></i>
                   </div>
                    <div className="li">
                        <i class="fab fa-github fa-2x"></i>
                   </div>
               </div>
            </div>
         </div>
    )
}

export default RegisterButton
