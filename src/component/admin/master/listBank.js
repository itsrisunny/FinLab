import React, { useEffect, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import moment from 'moment';


export default function BankList (){

const [bankData,setBankData] = useState([]);

useEffect(()=>{
  getAllBankList();
},[]);
      
const getAllBankList = ()=>{ 
   
    axios.post(API_URL+"admin/get-all-bank-list").then((res) => {
        let response = res?.data;

        if(response?.status === 200){
            setBankData(response?.data);  
        }
             
    }).catch((e) => {
        console.log(e)
       
    })
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
                        {/* <h3>Bank List</h3> */}
                    </div>
                    <div className="contentBlocks">
                        <div className="sectionTable">
                            <div className="continer-fluid">
                                <div className="row">
                                    <div className="col-lg-12 col-md-9 col-xs-12">
                                    <div className="card">
                                            <h5 className="card-header">Bank List</h5>
                                            <div className="table-responsive text-nowrap">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Bank Name</th>
                                                    <th>File Name</th>
                                                    <th>Logo</th>
                                                    {/* <th>Status</th> */}
                                                    <th>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody className="table-border-bottom-0">
                                               { (bankData)?
                                              
                                                bankData.map((bk)=>(
                                                <tr>
                                                    <td><i className="fab fa-react fa-lg text-info me-3"></i> <strong>{bk?.bank_name}</strong></td>
                                                    <td>{bk?.filename}</td>
                                                    <td>
                                                    <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" title="" data-bs-original-title="Lilian Fuller">
                                                        <img src={bk?.path} alt="Avatar" className="rounded-circle" />
                                                        </li>
                                                    
                                                    </ul>
                                                    </td>
                                                    {/* <td><span className="badge bg-label-success me-1">Completed</span></td> */}
                                                    <td>
                                                    <div className="dropdown">
                                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                        </button>
                                                        <div className="dropdown-menu">
                                                        <a className="dropdown-item" href="javascript:void(0);"><i className="bx bx-edit-alt me-2"></i> Edit</a>
                                                        <a className="dropdown-item" href="javascript:void(0);"><i className="bx bx-trash me-2"></i> Delete</a>
                                                        </div>
                                                    </div>
                                                    </td>
                                                </tr>

                                                )):<><div><span>No Data Found</span></div></> }
                                                
                                                
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
               <AdminFooter />	
             </div>			
            </div>			
                </div>			
    </>
      )


}