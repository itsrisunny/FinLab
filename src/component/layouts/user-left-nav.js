import React, { useEffect, useRef, useState} from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, NavLink } from "react-router-dom";
export default function UserLeftNav(){
	const navigate=useNavigate();
   
      const [hide, setHide] = useState(false);
      const logout = ()=>{
		
        // localStorage.clear();
		localStorage.removeItem("isAuthenticate");
		localStorage.removeItem("user_id");
		localStorage.removeItem("mobile_no");
		localStorage.removeItem("active_case_id");
		localStorage.removeItem("panName");
		localStorage.removeItem("user-name");
        return navigate('/');
      }

	const handleToggle = () =>{
		setHide(!hide)
	}
	
	return(
		<>
			<div className={hide?"sidenavBlack full":"sidenavBlack hide "} id="sidebar">
				<div className="userMenuLeft">
					<nav className="sidenavItems closebtn ">
						<span className=" toogle" onClick={handleToggle}>
								<i className="fa fa-bars"></i></span>
						{/* <Link to="/dashboard">
							<div className="navHeade ">
								<span className="display-dashicon"><i className="fa fa-hand-paper-o nav-icon"></i></span>
								<span className="display-dashname text">Dashboard</span>
								<div className="dashboard-border text"></div>
								
							</div>
						</Link>						 */}
						<ul className="activeMenu">
							<li>
								<NavLink aria-current="page" to="/dashboard">
								<i className="fa fa-hand-paper-o nav-icon"></i>
								<span className="text">Dashboard</span>
								</NavLink>
							</li>
							<li>
								<NavLink aria-current="page" to="/dashboard/myOffer">
								<i className="fa fa-tachometer nav-icon"></i>
								<span className="text">My Offer</span>
								</NavLink>
							</li>							
							<li>
								<NavLink aria-current="page" to="/dashboard/myProfile">
								<i className="fa fa-user-circle-o nav-icon"></i>
								<span className="text">My Profile</span></NavLink>
							</li>
							<li>
								<NavLink aria-current="page" to="/dashboard/myDocument">
								<i className="fa fa-file-o nav-icon"></i>
								<span className="text">My Documents</span></NavLink>
							</li>
							<li>
								<NavLink aria-current="page" to="/dashboard/myApplication">
								<i className="fa fa-hand-paper-o nav-icon"></i>
								<span className="text">My Applications</span></NavLink>
							</li>
							<li>
								<NavLink aria-current="page"  to="/dashboard/loanInfo">
								<i className="fa fa-info-circle nav-icon"></i>
								<span className="text">Loan Info</span></NavLink>
							</li>
							<li>
								<NavLink aria-current="page" to="/dashboard/helpDesk">
								<i className="fa fa-question-circle-o nav-icon"></i>
								<span className="text">Help Desk</span></NavLink>
							</li>
							<li>
								<NavLink aria-current="page" to="#" onClick={logout}>
								<i className="fa fa-sign-out nav-icon"></i>
								<span className="text">Log Out</span></NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	)
}