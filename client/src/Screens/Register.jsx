import React, { useEffect, useState } from "react";
import { register } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Register = ({ history }) => {
  const [state, setstate] = useState({});
  const dispatch = useDispatch();
  const { userInfo, loading, success, error } = useSelector(
    (state) => state.userReg
  );

  useEffect(() => {
    if (userInfo) {
      history.push("/wallet");
    }

    if (loading) {
      toast.loading("Registering ..... ");
    }
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
    if (userInfo && success) {
      toast.dismiss();
      toast.success("Login Successfull");
    }
  }, [loading, error, success]);

  const handleClick = (e) => {
    e.preventDefault();
    const { name, email, accountPass, walletPass } = state;
    // console.log({ name, email, accountPass, walletPass });
    dispatch(register(name, email, accountPass, walletPass));
  };
  return (
    <div className="dashboard min-h-screen flex justify-center items-center">
      <div className="container">
        <div className="flex justify-center flex-column bg-white w-full md:w-3/5 py-12 px-12 mx-auto">
          <div className="h1 text-center text-gray">
            <strong>Register</strong>
          </div>
          <form method="post" name="myForm" className="w-100">
            <div className="flex justify-center">
              <div className="w-full">
                <div className="mb-4">
                  <label for="name" className="text-muted form-label">
                    Full Name
                  </label>
                  <input
                    name="name"
                    id="name"
                    type="name"
                    className="form-control"
                    placeholder="Enter name*"
                    onChange={(e) =>
                      setstate((state) => ({ ...state, name: e.target.value }))
                    }
                  />
                </div>

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
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="Account_password"
                    name="password"
                    placeholder="Account password*"
                    onChange={(e) =>
                      setstate((state) => ({
                        ...state,
                        accountPass: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="mb-4">
                  <div className="alert alert-warning text-sm">
                    Use a strong password for encrypting your wallet. You can't
                    make any transaction and trade without this password. It's a
                    extra layer of security for your wallet.
                  </div>
                </div>

                <div className="mb-4">
                  <label for="password" className="text-muted form-label">
                    Wallet Password (Passphrase)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="wallet_password"
                    name="password"
                    placeholder="Wallet password*"
                    onChange={(e) =>
                      setstate((state) => ({
                        ...state,
                        walletPass: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="text-center mb-4">
                  <button
                    type="submit"
                    id="submit"
                    name="send"
                    className="btn btn-pexful"
                    onClick={handleClick}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
