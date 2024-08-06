import React, { useEffect, useRef, useState } from "react";
import AdminHeader from "../../layouts/admin-header";
import { useParams } from "react-router-dom";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import Loader from "../../loader";
const LIMIT = 10;
export default function AgentList({ menuAccess }) {
  let { parentId } = useParams();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllPartnersData();
  }, []);
  const getAllPartnersData = () => {
    setLoader(true);
    let jsonData = {
      parent_id: parentId,
    };
    axios
      .post(API_URL + `admin/all-partner-agent-list`, jsonData)
      .then((res) => {
        const { data } = res.data;
        setData(data);
        setLoader(false);
      })
      .catch((res) => {
        console.log(res);
        setLoader(false);
      });
  };
  return (
    <>
      {loader && <Loader />}
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar menuAccess={menuAccess} />
          <div className="adminMain-wrapper">
            <AdminHeader />
            <div className="mainContent">
              <div className="topHeadings">
                <h3>Partner's Agent List</h3>
              </div>
              <div className="contentBlocks">
                <div className="sectionTable">
                  <div className="continer-fluid">
                    <div className="row">
                      <div className="col-lg-12 col-md-9 col-xs-12">
                        <div className="card tableLead">
                          <div className="tableLeadCase">
                            <table
                              style={{ width: "100%" }}
                              className="table table-stripped"
                            >
                              <thead>
                                <tr>
                                  <th className="table-head">Name</th>
                                  <th className="table-head">Agent Id</th>
                                  <th className="table-head">Employee Id</th>
                                  <th className="table-head">Email Id</th>
                                  <th className="table-head">Phone Number</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((row, index) => (
                                  <tr key={index}>
                                    <td>{row.name}</td>
                                    <td>{row.agent_id}</td>
                                    <td>{row.employee_id}</td>
                                    <td>{row.email_id}</td>
                                    <td>{row.mobile}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
