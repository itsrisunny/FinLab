import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JohnDoe from "../../assets/images/admin-dashboard/john.jpg"
import FinlabLogo from "../../assets/images/admin-dashboard/logo.png"
import PanCard from "../../assets/images/pan-card.png"
import AAdharCard from "../../assets/images/aadhar-front.png"
import UserHeader from "./../layouts/user-header"
import UserLeftNav from "./../layouts/user-left-nav"
import axios from "axios";
import { API_URL } from './../../config/constant';
import moment from "moment";
import Loader from "../loader";
import UserFooter from "../layouts/user-footer";
export default function Index() {

	const [appData, setAppData] = useState([]);
	const [loader, setLoader] = useState(true);
	const getProfileData = () => {
		axios.post(API_URL + "token/generate-token", { user_id: localStorage.getItem("user_id") }).then((res) => {
			let response = res.data;
			if (response?.token) {
				let jsonFormData = {
					caseId: localStorage.getItem("active_case_id"),
					token: response?.token
				}
				axios.post(API_URL + "profile/details", jsonFormData).then((res) => {
					let response = res.data;
					if (response?.status === 200) {
						//console.log("console",response?.respData?.offers);
						let status = (response?.respData?.offers.length)?"Accepted":"Pending"
						if (Object.keys(response?.respData?.loan_requirement).length) {
							let x = [{
								"applied_at": response?.respData?.loan_requirement.created_at,
								"business_type": response?.respData?.loan_requirement.purpose_of_loan_name,
								"app_no": response?.respData?.user_detail.case_number,
								"app_status": status
							}]

							setAppData(x);
						}

						// console.log(response?.respData.files);
						setLoader(false);
					}
				}).catch((e) => {
					setLoader(false);
					console.log(e)
				})
			}
		}).catch((e) => {
			console.log(e)
		})
	}

	useEffect(() => {
		getProfileData();

	}, [0])



	return (
		<>
			<div className="blackWrapper">

				<div className="blackWrpContent">
					<UserHeader />
					<div className="CompoundWrapper">
						<UserLeftNav />
						{loader ? <Loader display={"flex"} /> :
							<div className="blackMainContent">
								<div className="blackCoBLocks">
									<div className="container-fluid">
										<div className="row">
											<div className="col-md-12">
												<h4 className="singleTitle">My Applications</h4>
												<div className="row">
													<div className="col-md-12">
														<div className="userCard">
															<div className="card-header border-btm">
																<h4 className="card-title d-inline">Applications List</h4>
															</div>
															<div className="table-responsive">
																<table className="table">
																	<thead>
																		<tr>
																			<th>S No.</th>
																			<th>Applied Date</th>
																			<th>Loan Type</th>
																			<th>Application No</th>
																			<th>Application Status</th>
																		</tr>
																	</thead>
																	<tbody>
																		{appData.length ? appData.map((x, i) => (

																			<tr>
																				<td>{i + 1}</td>
																				<td>{moment(x.applied_at, "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY")}</td>
																				<td>{x.business_type}</td>
																				<td>{x.app_no}</td>
																				<td>{x.app_status}</td>
																			</tr>

																		)) : "No data found"}



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
						}
					</div>
					<UserFooter />
				</div>

			</div>
		</>
	)
}