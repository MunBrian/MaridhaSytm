import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  //get user from LS
  const user = localStorage.getItem("user");

  let name;

  if (user) {
    //get name
    name = JSON.parse(user).name;
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            MARIDHA
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {user ? (
              <>
                <li style={{ marginRight: "10px", marginTop: "10px" }}>
                  <h4 style={{ color: "white" }}>Welcome {name} </h4>
                </li>
                <li>
                  <Button buttonStyle="btn--outline" onClick={onLogout}>
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                    HOME
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Booking"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    BOOK A ROOM
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/LogIn"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    LOG IN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/SignUp"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    SIGN UP
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user && (
            <>{button && <Button buttonStyle="btn--outline">SIGN UP</Button>}</>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
