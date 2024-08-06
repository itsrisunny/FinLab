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

export default function CaseAssign({ menuAccess }) {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

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
                    <Form.Control as="select" className="text-center">
                      <option value="customer">Customer</option>
                      <option value="agent">Agent</option>
                      <option value="partner">Partner</option>
                    </Form.Control>
                  </Col>
                  <Form.Label column sm={2} className="text-center">
                    Loan Type
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control as="select" className="text-center">
                      <option value="Both">All Loans</option>
                      <option value="Bussiness Loan">Bussiness Loan</option>
                      <option value="Personal Loan">Personal Loan</option>
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
                      value="bishnoicm202@gmail.com"
                    />
                  </Col>

                  <Form.Label column sm={2} className="text-center">
                    Case Type
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control as="select" className="text-center">
                      <option value="All Cases">All Cases</option>
                      <option value="Incomplete Lead">Incomplete Lead</option>
                      <option value="Lead">Lead</option>
                      <option value="Offered">Offered</option>
                      <option value="Closed">Closed</option>
                      <option value="Declined">Declined</option>
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
                  <button type="button" className="btn btn-primary">
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
                      value="Name: Chander Mohan"
                      readOnly
                      style={{
                        border: "none",
                        backgroundColor: "inherit",
                        fontSize: "20px",
                        fontWeight: "bold",
                        padding:"0"
                      }}
                    />
                    <Form.Control
                      type="string"
                      className="text-center"
                      value="Total count of leads: 3242"
                      style={{
                        border: "none",
                        backgroundColor: "inherit",
                        fontSize: "18px",
                        padding:"0"
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
                      value="264,345"
                    />
                  </Col>
                </Form.Group>
                <div className="text-center mt-4">
                  <button type="button" className="btn btn-secondary">
                    Close
                  </button>
                  &nbsp;
                  <button type="button" className="btn btn-primary">
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
