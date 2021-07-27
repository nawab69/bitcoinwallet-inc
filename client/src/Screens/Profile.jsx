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
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-2 gap-5">
            <div className="bg-white w-full h-auto row-span-2 p-8">
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
                  <tr>
                    <td class="table-list-2">Total Trades</td>
                    <td class="table-list-2 ">12</td>
                  </tr>
                  <tr>
                    <td class="table-list-2">Completed Trades</td>
                    <td class="table-list-2 ">5</td>
                  </tr>
                </table>

                <div className="my-5 gap-4">
                  <div className="bg-white rounded-lg w-48 h-32 p-4">
                    <h3 className="text-xl">Average Rating</h3>
                    <h1 className="font-bold">4.3</h1>
                  </div>
                </div>
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

            <div className="bg-white w-auto flex flex-col lg:flex-row lg:col-span-2 h-auto p-8 gap-4">
              {/* Review section ------------------------------------------- */}
              <div className=" lg:w-1/2 lg:h-64 h-auto">
                <h1 className="text-2xl">Review as Buyer</h1>
                <hr className="bg-gray-500" />

                <div className="flex py-2">
                  {" "}
                  {/*review card------------------- */}
                  <div className="h-8 w-8 mr-4 rounded-full bg-gray-300 text-white text-lg flex justify-center items-center">
                    N
                  </div>
                  <div>
                    <h3
                      className="font-bold flex items-center"
                      style={{ fontSize: 16 }}
                    >
                      nawab69{" "}
                      <span className="mx-1">
                        <FaStar className="text-yellow-400 text-sm" />
                      </span>
                      <span className="text-yellow-400 text-sm font-bold">
                        5
                      </span>
                    </h3>
                    <p className="text-gray-500 text-sm mb-1">
                      {" "}
                      🇺🇸 United States
                    </p>
                    <p className="text-sm">
                      Outstanding!!! very brilliant developer, he delivers the
                      best!
                    </p>
                    <p className="text-gray-400 text-sm">Published 3hrs ago</p>
                  </div>
                </div>

                <div className="flex py-2">
                  {" "}
                  {/*review card------------------- */}
                  <div className="h-8 w-8 mr-4 rounded-full bg-gray-300 text-white text-lg flex justify-center items-center">
                    S
                  </div>
                  <div>
                    <h3
                      className="font-bold flex items-center"
                      style={{ fontSize: 16 }}
                    >
                      shofiqshoweb23
                      <span className="mx-1">
                        <FaStar className="text-yellow-400 text-sm" />
                      </span>
                      <span className="text-yellow-400 text-sm font-bold">
                        5
                      </span>
                    </h3>
                    <p className="text-gray-500 text-sm mb-1"> 🇺🇸 UK</p>
                    <p className="text-sm">Very good job, always impressed!!</p>
                    <p className="text-gray-400 text-sm">
                      Published 3weeks ago
                    </p>
                  </div>
                </div>
                <hr className="bg-gray-500" />
                <a href="#" className="text-sm font-bold text-blue-400">
                  + See more
                </a>
              </div>

              <div className="lg:w-1/2  lg:h-64 h-auto">
                <h1 className="text-2xl">Review as Seller</h1>
                <hr className="bg-gray-500" />

                <div className="flex py-2">
                  {" "}
                  {/*review card------------------- */}
                  <div className="h-8 w-8 mr-4 rounded-full bg-gray-300 text-white text-lg flex justify-center items-center">
                    N
                  </div>
                  <div>
                    <h3
                      className="font-bold flex items-center"
                      style={{ fontSize: 16 }}
                    >
                      nawab69
                      <span className="mx-1">
                        <FaStar className="text-yellow-400 text-sm" />
                      </span>
                      <span className="text-yellow-400 text-sm font-bold">
                        5
                      </span>
                    </h3>
                    <p className="text-gray-500 text-sm mb-1">
                      {" "}
                      🇺🇸 United States
                    </p>
                    <p className="text-sm">
                      Outstanding!!! very brilliant developer, he delivers the
                      best!
                    </p>
                    <p className="text-gray-400 text-sm">Published 3hrs ago</p>
                  </div>
                </div>

                <div className="flex py-2">
                  {" "}
                  {/*review card------------------- */}
                  <div className="h-8 w-8 mr-4 rounded-full bg-gray-300 text-white text-lg flex justify-center items-center">
                    S
                  </div>
                  <div>
                    <h3
                      className="font-bold flex items-center"
                      style={{ fontSize: 16 }}
                    >
                      shofiqshoweb23
                      <span className="mx-1">
                        <FaStar className="text-yellow-400 text-sm" />
                      </span>
                      <span className="text-yellow-400 text-sm font-bold">
                        5
                      </span>
                    </h3>
                    <p className="text-gray-500 text-sm mb-1"> 🇺🇸 UK</p>
                    <p className="text-sm">Very good job, always impressed!!</p>
                    <p className="text-gray-400 text-sm">
                      Published 3weeks ago
                    </p>
                  </div>
                </div>

                <hr className="bg-gray-500" />
                <a href="#" className="text-sm font-bold text-blue-400">
                  + See more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
