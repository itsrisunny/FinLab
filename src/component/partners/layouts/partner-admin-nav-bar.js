import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import FinlabLogo from "../../../assets/images/admin-dashboard/logofront.svg";
import { API_URL } from "../../../config/constant";

export default function AdminNavBar(props) {
  return (
    <>
      <aside>
        <div className="sidebar-header">
          <img src={FinlabLogo} />
        </div>
        <div className="mainLeftnav">
          <nav className="sidenavItems">
            <ul>
              <li>
                <NavLink to="/partners-admin/dashboard">
                  <i
                    className="fa fa-tachometer nav-icon"
                    aria-hidden="true"
                  ></i>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item dropdownitem">
                <Link
                  className={
                    window.location.pathname == "/partners-admin/add-cases" ||
                    window.location.pathname ==
                      "/partners-admin/personal/add-cases"
                      ? "active"
                      : ""
                  }
                  to="#"
                  data-toggle="collapse"
                  aria-expanded="true"
                  data-target="#submenu-3"
                  aria-controls="submenu-3"
                >
                  <i className="fa fa-futbol-o nav-icon" aria-hidden="true"></i>
                  Cases
                  <i
                    className="fa fa-caret-down pull-right"
                    aria-hidden="true"
                  ></i>
                </Link>
                <div
                  id="submenu-3"
                  className={
                    window.location.pathname == "/partners-admin/add-cases" ||
                    window.location.pathname ==
                      "/partners-admin/personal/add-cases"
                      ? "submenu collapse show"
                      : "submenu collapse"
                  }
                >
                  <ul className="nav flex-column">
                    <li className="nav-item  pad">
                      <NavLink
                        className="nav-link"
                        to="/partners-admin/add-cases"
                      >
                        Business Add/List
                      </NavLink>
                    </li>
                    <li className="nav-item  pad">
                      <NavLink
                        className="nav-link"
                        to="/partners-admin/personal/add-cases"
                      >
                        Personal Add/List
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <Link
                  className="nav-link"
                  to="#"
                  data-toggle="collapse"
                  aria-expanded="true"
                  data-target="#submenu-4"
                  aria-controls="submenu-4"
                >
                  <i className="fa fa-adjust nav-icon" aria-hidden="true"></i>
                  Templates
                  <i
                    className="fa fa-caret-down pull-right"
                    aria-hidden="true"
                  ></i>
                </Link>
                <div id="submenu-4" className="submenu collapse">
                  <ul className="nav flex-column">
                    <li className="nav-item  pad">
                      <NavLink
                        className="nav-link"
                        to={API_URL + "templates/case-bulk-upload.csv"}
                        target="_blank"
                        download="Bulk_upload_template"
                      >
                        Business Loan Cases
                      </NavLink>
                    </li>
                    <li className="nav-item  pad">
                      <NavLink
                        className="nav-link"
                        to={API_URL + "templates/case-bulk-upload-personal.csv"}
                        target="_blank"
                        download="Bulk_upload_template"
                      >
                        Personal Loan Cases
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item dropdownitem">
                <Link
                  className={
                    window.location.pathname ==
                      "/partners-admin/userManagementPartner/add-user" ||
                    window.location.pathname ==
                      "/partners-admin/userManagementPartner/assign-role"
                      ? "active"
                      : ""
                  }
                  to="#"
                  data-toggle="collapse"
                  aria-expanded="true"
                  data-target="#submenu-10"
                  aria-controls="submenu-10"
                >
                  <i className="fa fa-futbol-o nav-icon" aria-hidden="true"></i>
                  User Management
                  <i
                    className="fa fa-caret-down pull-right"
                    aria-hidden="true"
                  ></i>
                </Link>
                <div
                  id="submenu-10"
                  className={
                    window.location.pathname ==
                      "/partners-admin/userManagementPartner/add-user" ||
                    window.location.pathname ==
                      "/partners-admin/userManagementPartner/assign-role"
                      ? "submenu collapse show"
                      : "submenu collapse"
                  }
                >
                  <ul className="nav flex-column">
                    <li className="nav-item pad">
                      <NavLink
                        className="nav-link"
                        to="/partners-admin/userManagementPartner/add-user"
                      >
                        Add User
                      </NavLink>
                    </li>
                    <li className="nav-item pad">
                      <NavLink
                        className="nav-link"
                        to="/partners-admin/userManagementPartner/assign-role"
                      >
                        Assign role to user
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
