import React, { useEffect, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import JohnDoe from "../../assets/images/admin-dashboard/john.jpg"
import FinlabLogo from "../../assets/images/admin-dashboard/logo.png"
export default function Index(){
	return(
		<>
			<div className="blackWrapper">
				
				<div className="blackWrpContent">
					<div className="topNavigationBlack">
						<div className="dashboradHead">
							<img src={FinlabLogo} />
						</div>

						<div className="profileRight">
							<nav className="nav navbar-nav moveRight">
								<ul className=" navbar-right">
									<li className="nav-item dropdown open" >
									<Link to="#" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
									<img src={JohnDoe} />John Doe
									</Link>
									<div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
									<Link className="dropdown-item" to="#"> Profile</Link>

									<Link className="dropdown-item" to="#">Help</Link>
									</div>
									</li>
								</ul>
							</nav>
						</div>

					</div>
					<div className="sidenavBlack">
						<div className="userMenuLeft">
							<nav className="sidenavItems">
								<div className="navHeade">
									Dashboard
								</div>
								<ul>
									<li>
										<Link aria-current="page" className="active" to="#">
										<i className="fa fa-tachometer nav-icon"></i>My Offer</Link>
									</li>
									<li>
										<Link aria-current="page" to="#">
										<i className="fa fa-user-circle-o nav-icon"></i>My Profile</Link>
									</li>
									<li>
										<Link aria-current="page" to="#">
										<i className="fa fa-file-o nav-icon"></i>My Documents</Link>
									</li>
									<li>
										<Link aria-current="page" to="#">
										<i className="fa fa-hand-paper-o nav-icon"></i>My Applications</Link>
									</li>
									<li>
										<Link aria-current="page"  to="#">
										<i className="fa fa-info-circle nav-icon"></i>Loan Info</Link>
									</li>
									<li>
										<Link aria-current="page" to="#">
										<i className="fa fa-question-circle-o nav-icon"></i>Help Desk</Link>
									</li>
									<li>
										<Link aria-current="page" to="#">
										<i className="fa fa-sign-out nav-icon"></i>Log Out</Link>
									</li>
								</ul>
							</nav>
						</div>
					</div>

					<div className="blackMainContent">						
						<div className="blackCoBLocks">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-12">
										<div className="topRightBtn">
											<Link to="#">Apply New Loan</Link>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="userCard">
											<h5>Approved Offer</h5>
											<h2>5</h2>
										</div>
									</div>
									<div className="col-md-6">
										<div className="userCard">
											<h5>My Credit Score</h5>
											<h2>810</h2>
										</div>
									</div>
									<div className="col-md-6">
										<div className="userCard">
											<h5>Loans Applications</h5>
											<h2>1</h2>
										</div>
									</div>
									<div className="col-md-6">
										<div className="userCard">
											<h5>Loan Disbursed</h5>
											<h2>1</h2>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-md-12">
										<div className="userCard">
											<h5>Loan Info</h5>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</>
	)
}