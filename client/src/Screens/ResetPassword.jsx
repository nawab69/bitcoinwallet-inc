import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../component/dashboard";
import { Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = ({ history, match }) => {
  const [state, setstate] = useState({});

  const code = match.params.code;

  const handleClick = async (e) => {
    e.preventDefault();

    if (state.password != state.confirmPassword) {
      toast.error("Password not match");
      return;
    } else {
      const data = {
        password: state.password,
        token: code,
      };

      try {
        const res = await axios.post("/api/user/reset-password", data);
        toast.success(res.data.message);
        history.push("/login");
      } catch (e) {
        toast.error(e.message);
        history.push("/login");
      }
    }
  };

  return (
    <div className="dashboard min-h-screen flex justify-center items-center">
      <div className="forgot-pass flex justify-start flex-column bg-white mx-auto">
        <div className="h1 text-center text-gray mt-4 py-4">
          <strong>Reset Password</strong>
        </div>
        <form method="post" name="myForm" className="w-full">
          <div className="flex justify-center">
            <div className="w-full px-12">
              <div className="mb-4">
                <label for="email" className="text-muted form-label">
                  New Password
                </label>
                <input
                  name="email"
                  id="email"
                  type="password"
                  className="form-control"
                  placeholder="Enter New Password*"
                  onChange={(e) =>
                    setstate((state) => ({
                      ...state,
                      password: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-4">
                <label for="email" className="text-muted form-label">
                  Confirm New Password
                </label>
                <input
                  name="email"
                  id="email"
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password*"
                  onChange={(e) =>
                    setstate((state) => ({
                      ...state,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="text-center mb-4">
                <Button onClick={handleClick}>Change Password</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
