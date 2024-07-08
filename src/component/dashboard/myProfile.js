import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JohnDoe from "../../assets/images/admin-dashboard/john.jpg"
import FinlabLogo from "../../assets/images/admin-dashboard/logo.png"
import UserHeader from "./../layouts/user-header"
import UserLeftNav from "./../layouts/user-left-nav"
import axios from "axios";
import { API_URL } from './../../config/constant';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import Loader from "../loader";
import UserFooter from "../layouts/user-footer";
export default function Index() {
	const [loanData, setLoanData] = useState([]);
	const [profileData, setProfileData] = useState([]);
	const [bankData, setBankData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [salariedInfo, setSalariedInfo] = useState([])
	useEffect(() => {
		getProfileData();

	}, [])
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
						setLoanData(response?.respData?.loan_requirement);
						setProfileData(response?.respData?.personal_detail)
						setSalariedInfo(response?.respData?.salaried_detail)
                       let bk =  (response?.respData?.bank_details)
					   if(bk.length){
						setBankData(bk[0]);
					   }
					}
					setLoader(false);
				}).catch((e) => {
					setLoader(false);
					console.log(e)
				})
			}

		}).catch((e) => {
			console.log(e)

		})
	}

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
											<h4 className="singleTitle">My Profile</h4>
											<div className="userCard">
												<div className="card-header border-btm">
													<h4 className="card-title d-inline">Personal Details</h4>
													
												</div>
												<div className="user-cardBody">
													<div className="row">
														<div className="col-md-6">
															<div className="showValues">
																<p>Name</p>
																<label>{profileData?.name?profileData?.name:"-"}</label>
															</div>
														</div>
														<div className="col-md-6">
															<div className="showValues">
																<p>Email</p>
																<label>{profileData?.email_id?profileData?.email_id:"-"}</label>
															</div>
														</div>
														<div className="col-md-6">
															<div className="showValues">
																<p>Phone Number</p>
																<label>{profileData?.mobile_numnber?<CurrencyFormat value={profileData?.mobile_numnber} displayType={'text'} format="### ### ####" />:"-"}</label>
																
															</div>
														</div>
														<div className="col-md-6">
															{(profileData?.business_type==1 || loanData?.purpose_of_loan == "2") ?
															<div className="showValues">
																<p>Date of Birth</p>
																<label>{profileData?.dob_doi ? moment(profileData?.dob_doi, "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY") : ""}</label>
															</div>
															:
															<div className="showValues">
																<p>Date of Incorporation</p>
																<label>{profileData?.doi ? moment(profileData?.doi , "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY") : ""}</label>
															</div>
															}
														</div>
														{
															loanData?.purpose_of_loan == "2"?<>
																<div className="col-md-6">
																	<div className="showValues">
																		<p>Relationship Status</p>
																		<label>{profileData?.relaship_status?profileData?.relaship_status:"-"}</label>
																		
																	</div>
																</div>
																<div className="col-md-6">
																	<div className="showValues">
																		<p>Gender</p>
																		<label>{profileData?.gender?profileData?.gender:"-"}</label>
																		
																	</div>
																</div>
															</>:""
														}
														
													</div>
												</div>

											</div>


											<div className="userCard">
												<div className="card-header border-btm">
													<h4 className="card-title d-inline">Communication Address</h4>
													{/* <Link className="pull-right" to="#">Edit</Link> */}
												</div>
												<div className="user-cardBody">
													<div className="row">
														<div className="col-md-6">
															<div className="showValues">
																<p>City, District</p>
																<label>{profileData?.permanant_city?profileData?.permanant_city:"-"}</label>
															</div>
														</div>
														<div className="col-md-6">
															<div className="showValues">
																<p>State</p>
																<label>{profileData?.permanant_state?profileData?.permanant_state:"-"}</label>
															</div>
														</div>
														<div className="col-md-6">
															<div className="showValues rm-bt-margin">
																<p>Pincode</p>
																<label>{profileData?.permanant_pin_code?profileData?.permanant_pin_code:"-"}</label>
															</div>
														</div>
														<div className="col-md-6">
															<div className="showValues rm-bt-margin">
																<p>Address</p>
																<label>{(profileData?.permanant_address_1 ? profileData?.permanant_address_1:"-") +" "+(profileData?.permanant_address_2 ? profileData?.permanant_address_2:"-" )}</label>
															</div>
														</div>
													</div>
												</div>

											</div>

									{
										profileData?.current_city ?
										<div className="userCard">
										<div className="card-header border-btm">
											<h4 className="card-title d-inline">Current Address</h4>
											{/*<Link className="pull-right" to="#">Edit</Link>*/}
										</div>
										<div className="user-cardBody">
										<div className="row">
												<div className="col-md-6">
													<div className="showValues">
														<p>City, District</p>
														<label>{(profileData?.current_city)?profileData?.current_city:""}</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="showValues">
														<p>State</p>
														<label>{(profileData?.current_state)?profileData?.current_state:""}</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="showValues rm-bt-margin">
														<p>Pincode</p>
														<label>{(profileData?.current_pin_code !== 0)?profileData?.current_pin_code:""}</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="showValues rm-bt-margin">
														<p>Address</p>
														<label>{(profileData?.current_address_1) +" "+(profileData?.current_address_2)}</label>
													</div>
												</div>
											</div>
										</div>

									</div>:""
								}
								{
									(loanData?.purpose_of_loan == "2")?<>
										<div className="userCard">
											<div className="card-header border-btm">
												<h4 className="card-title d-inline">Company Details</h4>
											</div>
											<div className="user-cardBody">
												<div className="row">
													<div className="col-md-6">
														<div className="showValues">
															<p>Company Name</p>
															<label>{(salariedInfo?.company_name)?salariedInfo?.company_name:"-"}</label>
														</div>
													</div>
													<div className="col-md-6">
														<div className="showValues">
															<p>Company Email</p>
															<label>{(salariedInfo?.official_email_id)?salariedInfo?.official_email_id:"-"}</label>
														</div>
													</div>
													<div className="col-md-6">
														<div className="showValues">
															<p>Total experience</p>
															<label>{(salariedInfo?.total_experience)?salariedInfo?.total_experience:"-"}</label>
														</div>
													</div>
													<div className="col-md-6">
														<div className="showValues">
															<p>Company Tenure</p>
															<label>{(salariedInfo?.compnay_tenure)?salariedInfo?.compnay_tenure:"-"}</label>
														</div>
													</div>
													<div className="col-md-6">
														<div className="showValues">
															<p>Serving Notice Perice</p>
															<label>{(salariedInfo?.are_serving_notice_period)?salariedInfo?.are_serving_notice_period:"-"}</label>
														</div>
													</div>
													<div className="col-md-6">
														<div className="showValues">
															<p>Working As</p>
															<label>{(salariedInfo?.working_as)?salariedInfo?.working_as:"-"}</label>
														</div>
													</div>
													<div className="col-md-6">
														<div className="showValues">
															<p>Fixed Salary</p>
															<label>{(salariedInfo?.net_fixed_salary)?<CurrencyFormat value={salariedInfo?.net_fixed_salary} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true} prefix={'₹'} />:"-"}</label>
														</div>
													</div>
													<div className="col-md-6">
														<div className="showValues">
															<p>Salary Recieved Via</p>
															<label>{(salariedInfo?.salary_recieved_via)?salariedInfo?.salary_recieved_via:"-"}</label>
														</div>
													</div>
												</div>
											</div>
										</div>
									</>:""
								}
								


											<div className="userCard">
												<div className="card-header border-btm">
													<h4 className="card-title d-inline">Bank Details</h4>
													
												</div>
												<div className="user-cardBody">
												<div className="row">
														<div className="col-md-6">
															<div className="showValues">
																<p>Pan Card</p>
																<label>{(profileData?.pan_card)?profileData?.pan_card:"-"}</label>
															</div>
														</div>
														{(profileData?.aadhaar)?
														<div className="col-md-6">
															<div className="showValues">
																<p>Aadhar Card</p>
																<label>{(profileData?.aadhaar)?profileData?.aadhaar:"-"}</label>
															</div>
														</div>
														:""}
														<div className="col-md-6">
															<div className="showValues ">
																<p>Account No.</p>
																<label>{(bankData?.account_number)?bankData?.account_number:"-"}</label>
															</div>
														</div>
														<div className="col-md-6">
															<div className="showValues ">
																<p>Account Holder Name</p>
																<label>{(bankData?.account_holder_name)?bankData?.account_holder_name:"-"}</label>
															</div>
														</div>
														<div className="col-md-6">
															<div className="showValues ">
																<p>IFSC</p>
																<label>{(bankData?.ifsc)?bankData?.ifsc:"-"}</label>
															</div>
														</div>
														<div className="col-md-6">
															<div className="showValues ">
																<p>Branch Address</p>
																<label>{(bankData?.branch_address)?bankData?.branch_address:"-"}</label>
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
						}
					</div>
					<UserFooter />
				</div>

			</div>
		</>
	)
}