import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
import Loading from "../loader/index";
import { API_URL } from "./../../config/constant";
export default function ActiveDirectorComponent(props) {
  //{noActiveDir , processData , checkSubmitDisableBtn}
  const [panNumber, setPanNumber] = useState({});
  const [panNumberError, setPanNumberError] = useState(false);
  const [name, setName] = useState({});
  const [aadhar, setAadhar] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [mobileError, setMobileError] = useState([]);
  const [panCard, setPanCard] = useState({});
  const [aadharFrontCard, setAadharFrontCard] = useState({});
  const [aadharBackCard, setAadharBackCard] = useState({});
  const [otp, setOtp] = useState([]);
  const [panCardFileName, setPanCardFileName] = useState({});
  const [aadharFrontFileName, setAadharFrontFileName] = useState({});
  const [aadharBackFileName, setAadharBackFileName] = useState({});
  const [aadhaarError, setAadhaarError] = useState({});
  const [panError, setPanError] = useState({});
  const onBtnClick = (i, type) => {
    document.getElementById(type + i).click();
  };

  const handleClick = (type, i) => {
    const inputElement = document.getElementById(`${type}${i}`);
    inputElement.value = null;
  };

  let xCount = [];
  let v = {};
  for (let i = 0; i < props.noActiveDir; i++) {
    xCount.push(i);
    v[i] = "";
  }

  useEffect(() => {
    if (Object.keys(v).length) {
      setName(v);
      setPanNumber(v);
      setAadhar(v);
      setPanCard(v);
      setAadharFrontCard(v);
      setAadharBackCard(v);
    }
  }, [0]);

  //console.log("cscs",Object.values(aadharFrontCard).includes(""));
  //console.log(typeof(noActiveDir),noActiveDir,xCount)

  function start_and_end(str) {
    if (str.length > 35) {
      return (
        str.substr(0, 20) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }

  const [count, setCount] = useState(xCount);

  const handelName = (i, val) => {
    setName((prevState) => ({ ...prevState, [i]: val }));
  };
  const handleMobileNumber = (i, val) => {
    setMobile((prevState) => ({ ...prevState, [i]: val }));
  };
  const handleOTP = (i, val) => {
    setOtp((prevState) => ({ ...prevState, [i]: val }));
  };
  const handlePanNumber = (i, val) => {
    setPanNumber((preState) => ({ ...preState, [i]: val.toUpperCase() }));
  };
  const handleAadharNumber = (i, val) => {
    setAadhar((preState) => ({ ...preState, [i]: val }));
  };

  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const allowedPdfTypes = ["application/pdf"];
  const MAX_FILE_SIZE_IMAGE = 2050; // 5MB
  const MAX_FILE_SIZE_PDF = 5120; // 5MB

  const [panCardError, setPanCardError] = useState("");
  const [panCardErrorMsg, setPanCardErrorMsg] = useState("");
  const [panCardFileType, setPanCardFileType] = useState("");

  const handlePanCardDoc = (i, e) => {
    const selectedFile = e.target.files;
    setPanCardError(false);
    setPanCardErrorMsg("");
    setPanCard((preState) => ({ ...preState, [i]: selectedFile[0] }));

    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setPanCardFileName((preState) => ({ ...preState, [i]: file_name }));
    if (file_type === "image/png") {
      setPanCardFileType("png");
    } else if (file_type === "image/jpg" || file_type === "image/jpeg") {
      setPanCardFileType("jpg");
    } else if (file_type === "image/gif") {
      setPanCardFileType("gif");
    } else {
      setPanCardFileType("");
    }
    if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
      // setPanCardError(true)
      // setPanCardErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
    }
    if (
      selectedFile.length &&
      selectedFile[0].size / 1024 > MAX_FILE_SIZE_IMAGE
    ) {
      // setPanCardErrorMsg("File size is greater than 2 MB");
      // setPanCardError(true)
    }
  };

  const [aadharFrontError, setAadharFrontError] = useState("");
  const [aadharFrontErrorMsg, setAadharFrontErrorMsg] = useState("");
  const [aadharFrontFileType, setAadharFrontFileType] = useState("");

  const handleAadharFrontDoc = (i, e) => {
    const selectedFile = e.target.files;
    setAadharFrontError(false);
    setAadharFrontErrorMsg("");

    setAadharFrontCard((preState) => ({ ...preState, [i]: selectedFile[0] }));

    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setAadharFrontFileName((preState) => ({ ...preState, [i]: file_name }));
    if (file_type === "image/png") {
      setAadharFrontFileType("png");
    } else if (file_type === "image/jpg" || file_type === "image/jpeg") {
      setAadharFrontFileType("jpg");
    } else if (file_type === "image/gif") {
      setAadharFrontFileType("gif");
    } else {
      setAadharFrontFileType("");
    }
    if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
      // setPanCardError(true)
      // setPanCardErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
    }
    if (
      selectedFile.length &&
      selectedFile[0].size / 1024 > MAX_FILE_SIZE_IMAGE
    ) {
      // setPanCardErrorMsg("File size is greater than 2 MB");
      // setPanCardError(true)
    }
  };

  const [aadharBackError, setAadharBackError] = useState("");
  const [aadharBackErrorMsg, setAadharBackErrorMsg] = useState("");
  const [aadharBackFileType, setAadharBackFileType] = useState("");

  const handleAadharBackDoc = (i, e) => {
    const selectedFile = e.target.files;
    setAadharFrontError(false);
    setAadharFrontErrorMsg("");

    setAadharBackCard((preState) => ({ ...preState, [i]: selectedFile[0] }));

    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setAadharBackFileName((preState) => ({ ...preState, [i]: file_name }));
    if (file_type === "image/png") {
      setAadharBackFileType("png");
    } else if (file_type === "image/jpg" || file_type === "image/jpeg") {
      setAadharBackFileType("jpg");
    } else if (file_type === "image/gif") {
      setAadharBackFileType("gif");
    } else {
      setAadharBackFileType("");
    }
    if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
      // setPanCardError(true)
      // setPanCardErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
    }
    if (
      selectedFile.length &&
      selectedFile[0].size / 1024 > MAX_FILE_SIZE_IMAGE
    ) {
      // setPanCardErrorMsg("File size is greater than 2 MB");
      // setPanCardError(true)
    }
  };

  const removeData = (type, i) => {
    if (type == "panCard") {
      setPanCard((preState) => ({ ...preState, [i]: "" }));
      handleClick(type, i);
    }
    if (type == "aadharFront") {
      setAadharFrontCard((preState) => ({ ...preState, [i]: "" }));
      handleClick(type, i);
    }
    if (type == "aadharBack") {
      setAadharBackCard((preState) => ({ ...preState, [i]: "" }));
      handleClick(type, i);
    }
  };

  const [panFile, setPanFile] = useState("");
  const [aadharFrontFile, setAadharFrontFile] = useState("");
  const [aadharBackFile, setAadharBackFile] = useState("");

  useEffect(() => {
    let na = Object.values(name).includes("");
    let mo = Object.values(mobile).includes("");
    let ot = Object.values(otp).includes("");
    let pn = Object.values(panNumber).includes("");
    let ad = Object.values(aadhar).includes("");
    let pc = Object.values(panCard).includes("");
    let afc = Object.values(aadharFrontCard).includes("");
    let abc = Object.values(aadharBackCard).includes("");
    if (
      !na &&
      !pn &&
      !ad &&
      !pc &&
      !afc &&
      !abc &&
      !mo &&
      !ot &&
      !Object.values(aadhaarError).includes(true) &&
      !Object.values(panError).includes(true)
    ) {
      props.processData(
        name,
        panNumber,
        aadhar,
        mobile,
        otp,
        panCard,
        aadharFrontCard,
        aadharBackCard
      );
      props.checkSubmitDisableBtn(false);
    } else {
      props.checkSubmitDisableBtn(true);
    }
    //	processData(name,panNumber,aadhar,panCard,aadharFrontCard,aadharBackCard);
  }, [
    name,
    panNumber,
    aadhar,
    mobile,
    panCard,
    aadharFrontCard,
    aadharBackCard,
    aadhaarError,
    panError,
    otp,
  ]);

  //  console.log("panCardFileName",panCardFileName[0]);
  function validatePAN(pan_number) {
    var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return regex.test(pan_number);
  }
  const sendOTP = (mobile, index) => {
    if (mobile.replace(/\s/g, "").length == "10") {
      setLoader(true);
      axios
        .post(API_URL + "user/director-otp", {
          user_id: localStorage.getItem("user_id"),
          mobile: mobile,
        })
        .then((res) => {
          console.log(res?.data);
          setOtp((prevState) => ({ ...prevState, [index]: res?.data?.otp }));
          setLoader(false);
        })
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });
    }
  };
  const validateDirPanNumber = (e, i) => {
    if (validatePAN(e.target.value)) {
      setLoader(true);
      axios
        .post(API_URL + "api-auth/verify-pan-number-v3", {
          pan: e.target.value,
        })
        .then((res) => {
          if (res?.data?.data != undefined) {
            let response = res.data;
            setName((prevState) => ({
              ...prevState,
              [i]: response?.data?.result?.name,
            }));
            setPanError((prevState) => ({ ...prevState, [i]: false }));
          } else {
            setName((prevState) => ({ ...prevState, [i]: "" }));
            setPanError((prevState) => ({ ...prevState, [i]: true }));
          }
          setLoader(false);
        })
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });
    } else {
      setName((prevState) => ({ ...prevState, [i]: "" }));
      setPanError((prevState) => ({ ...prevState, [i]: true }));
    }
  };
  const [loader, setLoader] = useState(false);
  const verifyAadharNo = (e, i) => {
    if (e.target.value.replace(/ /g, "").length > 11) {
      setLoader(true);
      axios
        .post(API_URL + "api-auth/verify-aadhar-number-v3", {
          uid: e.target.value,
        })
        .then((res) => {
          if (res?.data?.data != undefined) {
            let response = res.data;
            if (res?.data?.data?.result?.verified) {
              setAadhaarError((prevState) => ({ ...prevState, [i]: false }));
            } else {
              setAadhaarError((prevState) => ({ ...prevState, [i]: true }));
            }
          } else {
            setAadhaarError((prevState) => ({ ...prevState, [i]: true }));
          }
          setLoader(false);
        })
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });
    }
  };
  return (
    <>
      {loader ? <Loading /> : ""}
      <div className="col-md-12 col-lg-12">
        {count.map((v, i) => {
          return (
            <>
              <div className="inner-employement">
                <h5>{i + 1}. Directors/Partners Detail</h5>

                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>PAN Number</label>
                    <InputMask
                      mask="aaaaa9999a"
                      maskChar=""
                      name={"pan" + i}
                      className={
                        panNumberError ? "salary-input error" : "salary-input"
                      }
                      value={panNumber[i]}
                      placeholder="AZSPT5997H"
                      onChange={(e) => handlePanNumber(i, e.target.value)}
                      onKeyUp={(e) => validateDirPanNumber(e, i)}
                    />
                    {panError[i] == false ? (
                      <>
                        <i
                          className="fa fa-check"
                          style={{ position: "absolute", color: "green" }}
                        ></i>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Aadhaar Number</label>
                    <InputMask
                      mask="9999 9999 9999"
                      maskChar=""
                      name={"aadhar" + i}
                      className={
                        panNumberError ? "salary-input error" : "salary-input"
                      }
                      value={aadhar[i]}
                      placeholder="9868 2341 8876"
                      onChange={(e) => handleAadharNumber(i, e.target.value)}
                      onKeyUp={(e) => verifyAadharNo(e, i)}
                    />
                    {aadhaarError[i] == false ? (
                      <>
                        <i
                          className="fa fa-check"
                          style={{ position: "absolute", color: "green" }}
                        ></i>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Name</label>
                    <input
                      type="text"
                      name={"name" + i}
                      className={
                        panNumberError ? "salary-input error" : "salary-input"
                      }
                      value={name[i]}
                      placeholder="Name"
                      onChange={(e) => {
                        handelName(i, e.target.value);
                      }}
                    />
                    {panNumberError && (
                      <small className="alertbox">Please fill here</small>
                    )}
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Mobile Number</label>
                    <InputMask
                      mask="9999 999 999"
                      maskChar=""
                      name={"mobile" + i}
                      className={"salary-input"}
                      value={mobile[i]}
                      placeholder="9999 999 999"
                      onChange={(e) => handleMobileNumber(i, e.target.value)}
                      onBlur={(e) => sendOTP(e.target.value, i)}
                    />
                    {panNumberError && (
                      <small className="alertbox">Please fill here</small>
                    )}
                  </div>
                </div>
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>OTP</label>
                    <InputMask
                      mask="9999"
                      maskChar=""
                      name={"otp" + i}
                      className={"salary-input"}
                      value={otp[i]}
                      placeholder="OTP"
                      onChange={(e) => handleOTP(i, e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 spacing"></div>
                </div>
                <div className="uploadsections p-20">
                  <div className="uploadfilesArea">
                    <div className="filnameIcons">
                      <div className="fileIc">
                        <span className="imgWithName">
                          <span className="imgIcons">
                            <Icon.FiletypePng color={"#1962CD"} size={50} />
                          </span>
                          <span className="imageName">
                            <span className={"vrtext"}>
                              {Object.keys(panCard).length && panCard[i] != ""
                                ? panCardFileName[i]
                                : panFile != undefined && panFile != ""
                                ? panFile
                                : "Upload Pan Card Image"}
                            </span>
                            <span className="vrtext message">
                              * File Format: JPEG, PNG, and GIF; Max size: 2MB
                            </span>
                          </span>
                        </span>
                        {Object.keys(panCard).length && panCard[i] != "" ? (
                          <>
                            <span
                              className="greenTick"
                              onClick={(e) => {
                                removeData("panCard", i);
                              }}
                            >
                              <i className="fa fa-check"></i>
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="uploadbtnSize">
                      <input
                        type="file"
                        onChange={(e) => handlePanCardDoc(i, e)}
                        accept="image/png, image/jpeg, image/gif"
                        style={{ display: "none" }}
                        id={"panCard" + i}
                      />
                      <div
                        className="uplodBtns"
                        onClick={(e) => onBtnClick(i, "panCard")}
                      >
                        Upload <i className="fa fa-cloud-upload"></i>
                      </div>
                    </div>
                  </div>
                  <div className="uploadfilesArea">
                    <div className="filnameIcons">
                      <div className="fileIc">
                        <span className="imgWithName">
                          <span className="imgIcons">
                            <Icon.FiletypePng color={"#1962CD"} size={50} />
                          </span>
                          <span className="imageName">
                            <span className={"vrtext"}>
                              {Object.keys(aadharFrontCard).length &&
                              aadharFrontCard[i] != ""
                                ? aadharFrontFileName[i]
                                : aadharFrontFile != undefined &&
                                  aadharFrontFile != ""
                                ? aadharFrontFile
                                : "Upload Aadhaar Front Image"}
                            </span>
                            <span className="vrtext message">
                              * File Format: JPEG, PNG, and GIF; Max size: 2MB
                            </span>
                          </span>
                        </span>
                        {Object.keys(aadharFrontCard).length &&
                        aadharFrontCard[i] != "" ? (
                          <>
                            <span
                              className="greenTick"
                              onClick={(e) => {
                                removeData("aadharFront", i);
                              }}
                            >
                              <i className="fa fa-check"></i>
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="uploadbtnSize">
                      <input
                        type="file"
                        onChange={(e) => handleAadharFrontDoc(i, e)}
                        accept="image/png, image/jpeg, image/gif"
                        style={{ display: "none" }}
                        id={"aadharFront" + i}
                      />
                      <div
                        className="uplodBtns"
                        onClick={(e) => onBtnClick(i, "aadharFront")}
                      >
                        Upload <i className="fa fa-cloud-upload"></i>
                      </div>
                    </div>
                  </div>
                  <div className="uploadfilesArea">
                    <div className="filnameIcons">
                      <div className="fileIc">
                        <span className="imgWithName">
                          <span className="imgIcons">
                            <Icon.FiletypePng color={"#1962CD"} size={50} />
                          </span>
                          <span className="imageName">
                            <span className={"vrtext"}>
                              {Object.keys(aadharBackCard).length &&
                              aadharBackCard[i] != ""
                                ? aadharBackFileName[i]
                                : aadharBackFile != undefined &&
                                  aadharBackFile != ""
                                ? aadharBackFile
                                : "Upload Aadhaar Back Image"}
                            </span>
                            <span className="vrtext message">
                              * File Format: JPEG, PNG, and GIF; Max size: 2MB
                            </span>
                          </span>
                        </span>
                        {Object.keys(aadharBackCard).length &&
                        aadharBackCard[i] != "" ? (
                          <>
                            <span
                              className="greenTick"
                              onClick={(e) => {
                                removeData("aadharBack", i);
                              }}
                            >
                              <i className="fa fa-check"></i>
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="uploadbtnSize">
                      <input
                        type="file"
                        onChange={(e) => handleAadharBackDoc(i, e)}
                        accept="image/png, image/jpeg, image/gif"
                        style={{ display: "none" }}
                        id={"aadharBack" + i}
                      />
                      <div
                        className="uplodBtns"
                        onClick={(e) => onBtnClick(i, "aadharBack")}
                      >
                        Upload <i className="fa fa-cloud-upload"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
