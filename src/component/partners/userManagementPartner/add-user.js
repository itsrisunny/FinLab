import React, { useState, useEffect } from "react";
import AdminHeader from "../layouts/partner-admin-header";
import AdminFooter from "../layouts/partner-admin-footer";
import AdminNavBar from "../layouts/partner-admin-nav-bar";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { API_URL } from "../../../config/constant";
import Loader from "../../loader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function AddUser({ menuAccess }) {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validate = () => {
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }

    if (!mobileNumber) {
      errors.mobileNumber = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(mobileNumber.replace(/\s/g, ""))) {
      errors.mobileNumber = "Mobile Number must be 10 digits";
    }

    if (!email) {
      errors.email = "Email Id is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email Id is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = {
        name,
        mobileNumber,
        email,
        password,
        agentId,
        partnerId: localStorage.getItem("partner_id"),
        employeeId,
      };
      setLoader(true);
      Axios.post(`${API_URL}partner-user/save-partner-agent`, formData)
        .then((res) => {
          if (res?.data?.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: res?.data?.message,
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "OK",
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then((result) => {
              if (result.isConfirmed) {
                return navigate(
                  "/partners-admin/userManagementPartner/partnerAdminUserList"
                );
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res?.data?.message,
            });
          }
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Form submitted successfully:", formData);
    }
  };
  const [agentId, setAgentId] = useState("");
  const getAgentId = () => {
    setLoader(true);
    Axios.post(`${API_URL}partner-user/get-agent-id`, {
      partnerID: localStorage.getItem("partner_id"),
    })
      .then((res) => {
        const { data } = res;
        setAgentId(data?.agentID);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };
  useEffect(() => {
    getAgentId();
  }, []);
  const [employeeId, setEmployeeId] = useState("");
  const handleEmployeeIdFunction = (e) => {
    setEmployeeId(e.target.value);
  };
  const handleNameFunction = (e) => {
    errors.name = "";
    setName(e.target.value);
  };
  const handleEmailFunction = (e) => {
    errors.email = "";
    setEmail(e.target.value);
  };
  const handleMobileFunction = (e) => {
    errors.mobileNumber = "";
    setMobileNumber(e.target.value);
  };
  const handlePasswordFunction = (e) => {
    errors.password = "";
    setPassword(e.target.value);
  };
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
                <h3>User Setup</h3>
              </div>
              <div className="contentBlocks">
                <div className="sectionTable">
                  <div className="continer-fluid">
                    <div className="authentic-add-user">
                      <div className="card">
                        <div className="card-body">
                          <form className="add-user">
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sx-2">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Partner Id<span className="error">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sx-4">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Partner Id"
                                    readOnly={true}
                                    value={localStorage.getItem("partner_id")}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sx-2">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Agent Id<span className="error">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sx-4">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Agent Id"
                                    readOnly={true}
                                    value={agentId}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sx-2">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Employee Id<span className="error">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sx-4">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Employee Id"
                                    value={employeeId}
                                    onChange={handleEmployeeIdFunction}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sx-2">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Name<span className="error">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sx-4">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={handleNameFunction}
                                  />
                                  <div className="error-msg">
                                    {errors?.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sx-2">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Mobile Number
                                    <span className="error">*</span>
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
                                    value={mobileNumber}
                                    onChange={handleMobileFunction}
                                  />
                                  <div className="error-msg">
                                    {errors?.mobileNumber}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sx-2">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Email ID<span className="error">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sx-4">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Email ID"
                                    value={email}
                                    onChange={handleEmailFunction}
                                  />
                                  <div className="error-msg">
                                    {errors?.email}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-2 col-md-2 col-sx-2">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Password<span className="error">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sx-4">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordFunction}
                                  />
                                  <div className="error-msg">
                                    {errors?.password}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sx-6"></div>
                              <div className="col-lg-6 col-md-6 col-sx-6">
                                <button
                                  type="close"
                                  className="btn btn-secondary"
                                >
                                  Close
                                </button>
                                &nbsp;
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={handleSubmit}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
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
