import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
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

  const userName = localStorage.getItem("user_name");

  return (
    <>
      <div className="topHeaderArea">
        <div className="nav toggle">
          <Link to="#">
            <i className="fa fa-bars"></i>
          </Link>
        </div>

        <nav
          className="nav navbar-nav moveRight"
          style={{ marginBotton: "0px !important" }}
        >
          <ul className=" navbar-right">
            <li className="nav-item dropdown open">
              <i
                className="fa fa-user-circle-o"
                style={{
                  fontSize: "30px",
                  position: "absolute",
                  left: "-40px",
                  top: "-5px",
                }}
              ></i>
              <Link
                to="#"
                className="user-profile dropdown-toggle"
                aria-haspopup="true"
                id="navbarDropdown"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                {userName}
              </Link>
              <div
                className="dropdown-menu dropdown-usermenu pull-right"
                aria-labelledby="navbarDropdown"
              >
                <Link className="dropdown-item" to="/admin/profile">
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
