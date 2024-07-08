import React, { useEffect, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import JohnDoe from "../../assets/images/admin-dashboard/john.jpg"
import FinlabLogo from "../../assets/images/admin-dashboard/logo.png"
import PanCard from "../../assets/images/pan-card.png"
import AAdharCard from "../../assets/images/aadhar-front.png"
import UserHeader from "./../layouts/user-header"
import UserLeftNav from "./../layouts/user-left-nav"
import UserFooter from "../layouts/user-footer";
export default function Index(){
	return(
		<>
			<div className="blackWrapper">
				
				<div className="blackWrpContent">
					<UserHeader />
					<div className="CompoundWrapper">
						<UserLeftNav />

						<div className="blackMainContent">						
						<div className="blackCoBLocks">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-12">
										<h4 className="singleTitle">Help Desk</h4>
										<div className="row">
											<div className="col-md-12">
												<div className="userCard">
													<div className="haveQuestions">
														<h3>Have a Question or Need Help?</h3>
														<p>Summup Executives are here for you 24/7.<br />Reach us online, over the email or at a branch</p>
													</div>
													<div className="row">
														<div className="col-md-6">
															<div className="userCard ViewInsideBox">
																<div className="iconsInside">
																	<i className="fa fa-envelope-o" aria-hidden="true"></i>
																	<h3>Email</h3>
																	<p><Link to="Support@finlab.com">Support@finlab.one</Link></p>
																</div>
															</div>
														</div>

														<div className="col-md-6">
															<div className="userCard ViewInsideBox">
																<div className="iconsInside">
																	<i className="fa fa-phone" aria-hidden="true"></i>
																	<h3>Call Us</h3>
																	<p>1231212</p>
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
						</div>
					</div>
					<UserFooter />
				</div>

			</div>
		</>
	)
}