import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Balances } from "../actions/tradeActions";
import Loader from "../component/Loader";
import { Button, NavBar } from "../component/dashboard/index";
import { FaStar } from "react-icons/fa";

const Profile = () => {
  const [state, setstate] = useState({});
  const dispatch = useDispatch();
  const currency = ["eth", "bnb", "usdt", "busd"];

  const { loading, balances, error } = useSelector((state) => state.balances);

  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen dashboard">
        <div className="mx-auto py-24 px-24">
          <div className="alert alert-warning">
            This Section is under Developement
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div className="bg-white w-full h-auto p-4">
              {/* user details here -----------------------------------------*/}
              <div className="w-full overflow-auto">
                <h1 className="py-2">User Details</h1>
                <table class="items-center bg-transparent ">
                  <tr className="w-full">
                    <td class="table-list-2 w-full">Name</td>
                    <td class="table-list-2">
                      Nawab Khairuzzaman Mohammad Kibria
                    </td>
                  </tr>
                  <tr>
                    <td class="table-list-2">Email</td>
                    <td class="table-list-2">
                      <span className="bg-green-300 px-2 py-1 rounded-pill text-gray-500">
                        nawab69@example.com
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <div className="bg-white w-auto h-auto p-8">
              {/* update profile ------------------------------------------- */}
              <h1>Update profile</h1>
              <form method="post" name="myForm" className="w-full">
                <div className="flex justify-center">
                  <div className="w-full px-12 py-4">
                    <div className="mb-4">
                      <label for="name" className="text-muted form-label">
                        Name
                      </label>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="Change name*"
                        onChange={(e) =>
                          setstate((state) => ({
                            ...state,
                            email: e.target.value,
                          }))
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
                        placeholder="Change email*"
                        onChange={(e) =>
                          setstate((state) => ({
                            ...state,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="text-center mb-4">
                      <Button>Update</Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white w-auto h-auto p-8">
              {/* change password ------------------------------------------ */}
              <h1>Change password</h1>
              <form method="post" name="myForm" className="w-full">
                <div className="flex justify-center">
                  <div className="w-full px-12 py-4">
                    <div className="mb-4">
                      <label
                        for="current-pass"
                        className="text-muted form-label"
                      >
                        Current Password
                      </label>
                      <input
                        name="current-pass"
                        id="current-pass"
                        type="password"
                        className="form-control"
                        placeholder="Enter your current password*"
                        onChange={(e) =>
                          setstate((state) => ({
                            ...state,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        for="new-password"
                        className="text-muted form-label"
                      >
                        New Password
                      </label>
                      <input
                        name="new-password"
                        id="new-password"
                        type="password"
                        className="form-control"
                        placeholder="Enter your new password*"
                        onChange={(e) =>
                          setstate((state) => ({
                            ...state,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        for="confirm-new-password"
                        className="text-muted form-label"
                      >
                        Confirm New Password
                      </label>
                      <input
                        name="confirm-new-password"
                        id="confirm-new-password"
                        type="password"
                        className="form-control"
                        placeholder="Confirm your new password*"
                        onChange={(e) =>
                          setstate((state) => ({
                            ...state,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="text-center mb-4">
                      <Button>Change</Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
