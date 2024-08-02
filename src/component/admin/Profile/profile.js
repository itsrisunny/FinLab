import React, { useState, useEffect } from "react";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import Loader from "../../loader";
import { useNavigate } from "react-router-dom";

export default function Profile({ menuAccess }) {
  const [offset, setOffset] = useState(0);

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const adminId = localStorage.getItem("adminId");
  const userLoginType = localStorage.getItem("userLoginType");

  const getAllProfileData = (page) => {
    setLoader(true);
    const jsonData = {
      offset: page,
      user_id: adminId,
      type: userLoginType,
    };
    axios
      .post(`${API_URL}get-user-profile`, jsonData)
      .then((res) => {
        const { data } = res;
        setData(data?.data);
        setLoader(false);
      })
      .catch((e) => {
        console.log("error", e);
        setLoader(false);
      });
  };

  useEffect(() => {
    getAllProfileData();
  }, [userLoginType]);

  function getRolePermissions(data) {
    const permissionsArray = [];

    if (data.permissions.superAdmin) permissionsArray.push("Super Admin");
    if (data.permissions.partnerManagement)
      permissionsArray.push("Partner Management");
    if (data.permissions.masterManagement)
      permissionsArray.push("Master Management");

    const { businessLoan, personalLoan } = data.permissions.permissions;
    if (businessLoan.selectAll) permissionsArray.push("Business Loan");
    if (personalLoan.selectAll) permissionsArray.push("Personal Loan");

    return permissionsArray;
  }

  return (
    <>
      {loader && <Loader />}
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar menuAccess={menuAccess} />
          <div className="adminMain-wrapper">
            <AdminHeader />
            <div className="mainContent">
              <div className="topHeadings">
                <h3>Profile</h3>
              </div>
              <div className="contentBlocks">
                <div className="sectionTable">
                  <div className="continer-fluid">
                    <div className="authentic-add-user">
                      <div className="card">
                        <div className="card-body">
                          {userLoginType == data.user_type ? (
                            <form className="add-user">
                              <div className="row">
                                <div className="col-lg-2 col-md-2 col-sx-2">
                                  <div className="form-group">
                                    <label htmlFor="">Employee Id</label>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sx-4">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Employee Id"
                                      value={data.emp_id ? data.emp_id : "-"}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-2 col-md-2 col-sx-2">
                                  <div className="form-group">
                                    <label htmlFor="">CRM Id</label>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sx-4">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="CRM Id"
                                      value={data.crm_id ? data.crm_id : "-"}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-2 col-md-2 col-sx-2">
                                  <div className="form-group">
                                    <label htmlFor="">Name</label>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sx-4">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Name"
                                      value={data.name ? data.name : "-"}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-2 col-md-2 col-sx-2">
                                  <div className="form-group">
                                    <label htmlFor="">Mobile Number</label>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sx-4">
                                  <div className="form-group">
                                    <InputMask
                                      mask="999 999 9999"
                                      maskChar=""
                                      className="form-control"
                                      placeholder="Mobile Number(999 999 9999)"
                                      value={data.mobile ? data.mobile : "-"}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-2 col-md-2 col-sx-2">
                                  <div className="form-group">
                                    <label htmlFor="">Email ID</label>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sx-4">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Email ID"
                                      value={data.email ? data.email : "-"}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-2 col-md-2 col-sx-2">
                                  <div className="form-group">
                                    <label htmlFor="">Role</label>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sx-4">
                                  <div className="form-group">
                                    <textarea
                                      className="form-control input-field"
                                      placeholder="Role"
                                      value={
                                        getRolePermissions(data).length > 0
                                          ? getRolePermissions(data).join("\n")
                                          : "-"
                                      }
                                      rows={
                                        getRolePermissions(data).length > 0
                                          ? getRolePermissions(data).length
                                          : 1
                                      }
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-2 col-md-2 col-sx-2">
                                  <div className="form-group">
                                    <label htmlFor="">Status</label>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sx-4">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Status"
                                      value={
                                        data.status == 1
                                          ? "Active"
                                          : "In-active"
                                      }
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          ) : (
                            <p>No profile data found</p>
                          )}
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
}
