import React, { useEffect, useRef, useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import Paginator from 'react-hooks-paginator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LIMIT = 10;

const AdminUserList = () => {
  const navigate=useNavigate();
    const [offset, setOffset] = useState(0);
    const [action, setAction] =useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [noOfRecord,setNoOfRecord] = useState(0);
    const [searchTxt,setSearchTxt] = useState("");

    const initialData = [
      {
        "sno": 1,
        "employeeid": "FL-E001",
        "name": "John Doe",
        "emailid": "john.doe@example.com",
        "role": "Super Admin",
        "status": false 
      },
      {
        "sno": 2,
        "employeeid": "FL-E002",
        "name": "Jane Smith",
        "emailid": "jane.smith@example.com",
        "role": ["Business Loan" , "Partner Management", "Master Management"],
        "status": false 
      },
      {
        "sno": 3,
        "employeeid": "FL-E003",
        "name": "Michael Johnson",
        "emailid": "michael.johnson@example.com",
        "role": "Partner Management",
        "status": false
      },
      {
        "sno": 4,
        "employeeid": "FL-E004",
        "name": "Chander Mohan",
        "emailid": "chander@apisod.ai",
        "role": ["Personal Loan" , "Partner List", "Master List"],
        "status": false
      }
    ];
  
    const [data, setData] = useState(initialData);

    useEffect(() => {
      setData(prevData => prevData.map(row => ({ ...row, status: true })));
    }, []);
  
    const handleActionClick = (index) => {
      setData(prevData => {
        const newData = [...prevData];
        newData[index] = { ...newData[index], status: !newData[index].status };
        return newData;
      });
    };

    useEffect(() => {
      getAllPartnersData(offset)
    },[offset])

  
  
    const getAllPartnersData = (page) =>{
       const  jsonData = {
        "limit":LIMIT,
        "offset":page,
      } 
      
     if(searchTxt !=""){
      jsonData['searchText']=searchTxt
     }

    }
 

   useEffect(() =>{
    getAllPartnersData(0);
   },[searchTxt])


  const handelSearch = (e)=>{
    setSearchTxt(e.target.value);
  }

  return (
    <>
     <div className="layout-wrapper">
		<div className="layout-container">
			   <AdminNavBar />
		  <div className="adminMain-wrapper">
			
			<AdminHeader />			
			{/* The main Code */}
			<div className="mainContent">
				<div className="topHeadings">
					<h3>Admin Agent/ User List</h3>
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
                                           Search(Email registered as): 
                                           <input type="text" onChange={handelSearch} value={searchTxt} />
                                        </label>
                                      </div>
                                      <table style={{  width: '100%' }} className="table table-stripped">
                                      <thead>
                                          <tr>
                                          <th className="table-head">S.No.</th>
                                          <th className="table-head">Employee Id</th>
                                          <th className="table-head">Name</th>
                                          <th className="table-head">Email Id</th>
                                          <th className="table-head">Role</th>
                                          <th className="table-head">Action</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                      
                                          {data.map((row, index) => (
                                          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                            <td className="table-body">{row.sno}</td>
                                              <td className="table-body">{row.employeeid}</td>
                                              <td className="table-body">{row.name}</td>
                                              <td className="table-body">{row.emailid}</td>
                                              <td className="table-body" >
                                              {Array.isArray(row.role) ? (
                                                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                                                    {row.role.map((item, idx) => (
                                                      <li key={idx}>{item}</li>
                                                    ))}
                                                  </ul>
                                                ) : (
                                                  row.role
                                                )}
                                              </td>
                                              <td className="table-body"> 
                                                <button
                                                 className={(row.status)?"btn btn-active":"btn btn-delete"}
                                                 value={action}
                                                 onClick={() => handleActionClick(index)} 
                                                 >
                                                  {(row.status)?"✔":"✘"}</button>
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
  )
}

export default AdminUserList