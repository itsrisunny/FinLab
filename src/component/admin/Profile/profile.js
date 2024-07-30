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
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [crmId, setCrmId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const adminId = localStorage.getItem("adminId")
  console.log("admin Id", adminId)

  // const filteredData = data.filter((item) => item.id === adminId);
  const filteredData = data.filter((item) => item.id == adminId);
  console.log("filter data", filteredData)

  useEffect(() => {
    getAllProfileData(offset);
  }, [offset]);

  const getAllProfileData = (page) => {
    const jsonData = {
      offset: page,
    };
    axios
      .post(`${API_URL}admin-user/list-admin-user`, jsonData)
      .then((res) => {
        const { data } = res;
        console.log(data.data);
        setData(data?.data);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  useEffect(() => {
    getAllProfileData();
  }, []);

  

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
                        {filteredData.length > 0 ? (
                            filteredData.map((profile) => (
                          <form className="add-user">
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sx-2">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Employee Id
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sx-4">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Employee Id"
                                    value={profile.emp_id}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sx-2">
                                <div className="form-group">
                                  <label htmlFor="">
                                    CRM Id
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sx-4">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="CRM Id"
                                    value={profile.crm_id}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sx-2">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Name
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sx-4">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Name"
                                    value={profile.name}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sx-2">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Mobile Number
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sx-4">
                                <div className="form-group">
                                  <InputMask
                                    mask="999 999 9999"
                                    maskChar=""
                                    className="form-control"
                                    placeholder="Mobile Number(999 999 9999)"
                                    value={profile.mobile}
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
                                    value={profile.email}
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
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Email ID"
                                    value={profile.role}
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
                                    placeholder="Email ID"
                                    value={profile.status}
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
