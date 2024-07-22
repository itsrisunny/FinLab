import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AdminHeader from "../layouts/partner-admin-header";
import AdminFooter from "../layouts/partner-admin-footer";
import AdminNavBar from "../layouts/partner-admin-nav-bar";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import Paginator from "react-hooks-paginator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LIMIT = 10;

const PartnerAdminUserList = ({ menuAccess }) => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [action, setAction] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [noOfRecord, setNoOfRecord] = useState(0);
  const [searchTxt, setSearchTxt] = useState("");

  const initialData = [
    {
      sno: 1,
      employeeid: "FL-E001",
      name: "John Doe",
      emailid: "john.doe@example.com",
      role: "Super Admin",
      status: false,
    },
    {
      sno: 2,
      employeeid: "FL-E002",
      name: "Jane Smith",
      emailid: "jane.smith@example.com",
      role: ["Business Loan", "Partner Management", "Master Management"],
      status: false,
    },
    {
      sno: 3,
      employeeid: "FL-E003",
      name: "Michael Johnson",
      emailid: "michael.johnson@example.com",
      role: "Partner Management",
      status: false,
    },
    {
      sno: 4,
      employeeid: "FL-E004",
      name: "Chander Mohan",
      emailid: "chander@apisod.ai",
      role: ["Personal Loan", "Partner List", "Master List"],
      status: false,
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    setData((prevData) => prevData.map((row) => ({ ...row, status: true })));
  }, []);

  const handleActionClick = (index, agentId, status) => {
    axios
      .post(`${API_URL}partner-user/manage-agent-status`, {
        agentID: agentId,
        status: status === 0 ? 1 : 0,
      })
      .then((res) => {
        const { data } = res;
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], status: status === 0 ? 1 : 0 };
      return newData;
    });
  };

  useEffect(() => {
    getAllPartnersData(offset);
  }, [offset]);

  const getAllPartnersData = (page) => {
    const jsonData = {
      limit: LIMIT,
      offset: page,
      partnerID: localStorage.getItem("partner_id"),
    };

    if (searchTxt !== "") {
      jsonData["searchText"] = searchTxt;
    }
    axios
      .post(`${API_URL}partner-user/get-agent-list`, jsonData)
      .then((res) => {
        const { data } = res;
        setData(data?.result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllPartnersData(0);
  }, [searchTxt]);

  const handelSearch = (e) => {
    setSearchTxt(e.target.value);
  };
  function printRoles(permissions) {
    let roles = [];

    if (permissions.isAdmin) {
      roles.push("Super Admin");
    }

    if (permissions.isAdmin && permissions.permissions.businessLoan.selectAll) {
      roles.push("Business Loan");
    } else {
      let businessLoanRoles = [];
      if (permissions.permissions.businessLoan.addCase) {
        businessLoanRoles.push("Add");
      }
      if (permissions.permissions.businessLoan.incompleteLead) {
        businessLoanRoles.push("Incomplete");
      }
      if (permissions.permissions.businessLoan.lead) {
        businessLoanRoles.push("Lead");
      }
      if (permissions.permissions.businessLoan.offeredLead) {
        businessLoanRoles.push("Offered");
      }
      if (permissions.permissions.businessLoan.closedLead) {
        businessLoanRoles.push("Closed");
      }
      if (permissions.permissions.businessLoan.declinedLead) {
        businessLoanRoles.push("Declined");
      }
      if (businessLoanRoles.length > 0) {
        roles.push(`Business Loan (${businessLoanRoles.join(", ")})`);
      }
    }

    if (permissions.permissions.personalLoan.selectAll) {
      roles.push("Personal Loan");
    } else {
      let personalLoanRoles = [];
      if (permissions.permissions.personalLoan.addCase) {
        personalLoanRoles.push("Add");
      }
      if (permissions.permissions.personalLoan.incompleteLead) {
        personalLoanRoles.push("Incomplete");
      }
      if (permissions.permissions.personalLoan.lead) {
        personalLoanRoles.push("Lead");
      }
      if (permissions.permissions.personalLoan.offeredLead) {
        personalLoanRoles.push("Offered");
      }
      if (permissions.permissions.personalLoan.closedLead) {
        personalLoanRoles.push("Closed");
      }
      if (permissions.permissions.personalLoan.declinedLead) {
        personalLoanRoles.push("Declined");
      }
      if (personalLoanRoles.length > 0) {
        roles.push(`Personal Loan (${personalLoanRoles.join(", ")})`);
      }
    }

    return roles.join(", ");
  }

  return (
    <>
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar menuAccess={menuAccess} />
          <div className="adminMain-wrapper">
            <AdminHeader />
            {/* The main Code */}
            <div className="mainContent">
              <div className="topHeadings">
                <h3>Partner Agent/ User List</h3>
              </div>
              <div className="contentBlocks">
                <div className="sectionTable">
                  <div className="continer-fluid">
                    <div className="row">
                      <div className="col-lg-12 col-md-9 col-xs-12">
                        <div className="card tableLead">
                          <div className="tableLeadCase">
                            <div className="table-label">
                              <label>
                                Search(Email registered as):
                                <input
                                  type="text"
                                  onChange={handelSearch}
                                  value={searchTxt}
                                />
                              </label>
                            </div>
                            <table
                              style={{ width: "100%" }}
                              className="table table-stripped"
                            >
                              <thead>
                                <tr>
                                  <th className="table-head">S.No.</th>
                                  <th className="table-head">Agent Id</th>
                                  <th className="table-head">Employee Id</th>
                                  <th className="table-head">Name</th>
                                  <th className="table-head">Email Id</th>
                                  <th
                                    className="table-head"
                                    style={{ width: "25%" }}
                                  >
                                    Role
                                  </th>
                                  <th className="table-head">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((row, index) => (
                                  <tr
                                    key={index}
                                    style={{ borderBottom: "1px solid #ddd" }}
                                  >
                                    <td className="table-body">{index + 1}</td>
                                    <td className="table-body">
                                      {row.agent_id}
                                    </td>
                                    <td className="table-body">
                                      {row.employee_id}
                                    </td>
                                    <td className="table-body">{row.name}</td>
                                    <td className="table-body">
                                      {row.email_id}
                                    </td>
                                    <td className="table-body">
                                      {row?.permissions
                                        ? printRoles(row?.permissions)
                                        : "-"}
                                    </td>
                                    <td className="table-body">
                                      <button
                                        className={
                                          row.status
                                            ? "btn btn-active"
                                            : "btn btn-delete"
                                        }
                                        value={action}
                                        onClick={(e) =>
                                          row?.permissions
                                            ? handleActionClick(
                                                index,
                                                row.agent_id,
                                                row.status
                                              )
                                            : alert(
                                                "Before activating the account. Please assign role and permissions."
                                              )
                                        }
                                      >
                                        {row.status ? "✔" : "✘"}
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {/* pegination */}
                            <div>
                              <Paginator
                                totalRecords={noOfRecord}
                                pageLimit={LIMIT}
                                pageNeighbours={2}
                                setOffset={setOffset}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AdminFooter />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PartnerAdminUserList;
