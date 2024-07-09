import React, { useState } from "react";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
// import '/src/assets/css/style.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form, Table } from 'react-bootstrap';

export default function AssignRole() {
  const [partnerId, setPartnerId] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectAll, setSelectAll] = useState({
    businessLoan: false,
    personalLoan: false,
  })
  const [permissions, setPermissions] = useState({
    businessLoan: {
      addCase: false,
      incompleteLead: false,
      lead: false,
      offeredLead: false,
      closedLead: false,
      declinedLead: false
    },
    personalLoan: {
      addCase: false,
      incompleteLead: false,
      lead: false,
      offeredLead: false,
      closedLead: false,
      declinedLead: false
    },
  });

  const togglePermission = (category, permission) => {
    setPermissions(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [permission]: !prev[category][permission]
      }
    }));
  };

  const handleSelectAll = (category, isChecked) => {
    const updatedCategoryPermissions = {};
    Object.keys(permissions[category]).forEach(permission => {
      updatedCategoryPermissions[permission] = isChecked;
    });
    setPermissions(prev => ({
      ...prev,
      [category]: updatedCategoryPermissions,
    }));
    setSelectAll(prev => ({
      ...prev,
      [category]: isChecked,
    }));
  };
  
  const handleResetButton = () => {
    setPermissions(permissions);
    setSelectAll({
      businessLoan: false,
      personalLoan: false,
    });
  };
  
  
    const handleFormSubmit = () => {
    }

  return (
    <div className="layout-wrapper">
      <div className="layout-container">
        <AdminNavBar />
        <div className="adminMain-wrapper">
          <AdminHeader />
          <div className="mainContent text-center">
            <div className="topHeadings mb-4">
              <h3>Partner Role Management</h3>
            </div>
            <Form className="d-flex flex-column align-items-center">
              <Form.Group as={Row} className="mb-4 w-100" controlId="formPartnerId">
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
                <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>Search</button>
                </Col>
                
              </Form.Group>
              <Form.Group as={Row} className="mb-4 w-100" controlId="formPartnerName">
                <Form.Label column sm={2} className="text-center">
                  Partner Name
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    type="string"
                    value={partnerId}
                    onChange={(e) => setPartnerId(e.target.value)}
                    className="text-center"
                    readOnly
                  />
                </Col>
                
              </Form.Group>
              <div style={{paddingBottom : "12px"}}>
              <Col sm={2} className="d-flex justify-content-center ">
                  <Form.Check
                    type="checkbox"
                    label="Admin"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                    className="custom-checkbox"
                  />
                </Col>               
                </div>
              
              <Table bordered className="text-center w-100">
                <thead>
                  <tr>
                    <th></th>
                    <th>Select All</th>
                    <th>Add Case</th>
                    <th>Incomplete Lead</th>
                    <th>Lead</th>
                    <th>Offered Lead</th>
                    <th>Closed Lead</th>
                    <th>Declined Lead</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(permissions).map(category => (
                    <tr key={category}>
                      <td>{category.charAt(0).toUpperCase() + category.slice(1)}
                      </td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={selectAll[category]}
                          onChange={(e) => handleSelectAll(category, e.target.checked)}
                          className="custom-checkbox"
                        />
                      </td>
                      {Object.keys(permissions[category]).map(permission => (
                        <td key={permission}>
                          <Form.Check
                            type="checkbox"
                            checked={permissions[category][permission]}
                            onChange={() => togglePermission(category, permission)}
                            className="custom-checkbox"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="text-center mt-4">
                <button type="Close" className="btn btn-secondary" onClick={handleResetButton}>Reset</button>&nbsp;
                <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>Assign</button>
              </div>
            </Form>
          </div>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
