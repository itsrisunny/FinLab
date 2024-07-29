import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import { Row, Col, Form, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../loader";

export default function AssignRole({ menuAccess }) {
  const [loader, setLoader] = useState(false);
  const [partnerId, setPartnerId] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
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
    setIsAdmin(false);
    setPartnerName("");
    setPartnerId("");
  };
  const handleSearchPartner = () => {
    setLoader(true);
    axios
      .post(API_URL + "user-agent/partner-detail", { partnerID: partnerId })
      .then((res) => {
        let { data } = res;
        if (data?.status === 200) {
          setPartnerName(data?.data?.partner_name);
          const permissions = data?.data?.permissions;
          if (permissions) {
            setIsAdmin(permissions?.isAdmin);
            setPermissions(permissions?.permissions);
          } else {
            setIsAdmin(false);
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
        } else {
          setPartnerName("");
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  const handleValidation = () => {
    let isFormValid = true;
    if (!partnerId || !partnerName) {
      isFormValid = false;
    }
    return isFormValid;
  };
  const handleFormSubmit = () => {
    setLoader(true);
    if (handleValidation()) {
      const jsonFormData = {
        partnerId: partnerId,
        permissions: JSON.stringify({
          isAdmin: isAdmin,
          permissions,
        }),
      };
      axios
        .post(API_URL + "user-agent/save-permission", jsonFormData)
        .then((res) => {
          const { data } = res;
          if (data?.status === 200) {
            toast.success(data?.message);
            handleResetFunc();
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
      toast.error("Please enter valid partner ID!");
    }

    // Handle form submit logic here
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
                <h3>Partner Role Management</h3>
              </div>
              <Form className="d-flex flex-column align-items-center">
                <Form.Group
                  as={Row}
                  className="mb-4 w-100"
                  controlId="formPartnerId"
                >
                  <Form.Label column sm={2} className="text-center">
                    Partner Id
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="string"
                      value={partnerId}
                      onChange={(e) => setPartnerId(e.target.value)}
                      className="text-center"
                    />
                  </Col>
                  <Col sm={2}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSearchPartner}
                    >
                      Search
                    </button>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-4 w-100"
                  controlId="formPartnerName"
                >
                  <Form.Label column sm={2} className="text-center">
                    Partner Name
                  </Form.Label>
                  <Col sm={4}>
                    <Form.Control
                      type="string"
                      value={partnerName}
                      className="text-center"
                      readOnly
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-4 w-100"
                  controlId="formAdminCheckbox"
                >
                  <Form.Label column sm={2} className="text-center">
                    Admin
                  </Form.Label>
                  {/* <Col sm={1} className="d-flex justify-content-center"> */}
                  <Col sm={1} className="text-center">
                    <Form.Check
                      type="checkbox"
                      checked={isAdmin}
                      onChange={() => setIsAdmin(!isAdmin)}
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
                    onClick={handleFormSubmit}
                  >
                    Assign
                  </button>
                </div>
              </Form>
            </div>
            <AdminFooter />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
