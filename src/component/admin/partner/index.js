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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LIMIT = 10;

const LeadCase = ({ menuAccess }) => {
  const navigate = useNavigate();
  const [dateRangeFilter, setDateRangeFilter] = useState({ from: "", to: "" });
  const [data, setData] = useState([]);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [noOfRecord, setNoOfRecord] = useState(0);
  const [searchTxt, setSearchTxt] = useState("");

  useEffect(() => {
    getAllPartnersData(offset);
  }, [offset]);

  const getAllPartnersData = (page) => {
    const jsonData = {
      limit: LIMIT,
      offset: page,
    };

    if (
      dateRangeFilter.from != "" &&
      dateRangeFilter.to != "" &&
      new Date(dateRangeFilter.from).getTime() <
        new Date(dateRangeFilter.to).getTime()
    ) {
      jsonData["dateRange"] = dateRangeFilter;
    }

    if (searchTxt != "") {
      jsonData["searchText"] = searchTxt;
    }

    // console.log(jsonData);

    axios
      .post(API_URL + `admin/all-partner-data`, jsonData)
      .then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          response?.data?.partner_detail?.map((v) => {
            v.appliedDate = moment(v.appliedDate, "YYYY-MM-DD hh:mm:ss").format(
              "DD/MM/YYYY"
            );
          });

          setData(response?.data?.partner_detail);
          setNoOfRecord(response?.data?.records);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getIndividualData = (id) => {
    navigate("/admin/partner-detail/" + id);
  };

  useEffect(() => {
    getAllPartnersData(0);
  }, [dateRangeFilter, searchTxt]);

  const updateStatus = (id, status) => {
    let jsonData = {
      id: id,
      status: status,
    };
    axios
      .post(API_URL + `admin/update-partner_status`, jsonData)
      .then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          toast.success(response?.message);
          getAllPartnersData(0);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handelSearch = (e) => {
    setSearchTxt(e.target.value);
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
              <div className="topHeadings">
                <h3>Partner List</h3>
              </div>
              <div className="contentBlocks">
                <div className="sectionTable">
                  <div className="continer-fluid">
                    <div className="row">
                      <div className="col-lg-12 col-md-9 col-xs-12">
                        <div className="card tableLead">
                          <div className="tableLeadCase">
                            <div className="table-label">
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
                                Search(Email Or Ph No. Or Register As):
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
                                  <th className="table-head">Name</th>
                                  <th className="table-head">Partner Id</th>
                                  <th className="table-head">Email Id</th>
                                  <th className="table-head">Phone Number</th>
                                  <th className="table-head">PAN</th>
                                  <th className="table-head">GST</th>
                                  <th className="table-head">Register As</th>
                                  <th className="table-head">Applied Date</th>
                                  <th className="table-head">Status</th>
                                  <th className="table-head">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((row, index) => (
                                  <tr
                                    key={index}
                                    style={{ borderBottom: "1px solid #ddd" }}
                                  >
                                    <td className="table-body">{row.name}</td>
                                    <td className="table-body">
                                      {row.partner_id}
                                    </td>
                                    <td className="table-body">
                                      {row.email_id}
                                    </td>
                                    <td className="table-body">
                                      {row.mobile_number ? (
                                        <CurrencyFormat
                                          value={row.mobile_number}
                                          displayType={"text"}
                                          format="### ### ####"
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </td>
                                    <td className="table-body">
                                      {row.pan_card}
                                    </td>
                                    <td className="table-body">{row.gst}</td>
                                    <td className="table-body">
                                      {row.register_as}
                                    </td>
                                    <td className="table-body">
                                      {row.appliedDate}
                                    </td>
                                    <td className="table-body">
                                      <button
                                        className={
                                          row.status
                                            ? "btn btn-active"
                                            : "btn btn-delete"
                                        }
                                        onClick={() => {
                                          row.status
                                            ? updateStatus(row.id, 0)
                                            : updateStatus(row.id, 1);
                                        }}
                                      >
                                        {row.status ? "✔" : "✘"}
                                      </button>
                                    </td>
                                    <td className="table-body">
                                      <button
                                        className="btn btn-view"
                                        onClick={() =>
                                          getIndividualData(row.id)
                                        }
                                      >
                                        View
                                      </button>
                                      {/* <button className="btn btn-delete" onClick={() => console.log(row.id)}>Delete</button> */}
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
      <ToastContainer />
    </>
  );
};

export default LeadCase;
