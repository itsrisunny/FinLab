import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FinlabLogo from "../../../assets/images/admin-dashboard/logo.png";
import JohnDoe from "../../../assets/images/admin-dashboard/john.jpg";
import DemoChart from "../../../assets/images/admin-dashboard/chart-demo.jpg";
import DemoChartTwo from "../../../assets/images/admin-dashboard/chart-demo-two.jpg";
import AdminHeader from "../layouts/partner-admin-header";
import AdminFooter from "../layouts/partner-admin-footer";
import AdminNavBar from "../layouts/partner-admin-nav-bar";
import AppPieChart from "./appPieChart";
import CurrencyFormat from "react-currency-format";
import GroupedBarGraph from "./groupedBarGraph";
import axios from "axios";
import moment from "moment";
import { API_URL } from "../../../config/constant";
export default function Index({ menuAccess }) {
  const [incompLead, setIncCompLead] = useState(0);
  const [lead, setLead] = useState(0);
  const [close, setClosed] = useState(0);
  const [offered, setOffered] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [allLeads, setAllLeads] = useState(0);

  const [appliedAmount, setAppliedAmount] = useState(0);
  const [totalApprovedLoan, setTotalApprovedLoan] = useState(0);
  const [totalDispersedLoan, setTotalDispersedLoan] = useState(0);
  const [totalFunding, setTotalFunding] = useState(0);
  useEffect(() => {
    appFunnelFunction();
    getLoanDataDateWise();
    getLoanDataPartner();
  }, []);
  const appFunnelFunction = () => {
    axios
      .post(API_URL + `admin/dashboard-application-status`, {
        partnerId: localStorage.getItem("partner_id"),
      })
      .then((res) => {
        setIncCompLead(res?.data?.data?.incompleteLeads);
        setLead(res?.data?.data?.leads);
        setOffered(res?.data?.data?.offeredLeads);
        setClosed(res?.data?.data?.closedLeads);
        setRejected(res?.data?.data?.rejectLeads);
        setAllLeads(
          parseInt(
            res?.data?.data?.incompleteLeads
              ? res?.data?.data?.incompleteLeads
              : 0
          ) +
            parseInt(res?.data?.data?.leads ? res?.data?.data?.leads : 0) +
            parseInt(
              res?.data?.data?.offeredLeads ? res?.data?.data?.offeredLeads : 0
            ) +
            parseInt(
              res?.data?.data?.closedLeads ? res?.data?.data?.closedLeads : 0
            ) +
            parseInt(
              res?.data?.data?.rejectLeads ? res?.data?.data?.rejectLeads : 0
            )
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [optionData, setOptionData] = useState([
    { category: "Incomplete", val: 0 },
    { category: "Lead", val: 0 },
    { category: "Offered", val: 0 },
    { category: "Closed", val: 0 },
    { category: "Rejected", val: 0 },
  ]);
  useEffect(() => {
    setOptionData([
      { category: "Incomplete", val: incompLead },
      { category: "Lead", val: lead },
      { category: "Offered", val: offered },
      { category: "Closed", val: close },
      { category: "Rejected", val: rejected },
    ]);
  }, [incompLead, lead, close, offered, rejected]);
  const [data, setData] = useState([{}]);
  function custom_sort(a, b) {
    return (
      new Date(
        moment(a.category, "DD-MM-YYYY").format("YYYY-MM-DD")
      ).getTime() -
      new Date(moment(b.category, "DD-MM-YYYY").format("YYYY-MM-DD")).getTime()
    );
  }
  const getLoanDataDateWise = () => {
    axios
      .post(API_URL + `admin/dashboard-loan-amt-date-wise`, {
        partnerId: localStorage.getItem("partner_id"),
      })
      .then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          (response?.data).sort(custom_sort);
          setData(response?.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getLoanDataPartner = () => {
    axios
      .post(API_URL + `admin/dashboard-loan-amt`, {
        partnerId: localStorage.getItem("partner_id"),
      })
      .then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          setAppliedAmount(response?.data?.appliedLoan);
          setTotalApprovedLoan(response?.data?.approvedLoan);
          setTotalDispersedLoan(response?.data?.disburstLoan);
          setTotalFunding(
            parseInt(
              response?.data?.appliedLoan ? response?.data?.appliedLoan : 0
            ) +
              parseInt(
                response?.data?.approvedLoan ? response?.data?.approvedLoan : 0
              ) +
              parseInt(
                response?.data?.disburstLoan ? response?.data?.disburstLoan : 0
              )
          );
          /*
			
			setTotalOtherLoan(0);
			setAllLoan(parseInt(response?.data?.appliedLoan ? response?.data?.appliedLoan:0)+parseInt(response?.data?.disburstLoan ? response?.data?.disburstLoan : 0 )+parseInt(response?.data?.approvedLoan ? response?.data?.approvedLoan :0)+parseInt(0));*/
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar menuAccess={menuAccess} />
          <div className="adminMain-wrapper">
            <AdminHeader />

            <div className="mainContent">
              <div className="topHeadings">
                <h4>Application Funnel</h4>
              </div>
              <div className="grapMaps">
                <div className="fourKpis">
                  <div className="continer-fluid">
                    <div className="row sectionTwo">
                      <div className="col-md-5">
                        <div className="row">
                          <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                            <div
                              className="income-dashone fistSec"
                              style={{
                                backgroundColor: "#506ffb",
                                color: "white",
                              }}
                            >
                              <div className="analytics-content">
                                <h6>
                                  Total Applications :{" "}
                                  {allLeads ? (
                                    <CurrencyFormat
                                      value={allLeads}
                                      thousandSpacing={"2s"}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                    />
                                  ) : (
                                    "0"
                                  )}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="income-dashone fistSec">
                              <div className="analytics-content">
                                <h5 style={{ color: "#42cdff" }}>
                                  Incomplete Lead
                                </h5>
                                <h6>
                                  <span>
                                    {incompLead ? (
                                      <CurrencyFormat
                                        value={incompLead}
                                        thousandSpacing={"2s"}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    ) : (
                                      "0"
                                    )}
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="income-dashone secondSec">
                              <div className="analytics-content">
                                <h5 style={{ color: "#ffb800" }}>Leads</h5>
                                <h6>
                                  <span>
                                    {lead ? (
                                      <CurrencyFormat
                                        value={lead}
                                        thousandSpacing={"2s"}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    ) : (
                                      "0"
                                    )}
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 ">
                            <div className="income-dashone thirdSec">
                              <div className="analytics-content">
                                <h5 style={{ color: "#f555ff" }}>
                                  Offered Lead
                                </h5>
                                <h6>
                                  <span>
                                    {offered ? (
                                      <CurrencyFormat
                                        value={offered}
                                        thousandSpacing={"2s"}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    ) : (
                                      "0"
                                    )}
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-6 ">
                            <div className="income-dashone fourSec">
                              <div className="analytics-content">
                                <h5 style={{ color: "#52fb6a" }}>
                                  Closed Lead
                                </h5>
                                <h6>
                                  <span>
                                    {close ? (
                                      <CurrencyFormat
                                        value={close}
                                        thousandSpacing={"2s"}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    ) : (
                                      "0"
                                    )}
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="chartplacements">
                          <AppPieChart options={optionData} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="topHeadings">
                <h4 style={{ marginTop: "8px" }}>Amount Funnel</h4>
              </div>
              <div className="grapMaps">
                <div className="fourKpis">
                  <div className="continer-fluid">
                    <div className="sectionTwos">
                      <div className="row sectionAnotherKpi">
                        <div className="col-md-5">
                          <div className="row">
                            <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
                              <div
                                className="income-dashone fistSec"
                                style={{
                                  backgroundColor: "#506ffb",
                                  color: "white",
                                }}
                              >
                                <div className="analytics-content">
                                  <h6>
                                    Total Applications Amount :{" "}
                                    <CurrencyFormat
                                      value={totalFunding ? totalFunding : 0}
                                      thousandSpacing={"2s"}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"₹"}
                                    />
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                              <div className="income-dashone fistSec">
                                <div className="analytics-content">
                                  <h5 style={{ color: "#4571bd" }}>
                                    Amount Applied
                                  </h5>
                                  <h6>
                                    <span>
                                      {appliedAmount ? (
                                        <CurrencyFormat
                                          value={appliedAmount}
                                          thousandSpacing={"2s"}
                                          displayType={"text"}
                                          thousandSeparator={true}
                                          prefix={"₹"}
                                        />
                                      ) : (
                                        "0"
                                      )}
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-6">
                              <div className="income-dashone secondSec">
                                <div className="analytics-content">
                                  <h5 style={{ color: "#ec7c33" }}>
                                    Approved Amount
                                  </h5>
                                  <h6>
                                    <span>
                                      {totalApprovedLoan ? (
                                        <CurrencyFormat
                                          value={totalApprovedLoan}
                                          thousandSpacing={"2s"}
                                          displayType={"text"}
                                          thousandSeparator={true}
                                          prefix={"₹"}
                                        />
                                      ) : (
                                        "0"
                                      )}
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-6 col-xs-12">
                              <div className="income-dashone thirdSec">
                                <div className="analytics-content">
                                  <h5 style={{ color: "#a4a3a4" }}>
                                    Disbursed Amount
                                  </h5>
                                  <h6>
                                    <span>
                                      {totalDispersedLoan ? (
                                        <CurrencyFormat
                                          value={totalDispersedLoan}
                                          thousandSpacing={"2s"}
                                          displayType={"text"}
                                          thousandSeparator={true}
                                          prefix={"₹"}
                                        />
                                      ) : (
                                        "0"
                                      )}
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="chartplacements">
                            <GroupedBarGraph data={data} />
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
}
