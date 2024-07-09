import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import FinlabLogo from "../../assets/images/admin-dashboard/logofront.svg";
console.log(window.location.pathname);
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
                <NavLink to="/admin/dashboard">
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
                    window.location.pathname == "/admin/add/case" ||
                    window.location.pathname == "/admin/incomplete-lead-case" ||
                    window.location.pathname == "/admin/lead-case" ||
                    window.location.pathname == "/admin/offered-case" ||
                    window.location.pathname == "/admin/welcomed-cases" ||
                    window.location.pathname == "/admin/declined-cases" ||
                    window.location.pathname
                      .toLowerCase()
                      .includes("admin/case-detail")
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
                  Business Loan Cases
                  <i
                    className="fa fa-caret-down pull-right"
                    aria-hidden="true"
                  ></i>
                </Link>
                <div
                  id="submenu-3"
                  className={
                    window.location.pathname == "/admin/add/case" ||
                    window.location.pathname == "/admin/incomplete-lead-case" ||
                    window.location.pathname == "/admin/lead-case" ||
                    window.location.pathname == "/admin/offered-case" ||
                    window.location.pathname == "/admin/welcomed-cases" ||
                    window.location.pathname == "/admin/declined-cases" ||
                    window.location.pathname
                      .toLowerCase()
                      .includes("admin/case-detail")
                      ? "submenu collapse show"
                      : "submenu collapse"
                  }
                >
                  <ul className="nav flex-column">
                    <li className="nav-item pad">
                      <NavLink className="nav-link" to="/admin/add/case">
                        Add Case
                      </NavLink>
                    </li>
                    <li className="nav-item pad">
                      <NavLink
                        className="nav-link"
                        to="/admin/incomplete-lead-case"
                      >
                        Incomplete Leads
                      </NavLink>
                    </li>
                    <li className="nav-item pad">
                      <NavLink className="nav-link" to="/admin/lead-case">
                        Leads
                      </NavLink>
                    </li>
                    <li className="nav-item pad">
                      <NavLink className="nav-link" to="/admin/offered-case">
                        Offered Cases
                      </NavLink>
                    </li>
                    <li className="nav-item pad">
                      <NavLink className="nav-link" to="/admin/welcomed-cases">
                        Closed Cases
                      </NavLink>
                    </li>
                    <li className="nav-item pad">
                      <NavLink className="nav-link" to="/admin/declined-cases">
                        Declined Cases
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item dropdownitem">
                <Link
                  className={
                    window.location.pathname == "/admin/personal/add/case" ||
                    window.location.pathname ==
                      "/admin/personal/incomplete-lead-case" ||
                    window.location.pathname == "/admin/personal/lead-case" ||
                    window.location.pathname ==
                      "/admin/personal/offered-case" ||
                    window.location.pathname ==
                      "/admin/personal/welcomed-cases" ||
                    window.location.pathname ==
                      "/admin/personal/declined-cases" ||
                    window.location.pathname
                      .toLowerCase()
                      .includes("admin/personal/case-detail")
                      ? "active"
                      : ""
                  }
                  to="#"
                  data-toggle="collapse"
                  aria-expanded="true"
                  data-target="#submenu-6"
                  aria-controls="submenu-6"
                >
                  <i className="fa fa-futbol-o nav-icon" aria-hidden="true"></i>
                  Personal Loan Cases
                  <i
                    className="fa fa-caret-down pull-right"
                    aria-hidden="true"
                  ></i>
                </Link>
                <div
                  id="submenu-6"
                  className={
                    window.location.pathname == "/admin/personal/add/case" ||
                    window.location.pathname ==
                      "/admin/personal/incomplete-lead-case" ||
                    window.location.pathname == "/admin/personal/lead-case" ||
                    window.location.pathname ==
                      "/admin/personal/offered-case" ||
                    window.location.pathname ==
                      "/admin/personal/welcomed-cases" ||
                    window.location.pathname ==
                      "/admin/personal/declined-cases" ||
                    window.location.pathname
                      .toLowerCase()
                      .includes("admin/personal/case-detail")
                      ? "submenu collapse show"
                      : "submenu collapse"
                  }
                >
                  <ul className="nav flex-column">
                    <li className="nav-item pad">
                      <NavLink
                        className="nav-link"
                        to="/admin/personal/add/case"
                      >
                        Add Case
                      </NavLink>
                    </li>
                    <li className="nav-item pad">
                      <NavLink
                        className="nav-link"
                        to="/admin/personal/incomplete-lead-case"
                      >
                        Incomplete Leads
                      </NavLink>
                    </li>
                    <li className="nav-item pad">
                      <NavLink
                        className="nav-link"
                        to="/admin/personal/lead-case"
                      >
                        Leads
                      </NavLink>
                    </li>
                    <li className="nav-item pad">
                      <NavLink
                        className="nav-link"
                        to="/admin/personal/offered-case"
                      >
                        Offered Cases
                      </NavLink>
                    </li>
                    <li className="nav-item pad">
                      <NavLink
                        className="nav-link"
                        to="/admin/personal/welcomed-cases"
                      >
                        Closed Cases
                      </NavLink>
                    </li>
                    <li className="nav-item pad">
                      <NavLink
                        className="nav-link"
                        to="/admin/personal/declined-cases"
                      >
                        Declined Cases
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item dropdownitem">
                <Link
                  className={
                    window.location.pathname == "/admin/partner/index" ||
                    window.location.pathname
                      .toLowerCase()
                      .includes("/admin/partner-detail")
                      ? "active"
                      : ""
                  }
                  to="#"
                  data-toggle="collapse"
                  aria-expanded="true"
                  data-target="#submenu-5"
                  aria-controls="submenu-5"
                >
                  <i className="fa fa-link nav-icon" aria-hidden="true"></i>
                  Partner Management
                  <i
                    className="fa fa-caret-down pull-right"
                    aria-hidden="true"
                  ></i>
                </Link>
                <div
                  id="submenu-5"
                  className={
                    window.location.pathname == "/admin/partner/index" ||
                    window.location.pathname
                      .toLowerCase()
                      .includes("/admin/partner-detail")
                      ? "submenu collapse show"
                      : "submenu collapse"
                  }
                >
                  <ul className="nav flex-column">
                    <li className="nav-item pad">
                      <NavLink className="nav-link" to="/admin/partner/index">
                        Partner List
                      </NavLink>
                    </li>
                    <li className="nav-item pad">
                      <NavLink
                        className="nav-link"
                        to="/admin/partner/assignRole"
                      >
                        Assign Role
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item dropdownitem">
                <Link
                  className={
                    window.location.pathname == "/admin/add-bank"
                      ? "active"
                      : ""
                  }
                  to="#"
                  data-toggle="collapse"
                  aria-expanded="true"
                  data-target="#submenu-4"
                  aria-controls="submenu-4"
                >
                  <i
                    className="fa fa-object-group nav-icon"
                    aria-hidden="true"
                  ></i>
                  Master
                  <i
                    className="fa fa-caret-down pull-right"
                    aria-hidden="true"
                  ></i>
                </Link>
                <div
                  id="submenu-4"
                  className={
                    window.location.pathname == "/admin/add-bank"
                      ? "submenu collapse show"
                      : "submenu collapse"
                  }
                >
                  <ul className="nav flex-column">
                    <li className="nav-item pad">
                      <NavLink className="nav-link" to="/admin/add-bank">
                        Manage Bank
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
