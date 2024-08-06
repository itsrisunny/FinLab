import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, NavLink, useParams } from "react-router-dom";
import FinlabLogo from "../../assets/images/admin-dashboard/logofront.svg";
console.log(window.location.pathname);
export default function AdminNavBar({ menuAccess }) {
  const {
    permissions,
    masterManagement,
    partnerManagement,
    superAdmin,
    user_type,
  } = menuAccess;
  let { caseID, type, offerId } = useParams();
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
                <NavLink to="/admin/dashboard">
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
                      window.location.pathname == "/admin/add/case" ||
                      window.location.pathname ==
                        "/admin/incomplete-lead-case" ||
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
                      window.location.pathname == "/admin/add/case" ||
                      window.location.pathname ==
                        "/admin/incomplete-lead-case" ||
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
                      {permissions?.businessLoan?.addCase ? (
                        <li className="nav-item pad">
                          <NavLink className="nav-link" to="/admin/add/case">
                            Add Case
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.businessLoan?.incompleteLead ? (
                        <li className="nav-item pad">
                          <NavLink
                            className={
                              type == "0" &&
                              window.location.pathname
                                .toLowerCase()
                                .includes("admin/case-detail")
                                ? "nav-link active"
                                : "nav-link"
                            }
                            to="/admin/incomplete-lead-case"
                          >
                            Incomplete Leads
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.businessLoan?.lead ? (
                        <li className="nav-item pad">
                          <NavLink
                            className={
                              type == "1" &&
                              window.location.pathname
                                .toLowerCase()
                                .includes("admin/case-detail")
                                ? "nav-link active"
                                : "nav-link"
                            }
                            to="/admin/lead-case"
                          >
                            Leads
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.businessLoan?.offeredLead ? (
                        <li className="nav-item pad">
                          <NavLink
                            className={
                              type == "2" &&
                              window.location.pathname
                                .toLowerCase()
                                .includes("admin/case-detail")
                                ? "nav-link active"
                                : "nav-link"
                            }
                            to="/admin/offered-case"
                          >
                            Offered Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.businessLoan?.closedLead ? (
                        <li className="nav-item pad">
                          <NavLink
                            className={
                              type == "4" &&
                              window.location.pathname
                                .toLowerCase()
                                .includes("admin/case-detail")
                                ? "nav-link active"
                                : "nav-link"
                            }
                            to="/admin/welcomed-cases"
                          >
                            Closed Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.businessLoan?.declinedLead ? (
                        <li className="nav-item pad">
                          <NavLink
                            className={
                              type == "3" &&
                              window.location.pathname
                                .toLowerCase()
                                .includes("admin/case-detail")
                                ? "nav-link active"
                                : "nav-link"
                            }
                            to="/admin/declined-cases"
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
                      {permissions?.personalLoan?.addCase ? (
                        <li className="nav-item pad">
                          <NavLink
                            className="nav-link"
                            to="/admin/personal/add/case"
                          >
                            Add Case
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.personalLoan?.incompleteLead ? (
                        <li className="nav-item pad">
                          <NavLink
                            className={
                              type == "0" &&
                              window.location.pathname
                                .toLowerCase()
                                .includes("admin/personal/case-detail")
                                ? "nav-link active"
                                : "nav-link"
                            }
                            to="/admin/personal/incomplete-lead-case"
                          >
                            Incomplete Leads
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.personalLoan?.lead ? (
                        <li className="nav-item pad">
                          <NavLink
                            className={
                              type == "1" &&
                              window.location.pathname
                                .toLowerCase()
                                .includes("admin/personal/case-detail")
                                ? "nav-link active"
                                : "nav-link"
                            }
                            to="/admin/personal/lead-case"
                          >
                            Leads
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.personalLoan?.offeredLead ? (
                        <li className="nav-item pad">
                          <NavLink
                            className={
                              type == "2" &&
                              window.location.pathname
                                .toLowerCase()
                                .includes("admin/personal/case-detail")
                                ? "nav-link active"
                                : "nav-link"
                            }
                            to="/admin/personal/offered-case"
                          >
                            Offered Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.personalLoan?.closedLead ? (
                        <li className="nav-item pad">
                          <NavLink
                            className={
                              type == "4" &&
                              window.location.pathname
                                .toLowerCase()
                                .includes("admin/personal/case-detail")
                                ? "nav-link active"
                                : "nav-link"
                            }
                            to="/admin/personal/welcomed-cases"
                          >
                            Closed Cases
                          </NavLink>
                        </li>
                      ) : (
                        ""
                      )}
                      {permissions?.personalLoan?.declinedLead ? (
                        <li className="nav-item pad">
                          <NavLink
                            className={
                              type == "3" &&
                              window.location.pathname
                                .toLowerCase()
                                .includes("admin/personal/case-detail")
                                ? "nav-link active"
                                : "nav-link"
                            }
                            to="/admin/personal/declined-cases"
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
              {partnerManagement ? (
                <li className="nav-item dropdownitem">
                  <Link
                    className={
                      window.location.pathname == "/admin/partner/index" ||
                      window.location.pathname
                        .toLowerCase()
                        .includes("/admin/partner-detail") ||
                      window.location.pathname
                        .toLowerCase()
                        .includes("/admin/partner/index")
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
                        .includes("/admin/partner-detail") ||
                      window.location.pathname
                        .toLowerCase()
                        .includes("/admin/partner/index")
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
              ) : (
                ""
              )}
              {superAdmin ? (
                <li className="nav-item dropdownitem">
                  <Link
                    className={
                      window.location.pathname ==
                        "/admin/userManagement/add-user" ||
                      window.location.pathname ==
                        "/admin/userManagement/assign-role" ||
                      window.location.pathname ==
                        "/admin/userManagement/adminUserList"
                        ? "active"
                        : ""
                    }
                    to="#"
                    data-toggle="collapse"
                    aria-expanded="true"
                    data-target="#submenu-7"
                    aria-controls="submenu-7"
                  >
                    <i className="fa fa-user nav-icon" aria-hidden="true"></i>
                    User Management
                    <i
                      className="fa fa-caret-down pull-right"
                      aria-hidden="true"
                    ></i>
                  </Link>
                  <div
                    id="submenu-7"
                    className={
                      window.location.pathname ==
                        "/admin/userManagement/add-user" ||
                      window.location.pathname ==
                        "/admin/userManagement/assign-role" ||
                      window.location.pathname ==
                        "/admin/userManagement/adminUserList"
                        ? "submenu collapse show"
                        : "submenu collapse"
                    }
                  >
                    <ul className="nav flex-column">
                      <li className="nav-item pad">
                        <NavLink
                          className="nav-link"
                          to="/admin/userManagement/add-user"
                        >
                          Add User
                        </NavLink>
                      </li>
                      <li className="nav-item pad">
                        <NavLink
                          className="nav-link"
                          to="/admin/userManagement/assign-role"
                        >
                          Assign role to user
                        </NavLink>
                      </li>
                      <li className="nav-item pad">
                        <NavLink
                          className="nav-link"
                          to="/admin/userManagement/adminUserList"
                        >
                          Admin User List
                        </NavLink>
                      </li>
                      {user_type === "admin" ? (
                        <li className="nav-item pad">
                          <NavLink
                            className="nav-link"
                            to="/admin/userManagement/assignCases"
                          >
                            Assign Cases
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

              {superAdmin ? (
                <li className="nav-item dropdownitem">
                  <Link
                    className={
                      window.location.pathname ==
                      "/admin/caseAssign/assignCases"
                        ? "active"
                        : ""
                    }
                    to="#"
                    data-toggle="collapse"
                    aria-expanded="true"
                    data-target="#submenu-8"
                    aria-controls="submenu-8"
                  >
                    <i className="fa fa-file nav-icon" aria-hidden="true"></i>
                    Case Assign
                    <i
                      className="fa fa-caret-down pull-right"
                      aria-hidden="true"
                    ></i>
                  </Link>
                  <div
                    id="submenu-8"
                    className={
                      window.location.pathname ==
                      "/admin/caseAssign/assignCases"
                        ? "submenu collapse show"
                        : "submenu collapse"
                    }
                  >
                    <ul className="nav flex-column">
                      <li className="nav-item pad">
                        <NavLink
                          className="nav-link"
                          to="/admin/caseAssign/assignCases"
                        >
                          Assign Cases
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                ""
              )}

              {masterManagement ? (
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
              ) : (
                ""
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
