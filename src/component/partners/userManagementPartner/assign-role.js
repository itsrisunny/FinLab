import React, { useState } from "react";
import AdminHeader from "../layouts/partner-admin-header";
import AdminFooter from "../layouts/partner-admin-footer";
import AdminNavBar from "../layouts/partner-admin-nav-bar";
import { Row, Col, Form, Table } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AssignRole({ menuAccess }) {
  const [emailId, setEmailId] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const [isPartnerList, setIsPartnerList] = useState(false);
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
    setEmailId("");
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
  };
  const [agentId, setAgentId] = useState("");
  const handleSearchRecords = () => {
    // Handle form submit logic here
    if (emailId) {
      axios
        .post(`${API_URL}partner-user/partner-permission-detail`, {
          email: emailId,
        })
        .then((res) => {
          const { data } = res;
          if (data?.status === 200) {
            setAgentId(data?.data?.agent_id);
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
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const handleSavePermission = () => {
    if (agentId) {
      const jsonFormData = {
        partnerId: agentId,
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
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please enter valid partner ID!");
    }
  };
  return (
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
                controlId="formAdminCheckbox"
              >
                <Form.Label column sm={2} className="text-center">
                  Assign as Agent
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
                      {Object.keys(permissions[category]).map((permission) => (
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
                      ))}
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
      <ToastContainer />
    </div>
  );
}
