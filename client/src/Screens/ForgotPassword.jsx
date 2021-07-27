import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../component/dashboard";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = ({ history }) => {
  const [state, setstate] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    const data = {
      email: state.email,
    };
    try {
      const res = await axios.post("/api/user/forgot-password", data);
      toast.success(res.data.message);
    } catch (e) {
      if (e.response.status == 429) {
        toast.error("Too many request. Please try after 1 minute");
      }
      console.log(e);
    }
  };

  return (
    <div className="dashboard min-h-screen flex justify-center items-center">
      <div className="forgot-pass flex justify-start flex-column bg-white mx-auto">
        <div className="h1 text-center text-gray mt-4 py-4">
          <strong>Forgot Password</strong>
        </div>
        <form method="post" name="myForm" className="w-full">
          <div className="flex justify-center">
            <div className="w-full px-12">
              <div className="mb-4">
                <label for="email" className="text-muted form-label">
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email*"
                  onChange={(e) =>
                    setstate((state) => ({ ...state, email: e.target.value }))
                  }
                />
              </div>

              <div className="text-center mb-4">
                <Button onClick={handleClick}>Send Mail</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
