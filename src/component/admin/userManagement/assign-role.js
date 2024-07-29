import React, { useState } from "react";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import { Row, Col, Form, Table } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import Loader from "../../loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { json } from "react-router-dom";

export default function AssignRole({ menuAccess }) {
  const [loader, setLoader] = useState(false);
  const [emailId, setEmailId] = useState();
  const [name, setName] = useState("");
  const [superAdmin, setSuperAdmin] = useState(false);
  const [partnerManagement, setPartnerManagement] = useState(false);
  const [masterManagement, setMasterManagement] = useState(false);
  const [emaiIdMask, setEmailIdMask] = useState(false);
  const [mobileNumberMask, setMobileNumberMask] = useState(false);
  const [permissions, setPermissions] = useState({
    businessLoan: {
      selectAll: false,
      addCase: false,
      incompleteLead: false,
      lead: false,
      offeredLead: false,
      closedLead: false,
      declinedLead: false,
    },
    personalLoan: {
      selectAll: false,
      addCase: false,
      incompleteLead: false,
      lead: false,
      offeredLead: false,
      closedLead: false,
      declinedLead: false,
    },
  });

  const togglePermission = (category, permission) => {
    setPermissions((prev) => {
      const newPermissions = {
        ...prev[category],
        [permission]: !prev[category][permission],
      };

      if (permission !== "selectAll") {
        newPermissions.selectAll = Object.keys(newPermissions).every(
          (key) => key === "selectAll" || newPermissions[key]
        );
      } else {
        for (let key in newPermissions) {
          if (key !== "selectAll") {
            newPermissions[key] = newPermissions.selectAll;
          }
        }
      }

      return {
        ...prev,
        [category]: newPermissions,
      };
    });
  };

  const handleResetFunc = () => {
    setPermissions({
      businessLoan: {
        selectAll: false,
        addCase: false,
        incompleteLead: false,
        lead: false,
        offeredLead: false,
        closedLead: false,
        declinedLead: false,
      },
      personalLoan: {
        selectAll: false,
        addCase: false,
        incompleteLead: false,
        lead: false,
        offeredLead: false,
        closedLead: false,
        declinedLead: false,
      },
    });
    setSuperAdmin(false);
    setPartnerManagement(false);
    setMasterManagement(false);
    setEmailIdMask(false);
    setMobileNumberMask(false);
  };

  const [adminId, setAdminId] = useState("");

  const handleSearchRecords = () => {
    // Handle form submit logic here
    setLoader(true);
    if (emailId) {
      axios
        .post(`${API_URL}admin/get-user-data`, {
          emailId: emailId,
        })
        .then((res) => {
          const { data } = res;
          if (data?.status === 200) {
            setAdminId(data?.data?.id);
            setName(data.data.name);
            const permissions = data?.data?.permissions;
            if (permissions) {
              setSuperAdmin(permissions?.superAdmin);
              setPartnerManagement(permissions?.partnerManagement);
              setMasterManagement(permissions?.masterManagement);
              setEmailIdMask(permissions?.emaiIdMask);
              setMobileNumberMask(permissions?.mobileNumberMask);
              setPermissions(permissions?.permissions);
            } else {
              setSuperAdmin(false);
              setPartnerManagement(false);
              setMasterManagement(false);
              setEmailIdMask(false);
              setMobileNumberMask(false);
              setPermissions({
                businessLoan: {
                  selectAll: false,
                  addCase: false,
                  incompleteLead: false,
                  lead: false,
                  offeredLead: false,
                  closedLead: false,
                  declinedLead: false,
                },
                personalLoan: {
                  selectAll: false,
                  addCase: false,
                  incompleteLead: false,
                  lead: false,
                  offeredLead: false,
                  closedLead: false,
                  declinedLead: false,
                },
              });
            }
            setLoader(false);
          } else {
            setLoader(false);
            toast.error("Please enter Valid ID!");
          }
        })
        .catch((e) => {
          console.log("data not coming", e);
          setLoader(false);
        });
    } else {
      toast.error("Please enter ID!");
      setLoader(false);
    }
  };

  const handleSavePermission = () => {
    setLoader(true);
    if (emailId) {
      const jsonFormData = {
        adminId: adminId,
        permissions: JSON.stringify({
          superAdmin: superAdmin,
          partnerManagement: partnerManagement,
          masterManagement: masterManagement,
          emaiIdMask: emaiIdMask,
          mobileNumberMask: mobileNumberMask,
          permissions,
        }),
      };
      axios
        .post(API_URL + "admin/save-permission", jsonFormData)
        .then((res) => {
          const { data } = res;
          if (data?.status === 200) {
            toast.success(data?.message);
            handleResetFunc();
            setEmailId("");
            setName("");
          } else {
            toast.error(data?.message);
          }
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    } else {
      toast.error("Please enter valid ID!");
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
                <h3>User Role Management</h3>
              </div>
              <Form className="d-flex flex-column align-items-center">
                <Form.Group
                  as={Row}
                  className="mb-4 w-100"
                  controlId="formPartnerId"
                >
                  <Form.Label column sm={2} className="text-center">
                    Email Id
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="string"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      className="text-center"
                    />
                  </Col>
                  <Col sm={2}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSearchRecords}
                    >
                      Search
                    </button>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-4 w-100"
                  controlId="formPartnerId"
                >
                  <Form.Label column sm={2} className="text-center">
                    Name
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="string"
                      value={name}
                      className="text-center"
                      disabled={true}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-4 w-100"
                  controlId="formAdminCheckbox"
                >
                  <Form.Label column sm={2} className="text-center">
                    Super Admin
                  </Form.Label>
                  <Col sm={1} className="text-center">
                    <Form.Check
                      type="checkbox"
                      checked={superAdmin}
                      onChange={() => setSuperAdmin(!superAdmin)}
                      className="custom-checkbox"
                    />
                  </Col>

                  <Form.Label column sm={2} className="text-center">
                    Partner Management
                  </Form.Label>
                  <Col sm={1} className="text-center">
                    <Form.Check
                      type="checkbox"
                      checked={partnerManagement}
                      onChange={() => setPartnerManagement(!partnerManagement)}
                      className="custom-checkbox"
                    />
                  </Col>

                  <Form.Label column sm={2} className="text-center">
                    Master Management
                  </Form.Label>
                  {/* <Col sm={1} className="d-flex justify-content-center"> */}
                  <Col sm={1} className="text-center">
                    <Form.Check
                      type="checkbox"
                      checked={masterManagement}
                      onChange={() => setMasterManagement(!masterManagement)}
                      className="custom-checkbox"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-4 w-100"
                  controlId="formAdminCheckbox"
                >
                  <Form.Label column sm={2} className="text-center">
                    Email Id Mask
                  </Form.Label>
                  <Col sm={1} className="text-center">
                    <Form.Check
                      type="checkbox"
                      checked={emaiIdMask}
                      onChange={() => setEmailIdMask(!emaiIdMask)}
                      className="custom-checkbox"
                    />
                  </Col>

                  <Form.Label column sm={2} className="text-center">
                    Mobile No Mask
                  </Form.Label>
                  <Col sm={1} className="text-center">
                    <Form.Check
                      type="checkbox"
                      checked={mobileNumberMask}
                      onChange={() => setMobileNumberMask(!mobileNumberMask)}
                      className="custom-checkbox"
                    />
                  </Col>
                </Form.Group>
                <Table bordered className="text-center w-100">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Select All</th>
                      <th>Add case</th>
                      <th>Incomplete Lead</th>
                      <th>Lead</th>
                      <th>Offered Lead</th>
                      <th>Closed Lead</th>
                      <th>Declined Lead</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(permissions).map((category) => (
                      <tr key={category}>
                        <td>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </td>
                        {Object.keys(permissions[category]).map(
                          (permission) => (
                            <td key={permission}>
                              <Form.Check
                                type="checkbox"
                                checked={permissions[category][permission]}
                                onChange={() =>
                                  togglePermission(category, permission)
                                }
                                className="custom-checkbox"
                              />
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleResetFunc}
                  >
                    Reset
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSavePermission}
                  >
                    Assign
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
