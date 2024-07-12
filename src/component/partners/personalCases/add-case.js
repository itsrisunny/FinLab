import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../layouts/partner-admin-header";
import AdminFooter from "../layouts/partner-admin-footer";
import AdminNavBar from "../layouts/partner-admin-nav-bar";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import Loader from "../../loader/";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import numberToText from "number-to-text";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Paginator from "react-hooks-paginator";
require("number-to-text/converters/en-in");
export default function AddCase({ menuAccess }) {
  const [loader, setLoader] = useState(true);
  const [loanPurposeData, setLoanPurposeData] = useState([]);
  const [subLoanPurposeData, setSubLoanPurposeData] = useState([]);
  const [allLoanPurposeList, setAllLoanPurposeList] = useState([]);
  const [loanPurpose, setLoanPurpose] = useState("2");
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

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const [dupOffset, setDupOffset] = useState(0);
  const [dupCurrentPage, setDupCurrentPage] = useState(1);
  const [dupNoOfRecord, setDupNoOfRecord] = useState(0);
  const [totalNoOfRecord, setTotalNoOfRecord] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    getLoanPurposeData();
  }, []);
  const getLoanPurposeData = () => {
    axios
      .get(API_URL + "master/loan-purpose")
      .then((res) => {
        let response = res.data;
        setAllLoanPurposeList(response?.data);
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
  const handlePanNumber = (e) => {
    setPanNumberError(false);
    setInvalidPanNumberError(false);
    setPanNumber(e.target.value.toUpperCase());
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
    setMobileNumber(e.target.value);
  };
  const handleEmailID = (e) => {
    setEmailIDError(false);
    setInvalidEmailIDError(false);
    setEmailID(e.target.value);
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
    setSubLoanPurposeData([]);
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
    if (!validatePAN(panNumber)) {
      setInvalidPanNumberError(true);
      isFormValid = false;
    }
    /*if(!aadhaar){
			setAadhaarError(true);
			isFormValid = false
		}
		if((aadhaar.replace(/ /g,'')).length < 11){
			setInvalidAadhaarError(true);
			isFormValid = false
		}
		if(!gstinNumber){
			setGstinNumberError(true);
			isFormValid = false
		}
		if(!validateGstinNumber(gstinNumber)){
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
        id: localStorage.getItem("partner_id"),
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

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };
  function formatDate(inputDate) {
    /*let date = new Date(inputDate);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    } else {
      let formattedDate = date.toISOString().slice(0,10);
      return formattedDate;
    }*/
    if (inputDate) {
      const [day, month, year] = inputDate.split("-");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    } else {
      return inputDate;
    }
  }
  const DUPLIMIT = 10;
  const expectedHeaders = [
    "Loan Purpose",
    "Sub Loan Purpose",
    "Loan Amount",
    "Duration",
    "Employement Type",
    "Business Type",
    "Profession",
    "Name",
    "Mobile Number",
    "Email ID",
    "PAN Number",
    "Date Of Birth",
    "Date of Incorporation",
    "Address 1",
    "Address 2",
    "Landmark",
    "PIN Code",
    "City, District",
    "State",
    "Ifile",
    "GST Number",
    "Turnover Yearly",
    "Gross Annual Profit",
    "Industry",
    "Sub Industry",
  ];
  const handleFileChange = async (e) => {
    setError(null);
    if (e.target.files) {
      try {
        const file = e.target.files[0];
        setFileName(file.name);

        const fileUrl = URL.createObjectURL(file);
        const response = await fetch(fileUrl);
        const text = await response.text();

        const lines = text.split("\n");
        const _data = lines.map((line, index) => {
          return line
            .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
            .map(function (item) {
              return item.trim().replace(/^"|"$/g, "");
            });
        });
        let headers = _data[0];
        if (!arraysEqual(headers, expectedHeaders)) {
          setError("The uploaded file does not match the expected format.");
          return;
        }

        const [keys, ...values] = _data;
        var regex = /[^\w\s]/gi;
        const arrNewValue = values.filter((subArray) => subArray.length > 1);
        const arrayOfObjects = arrNewValue.map((row) => {
          if (row.length) {
            const obj = {};
            keys.forEach((key, index) => {
              obj[
                key.trim().toLowerCase().replace(regex, "").replace(/\s+/g, "_")
              ] = row[index];
            });
            return obj;
          }
        });
        arrayOfObjects.map((v, i) => {
          v["city"] = v["city_district"];
          v["date_of_birth"] = formatDate(v["date_of_birth"]);
          v["date_of_incorporation"] = formatDate(v["date_of_incorporation"]);
          delete v["city_district"];
        });

        uploadFileData(arrayOfObjects);
        setFile(_data);
        setFileUploaded(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // console.log("error",error);

  const [dupRecords, setDupRecords] = useState([]);
  const [newRecords, setNewRecords] = useState([]);
  const [newRecordsNo, setNewRecordsNo] = useState(0);

  const [invalidRecords, setInvalidRecords] = useState([]);

  const uploadFileData = (datas) => {
    setLoader(true);
    let jsonData = {
      partner_id: localStorage.getItem("partner_id"),
      data: datas,
    };

    axios
      .post(API_URL + `partners-admin/bulk-upload-case-leads`, jsonData)
      .then((res) => {
        //   axios.post(API_URL+`bulk-upload/bulk-upload-case-leads`,jsonData).then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          // toast.success(response?.message);
          //downloadDataAsCSV(response?.not_inserted_data);
          let new_record = response?.new_records;
          new_record.length &&
            new_record.map((v, i) => {
              if (v.duration > 5) {
                v.duration = "5+";
              }
              return v;
            });
          setFile(null);
          setFileName(null);
          document.getElementById("files").value = "";
          setDupRecords(response?.not_inserted_data);
          setDupNoOfRecord(response?.not_inserted_data.length);
          setNewRecords(new_record);
          setNewRecordsNo(response?.new_records.length);
          setInvalidRecords(response?.invalid_records);
          let merged = [
            ...response?.not_inserted_data,
            ...response?.new_records,
            ...response?.invalid_records,
          ];
          /*  console.log( new_record)
           console.log( response?.new_records)
           console.log(merged);*/
          setTotalNoOfRecord(merged);
        }

        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //console.log("data",file);

  function convertArrayOfObjectsToCSV(array) {
    // Ensure we have an array and it's not empty
    if (array == null || array.length === 0) {
      return null;
    }

    const header = Object.keys(array[0]).join(",");
    const rows = array.map((obj) => Object.values(obj).join(","));
    const csv = [header, ...rows].join("\n");
    return csv;
  }

  function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  const downloadDataAsCSV = (data, fileName) => {
    const csv = convertArrayOfObjectsToCSV(data);
    if (csv) {
      downloadCSV(csv, fileName);
    }
  };
  const [detailsShow, setDetailsShow] = useState(false);
  const handleCloseDetails = () => {
    setDetailsShow(false);
    setDupRecords([]);
    setNewRecords([]);
    setInvalidRecords([]);
    setDupNoOfRecord(0);
    setNewRecordsNo(0);
    setTotalNoOfRecord([]);
    setFileUploaded(false);
    setError(null);
  };

  const uploadDetails = () => {
    setDetailsShow(true);
  };

  const handelNewRecords = () => {
    setLoader(true);
    let jsonData = {
      partner_id: localStorage.getItem("partner_id"),
      data: newRecords,
    };

    axios
      .post(
        API_URL + `partners-admin/bulk-upload-case-leads-insert-data`,
        jsonData
      )
      .then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          toast.success(response?.message);
          dupRecords.map((v, i) => {
            delete v.recordExists;
            return v;
          });
          invalidRecords.map((v, i) => {
            delete v.phoneInvalid;
            delete v.emailInvalid;
            delete v.panInvalid;
            delete v.amountInvalid;
            delete v.loanPurposeInvalid;
            return v;
          });
          downloadDataAsCSV(dupRecords, "duplicate_records.csv");
          downloadDataAsCSV(invalidRecords, "invalid_records.csv");
          setFile(null);
          setFileName(null);
          document.getElementById("files").value = "";
          //  setDupRecords(response?.not_inserted_data);
          //  setDupNoOfRecord(response?.not_inserted_data.length);
          //  setNewRecords(response?.new_records);
          //  setNewRecordsNo(response?.new_records.length);
          handleCloseDetails();
        }

        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
      });
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
              <div className="topHeadings" style={{ position: "relative" }}>
                <h3>Create New</h3>
                <div style={{ position: "absolute", top: "5px", right: "0px" }}>
                  <button
                    className="btn btn-primary"
                    style={{ marginRight: "3px" }}
                    onClick={() => uploadDetails()}
                  >
                    Bulk Upload
                  </button>
                </div>
              </div>
              <div className="contentBlocks">
                <div className="sectionTable">
                  <div className="continer-fluid">
                    <form className="add-laon">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-xs-6">
                          <div className="form-group">
                            <label for="email">
                              Loan Purpose<span className="error">*</span>
                            </label>
                            <select
                              className="form-control"
                              value={loanPurpose}
                              disabled
                            >
                              <option value="">Select Loan Purpose</option>
                              {loanPurposeData.map((v, i) => {
                                return (
                                  <option
                                    value={v?.id}
                                    key={i}
                                    disabled={v?.id == 1 ? false : true}
                                  >
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
                            <span className="error">
                              {panNumberError ? "Please enter pan number" : ""}
                            </span>
                            <span className="error">
                              {!panNumberError && invalidPanNumberError
                                ? "Enter valid pan number"
                                : ""}
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
                            />
                            <span className="error">
                              {nameError ? "Please enter name" : ""}
                            </span>
                          </div>
                        </div>
                        {/*<div className="col-lg-6 col-md-6 col-sx-6">
													<div className="form-group">
														<label htmlFor="">GSTIN Number<span className="error">*</span></label>
														<InputMask mask="99aaaaa9999a9a*" maskChar="" className="form-control" placeholder="GSTIN Number(00AAAAA0000A0Z0)" onChange={handleGstinNumber} value={gstinNumber} />
														<span className="error">{gstinNumberError?"Please enter gstin number":""}</span>
														<span className="error">{!gstinNumberError && invalidGstinNumberError?"Enter valid gstin number":""}</span>
													</div>
												</div>*/}
                      </div>
                      {/*<div className="row">
												<div className="col-lg-6 col-md-6 col-sx-6">
													<div className="form-group">
														<label htmlFor="">AADHAAR Number<span className="error">*</span></label>
														<InputMask mask="9999 9999 9999" maskChar="" className="form-control" placeholder="AADHAAR Number(9999 9999 9999)" onChange={handleAadhaarNumber} value={aadhaar} />
														<span className="error">{aadhaarError?"Please enter aadhaar number":""}</span>
														<span className="error">{!aadhaarError && invalidAadhaarError?"Enter valid aadhaar number":""}</span>
														
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sx-6">
													<div className="form-group">
														<label htmlFor="">Name<span className="error">*</span></label>
														<input className="form-control" type="text" placeholder="Name" onChange={handleName} value={name} />
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
      <Modal
        show={detailsShow}
        onHide={handleCloseDetails}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        fullscreen={true}
        dialogClassName="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Bulk Upload </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "500px", overflowX: "auto" }}>
          <div className="row add-bank-info">
            <div className="col-md-12 label-line-height">
              {!fileUploaded ? (
                <>
                  <span>
                    <label style={{ marginRight: "3px" }}>
                      {fileName == null ? "Select file to upload" : fileName}
                    </label>
                    <label for="files" className="btn btn-success">
                      Upload File{" "}
                    </label>
                    <input
                      id="files"
                      type="file"
                      accept=".csv"
                      style={{ visibility: "hidden" }}
                      onChange={handleFileChange}
                    />
                  </span>
                </>
              ) : (
                <>
                  <span>
                    <input
                      id="files"
                      type="file"
                      accept=".csv"
                      style={{ visibility: "hidden" }}
                      onChange={handleFileChange}
                    />{" "}
                  </span>
                </>
              )}
              {error ? (
                <span>
                  <label
                    style={{
                      marginLeft: "10px",
                      marginRight: "20px",
                      color: "red",
                    }}
                  >
                    {error}
                  </label>
                </span>
              ) : (
                ""
              )}

              {fileUploaded && (
                <>
                  <span>
                    <label
                      style={{
                        marginLeft: "10px",
                        marginRight: "20px",
                        color: "black",
                      }}
                    >
                      Total Records :{" "}
                      {newRecords.length +
                        dupRecords.length +
                        invalidRecords.length}
                    </label>
                  </span>
                  <span>
                    <label
                      style={{
                        marginLeft: "10px",
                        marginRight: "20px",
                        color: "green",
                      }}
                    >
                      New Records : {newRecords.length}
                    </label>
                  </span>
                  <span>
                    <label style={{ marginRight: "20px", color: "red" }}>
                      Duplicate Records : {dupRecords.length}
                    </label>
                  </span>
                  <span>
                    <label
                      style={{
                        marginLeft: "10px",
                        marginRight: "20px",
                        color: "blue",
                      }}
                    >
                      Invalid Records : {invalidRecords.length}
                    </label>
                  </span>
                </>
              )}
            </div>
            <div className="col-md-12 label-line-height">
              {fileUploaded && (
                <center>
                  <span>List of records</span>
                </center>
              )}

              <table style={{ width: "100%" }} className="table table-stripped">
                <thead>
                  {fileUploaded && (
                    <tr>
                      <th className="table-head">Name</th>
                      <th className="table-head">Mobile</th>
                      <th className="table-head">Email Id</th>
                      <th className="table-head">Pan</th>
                      <th className="table-head">Loan purpose</th>
                      <th className="table-head">Sub loan purpose</th>
                      <th className="table-head">Loan Amount</th>
                      <th className="table-head">Business Type</th>
                      <th className="table-head">GST</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {totalNoOfRecord.map((row, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid #ddd",
                        backgroundColor: row?.recordExists
                          ? "#ff000014"
                          : row?.validRecords
                          ? "#00ff0421"
                          : "",
                      }}
                    >
                      <td className="table-body">{row.name}</td>
                      <td className="table-body">
                        {row?.phoneInvalid ? (
                          <span style={{ color: "red" }}>
                            {row.mobile_number}
                          </span>
                        ) : (
                          row.mobile_number
                        )}
                      </td>
                      <td className="table-body">
                        {row?.emailInvalid ? (
                          <span style={{ color: "red" }}>{row.email_id}</span>
                        ) : (
                          row.email_id
                        )}
                      </td>
                      <td className="table-body">
                        {row?.panInvalid ? (
                          <span style={{ color: "red" }}>{row.pan_number}</span>
                        ) : (
                          row.pan_number
                        )}
                      </td>
                      <td className="table-body">
                        {row?.loanPurposeInvalid ? (
                          <span style={{ color: "red" }}>
                            {row.loan_purpose}
                          </span>
                        ) : (
                          row.loan_purpose
                        )}
                      </td>
                      <td className="table-body">{row.sub_loan_purpose}</td>
                      <td className="table-body">
                        {row?.amountInvalid ? (
                          <span style={{ color: "red" }}>
                            {row.loan_amount}
                          </span>
                        ) : (
                          row.loan_amount
                        )}
                      </td>
                      <td className="table-body">{row.business_type}</td>
                      <td className="table-body">{row.gst_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* pegination */}
              <div>
                <Paginator
                  totalRecords={dupNoOfRecord}
                  pageLimit={DUPLIMIT}
                  pageNeighbours={2}
                  setOffset={setDupOffset}
                  currentPage={dupCurrentPage}
                  setCurrentPage={setDupCurrentPage}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
          {fileUploaded ? (
            <Button
              variant="primary"
              className="submit-btn-modal"
              onClick={handelNewRecords}
              disabled={newRecordsNo ? false : true}
            >
              Proceed with {newRecordsNo}{" "}
              {newRecordsNo > 1 ? "new Records" : "new Record"}
            </Button>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}
