import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import Loader from "../../loader/";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import numberToText from "number-to-text";
require("number-to-text/converters/en-in");
export default function AddCase({ menuAccess }) {
  const [loader, setLoader] = useState(true);
  const [loanPurposeData, setLoanPurposeData] = useState([]);
  const [subLoanPurposeData, setSubLoanPurposeData] = useState([]);
  const [allLoanPurposeList, setAllLoanPurposeList] = useState([]);
  const [loanPurpose, setLoanPurpose] = useState("1");
  const [loanPurposeError, setLoanPurposeError] = useState(false);
  const [subLoanPurpose, setSubLoanPurpose] = useState("");
  const [subLoanPurposeError, setSubLoanPurposeError] = useState(false);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanAmountError, setLoanAmountError] = useState(false);
  const [invalidLoanAmountError, setInvalidLoanAmountError] = useState(false);
  const [loanDuration, setLaonDuration] = useState("");
  const [loanDurationError, setLaonDurationError] = useState(false);
  const [panNumberError, setPanNumberError] = useState(false);
  const [invalidPanNumberError, setInvalidPanNumberError] = useState(false);
  const [panNumber, setPanNumber] = useState("");
  const [gstinNumberError, setGstinNumberError] = useState(false);
  const [invalidGstinNumberError, setInvalidGstinNumberError] = useState(false);
  const [gstinNumber, setGstinNumber] = useState("");
  const [aadhaarError, setAadhaarError] = useState(false);
  const [invalidAadhaarError, setInvalidAadhaarError] = useState(false);
  const [aadhaar, setAadhaar] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [invalidMobileNumberError, setInvalidMobileNumberError] =
    useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailIDError, setEmailIDError] = useState(false);
  const [invalidEmailIDError, setInvalidEmailIDError] = useState(false);
  const [emailID, setEmailID] = useState("");
  const [activePartnerList, setActivePartnerList] = useState([]);
  const [partner, setPartner] = useState("");
  const [panValid, setPanValid] = useState(false);
  const [aadhaarValid, setAadhaarValid] = useState(false);
  const [validGstin, setValidGstin] = useState(false);
  const [patronid, setPatronid] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [panCaseNumber, setPanCaseNumber] = useState("");
  const [mobileCaseNumber, setMobileCaseNumber] = useState("");
  const [emailCaseNumber, setEmailCaseNumber] = useState("");
  const [dob, setDOB] = useState("");
  const [doi, setDOI] = useState("");
  useEffect(() => {
    getLoanPurposeData();
    getActivePartnerFunc();
    getToken();
  }, []);
  const getActivePartnerFunc = () => {
    axios
      .post(API_URL + "admin/active-partner")
      .then((res) => {
        let response = res.data;
        setActivePartnerList(response?.data);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };
  const getLoanPurposeData = () => {
    axios
      .get(API_URL + "master/loan-purpose")
      .then((res) => {
        let response = res.data;
        //setAllLoanPurposeList(response?.data)
        let sub_data = [];
        response?.data.map((v, i) => {
          if (v.parent_id == "1") {
            sub_data.push(v);
          }
        });
        setSubLoanPurposeData(sub_data);

        let filter_data = response?.data.filter((v) => {
          return v.parent_id === 0;
        });
        setLoanPurposeData(filter_data);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };
  const handleLoanPurpose = (e) => {
    setLoanPurposeError(false);
    setLoanPurpose(e.target.value);
    let sub_data = [];
    if (e.target.value) {
      allLoanPurposeList.map((v, i) => {
        if (v.parent_id == e.target.value) {
          sub_data.push(v);
        }
      });
      setSubLoanPurposeData(sub_data);
    } else {
      setSubLoanPurposeData([]);
    }
  };
  const handleName = (e) => {
    setNameError(false);
    setName(e.target.value);
  };
  const handleSubLoanPurpose = (e) => {
    setSubLoanPurposeError(false);
    setSubLoanPurpose(e.target.value);
  };
  const handleLoanAmount = (e) => {
    setLoanAmountError(false);
    setInvalidLoanAmountError(false);
    setLoanAmount(e.target.value ? e.target.value : 0);
  };
  const handleLoanDuration = (e) => {
    setLaonDurationError(false);
    setLaonDuration(e.target.value);
  };
  const [panNumberExistError, setPanNumberExistError] = useState(false);
  const [mobileExistError, setMobileExistError] = useState(false);
  const [emailExistError, setEmailExistError] = useState(false);
  const handlePanNumber = (e) => {
    setPanNumberError(false);
    setInvalidPanNumberError(false);
    setPanNumberExistError(false);
    setPanNumber(e.target.value.toUpperCase());
    if (e.target.value.length == 10) {
      checkPanNumber(e.target.value);
      //verifyPancardNo((e.target.value).toUpperCase());
    } else {
      setPanValid(false);
      setName("");
    }
  };

  const checkPanNumber = (e) => {
    setLoader(true);
    axios
      .post(API_URL + "user/check-user-pan", {
        pan: e,
        case_id: "",
        loanPurpose: "1",
      })
      .then((res) => {
        setLoader(false);
        let response = res.data;
        if (response?.data?.panExists) {
          setPanNumberExistError(true);
          setPanCaseNumber(response?.data?.caseNumber);
        } else {
          verifyPancardNoFunc(e.toUpperCase());
        }
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };
  const handleGstinNumber = (e) => {
    setGstinNumberError(false);
    setInvalidGstinNumberError(false);
    setGstinNumber(e.target.value.toUpperCase());
  };
  const handleAadhaarNumber = (e) => {
    setAadhaarError(false);
    setInvalidAadhaarError(false);
    setAadhaar(e.target.value);
  };
  const handleMobileNumber = (e) => {
    setMobileNumberError(false);
    setInvalidMobileNumberError(false);
    setMobileExistError(false);
    setMobileNumber(e.target.value);
    if (e.target.value.replace(/ /g, "").length == 10) {
      checkMobileNumber(e.target.value);
    }
  };
  const checkMobileNumber = (mobileNumber) => {
    setLoader(true);
    axios
      .post(API_URL + "user/check-user-mobile", {
        mobile: mobileNumber.replace(/ /g, ""),
        case_id: "",
      })
      .then((res) => {
        setLoader(false);
        let response = res.data;
        if (response?.data?.mobileExists) {
          setMobileExistError(true);
          setMobileCaseNumber(response?.data?.caseNumber);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };
  const handleEmailID = (e) => {
    setEmailIDError(false);
    setInvalidEmailIDError(false);
    setEmailExistError(false);
    setEmailID(e.target.value);
    if (validateEmail(e.target.value)) {
      checkEmailID(e.target.value);
    }
  };
  const checkEmailID = (email_id) => {
    setLoader(true);
    axios
      .post(API_URL + "user/check-user-email", {
        email_id: email_id,
        case_id: "",
      })
      .then((res) => {
        setLoader(false);
        let response = res.data;
        if (response?.data?.emailExists) {
          setEmailExistError(true);
          setEmailCaseNumber(response?.data?.caseNumber);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };
  const handleActivePartner = (e) => {
    setPartner(e.target.value);
  };
  const handleResetFunc = () => {
    setName("");
    setSubLoanPurpose("");
    setLoanAmount(50000);
    setLaonDuration("");
    setPanNumber("");
    setGstinNumber("");
    setAadhaar("");
    setMobileNumber("");
    setEmailID("");
    setPartner("");
    setDOB("");
    setDOI("");
    setPanValid(false);
    setAadhaarValid(false);
    setValidGstin(false);
    setSubLoanPurposeData([]);
  };
  const verifyPancardNoFunc = (e) => {
    if (validatePAN(e)) {
      setLoader(true);
      axios
        .post(API_URL + "api-auth/verify-pan-number-v3", { pan: e })
        .then((res) => {
          if (res?.data?.data != undefined) {
            let response = res.data;
            let d = e.match(/(.).{6}$/);
            console.log(d[1]);
            if (d[1] == "P") {
              setDOB(response?.data?.result?.dob);
            } else {
              setDOI(response?.data?.result?.dob);
            }
            setName(response?.data?.result?.name);
            setPanValid(true);
            setNameError(false);
            setInvalidPanNumberError(false);
          } else {
            setPanValid(false);
            setInvalidPanNumberError(true);
          }
          setLoader(false);
        })
        .catch((e) => {
          setLoader(false);
        });
    } else {
      setPanValid(false);
      setInvalidPanNumberError(true);
      setName("");
    }
  };
  const verifyAadhaarcardNo = (e) => {
    if (e.target.value.length == 14) {
      setLoader(true);
      axios
        .post(API_URL + "api-auth/verify-aadhar-number-v3", {
          uid: e.target.value.replace(/\s+/g, ""),
        })
        .then((res) => {
          if (res?.data?.data != undefined) {
            let response = res.data;
            if (res?.data?.data?.result?.verified) {
              setAadhaarValid(true);
            } else {
              setAadhaarValid(false);
            }
          } else {
            setAadhaarValid(false);
          }
          setLoader(false);
        })
        .catch((e) => {
          setLoader(false);
        });
    } else {
      setAadhaarValid(false);
    }
  };
  const getToken = () => {
    axios
      .post(API_URL + "api-auth/token")
      .then((res) => {
        let response = res.data;
        setPatronid(response?.data?.userId);
        setAccessToken(response?.data?.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const verifyGstinNo = (e) => {
    if (panNumber) {
      if (validateGstinNumber(e.target.value)) {
        setLoader(true);
        axios
          .post(API_URL + "api-auth/verify-gst-number", {
            gst: e.target.value,
            patronid: patronid,
            token: accessToken,
          })
          .then((res) => {
            if (res?.data?.data != undefined) {
              let response = res.data;
              if (
                name.replace(/ /g, "") ==
                (response?.data?.result?.gstnDetailed?.legalNameOfBusiness).replace(
                  / /g,
                  ""
                )
              ) {
                setValidGstin(true);
              } else {
                setValidGstin(false);
              }
            }
            setLoader(false);
          })
          .catch((e) => {
            setLoader(false);
          });
      } else {
        setValidGstin(false);
      }
    } else {
      setPanNumberError(true);
      setValidGstin(false);
    }
  };

  function validatePAN(pan_number) {
    var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return regex.test(pan_number);
  }
  function validateGstinNumber(gstin) {
    var regex = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9,A-Z]{1}$/; //00AAAAA0000A0Z0
    return regex.test(gstin);
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleValidation = () => {
    let isFormValid = true;
    if (!loanPurpose) {
      setLoanPurposeError(true);
      isFormValid = false;
    }
    if (!subLoanPurpose) {
      setSubLoanPurposeError(true);
      isFormValid = false;
    }
    if (!loanAmount) {
      setLoanAmountError(true);
      isFormValid = false;
    }
    if (loanAmount < 50000) {
      setInvalidLoanAmountError(true);
      isFormValid = false;
    }
    if (!loanDuration) {
      setLaonDurationError(true);
      isFormValid = false;
    }
    if (!panNumber) {
      setPanNumberError(true);
      isFormValid = false;
    }
    if (!validatePAN(panNumber) || !panValid) {
      setInvalidPanNumberError(true);
      isFormValid = false;
    }
    /*if(!aadhaar){
			setAadhaarError(true);
			isFormValid = false
		}
		if((aadhaar.replace(/ /g,'')).length < 11 || !aadhaarValid){
			setInvalidAadhaarError(true);
			isFormValid = false
		}
		if(!gstinNumber){
			setGstinNumberError(true);
			isFormValid = false
		}
		if(!validateGstinNumber(gstinNumber) || !validGstin){
			setInvalidGstinNumberError(true);
			isFormValid = false
		}*/

    if (!name) {
      setNameError(true);
      isFormValid = false;
    }
    if (!mobileNumber) {
      setMobileNumberError(true);
      isFormValid = false;
    }
    if (mobileExistError) {
      isFormValid = false;
    }
    if (mobileNumber.replace(/ /g, "").length < 9) {
      setInvalidMobileNumberError(true);
      isFormValid = false;
    }
    if (!emailID) {
      setEmailIDError(true);
      isFormValid = false;
    }
    if (!validateEmail(emailID)) {
      setInvalidEmailIDError(true);
      isFormValid = false;
    }
    return isFormValid;
  };
  const handleFormSubmit = () => {
    if (handleValidation()) {
      setLoader(true);
      let jsonFormData = {
        id: partner ? partner : "admin-" + localStorage.getItem("adminId"),
        loan_purpose: loanPurpose,
        sub_loan_purpose: subLoanPurpose,
        loan_amount: loanAmount,
        duration: loanDuration,
        pan: panNumber,
        gstin: gstinNumber,
        aadhaar: aadhaar,
        name: name,
        email: emailID,
        mobile: mobileNumber,
        dob: dob,
        doi: doi,
      };
      axios
        .post(API_URL + `partners-admin/add-case`, jsonFormData)
        .then((res) => {
          setLoader(false);
          let response = res.data;
          if (response?.status === 200) {
            toast.success(response?.message);
            handleResetFunc();
          } else {
            toast.success(response?.message);
          }
        })
        .catch((e) => {
          setLoader(false);
        });
    }
  };
  const handleKeyAmount = (e) => {
    if (parseInt(e.target.value) < 50000) {
      setLoanAmountError(false);
      setInvalidLoanAmountError(true);
    } else {
      setLoanAmountError(false);
      setInvalidLoanAmountError(false);
    }
  };
  return (
    <>
      {loader ? <Loader /> : ""}
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar menuAccess={menuAccess} />
          <div className="adminMain-wrapper">
            <AdminHeader />
            <div className="mainContent">
              <div className="topHeadings">
                <h3>Create New</h3>
              </div>
              <div className="contentBlocks">
                <div className="sectionTable">
                  <div className="continer-fluid">
                    <form className="add-laon">
                      {/*<div className="row">
												<div className="col-lg-6 col-md-6 col-xs-6">
													<div className="form-group">
														<label for="email">Active Partner</label>
														<select className="form-control" value={partner} onChange={handleActivePartner}>
															<option value="">Active Partner</option>
															{
																activePartnerList.map((v, i) => {
																	return(
																		<option value={v?.partner_id} key={i}>{(v?.name).trim()+" ["+v?.partner_id+"]"}</option>
																	)
																})
															}
														</select>
														<span className="error">{loanPurposeError?"Please select loan purpose":""}</span>
													</div>
												</div>
											</div>*/}
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-xs-6">
                          <div className="form-group">
                            <label for="email">
                              Loan Purpose<span className="error">*</span>
                            </label>
                            <select
                              className="form-control"
                              value={loanPurpose}
                              value="1"
                              onChange={handleLoanPurpose}
                              disabled
                            >
                              <option value="">Select Loan Purpose</option>
                              {loanPurposeData.map((v, i) => {
                                return (
                                  <option value={v?.id} key={i}>
                                    {v?.name}
                                  </option>
                                );
                              })}
                            </select>
                            <span className="error">
                              {loanPurposeError
                                ? "Please select loan purpose"
                                : ""}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-xs-6">
                          <div className="form-group">
                            <label for="email">
                              Sub Loan Purpose<span className="error">*</span>
                            </label>
                            <select
                              className="form-control"
                              value={subLoanPurpose}
                              onChange={handleSubLoanPurpose}
                            >
                              <option value="">Select Sub Loan Purpose</option>
                              {subLoanPurposeData.map((v, i) => {
                                return (
                                  <option value={v?.id} key={i}>
                                    {v?.name}
                                  </option>
                                );
                              })}
                            </select>
                            <span className="error">
                              {subLoanPurposeError
                                ? "Please select sub loan purpose"
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sx-6">
                          <div className="form-group">
                            <label for="email">
                              Loan Amount<span className="error">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Loan Amount"
                              onChange={handleLoanAmount}
                              value={loanAmount}
                              onKeyUp={handleKeyAmount}
                            />
                            <span className="textSize">
                              {" "}
                              {numberToText.convertToText(loanAmount, {
                                language: "en-in",
                              })}
                            </span>
                            <br />
                            <span className="error">
                              {loanAmountError
                                ? "Please enter loan amount"
                                : ""}
                            </span>
                            <span className="error">
                              {!loanAmountError && invalidLoanAmountError
                                ? "Loan amount must be greater than 50000"
                                : ""}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sx-6">
                          <div className="form-group">
                            <label for="email">
                              Duration of loan<span className="error">*</span>
                            </label>
                            <select
                              className="form-control"
                              value={loanDuration}
                              onChange={handleLoanDuration}
                            >
                              <option value="">Select Duration of Laon</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="5+">5+</option>
                            </select>
                            <span className="error">
                              {loanDurationError
                                ? "Please select loan duration"
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sx-6">
                          <div className="form-group">
                            <label htmlFor="">
                              PAN Number<span className="error">*</span>
                            </label>
                            <InputMask
                              mask="aaaaa9999a"
                              maskChar=""
                              className="form-control"
                              placeholder="PAN Number(AAAAA0000A)"
                              onChange={handlePanNumber}
                              value={panNumber}
                            />
                            {panValid ? (
                              <i
                                className="fa fa-check"
                                style={{
                                  position: "absolute",
                                  color: "green",
                                  right: "20px",
                                  top: "45px",
                                }}
                              ></i>
                            ) : (
                              ""
                            )}
                            <span className="error">
                              {panNumberError ? "Please enter pan number" : ""}
                            </span>
                            <span className="error">
                              {!panNumberError && invalidPanNumberError
                                ? "Enter valid pan number"
                                : ""}
                            </span>
                            <span>
                              {!panNumberError &&
                              !invalidPanNumberError &&
                              panNumberExistError ? (
                                <small className="alertMode">
                                  Pan number already exists! - Case ID:{" "}
                                  {panCaseNumber}
                                </small>
                              ) : (
                                ""
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sx-6">
                          <div className="form-group">
                            <label htmlFor="">
                              Name<span className="error">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Name"
                              onChange={handleName}
                              value={name}
                              readOnly
                            />
                            <span className="error">
                              {nameError ? "Please enter name" : ""}
                            </span>
                          </div>
                        </div>
                        {/*<div className="col-lg-6 col-md-6 col-sx-6">
													<div className="form-group">
														<label htmlFor="">GSTIN Number<span className="error">*</span></label>
														<InputMask mask="99aaaaa9999a9a*" maskChar="" className="form-control" placeholder="GSTIN Number(00AAAAA0000A0Z0)" onChange={handleGstinNumber} value={gstinNumber} onKeyUp={verifyGstinNo} />
														{validGstin?<i className="fa fa-check" style={{"position": "absolute","color": "green","right":"20px", "top":"45px"}}></i>:""}
														<span className="error">{gstinNumberError?"Please enter gstin number":""}</span>
														<span className="error">{!gstinNumberError && invalidGstinNumberError?"Enter valid gstin number":""}</span>
													</div>
												</div>*/}
                      </div>
                      {/*<div className="row">
												<div className="col-lg-6 col-md-6 col-sx-6">
													<div className="form-group">
														<label htmlFor="">AADHAAR Number<span className="error">*</span></label>
														<InputMask mask="9999 9999 9999" maskChar="" className="form-control" placeholder="AADHAAR Number(9999 9999 9999)" onChange={handleAadhaarNumber} onKeyUp={verifyAadhaarcardNo} value={aadhaar} />
														{aadhaarValid?<i className="fa fa-check" style={{"position": "absolute","color": "green","right":"20px", "top":"45px"}}></i>:""}
														<span className="error">{aadhaarError?"Please enter aadhaar number":""}</span>
														<span className="error">{!aadhaarError && invalidAadhaarError?"Enter valid aadhaar number":""}</span>
														
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sx-6">
													<div className="form-group">
														<label htmlFor="">Name<span className="error">*</span></label>
														<input className="form-control" type="text" placeholder="Name" onChange={handleName} value={name} readOnly/>
														<span className="error">{nameError?"Please enter name":""}</span>
													</div>
												</div>
											</div>*/}
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sx-6">
                          <div className="form-group">
                            <label htmlFor="">
                              Mobile Number<span className="error">*</span>
                            </label>
                            <InputMask
                              mask="999 999 9999"
                              maskChar=""
                              className="form-control"
                              placeholder="Mobile Number(999 999 9999)"
                              onChange={handleMobileNumber}
                              value={mobileNumber}
                            />
                            <span className="error">
                              {mobileNumberError
                                ? "Please enter mobile number"
                                : ""}
                            </span>
                            <span className="error">
                              {!mobileNumberError && invalidMobileNumberError
                                ? "Enter valid mobile number"
                                : ""}
                            </span>
                            <span>
                              {!mobileNumberError &&
                              !invalidMobileNumberError &&
                              mobileExistError ? (
                                <small className="alertMode">
                                  Mobile number already exists! - Case ID:{" "}
                                  {mobileCaseNumber}
                                </small>
                              ) : (
                                ""
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sx-6">
                          <div className="form-group">
                            <label htmlFor="">
                              Email ID<span className="error">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Email ID"
                              onChange={handleEmailID}
                              value={emailID}
                            />
                            <span className="error">
                              {emailIDError ? "Please enter email id" : ""}
                            </span>
                            <span className="error">
                              {!emailIDError && invalidEmailIDError
                                ? "enter valid email id"
                                : ""}
                            </span>
                            <span>
                              {!emailIDError &&
                              !invalidEmailIDError &&
                              emailExistError ? (
                                <small className="alertMode">
                                  Email Id already exists! - Case ID:{" "}
                                  {emailCaseNumber}
                                </small>
                              ) : (
                                ""
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sx-6"></div>
                        <div className="col-lg-6 col-md-6 col-sx-6">
                          <button
                            type="reset"
                            className="btn btn-secondary"
                            onClick={handleResetFunc}
                          >
                            Reset
                          </button>
                          &nbsp;
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleFormSubmit}
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
            <AdminFooter />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
