import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { API_URL } from './../../config/constant';
import UserHeader from "./../layouts/user-header"
import UserLeftNav from "./../layouts/user-left-nav"
import { ButtonToolbar } from "react-bootstrap";
import Loader from "../loader";
import UserFooter from "../layouts/user-footer";
export default function Index() {
	const [profileData, setProfileData] = useState([]);
	const [approvedOffer, setApprovedOffer] = useState(0);
	const [loanApplication, setLoanApplication] = useState(0);
	const [loanDisbursed, setLoanDisbursed] = useState(0);
	const [loader, setLoader] = useState(true);
	const navigate = useNavigate();

	const navigateTo = () => {
		localStorage.removeItem("active_case_id");
		navigate("/products");
	}

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

						let offersData = response?.respData?.offers.filter((x) => {
							if (x.status == 1) {
								return x;
							}

						});
						
						setApprovedOffer((offersData).length);
						setProfileData(response?.respData);
						if (Object.keys(response?.respData?.loan_requirement).length) {
							let x = [{
								"id": response?.respData?.loan_requirement.id

							}]
							console.log("lenght", x.length);
							setLoanApplication(x.length);
						}
						if (Object.keys(response?.respData).length) {

							if (Object.keys(response?.respData?.personal_detail).length) {
								localStorage.setItem('user-name', response?.respData?.personal_detail?.name);
							}
						}

					}
					setLoader(false)
				}).catch((e) => {
					setLoader(false)
					console.log(e)
				})
			}

		}).catch((e) => {
			console.log(e)

		})

	}

	const getLoanInfo = () => {
		axios.post(API_URL + "token/generate-token", { user_id: localStorage.getItem("user_id") }).then((res) => {
			let response = res.data;
			if (response?.token) {
				let jsonFormData = {
					case_id: localStorage.getItem("active_case_id"),
					token: response?.token
				}
				axios.post(API_URL + "user/get-all-applied-loan-data", jsonFormData).then((res) => {

					if (res.data?.status === 200) {
						let response = res.data?.data?.appliedOfferData;
						setLoanDisbursed(response?.length);

					}
					setLoader(false)
				}).catch((e) => {
					setLoader(false)
					console.log(e)
				})
			}

		}).catch((e) => {

			console.log(e)

		})

	}

	useEffect(() => {
		getProfileData();
		getLoanInfo();
	}, [])


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
												<div className="topRightBtn">
													{
														loanDisbursed?<Link to="/products">Apply New Loan</Link>:""
													}
													{/* <button  onClick={(e)=>{navigateTo()}}>Apply New Loan</button> */}
												</div>
											</div>
										</div>
										<div className="row dashbPage">
											<div className="col-md-12">
												<div className="userCard">
													<Link to="/dashboard/myOffer">Approved Offer</Link>
													<h2>{approvedOffer}</h2>
												</div>
											</div>
											<div className="col-md-6">
												<div className="userCard">
													<Link to="/dashboard/myApplication">Loans Applications</Link>
													<h2>{loanApplication}</h2>
												</div>
											</div>
											<div className="col-md-6">
												<div className="userCard">
													<Link to="/dashboard/loanInfo">Loan Disbursed</Link>
													<h2>{loanDisbursed}</h2>
												</div>
											</div>
										</div>

										<div className="row dashbPage">
											<div className="col-md-12">
												<div className="userCard">
													{/* <h5>Loan Info</h5> */}
													<Link to="/dashboard/loanInfo">Loan Info</Link>
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