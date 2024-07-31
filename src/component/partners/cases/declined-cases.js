import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AdminHeader from "../layouts/partner-admin-header";
import AdminFooter from "../layouts/partner-admin-footer";
import AdminNavBar from "../layouts/partner-admin-nav-bar";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import Paginator from "react-hooks-paginator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../loader/";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const LIMIT = 10;
const DUPLIMIT = 10;

const LeadCase = ({ menuAccess }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [loanTypeFilter, setLoanTypeFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState({ from: "", to: "" });
  const [sourceFilter, setSourceFilter] = useState("");
  const [offerFilter, setOfferFilter] = useState("");
  const [data, setData] = useState([]);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [noOfRecord, setNoOfRecord] = useState(0);
  const [searchTxt, setSearchTxt] = useState("");

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const [dupOffset, setDupOffset] = useState(0);
  const [dupCurrentPage, setDupCurrentPage] = useState(1);
  const [dupNoOfRecord, setDupNoOfRecord] = useState(0);
  const [totalNoOfRecord, setTotalNoOfRecord] = useState([]);
  const [error, setError] = useState(null);
  //const expectedHeaders = ["loan_purpose","sub_loan_purpose","loan_amount","duration","employement_type","business_type","profession","name","mobile_number","email_id","pan_number","date_of_birth","date_of_incorporation","address_1","address_2","landmark","pin_code","city","state","ifile","gst_number","turnover_yearly","gross_annual_profit","industry","sub_industry"];
  const expectedHeaders = [
    "Loan Purpose",
    "Sub Loan Purpose",
    "Loan Amount",
    "Duration",
    "Name",
    "Mobile Number",
    "Email ID",
    "PAN Number",
    "Date Of Birth",
    "Aadhaar Number",
    "Address 1",
    "Address 2",
    "Landmark",
    "PIN Code",
    "City, District",
    "State",
    "Gender",
    "Relationship status",
    "Active Loan",
    "EMI",
    "Monthly Salary",
    "Salary received via",
    "Company Name",
    "Tenure In Current Company",
    "Total Work Experience",
    "Official Email-id",
    "Serving Notice Period",
    "Working As/On",
  ];

  useEffect(() => {
    getLoanData(offset);
  }, [offset]);

  const getLoanData = (page) => {
    const jsonData = {
      limit: LIMIT,
      offset: page,
      loanType: "Business Loan",
      loanStatus: "declined",
      created_by_id: localStorage.getItem("partner_id"),
    };

    /*if(loanTypeFilter !=""){
      jsonData['loanType']=loanTypeFilter
     }*/
    if (
      dateRangeFilter.from != "" &&
      dateRangeFilter.to != "" &&
      new Date(dateRangeFilter.from).getTime() <
        new Date(dateRangeFilter.to).getTime()
    ) {
      jsonData["dateRange"] = dateRangeFilter;
    }
    if (sourceFilter != "") {
      jsonData["source"] = sourceFilter;
    }
    if (offerFilter != "") {
      jsonData["offers"] = offerFilter;
    }
    if (searchTxt != "") {
      jsonData["searchText"] = searchTxt;
    }

    // console.log(jsonData);

    axios
      .post(API_URL + `partners-admin/all-applied-loan-data-partner`, jsonData)
      .then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          response?.data?.user_loan_detail?.map((v) => {
            if (v.user_id == v.created_by || v.created_by == null) {
              v["source"] = "FinLab";
            } else {
              v["source"] = "Partner";
            }
            if (v.no_of_offers == null) {
              v["offerAdded"] = "No";
            } else {
              v["offerAdded"] = "Yes";
            }
            v.appliedDate = moment(v.appliedDate, "YYYY-MM-DD hh:mm:ss").format(
              "DD/MM/YYYY"
            );
          });

          setData(response?.data?.user_loan_detail);
          setNoOfRecord(response?.data?.records);

          //console.log(response?.data?.records);
        }
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getIndividualData = (caseId) => {
    navigate("/partners-admin/view-partner-case-detail/" + caseId + "/3/0");
  };

  useEffect(() => {
    getLoanData(0);
  }, [loanTypeFilter, dateRangeFilter, sourceFilter, offerFilter, searchTxt]);

  const handelSearch = (e) => {
    setSearchTxt(e.target.value);
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
          /*if(index === 0){
            return line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(function(item) {
              return item.trim().replace(/^"|"$/g, ''); // Remove leading and trailing double quotes
            })
          }else{
            return line.split(",")
          }*/
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
          getLoanData(offset);
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
          getLoanData(offset);
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
  const { permissions } = menuAccess;
  return (
    <>
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar menuAccess={menuAccess} />
          <div className="adminMain-wrapper">
            <AdminHeader />
            {/* The main Code */}
            <div className="mainContent">
              <div className="topHeadings">
                <h3>Declined cases</h3>
              </div>

              {loader ? (
                <Loader display={"flex"} />
              ) : (
                <div className="contentBlocks">
                  <div className="sectionTable">
                    <div className="continer-fluid">
                      <div className="row">
                        <div className="col-lg-12 col-md-9 col-xs-12">
                          <div className="card tableLead">
                            <div className="tableLeadCase">
                              <div className="table-label">
                                {/*<label>
                                         Loan Type:
                                          <select value={loanTypeFilter} onChange={(e) =>  setLoanTypeFilter(e.target.value)}>                                        
                                          <option value="Business Loan">Business Loan</option>
                                          <option value="Personal Loan">Personal Loan</option>
                                          <option value="Home Loan">Home Loan</option>
                                          <option value="Car Loan">Car Loan</option>
                                          <option value="Two Wheeler Loan">Two Wheeler Loan</option>
                                          <option value="">All</option>
                                          </select>
                                        </label>*/}
                                <label>
                                  From:
                                  <input
                                    type="date"
                                    placeholder="From"
                                    value={dateRangeFilter.from}
                                    onChange={(e) =>
                                      setDateRangeFilter({
                                        ...dateRangeFilter,
                                        from: e.target.value,
                                      })
                                    }
                                  />
                                  &nbsp;&nbsp; To:
                                  <input
                                    type="date"
                                    placeholder="To"
                                    value={dateRangeFilter.to}
                                    onChange={(e) =>
                                      setDateRangeFilter({
                                        ...dateRangeFilter,
                                        to: e.target.value,
                                      })
                                    }
                                  />
                                </label>
                                {/* <label>
                                      Source:
                                        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>           
                                          <option value="FinLab">FinLab</option>
                                          <option value="Partner">Partner</option>
                                          <option value="">All</option>
                                        </select>
                                      </label> */}
                                <label>
                                  Offer:
                                  <select
                                    value={offerFilter}
                                    onChange={(e) =>
                                      setOfferFilter(e.target.value)
                                    }
                                  >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    <option value="">All</option>
                                  </select>
                                </label>
                                <label>
                                  Search(Case No. Or Email Or Ph No.):
                                  <input
                                    type="text"
                                    onChange={handelSearch}
                                    value={searchTxt}
                                  />
                                </label>
                              </div>
                              <table
                                style={{ width: "100%" }}
                                className="table table-stripped"
                              >
                                <thead>
                                  <tr>
                                    <th className="table-head">Case Number</th>
                                    <th className="table-head">Email Id</th>
                                    <th className="table-head">Phone Number</th>
                                    <th className="table-head">Req. Amount</th>
                                    {/*<th className="table-head">Loan Type</th>*/}
                                    <th className="table-head">Applied Date</th>
                                    <th className="table-head">Offer Added</th>
                                    <th className="table-head">Source</th>
                                    <th className="table-head">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* //   {filteredData.map((row, index) => ( */}
                                  {data.map((row, index) => (
                                    <tr
                                      key={index}
                                      style={{ borderBottom: "1px solid #ddd" }}
                                    >
                                      <td className="table-body">
                                        {row.caseNumber}
                                      </td>
                                      <td className="table-body">
                                        {row.emailId}
                                      </td>
                                      <td className="table-body">
                                        {row.phoneNumber ? (
                                          <CurrencyFormat
                                            value={row.phoneNumber}
                                            displayType={"text"}
                                            format="### ### ####"
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </td>
                                      <td className="table-body">
                                        {row.loanAmountRequired ? (
                                          <CurrencyFormat
                                            value={row.loanAmountRequired}
                                            thousandSpacing={"2s"}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"₹"}
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </td>
                                      {/*<td className="table-body">{row.loanType}</td>*/}
                                      <td className="table-body">
                                        {row.appliedDate}
                                      </td>
                                      <td className="table-body">
                                        {row.offerAdded}
                                      </td>
                                      <td className="table-body">
                                        {row.created_by_name}
                                      </td>
                                      <td className="table-body">
                                        <button
                                          className="btn btn-view"
                                          onClick={() =>
                                            getIndividualData(row.caseId)
                                          }
                                        >
                                          View
                                        </button>
                                        {/*<button className="btn btn-delete" onClick={() => console.log(row.caseId)}>Delete</button>*/}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              {/* pegination */}
                              <div>
                                <Paginator
                                  totalRecords={noOfRecord}
                                  pageLimit={LIMIT}
                                  pageNeighbours={2}
                                  setOffset={setOffset}
                                  currentPage={currentPage}
                                  setCurrentPage={setCurrentPage}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
          <Modal.Title>Bulk Upload</Modal.Title>
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
                      Upload File
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
                      <th className="table-head">Aadhaar</th>
                      <th className="table-head">DOB</th>
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
                      <td className="table-body">{row.aadhaar_number}</td>
                      <td className="table-body">{row.date_of_birth}</td>
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
};

export default LeadCase;
