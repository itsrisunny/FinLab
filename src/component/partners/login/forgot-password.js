import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FinlabLogo from "../../../assets/images/header/logo.png";
import Spinner from "react-bootstrap/Spinner";
import { API_URL } from "./../../../config/constant";
/*import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';*/
import Swal from "sweetalert2";
export default function Index({ type }) {
  const [userEmail, setUserEmail] = useState("");
  const [userEmailError, setUserEmailError] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = useState(false);
  let navigate = useNavigate();

  const isLogin =
    localStorage.getItem("isPartnerLogin") === "true" ||
    localStorage.getItem("isLogin") === "true";
  useEffect(() => {
    if (isLogin) {
      if (type === "admin") {
        return navigate("/admin/dashboard");
      }
      if (type === "partner") {
        return navigate("/partners-admin/dashboard");
      }
    }
  });

  const handelUser = (e) => {
    setUserEmailError(false);
    setUserEmail(e.target.value);
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const hanldeLoginDetails = () => {
    if (handleValidation()) {
      setIsDisableBtn(true);
      axios
        .post(API_URL + "token/generate-token", { user_id: "0" })
        .then((res) => {
          let response = res.data;
          if (response?.token) {
            let jsonFormData = {
              user: userEmail,
              token: response?.token,
              type: type,
            };
            axios
              .post(API_URL + "partners-admin/reset-password", jsonFormData)
              .then((res) => {
                let response = res.data;
                if (response?.status == 200) {
                  console.log(response);
                  Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: response?.message,
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      if (type === "partner") {
                        return navigate("/partners/login");
                      } else {
                        return navigate("/admin/login");
                      }
                    }
                  });
                }
                if (response?.status == 404) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: response?.message,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                  });
                  //toast.error(response?.message);
                }
                setIsDisableBtn(false);
              })
              .catch((e) => {
                setIsDisableBtn(false);
              });
          }
        })
        .catch((e) => {
          console.log(e);
          setIsDisableBtn(false);
        });
    }
  };

  const handleValidation = () => {
    let isFormValid = true;
    if (!userEmail) {
      isFormValid = false;
      setUserEmailError(true);
    }
    if (!validateEmail(userEmail)) {
      isFormValid = false;
      setUserEmailError(true);
    }
    return isFormValid;
  };

  return (
    <>
      <div className="adminLogin">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="authentic-wrapper">
                <div className="authentic-inner">
                  <div className="card">
                    <div className="card-body">
                      <div className="appbrandnig">
                        <img src={FinlabLogo} alt="" />
                      </div>
                      <h4 className="welcomeHeading">Welcome to Finlab! 👋</h4>

                      <div className="login-fields">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            Email or Username
                          </label>
                          <input
                            type="text"
                            className={
                              userEmailError
                                ? "form-control errorlogin"
                                : "form-control"
                            }
                            value={userEmail}
                            onChange={handelUser}
                          />
                        </div>
                        <div className="form-group form-check">
                          <label
                            className="form-check-label"
                            style={{ float: "right", paddingBottom: "10px" }}
                          >
                            <Link
                              to={
                                type === "partner"
                                  ? "/partners/login"
                                  : "/admin/login"
                              }
                            >
                              Back to login
                            </Link>
                          </label>
                        </div>
                        <div className="form-group loginBtns">
                          <button
                            className="btn btn-adminLogin"
                            onClick={hanldeLoginDetails}
                            disabled={isDisableBtn}
                          >
                            {isDisableBtn ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />{" "}
                                Please Wait...
                              </>
                            ) : (
                              "Reset Password"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
