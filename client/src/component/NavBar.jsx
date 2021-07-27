import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlignCenter, Menu } from "react-feather";
import header from "../images/logo/multicone.png";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useHistory } from "react-router-dom";

const NavBar = () => {
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
      <nav className="navbar navbar-expand-lg fixed-top" id="">
        <div className="d-flex justify-content-between container">
          <a className="navbar-brand logo" href="/">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/icons/logo.png`}
              width="25px"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className="icon-mono toggle-menubar">
              <AlignCenter />
            </div>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul
              className="navbar-nav ms-auto navbar-center"
              id="navbar-navlist"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a href="#project" className="nav-link" id="bar">
                  How to Trade
                </a>
              </li>
              <li className="nav-item">
                <a href="#aboutus" className="nav-link">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a href="#faq" className="nav-link" id="bar">
                  FAQ
                </a>
              </li>
              <li className="nav-item">
                <a href="#blog" className="nav-link">
                  ESCW Token
                </a>
              </li>

              {!userInfo ? (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" id="bar">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link" id="bar">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/wallet" className="nav-link" id="bar">
                      Dashboard
                    </Link>
                  </li>

                  <button
                    className="btn btn-sm rounded btn-pexful nav-btn ms-lg-2"
                    onClick={Logout}
                  >
                    Logout
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
