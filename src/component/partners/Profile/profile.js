import React, { useState, useEffect } from "react";
import AdminHeader from "../layouts/partner-admin-header";
import AdminFooter from "../layouts/partner-admin-footer";
import AdminNavBar from "../layouts/partner-admin-nav-bar";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import Loader from "../../loader";
import { useNavigate } from "react-router-dom";

export default function ProfilePartner({ menuAccess }) {
  const [offset, setOffset] = useState(0);

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const indexId = localStorage.getItem("id");

  const filteredData = data.filter((item) => item.id == indexId);

  useEffect(() => {
    getAllProfilePartnerData(offset);
  }, [offset]);

  const getAllProfilePartnerData = (page) => {
    setLoader(true);
    const jsonData = {
      offset: page,
      partnerID: localStorage.getItem("partner_id"),
    };
    axios
      .post(`${API_URL}partner-user/get-agent-list`, jsonData)
      .then((res) => {
        const { data } = res;
        setData(data?.result);
        setLoader(false);
      })
      .catch((e) => {
        console.log("error", e);
        setLoader(false);
      });
  };

  useEffect(() => {
    getAllProfilePartnerData();
  }, []);

  function getRolePermissions(filteredData) {
    const permissionsArray = [];

    filteredData.forEach((value) => {
      const { permissions } = value;
      if (permissions.isAdmin) permissionsArray.push("Admin");

      const { businessLoan, personalLoan } = permissions.permissions;

      if (businessLoan.selectAll) permissionsArray.push("Business Loan");
      if (personalLoan.selectAll) permissionsArray.push("Personal Loan");
    });

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
                <h3>Partner Profile</h3>
              </div>
              <div className="contentBlocks">
                <div className="sectionTable">
                  <div className="continer-fluid">
                    <div className="authentic-add-user">
                      <div className="card">
                        <div className="card-body">
                          {filteredData.length > 0 ? (
                            filteredData.map((profile) => (
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
                                        value={
                                          profile.employee_id
                                            ? profile.employee_id
                                            : "-"
                                        }
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-lg-2 col-md-2 col-sx-2">
                                    <div className="form-group">
                                      <label htmlFor="">Agent Id</label>
                                    </div>
                                  </div>
                                  <div className="col-lg-4 col-md-4 col-sx-4">
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Agent Id"
                                        value={
                                          profile.agent_id
                                            ? profile.agent_id
                                            : "-"
                                        }
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
                                        value={
                                          profile.name ? profile.name : "-"
                                        }
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
                                        value={
                                          profile.mobile ? profile.mobile : "-"
                                        }
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
                                        value={
                                          profile.email_id
                                            ? profile.email_id
                                            : "-"
                                        }
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
                                          getRolePermissions(filteredData)
                                            .length > 0
                                            ? getRolePermissions(
                                                filteredData
                                              ).join("\n")
                                            : "-"
                                        }
                                        rows={
                                          getRolePermissions(filteredData)
                                            .length > 0
                                            ? getRolePermissions(filteredData)
                                                .length
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
                                          profile.status == 1
                                            ? "Active"
                                            : "In-active"
                                        }
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                              </form>
                            ))
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
