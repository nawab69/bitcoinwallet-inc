import React from "react";
import { Star } from "react-feather";
import Slider from "react-slick";

export default function Reviews() {
   
    const Cards = ({
        star = 5,
        user = 'Design Tools',
        description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!',
        days = 6
     }) => {
        return (
        <div>
            <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-2 my-20 mx-2">
                <div class="flex justify-center md:justify-end -mt-16">
                    <img class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"/>
                </div>
                    <div>
                        <div className='flex'>
                    <img src="https://static.travala.com/frontend/images-pc/icon/quote.svg" width="20" height='auto' alt=""/>
                            <h2 class="text-gray-800 ml-2 mt-2 text-xl font-semibold">{user}</h2>
                        </div>
                        <p class="mt-2 text-gray-600">{ description}</p>
                </div>
                    <div class="flex justify-between mt-4">
                        <div className="flex">
                            {[...Array(star).keys()].map(x=><Star color="#00B67A" fill="#00B67A"/>)}
                        </div>
                        <p class="font-small text-indigo-500 leading-6">{days} days ago</p>
                </div>
                </div>
            </div>
        )
    }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
      responsive: [
         {
          breakpoint: 1440,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };
    return (
        <div style={{background:'#F5F5F5'}}>
            <div className="container py-5">
              <div className="head text-center">Reviews</div>        
            <Slider {...settings}>
                    {[...Array(10).keys()].map(item => {
                        return <Cards/>
                  })}
            </Slider>
        </div>
  </div>);
}