import React from 'react'

const Chat = () => {
    const handleClick = (e) => {
       e.preventDefault();
       document.getElementById('card').classList.remove('appear');
    }
    return (
        <div className="">
          <div class="container d-flex justify-content-center">
            <div class="card mt-5" id="card">
                <div class="d-flex flex-row justify-content-between p-3 adiv text-white"> <i class="fas fa-chevron-left" onClick={handleClick}></i> <span class="pb-3">Live chat</span> <i class="fas fa-times" onClick={handleClick}></i> </div>

                <div className="overflow-auto scroll">
                <div class="d-flex flex-row p-3"> <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30"/>
                    <div class="chat ml-2 p-3">Hello and thankyou for visiting birdlymind. Please click the video above</div>
                </div>
                <div class="d-flex flex-row p-3">
                    <div class="bg-white mr-2 p-3"><span class="text-muted">Hello and thankyou for visiting birdlynind.</span></div> <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png" width="30" height="30"/>
                </div>
                <div class="d-flex flex-row p-3"> <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30"/>
                    <div class="myvideo ml-2"><img src="https://imgur.com/GOxU1jx.png" width="200"/></div>
                </div>
                <div class="d-flex flex-row p-3"> <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30"/>
                    <div class="chat ml-2 p-3"><span class="text-muted dot">. . .</span></div>
                </div>
                </div>
                <div class="form-group px-3 mb-3"> <textarea class="form-control" rows="5" placeholder="Type your message"></textarea> </div>
            </div>
        </div>
        </div>
    )
}

export default Chat
