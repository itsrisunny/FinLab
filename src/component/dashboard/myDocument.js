import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JohnDoe from "../../assets/images/admin-dashboard/john.jpg"
import FinlabLogo from "../../assets/images/admin-dashboard/logo.png"
import PDF from "../../assets/images/pdf-file.png"
import AAdharCard from "../../assets/images/aadhar-front.png"
import UserHeader from "./../layouts/user-header"
import UserLeftNav from "./../layouts/user-left-nav";
import axios from "axios";
import { API_URL } from './../../config/constant';
import Loader from "../loader";
import UserFooter from "../layouts/user-footer";
export default function Index() {
	const [docData, setDocData] = useState([]);
	const [docDataDirector, setDocDataDirector] = useState([]);
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
						if (response?.respData?.files.length) {
							setDocData(response?.respData?.files);
						}
						if(response?.respData?.director_data.length){
							setDocDataDirector(response?.respData?.director_data);
						}

						// console.log(response?.respData.files);
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

	useEffect(() => {
		getProfileData();

	}, [0])

	const getName = (name) => {
		let x = name.split("_").join(" ").toUpperCase();
		return x;
	}

	const getSRC = (url, file) => {
		let relUrl = url;
		let ext = file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2);
		console.log("ext", ext);
		if (ext == 'pdf') {
			relUrl = PDF;
		}
		return relUrl;
	}

	console.log("setDocData", docData);
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
												<h4 className="singleTitle">My Documents</h4>


												<div className="row">
													{docData?.length ? docData?.map((x, i) => (
														<>
															<div className="col-md-6 col-sm-6">
																<div className="userCard">
																	<div className="card-header border-btm">
																		<h4 className="card-title d-inline">{getName(x.document_type)}</h4>

																	</div>
																	<div className="user-cardBody">
																		<div className="row">
																			<div className="col-md-6">
																				<div className="showValues rm-margin">
																					<img className="makeThumbg" src={getSRC(API_URL + x.path, x.filename)} alt={x.document_type} />
																				</div>
																			</div>
																			<div className="col-md-6">
																				<div className="showValues rm-margin">
																					<p>Preview</p>
																					<label className="clickToview"><Link to={API_URL + x.path} target="_blanck">Click here to view</Link></label>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</>
													)) : "No data"}
												
												</div>

											  <hr/>
												{/** Director */}	

												<div className="row">
													{docDataDirector?.length ? docDataDirector?.map((x, i) => (
														<>
														<div className="row">
															<p><h5>{i+1 +") Director Documents "}</h5></p>
															<p> (  <h5 className="card-title d-inline">{x.name}</h5>  )</p>   
														</div>


														<div className="row">
															<div className="col-md-6 col-sm-6">
																<div className="userCard">
																	<div className="card-header border-btm">
																		<h5 className="card-title d-inline">Pan Card</h5>

																	</div>
																	<div className="user-cardBody">
																		<div className="row">
																			<div className="col-md-6">
																				<div className="showValues rm-margin">
																					<img className="makeThumbg" src={API_URL + x.pan_doc_path} alt="Pan Card" />
																				</div>
																			</div>
																			<div className="col-md-6">
																				<div className="showValues rm-margin">
																					<p>Preview</p>
																					<label className="clickToview"><Link to={API_URL + x.pan_doc_path} target="_blanck">Click here to view</Link></label>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="col-md-6 col-sm-6">
																<div className="userCard">
																	<div className="card-header border-btm">
																		<h5 className="card-title d-inline">Aadhar Card(Front)</h5>

																	</div>
																	<div className="user-cardBody">
																		<div className="row">
																			<div className="col-md-6">
																				<div className="showValues rm-margin">
																					<img className="makeThumbg" src={API_URL + x.aadhar_front_doc_path} alt="Aadhar card front" />
																				</div>
																			</div>
																			<div className="col-md-6">
																				<div className="showValues rm-margin">
																					<p>Preview</p>
																					<label className="clickToview"><Link to={API_URL + x.aadhar_front_doc_path} target="_blanck">Click here to view</Link></label>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="col-md-6 col-sm-6">
																<div className="userCard">
																	<div className="card-header border-btm">
																		<h5 className="card-title d-inline">Aadhar Card(Back)</h5>

																	</div>
																	<div className="user-cardBody">
																		<div className="row">
																			<div className="col-md-6">
																				<div className="showValues rm-margin">
																					<img className="makeThumbg" src={API_URL + x.aadhar_back_doc_path} alt="Aadhar card back" />
																				</div>
																			</div>
																			<div className="col-md-6">
																				<div className="showValues rm-margin">
																					<p>Preview</p>
																					<label className="clickToview"><Link to={API_URL + x.aadhar_back_doc_path} target="_blanck">Click here to view</Link></label>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														</>
													)) : ""}
												
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