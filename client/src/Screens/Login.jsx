import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { Button } from "../component/dashboard";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [state, setstate] = useState({});

  const { userInfo, loading, success, error } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    if (userInfo?.isAdmin) {
      history.push("/admin");
    } else if (userInfo) {
      history.push("/wallet");
    }

    if (loading) {
      toast.loading("Logging ..... ");
    }
    if (error) {
      toast.dismiss();
      toast.error("Invalid Login");
    }
    if (userInfo && success) {
      toast.dismiss();
      toast.success("Login Successful");
    }
  }, [loading, error, success]);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(login(state.email, state.password));
  };
  return (
    <div className="dashboard min-h-screen flex justify-center items-center">
      <div className="flex justify-center flex-column bg-white w-96 mx-auto py-12">
        <div className="h1 text-center text-gray">
          <strong>Login</strong>
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
              <div className="mb-4">
                <label for="password" className="text-muted form-label">
                  password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter password*"
                  onChange={(e) =>
                    setstate((state) => ({
                      ...state,
                      password: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="text-center mb-4">
                <Button onClick={handleClick}>Login</Button>
              </div>

              <div className="mb-4">
                <div className="text-sm">
                  Don't have an account.{" "}
                  <Link
                    className="text-purple-600 font-semibold"
                    to="/register"
                  >
                    Click Here
                  </Link>{" "}
                  to register
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
