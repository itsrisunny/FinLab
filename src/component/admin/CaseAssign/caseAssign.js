import React, { useState, useEffect } from "react";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import { Row, Col, Form, Table } from "react-bootstrap";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import Loader from "../../loader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function CaseAssign({ menuAccess }) {
  const [loader, setLoader] = useState(false);
  const [createdBy, setCreatedBy] = useState("customer");
  const [loanType, setLoanType] = useState("");
  const [email, setEmail] = useState("");
  const [caseType, setCaseType] = useState("");
  const [name, setName] = useState("");
  const [totalCase, setTotalCase] = useState(0);
  const [message, setMessage] = useState("");
  const [from, setFrom] = useState("");
  const [cases, setCases] = useState([]);
  const [agentsIds, setAgentsIds] = useState("");
  const navigate = useNavigate();
  const handleCreatedByFun = (e) => {
    setCreatedBy(e.target.value);
  };
  const handleLoanTypeFun = (e) => {
    setLoanType(e.target.value);
  };
  const handleEmailFun = (e) => {
    setEmail(e.target.value);
  };
  const handleCaseTypeFun = (e) => {
    setCaseType(e.target.value);
  };
  const handleSearchFun = () => {
    setLoader(true);
    let jsonForm = {
      created_by: createdBy,
      email_id: email,
      loan_type: loanType,
      case_type: caseType,
    };
    axios
      .post(API_URL + `search-case`, jsonForm)
      .then((res) => {
        const { data } = res;
        if (data.data.status === 404) {
          setMessage(data.data.message);
          setName("");
          setTotalCase(0);
          setFrom("");
          setCases([]);
        } else {
          setMessage("");
          setName(data.data.name);
          setTotalCase(data.data.totalCase);
          setFrom(data.data.id);
          setCases(data.data.caseNumbers);
        }
        setLoader(false);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const handleAgentId = (e) => {
    setAgentsIds(e.target.value);
  };
  const handleFormSubmit = () => {
    if (cases.length && agentsIds) {
      setLoader(true);
      let formData = {
        from: from,
        created_by: localStorage.getItem("adminId"),
        cases: cases,
        to: agentsIds,
      };
      console.log(formData);
      axios
        .post(API_URL + `search-case/asign`, formData)
        .then((res) => {
          setLoader(false);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Cases has been successfully transfered",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              //window.location.reload();
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <>
      {loader && <Loader />}
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar menuAccess={menuAccess} />
          <div className="adminMain-wrapper">
            <AdminHeader />
            <div className="mainContent text-center">
              <div className="topHeadings mb-4">
                <h3>Case Assign</h3>
              </div>
              <Form className="d-flex flex-column align-items-center">
                <Form.Group
                  as={Row}
                  className="mb-4 w-100"
                  controlId="formCaseAssign"
                >
                  <Form.Label column sm={2} className="text-center">
                    Created by
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      as="select"
                      className="text-center"
                      onChange={handleCreatedByFun}
                    >
                      <option value="customer">Customer</option>
                      <option value="agent">Agent</option>
                      <option value="partner">Partner</option>
                    </Form.Control>
                  </Col>
                  <Form.Label column sm={2} className="text-center">
                    Loan Type
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      as="select"
                      className="text-center"
                      onChange={handleLoanTypeFun}
                    >
                      <option value="">All Loans</option>
                      <option value="business">Bussiness Loan</option>
                      <option value="personal">Personal Loan</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-4 w-100"
                  controlId="formCaseAssign"
                >
                  <Form.Label column sm={2} className="text-center">
                    From Email ID
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="text"
                      className="text-center"
                      onChange={handleEmailFun}
                      value={email}
                    />
                  </Col>

                  <Form.Label column sm={2} className="text-center">
                    Case Type
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      as="select"
                      className="text-center"
                      onChange={handleCaseTypeFun}
                    >
                      <option value="">All Cases</option>
                      <option value="incomplete">Incomplete Lead</option>
                      <option value="lead">Lead</option>
                      <option value="offered">Offered</option>
                      <option value="closed">Closed</option>
                      <option value="declined">Declined</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                <h5 style={{ marginTop: "12px" }}>OR</h5>
                <Form.Group
                  as={Row}
                  className="mb-4 mt-4 w-100 "
                  controlId="formCaseAssign"
                >
                  <Form.Label column sm={2} className="text-center">
                    Case Id
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control type="string" className="text-center" />
                  </Col>
                </Form.Group>
                <div className="text-center mt-2 mb-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSearchFun}
                  >
                    Search
                  </button>
                </div>
                <Form.Group
                  as={Col}
                  sm={6}
                  className=" mb-4 w-100 d-flex flex-column align-items-center"
                  controlId="formCaseAssign"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <Col sm={6} className="mb-2 text-center">
                    <Form.Control
                      type="string"
                      className="text-center"
                      value={`Name: ${name}`}
                      readOnly
                      style={{
                        border: "none",
                        backgroundColor: "inherit",
                        fontSize: "20px",
                        fontWeight: "bold",
                        padding: "0",
                      }}
                    />
                    <Form.Control
                      type="string"
                      className="text-center"
                      value={`Total count of leads: ${totalCase}`}
                      style={{
                        border: "none",
                        backgroundColor: "inherit",
                        fontSize: "18px",
                        padding: "0",
                      }}
                    />
                  </Col>
                </Form.Group>
                <div className="topHeadings mb-2 mt-4">
                  <h3>Assign to Agent Id</h3>
                </div>
                <Form.Group
                  as={Row}
                  className="mb-4 w-100"
                  controlId="formCaseAssign"
                >
                  <Form.Label column sm={2} className="text-center">
                    Agent Id
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="string"
                      className="text-center"
                      onChange={handleAgentId}
                      placeholder="Enter Agent ID (If you want to assign multipe agents then add Id with ,)"
                    />
                  </Col>
                </Form.Group>
                <div className="text-center mt-4">
                  <button type="button" className="btn btn-secondary">
                    Close
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
              </Form>
            </div>
            <AdminFooter />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
