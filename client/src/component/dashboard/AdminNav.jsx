import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { useHistory } from "react-router-dom";
import { Transition } from "@headlessui/react";
import Button from "./Button";

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const clickEvent = (e) => {
    console.log(e.target);
  };
  //    font-family: Kanit, sans-serif;

  const { userInfo, loading, success } = useSelector(
    (state) => state.userLogin
  );

  const Logout = (e) => {
    e.preventDefault();
    console.log(history);
    dispatch(logout());
    history.push("/");
  };

  return (
    <>
      <div>
        <nav className="bg-white fixed w-full z-50 shadow-lg rounded-none rounded-b-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12"
                    src={`${process.env.PUBLIC_URL}/assets/images/icons/logo.png`}
                    alt="EscrowTrade"
                  />
                </div>
                <div className="hidden md:flex w-full">
                  <div className="flex items-baseline space-x-6 flex-grow-1 justify-center">
                    <Link
                      to="/"
                      className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </Link>

                    <Link
                      to="/admin"
                      className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Admin
                    </Link>

                    <Link
                      to="/admin/trades"
                      className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Trades
                    </Link>
                  </div>
                  <div className="flex items-baseline space-x-6 flex-grow-0 justify-end">
                    <Button onClick={Logout}>Logout</Button>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className="md:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link
                    to="/wallet"
                    className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Wallet
                  </Link>

                  <Link
                    to="/trades"
                    className="text-gray-700 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Trades
                  </Link>
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </div>
    </>
  );
};

export default AdminNav;
