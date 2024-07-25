import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import FinlabLogo from "../../../assets/images/admin-dashboard/logofront.svg";
import { API_URL } from "../../../config/constant";

export default function AdminNavBar({ menuAccess }) {
  const { permissions, isAdmin } = menuAccess;
  return (
    <>
      <aside>
        <div className="sidebar-header">
          <img src={FinlabLogo} alt="" />
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
              {permissions?.businessLoan?.addCase ||
              permissions?.businessLoan?.closedLead ||
              permissions?.businessLoan?.declinedLead ||
              permissions?.businessLoan?.incompleteLead ||
              permissions?.businessLoan?.lead ||
              permissions?.businessLoan?.offeredLead ? (
                <li className="nav-item dropdownitem">
                  <Link
                    className={
                      window.location.pathname === "/partners-admin/add/case" ||
                      window.location.pathname ===
                        "/partners-admin/lead-cases" ||
                      window.location.pathname ===
                        "/partners-admin/incomplete-cases" ||
                      window.location.pathname ===
                        "/partners-admin/offered-cases" ||
                      window.location.pathname ===
                        "/partners-admin/closed-cases" ||
                      window.location.pathname ===
                        "/partners-admin/declined-cases"
                        ? "active"
                        : ""
                    }
                    to="#"
                    data-toggle="collapse"
                    aria-expanded="true"
                    data-target="#submenu-3"
                    aria-controls="submenu-3"
                  >
                    <i
                      className="fa fa-futbol-o nav-icon"
                      aria-hidden="true"
                    ></i>
                    Business Loan Cases
                    <i
                      className="fa fa-caret-down pull-right"
                      aria-hidden="true"
                    ></i>
                  </Link>
                  <div
                    id="submenu-3"
                    className={
                      window.location.pathname === "/partners-admin/add/case" ||
                      window.location.pathname ===
                        "/partners-admin/lead-cases" ||
                      window.location.pathname ===
                        "/partners-admin/incomplete-cases" ||
                      window.location.pathname ===
                        "/partners-admin/closed-cases" ||
                      window.location.pathname ===
                        "/partners-admin/offered-cases" ||
                      window.location.pathname ===
                        "/partners-admin/declined-cases"
                        ? "submenu collapse show"
                        : "submenu collapse"
                    }
                  >
                    <ul className="nav flex-column">
                      {permissions?.businessLoan?.addCase ? (
                        <li className="nav-item  pad">
                          <NavLink
                            className="nav-link"
                            to="/partners-admin/add/case"
                          >
                            Add Case
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.businessLoan?.incompleteLead ? (
                        <li className="nav-item  pad">
                          <NavLink
                            className="nav-link"
                            to="/partners-admin/incomplete-cases"
                          >
                            Incomplete Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.businessLoan?.lead ? (
                        <li className="nav-item  pad">
                          <NavLink
                            className="nav-link"
                            to="/partners-admin/lead-cases"
                          >
                            Lead Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.businessLoan?.offeredLead ? (
                        <li className="nav-item  pad">
                          <NavLink
                            className="nav-link"
                            to="/partners-admin/offered-cases"
                          >
                            Offered Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.businessLoan?.closedLead ? (
                        <li className="nav-item  pad">
                          <NavLink
                            className="nav-link"
                            to="/partners-admin/closed-cases"
                          >
                            Closed Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.businessLoan?.declinedLead ? (
                        <li className="nav-item  pad">
                          <NavLink
                            className="nav-link"
                            to="/partners-admin/declined-cases"
                          >
                            Declined Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </li>
              ) : (
                ""
              )}
              {permissions?.personalLoan?.addCase ||
              permissions?.personalLoan?.closedLead ||
              permissions?.personalLoan?.declinedLead ||
              permissions?.personalLoan?.incompleteLead ||
              permissions?.personalLoan?.lead ||
              permissions?.personalLoan?.offeredLead ? (
                <li className="nav-item dropdownitem">
                  <Link
                    className={
                      window.location.pathname ===
                        "/partners-admin/personal/add-case" ||
                      window.location.pathname ===
                        "/partners-admin/personal/lead-cases" ||
                      window.location.pathname ===
                        "/partners-admin/personal/incomplete-cases" ||
                      window.location.pathname ===
                        "/partners-admin/personal/offered-cases" ||
                      window.location.pathname ===
                        "/partners-admin/personal/closed-cases" ||
                      window.location.pathname ===
                        "/partners-admin/personal/declined-cases"
                        ? "active"
                        : ""
                    }
                    to="#"
                    data-toggle="collapse"
                    aria-expanded="true"
                    data-target="#submenu-5"
                    aria-controls="submenu-5"
                  >
                    <i
                      className="fa fa-futbol-o nav-icon"
                      aria-hidden="true"
                    ></i>
                    Personal Loan Cases
                    <i
                      className="fa fa-caret-down pull-right"
                      aria-hidden="true"
                    ></i>
                  </Link>
                  <div
                    id="submenu-5"
                    className={
                      window.location.pathname ===
                        "/partners-admin/personal/add-case" ||
                      window.location.pathname ===
                        "/partners-admin/personal/lead-cases" ||
                      window.location.pathname ===
                        "/partners-admin/personal/incomplete-cases" ||
                      window.location.pathname ===
                        "/partners-admin/personal/offered-cases" ||
                      window.location.pathname ===
                        "/partners-admin/personal/closed-cases" ||
                      window.location.pathname ===
                        "/partners-admin/personal/declined-cases"
                        ? "submenu collapse show"
                        : "submenu collapse"
                    }
                  >
                    <ul className="nav flex-column">
                      {permissions?.personalLoan?.addCase ? (
                        <li className="nav-item  pad">
                          <NavLink
                            className="nav-link"
                            to="/partners-admin/personal/add-case"
                          >
                            Add Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.personalLoan?.incompleteLead ? (
                        <li className="nav-item  pad">
                          <NavLink
                            className="nav-link"
                            to="/partners-admin/personal/incomplete-cases"
                          >
                            Incomplete Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.personalLoan?.lead ? (
                        <li className="nav-item  pad">
                          <NavLink
                            className="nav-link"
                            to="/partners-admin/personal/lead-cases"
                          >
                            Lead Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.personalLoan?.offeredLead ? (
                        <li className="nav-item  pad">
                          <NavLink
                            className="nav-link"
                            to="/partners-admin/personal/offered-cases"
                          >
                            Offered Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.personalLoan?.closedLead ? (
                        <li className="nav-item  pad">
                          <NavLink
                            className="nav-link"
                            to="/partners-admin/personal/closed-cases"
                          >
                            Closed Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.personalLoan?.declinedLead ? (
                        <li className="nav-item  pad">
                          <NavLink
                            className="nav-link"
                            to="/partners-admin/personal/declined-cases"
                          >
                            Declined Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item dropdownitem">
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
              {isAdmin && (
                <li className="nav-item dropdownitem">
                  <Link
                    className={
                      window.location.pathname ==
                        "/partners-admin/userManagementPartner/add-user" ||
                      window.location.pathname ==
                        "/partners-admin/userManagementPartner/assign-role" ||
                      window.location.pathname ==
                        "/partners-admin/userManagementPartner/partnerAdminUserList"
                        ? "active"
                        : ""
                    }
                    to="#"
                    data-toggle="collapse"
                    aria-expanded="true"
                    data-target="#submenu-10"
                    aria-controls="submenu-10"
                  >
                    <i
                      className="fa fa-futbol-o nav-icon"
                      aria-hidden="true"
                    ></i>
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
                        "/partners-admin/userManagementPartner/assign-role" ||
                      window.location.pathname ==
                        "/partners-admin/userManagementPartner/partnerAdminUserList"
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
                      <li className="nav-item pad">
                        <NavLink
                          className="nav-link"
                          to="/partners-admin/userManagementPartner/partnerAdminUserList"
                        >
                          User List
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
