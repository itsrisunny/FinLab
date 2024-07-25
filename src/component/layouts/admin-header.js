import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JohnDoe from "../../assets/images/admin-dashboard/john.jpg";
export default function AdminHeader(props) {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLogin");
  //console.log("test",( isLogin));
  useEffect(() => {
    if (isLogin === null) {
      navigate("/admin/login");
    }
  });

  const logout = () => {
    //  localStorage.clear();
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("userLoginType");
    localStorage.removeItem("adminId");
    return navigate("/admin/login");
  };

  return (
    <>
      <div className="topHeaderArea">
        <div className="nav toggle">
          <Link to="#">
            <i className="fa fa-bars"></i>
          </Link>
        </div>

        <nav className="nav navbar-nav moveRight">
          <ul className=" navbar-right">
            <li className="nav-item dropdown open">
              <Link
                to="#"
                className="user-profile dropdown-toggle"
                aria-haspopup="true"
                id="navbarDropdown"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={JohnDoe} />
                John Doe
              </Link>
              <div
                className="dropdown-menu dropdown-usermenu pull-right"
                aria-labelledby="navbarDropdown"
              >
                <Link className="dropdown-item" to="#">
                  {" "}
                  Profile
                </Link>

                <Link className="dropdown-item" to="#">
                  Help
                </Link>
                <Link className="dropdown-item" to="#" onClick={logout}>
                  <i className="fa fa-sign-out pull-right"></i> Log Out
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
