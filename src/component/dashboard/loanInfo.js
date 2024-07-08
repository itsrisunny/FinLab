import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JohnDoe from "../../assets/images/admin-dashboard/john.jpg"
import FinlabLogo from "../../assets/images/admin-dashboard/logo.png"
import PanCard from "../../assets/images/pan-card.png"
import AAdharCard from "../../assets/images/aadhar-front.png"
import UserHeader from "./../layouts/user-header"
import UserLeftNav from "./../layouts/user-left-nav"
import axios from "axios";
import { API_URL } from "../../config/constant";
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import Loader from "../loader";
import UserFooter from "../layouts/user-footer";
export default function Index() {

	const [data, setData] = useState([]);
	const [loader, setLoader] = useState(true);
	useEffect(() => {
		getLoanInfo()
	}, [])


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

						setData(response);

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
												<h4 className="singleTitle">Loan Info</h4>
												<div className="row">
													<div className="col-md-12">
														<div className="userCard">
															<div className="card-header border-btm">
																<h4 className="card-title d-inline">Loan Status</h4>
															</div>

															<div className="table-responsive">
																<table className="table">
																	<thead>
																		<tr>
																			<th>Bank Name</th>
																			<th>Loan Amount</th>
																			<th>EMI</th>
																			<th>ROI</th>
																			<th>Tenure</th>
																			<th>Processing Fee</th>
																			<th>ROI Type</th>
																			{/* <th>Offer Created at</th> */}
																			<th>Doc.</th>
																		</tr>
																	</thead>
																	<tbody>
																		{
																			data.map((v, i) => {

																				return (
																					<tr>
																						<td>{v.bank_name}</td>
																						<td>{v.disbursement_amount ? <CurrencyFormat value={v.disbursement_amount} displayType={'text'} thousandSeparator={true} thousandSpacing={'2s'} prefix={'₹'} /> : ""}</td>
																						<td>{v.monthly_installment_amount ? <CurrencyFormat value={v.monthly_installment_amount} displayType={'text'} thousandSeparator={true} thousandSpacing={'2s'} prefix={'₹'} /> : ""}</td>
																						<td>{v.rate_of_interest ? v.rate_of_interest + " %" : ""}</td>
																						<td>{v.tenure ? v.tenure + " Months" : ""}</td>
																						<td>{v.processing_fee ? <CurrencyFormat value={v.processing_fee} displayType={'text'} thousandSeparator={true} thousandSpacing={'2s'} prefix={'₹'} /> : ""}</td>
																						<td>{v.roi_type}</td>
																						{/* <td>{v.created_at ? moment(v.created_at, "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY") : ""}</td> */}
																						<td><Link to={API_URL + v.doc} target="_blank" download="#">Download</Link></td>
																					</tr>
																				)
																			})
																		}



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