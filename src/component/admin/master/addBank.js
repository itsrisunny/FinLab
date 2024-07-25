import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import moment from "moment";
import * as Icon from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export default function AddBank({ menuAccess }) {
  const [bankLogo, setBankLogo] = useState([]);
  const [bankLogoFileName, setBankLogoFileName] = useState("");
  const [bankLogoFileType, setBankLogoFileType] = useState("");
  const [bankLogoError, setBankLogoError] = useState(false);
  const [bankLogoErrorMsg, setBankLogoErrorMsg] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = useState(false);
  const [bankName, setBankName] = useState("");
  const [bankNameError, setBankNameError] = useState(false);

  const inputFilePanRef = useRef();

  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const allowedPdfTypes = ["application/pdf"];
  const MAX_FILE_SIZE_IMAGE = 2050; // 5MB
  const MAX_FILE_SIZE_PDF = 5120; // 5MB

  const handlePanCard = (e) => {
    setPath("");
    const selectedFile = e.target.files;
    setBankLogoError(false);
    setBankLogoErrorMsg("");
    setBankLogo(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setBankLogoFileName(file_name);
    if (file_type === "image/png") {
      setBankLogoFileType("png");
    } else if (file_type === "image/jpg" || file_type === "image/jpeg") {
      setBankLogoFileType("jpg");
    } else if (file_type === "image/gif") {
      setBankLogoFileType("gif");
    } else {
      setBankLogoFileType("");
    }
    if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
      setBankLogoError(true);
      setBankLogoErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
    }
    if (
      selectedFile.length &&
      selectedFile[0].size / 1024 > MAX_FILE_SIZE_IMAGE
    ) {
      setBankLogoErrorMsg("File size is greater than 2 MB");
      setBankLogoError(true);
    }
  };

  const handelBankName = (e) => {
    setBankName(e.target.value);
    setBankNameError(false);
  };

  const onBtnPanClick = () => {
    inputFilePanRef.current.click();
  };

  const handleUploadDocument = () => {
    if (handleValidation()) {
      setIsDisableBtn(true);

      let formData = new FormData();
      formData.append("bank_name", bankName);

      if (bankLogo.length) {
        formData.append("bank_logo", bankLogo[0]);
      }

      if (editMode) {
        formData.append("id", editId);
      }

      axios
        .post(API_URL + "admin/upload-bank-logo", formData)
        .then((res) => {
          let response = res.data;
          //handleCongratulation()
          if (response?.status === 200) {
            toast.success(response?.message);
            getAllBankList();
            setBankName("");
            setBankLogo([]);
            setPath("");
            setFileName("");
            setEditMode(0);
            setEditId("");
          }

          setIsDisableBtn(false);
        })
        .catch((e) => {
          console.log(e);
          setIsDisableBtn(false);
        });
    }
  };

  const handleValidation = (e) => {
    let isFormValid = true;
    if (!editMode) {
      if (!bankLogo.length || bankLogoErrorMsg) {
        isFormValid = false;
        setBankLogoError(true);
      }
    }
    if (bankName == "") {
      isFormValid = false;
      setBankNameError(true);
    }

    return isFormValid;
  };

  const [bankData, setBankData] = useState([]);

  useEffect(() => {
    getAllBankList();
  }, []);

  const getAllBankList = () => {
    axios
      .post(API_URL + "admin/get-all-bank-list")
      .then((res) => {
        let response = res?.data;

        if (response?.status === 200) {
          setBankData(response?.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [fileName, setFileName] = useState("");
  const [path, setPath] = useState("");
  const [editMode, setEditMode] = useState(0);
  const [editId, setEditId] = useState("");

  const handelEdit = (data) => {
    setEditMode(1);
    setBankName(data?.bank_name);
    setPath(data?.path);
    setFileName(data?.filename);
    setEditId(data?.id);
  };

  const handleCancel = () => {
    setBankName("");
    setPath("");
    setFileName("");
    setEditMode(0);
    setEditId("");
  };
  const handleActiveIncative = (status, id) => {
    Swal.fire({
      title:
        status == 1
          ? "Are you sure want to Incativate?"
          : "Are you sure want to Ativate?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(API_URL + "admin/change-bank-status", {
            id: id,
            status_state: status == 1 ? "0" : "1",
          })
          .then((res) => {
            let response = res?.data;
            if (response?.status === 200) {
              getAllBankList();
              Swal.fire({
                icon: "success",
                title: "Saved!",
                text: response?.message,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response?.message,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
    if (status == 1) {
    }
    console.log(status);
  };
  return (
    <>
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar menuAccess={menuAccess} />
          <div className="adminMain-wrapper">
            <AdminHeader />
            {/* The main Code */}
            <div className="mainContent">
              <div className="topHeadings">{/* <h3>Add Bank</h3> */}</div>
              <div className="contentBlocks">
                <div className="sectionTable">
                  <div className="continer-fluid">
                    <div className="row">
                      <div class="col-lg-12 col-md-9 col-xs-12">
                        <div class="hgy">
                          <div class="card mb-4">
                            <div class="card-header d-flex justify-content-between align-items-center">
                              <h5 class="mb-0">Add Bank</h5>
                              {/* <small class="text-muted float-end">Default label</small> */}
                            </div>
                            <div class="card-body">
                              <div className="row">
                                <div className="col-md-3">
                                  <div class="mb-3">
                                    <label
                                      className="col-form-label"
                                      for="basic-default-name"
                                    >
                                      Bank Name
                                    </label>
                                    <input
                                      type="text"
                                      className={
                                        bankNameError
                                          ? "form-control errorlogin"
                                          : "form-control"
                                      }
                                      placeholder="Enter Bank Name"
                                      value={bankName}
                                      onChange={handelBankName}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-5">
                                  <div class="mb-3">
                                    <div className="uploadsections p-20">
                                      <label
                                        class="col-form-label"
                                        for="basic-default-name"
                                      >
                                        Upload Logo
                                      </label>
                                      <div class="col-sm-12">
                                        <div className="uploadfilesArea">
                                          <div className="filnameIcons">
                                            <div className="fileIc">
                                              <span className="imgWithName">
                                                {/* <span className="imgIcons">{bankLogoFileType === "png"?<Icon.FiletypePng color={bankLogoError?"#f62b2b":"#1962CD"} size={50}/>:bankLogoFileType === "jpg"?<Icon.FiletypeJpg color={bankLogoError?"#f62b2b":"#1962CD"} size={50}/>:bankLogoFileType === "gif"?<Icon.FiletypeGif color={bankLogoError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={bankLogoError?"#f62b2b":"#1962CD"} size={50}/>}</span> */}
                                                {path == "" ? (
                                                  <>
                                                    <span className="imageName">
                                                      <span
                                                        title={bankLogoFileName}
                                                        className={
                                                          bankLogoError
                                                            ? "vrtext error"
                                                            : "vrtext"
                                                        }
                                                      >
                                                        {bankLogo.length
                                                          ? bankLogoFileName
                                                          : ""}
                                                      </span>
                                                      {bankLogo.length ? (
                                                        ""
                                                      ) : (
                                                        <>
                                                          <span
                                                            className={
                                                              bankLogoError
                                                                ? "vrtext error"
                                                                : "vrtext message"
                                                            }
                                                          >
                                                            {!bankLogoError
                                                              ? "* File Format: JPEG, PNG, and GIF; Max size: 2MB"
                                                              : "Upload Image"}
                                                          </span>
                                                        </>
                                                      )}
                                                      {bankLogoErrorMsg ? (
                                                        <span className="vrtext message">
                                                          {bankLogoErrorMsg}
                                                        </span>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </span>{" "}
                                                  </>
                                                ) : (
                                                  <span className="imageName">
                                                    <span
                                                      title={fileName}
                                                      className={"vrtext"}
                                                    >
                                                      {fileName}
                                                    </span>
                                                  </span>
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="uploadbtnSize">
                                            <input
                                              type="file"
                                              accept="image/png, image/jpeg, image/gif"
                                              onChange={handlePanCard}
                                              style={{ display: "none" }}
                                              ref={inputFilePanRef}
                                            />
                                            <div
                                              className="uplodBtns"
                                              onClick={onBtnPanClick}
                                            >
                                              Upload{" "}
                                              <i className="fa fa-cloud-upload"></i>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* <button type="submit" class="btn btn-primary">Send</button> */}
                                <div className="col-md-2">
                                  <label
                                    className="col-form-label col-md-12"
                                    style={{ visibility: "hidden" }}
                                    for="basic-default-name"
                                  >
                                    Bank{" "}
                                  </label>
                                  <button
                                    className="btn btn-primary"
                                    onClick={handleUploadDocument}
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
                                      "Submit"
                                    )}
                                  </button>
                                  {editMode ? (
                                    <span>
                                      &nbsp;&nbsp;&nbsp;
                                      <button
                                        className="btn btn-primary"
                                        onClick={handleCancel}
                                      >
                                        Cancel
                                      </button>
                                    </span>
                                  ) : (
                                    ""
                                  )}
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

              <div className="topHeadings">{/* <h3>Bank List</h3> */}</div>
              <div className="contentBlocks">
                <div className="sectionTable">
                  <div className="continer-fluid">
                    <div className="row">
                      <div className="col-lg-12 col-md-9 col-xs-12">
                        <div className="card">
                          <h5 className="card-header">Bank List</h5>
                          <div className="table-responsive text-nowrap">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Bank Name</th>
                                  {/* <th>File Name</th> */}
                                  <th>Logo</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody className="table-border-bottom-0">
                                {bankData ? (
                                  bankData.map((bk) => (
                                    <tr>
                                      <td>
                                        <i className="fab fa-react fa-lg text-info me-3"></i>{" "}
                                        <strong>{bk?.bank_name}</strong>
                                      </td>
                                      {/* <td>{bk?.filename}</td> */}
                                      <td>
                                        <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                          <li
                                            data-bs-toggle="tooltip"
                                            data-popup="tooltip-custom"
                                            data-bs-placement="top"
                                            className="avatar avatar-xs pull-up"
                                            title=""
                                            data-bs-original-title="Lilian Fuller"
                                          >
                                            <img
                                              src={API_URL + bk?.path}
                                              alt="Avatar"
                                              className=""
                                              style={{ height: "80px" }}
                                            />
                                          </li>
                                        </ul>
                                      </td>

                                      <td>
                                        <button
                                          className="btn btn-view"
                                          onClick={(e) => handelEdit(bk)}
                                        >
                                          Edit
                                        </button>

                                        <button
                                          className={
                                            bk?.status
                                              ? "btn btn-secondary"
                                              : "btn btn-view"
                                          }
                                          style={{ "margin-left": "2px" }}
                                          onClick={() =>
                                            handleActiveIncative(
                                              bk?.status,
                                              bk?.id
                                            )
                                          }
                                        >
                                          {bk?.status ? "In-active" : "Active"}
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <>
                                    <div>
                                      <span>No Data Found</span>
                                    </div>
                                  </>
                                )}
                              </tbody>
                            </table>
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
}
