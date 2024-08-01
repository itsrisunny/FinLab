import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import Paginator from "react-hooks-paginator";
import Loader from "../../loader";

const LIMIT = 10;

const IncompleteLeadCase = ({ menuAccess }) => {
  const navigate = useNavigate();

  const [loanTypeFilter, setLoanTypeFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState({ from: "", to: "" });
  const [sourceFilter, setSourceFilter] = useState("");
  const [offerFilter, setOfferFilter] = useState("");
  const [data, setData] = useState([]);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [noOfRecord, setNoOfRecord] = useState(0);
  const [searchTxt, setSearchTxt] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getLoanData(offset);
  }, [offset]);

  const getLoanData = (page) => {
    setLoader(true);
    const jsonData = {
      limit: LIMIT,
      offset: page,
      loanType: "Business Loan",
      adminId: localStorage.getItem("adminId"),
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
      .post(API_URL + `admin/all-applied-incomplete-loan-data`, jsonData)
      .then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          response?.data?.user_loan_detail?.map((v) => {
            if (
              v.user_id == v.created_by ||
              !v.created_by ||
              v.created_by == "admin"
            ) {
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
          // console.log(response?.data?.user_loan_detail);
        }
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  const getIndividualData = (caseId) => {
    navigate("/admin/case-detail/" + caseId + "/0/0");
  };

  useEffect(() => {
    getLoanData(0);
  }, [loanTypeFilter, dateRangeFilter, sourceFilter, offerFilter, searchTxt]);

  const handelSearch = (e) => {
    setSearchTxt(e.target.value);
  };

  return (
    <>
      {loader && <Loader />}
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar menuAccess={menuAccess} />
          <div className="adminMain-wrapper">
            <AdminHeader />
            {/* The main Code */}
            <div className="mainContent">
              <div className="topHeadings">
                <h3>Incomplete lead cases</h3>
              </div>
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
                              <label>
                                Source:
                                <select
                                  value={sourceFilter}
                                  onChange={(e) =>
                                    setSourceFilter(e.target.value)
                                  }
                                >
                                  <option value="FinLab">FinLab</option>
                                  <option value="Partner">Partner</option>
                                  <option value="">All</option>
                                </select>
                              </label>
                              {/*<label>
                                        Offer:
                                          <select value={offerFilter} onChange={(e) => setOfferFilter(e.target.value)}>                                        
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                            <option value="">All</option>
                                          </select>
                                      </label>*/}
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
                                  <th className="table-head">
                                    Last Active Date
                                  </th>
                                  {/*<th className="table-head">Offer Added</th>*/}
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
                                      {row.phoneNumber ? row.phoneNumber : ""}
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
                                    {/*<td className="table-body">{row.offerAdded}</td>*/}
                                    <td className="table-body">
                                      {row.created_by}
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
            </div>
            <AdminFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default IncompleteLeadCase;
