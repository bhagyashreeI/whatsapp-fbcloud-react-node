import React, { useState } from 'react';
import payripe_logo from "./../../images/logo/payripe_logo.png"
import { Link } from 'react-router-dom';

const Header = () => {

  const [showMsgList, setMsgList] = useState(false);

  const handleNotification = () => {
    setMsgList(!showMsgList)
  }

  return (
    <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-head-foot border ">

      <div className="container-fluid">

        <a className="navbar-brand" href="#">
          <img
            src={payripe_logo}
            alt="Payripe"
            height="50"
            loading="lazy"
          />
        </a>
        <ul className="navbar-nav ms-auto d-flex flex-row ">
          <li className="nav-item me-3 me-lg-0 p-2">
            <Link className="nav-link" to="/">
              <i className="fas fa-home">Home</i>
            </Link>
          </li>
          <li className="nav-item me-3 me-lg-0 p-2">
            <a className="nav-link" href="#">
              <i className="fab fa-info">About</i>
            </a>
          </li>
          <li className="nav-item dropdown p-2">
            <a onClick={handleNotification}
              className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                className="rounded-circle"
                height="22"
                alt="Avatar"
                loading="lazy"
              />
            </a>
            <ul className={
              "dropdown-menu dropdown-menu-end " +
              (showMsgList ? "d-block-c" : "")
            }

              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a className="dropdown-item" href="#">My profile</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Settings</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Logout <i class="fa fa-home" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

  )
}

export default Header;