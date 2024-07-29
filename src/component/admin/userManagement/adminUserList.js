import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import Loader from "../../loader";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import Paginator from "react-hooks-paginator";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const LIMIT = 10;

const AdminUserList = ({ menuAccess }) => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [action, setAction] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [noOfRecord, setNoOfRecord] = useState(0);
  const [searchTxt, setSearchTxt] = useState("");
  const [loader, setLoader] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData((prevData) => prevData.map((row) => ({ ...row, status: true })));
  }, []);

  const handleActionClick = (index, id, status) => {
    axios
      .post(`${API_URL}admin-user/manage-admin-user-status`, {
        id: id,
        status: status === 0 ? 1 : 0,
      })
      .then((res) => {
        const { data } = res;
        if (res?.data?.status === 200) {
          Swal.fire({
            title: "Success!",
            text: res?.data?.message,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res?.data?.message,
          });
        }
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
    setLoader(true);
    const jsonData = {
      limit: LIMIT,
      offset: page,
      searchText: "",
    };

    if (searchTxt != "") {
      jsonData["searchText"] = searchTxt;
    }
    axios
      .post(`${API_URL}admin-user/list-admin-user`, jsonData)
      .then((res) => {
        const { data } = res;
        // console.log(data)
        setData(data?.data);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
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
    // console.log(permissions)

    if (permissions.superAdmin) {
      roles.push("Super Admin");
    }

    if (permissions.partnerManagement) {
      roles.push("Partner Management");
    }

    if (permissions.masterManagement) {
      roles.push("Master Management");
    }

    if (permissions.permissions.businessLoan.selectAll) {
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

    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {roles.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {loader && <Loader />}
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar menuAccess={menuAccess} />
          <div className="adminMain-wrapper">
            <AdminHeader />
            {/* The main Code */}
            <div className="mainContent">
              <div className="topHeadings">
                <h3>Admin Agent/ User List</h3>
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
                                  <th className="table-head">Employee Id</th>
                                  <th className="table-head">Name</th>
                                  <th className="table-head">CRM Id</th>
                                  <th className="table-head">Email Id</th>
                                  <th className="table-head">Role</th>
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
                                    <td className="table-body">{row.emp_id}</td>
                                    <td className="table-body">{row.name}</td>
                                    <td className="table-body">{row.crm_id}</td>
                                    <td className="table-body">{row.email}</td>
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
                                        onClick={() =>
                                          handleActionClick(
                                            index,
                                            row.id,
                                            row.status
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

export default AdminUserList;
