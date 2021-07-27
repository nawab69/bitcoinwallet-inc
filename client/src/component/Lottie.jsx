import React from 'react'
import Lottie from 'react-lottie';

export default function App({animationData}) {
 
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData:animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  
  return (
    <div>
      <Lottie 
	    options={defaultOptions}
        height={120}
        width={120}
              
      />
    </div>
  );
}