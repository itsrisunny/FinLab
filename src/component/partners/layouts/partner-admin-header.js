import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JohnDoe from "../../../assets/images/admin-dashboard/john.jpg";
export default function AdminHeader(props) {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isPartnerLogin");
  const [userName, setUserName] = useState("");
  //console.log("test",( isLogin));
  useEffect(() => {
    if (isLogin === null) {
      navigate("/partners/login");
    }
  });

  const logout = () => {
    // localStorage.clear();
    localStorage.removeItem("isPartnerLogin");
    localStorage.removeItem("partner_name");
    localStorage.removeItem("partner_email");
    localStorage.removeItem("partner_id");
    localStorage.removeItem("id");
    return navigate("/partners/login");
  };

  useEffect(() => {
    if (localStorage.getItem("partner_name") != undefined) {
      setUserName(localStorage.getItem("partner_name"));
    }
  }, [localStorage.getItem("partner_name")]);

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
          style={{ marginBotton: "0px" }}
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
                <Link className="dropdown-item" to="/partners-admin/profile">
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
