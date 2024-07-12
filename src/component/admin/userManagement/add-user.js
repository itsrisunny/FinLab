import React, { useState, useEffect } from "react";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddUser() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }

    if (!mobileNumber) {
      errors.mobileNumber = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(mobileNumber)) {
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
      const formData = { name, mobileNumber, email, password };
      console.log("Form submitted successfully:", formData);
    }
  };

  return (
    <>
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar />
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
                                  />
                                </div>
                              </div>
                            </div>
							<div className="row">
                              <div className="col-lg-2 col-md-2 col-sx-2">
                                <div className="form-group">
                                  <label htmlFor="">
                                    CRM Id<span className="error">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4 col-sx-4">
                                <div className="form-group">
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="CRM Id"
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
                                  />
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
                                  />
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
                                  />
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
                                    type="text"
                                    placeholder="Password"
                                  />
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
