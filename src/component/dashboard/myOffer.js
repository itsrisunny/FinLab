import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JohnDoe from "../../assets/images/admin-dashboard/john.jpg"
import FinlabLogo from "../../assets/images/admin-dashboard/logo.png"
import axios from "axios";
import { API_URL } from './../../config/constant';
import AxisBank from "../../assets/images/finalpage/axis.png"
import HdfcBank from "../../assets/images/finalpage/HDFC Bank.png"
import UserHeader from "./../layouts/user-header"
import UserLeftNav from "./../layouts/user-left-nav"
import CurrencyFormat from 'react-currency-format';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loader from "../loader";
import Swal from 'sweetalert2';
import UserFooter from "../layouts/user-footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Index() {
	const inputFilePanRef = useRef();
	const [accountNumber, setAccountNumber] = useState("")
	const [accountNumberError, setAccountNumberError] = useState("")
	const [confirmAccountNumber, setConfirmAccountNumber] = useState("")
	const [confirmAccountNumberError, setConfirmAccountNumberError] = useState("")
	const [accountHolderName, setAccountHolderName] = useState(localStorage.getItem("user-name"));
	const [accountHolderNameError, setAccountHolderNameError] = useState("")
	const [ifscCode, setIfscCode] = useState("")
	const [ifscCodeError, setIfscCodeError] = useState("")
	const [bankName, setBankName] = useState("")
	const [branchAddress, setBranchAddress] = useState("")
	const [profileData, setProfileData] = useState([]);
	const [offerID, setOfferID] = useState("")
	const [show, setShow] = useState(false);
	const [appliedOffers, setAppliedOffers] = useState([]);

	const [cancelCheque, setCancelCheque] = useState([])
	const [cancelChequeFileName, setCancelChequeFileName] = useState("")
	const [cancelChequeFileType, setCancelChequeeFileType] = useState("")
	const [cancelChequeError, setCancelChequeError] = useState(false)
	const [cancelChequeErrorMsg, setCancelChequeErrorMsg] = useState(false)

	const [personal, setPersonal] = useState([]);
	const [loanData, setLoanData] = useState([]);
	const [userBankData, setUserBankData] = useState({});
	const [bmsg, setBsmg] = useState("");
	const [loader, setLoader] = useState(true);


	const handleClose = () => {
		setShow(false);
		setAccountNumber("")
		setAccountNumberError("")
		setConfirmAccountNumber("")
		setConfirmAccountNumberError("")
		setAccountHolderName("")
		setAccountHolderNameError("")
		setIfscCode("")
		setIfscCodeError("")
		setBankName("")
		setBranchAddress("")
		setDisabled(true);
	}
	const handleShow = (id) => {
		setOfferID(id)
		setShow(true);
		getPreviousBankDetails();
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
						setLoanData(response?.respData?.loan_requirement);

						if (Object.keys(response?.respData).length) {

							if ((response?.respData?.offers).length) {
								setPersonal(response?.respData?.personal_detail);
								console.log(response?.respData?.offers);
								let offersData = response?.respData?.offers.filter((x) => {
									if (x.status == 1) {
										return x;
									}

								});
								//console.log(offersData);
								//setProfileData(response?.respData?.offers);
								setProfileData(offersData);
								//console.log(response?.respData?.offers);
							}
							if ((response?.respData?.bank_details).length) {
								setUserBankData(response?.respData?.bank_details[0]);
								setBsmg("Below bank details will be used to disburse loan");
							}
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



	const getAppliedOfferData = () => {

		axios.post(API_URL + "profile/offer-applied-details", { user_id: localStorage.getItem("user_id") }).then((res) => {
			let response = res.data;
			if (response?.status === 200) {
				let xOffer = response?.data?.map(v => {
					return v.offer_id;
				})

				setAppliedOffers(xOffer);
			}
		}).catch((e) => {
			console.log(e)
		})
	}

	useEffect(() => {
		getProfileData();
		getAppliedOfferData();
	}, [])

	const handleAccountNumber = (e) => {
		setAccountNumberError("")
		setAccountNumber(e.target.value)
	}
	const handleConfirmAccountNumber = (e) => {
		setConfirmAccountNumberError("")
		setConfirmAccountNumber(e.target.value)

	}
	const handleAccountHolderName = (e) => {
		setAccountHolderNameError("")
		setAccountHolderName(e.target.value)

	}
	const handleIfscCode = (e) => {
		setIfscCodeError("")
		setIfscCode(e.target.value)
	}
	const handleGetBankInfoUsingIFSC = (data) => {
		axios.get("https://ifsc.razorpay.com/" + data).then((res) => {
			let response = res.data;
			if (Object.keys(response).length) {
				setBankName(response?.BANK)
				setBranchAddress(response?.BRANCH + ", " + response?.CITY)
			} else {
				setIfscCodeError("Invalid IFSC code.")
				setBankName("")
				setBranchAddress("")
			}

		}).catch((e) => {
			setIfscCodeError("Invalid IFSC code.")
			setBankName("")
			setBranchAddress("")
		})
	}
	const handleValidation = () => {
		let isFormValid = true;
		if (!accountNumber) {
			setAccountNumberError("Please enter account number.");
			isFormValid = false
		}
		if (!confirmAccountNumber) {
			setConfirmAccountNumberError("Please enter confirm account number.");
			isFormValid = false
		}
		// if (accountNumber !== confirmAccountNumber) {
		// 	setConfirmAccountNumberError("Account number must be same.");
		// 	isFormValid = false
		// }
		if (!accountHolderName) {
			setAccountHolderNameError("Please enter account holder name.");
			isFormValid = false
		}
		if (!ifscCode) {
			setIfscCodeError("Please enter IFSC code.");
			isFormValid = false
		}
		if (ifscCodeError) {
			isFormValid = false
		}
		if (!cancelCheque.length || cancelChequeErrorMsg) {
			isFormValid = false;
			setCancelChequeError(true)
			setCancelChequeErrorMsg("Please select cancelled cheque")
		}
		if(!editMode){
			if(!disabled){
				if(accountNumber && confirmAccountNumber && accountHolderName && ifscCode && cancelCheque.length){
					isFormValid = false;
					toast.error(accNumberCheckError);
				}
			}
		}
		return isFormValid;
	}

	const handleConfirnAccouctValidation = () =>{
		if(accountNumber !== confirmAccountNumber){
			setConfirmAccountNumberError("Account number must be same.");
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!editMode) {
			if (handleValidation()) {
				axios.post(API_URL + "token/generate-token", { user_id: localStorage.getItem("user_id") }).then((res) => {
					let response = res.data;
					if (response?.token) {


						let formData = new FormData()
						formData.append('token', response?.token)
						formData.append('user_id', localStorage.getItem("user_id"))
						formData.append('case_id', localStorage.getItem("active_case_id"))
						formData.append('offer_id', offerID)
						formData.append('account_number', accountNumber)
						formData.append('account_holder_name', accountHolderName)
						formData.append('ifsc', ifscCode)
						formData.append('bank_name', bankName)
						formData.append('branch_address', branchAddress)
						formData.append('name', personal?.name)
						formData.append('email_id', personal?.email_id)
						if (cancelCheque.length) {

							formData.append('cancelled_cheque', cancelCheque[0])
						}

						axios.post(API_URL + "user/add-bank-info", formData).then((res) => {
							let response = res.data;
							if (response?.status === 200) {
								getProfileData();
								getAppliedOfferData();
								Swal.fire({
									title: "Congratulations!",
									text: response?.message,
									icon: "success",
									allowOutsideClick: false,
									confirmButtonColor: '#1d8cf8',
								}).then((result) => {
									if (result.isConfirmed) {
										handleClose()
									}
								});
							} else {
								Swal.fire({
									title: "Oops...",
									text: response?.message,
									icon: "warning",
									allowOutsideClick: false,
									confirmButtonColor: '#1d8cf8',
								}).then((result) => {
									if (result.isConfirmed) {
										handleClose()
									}
								});
							}
						}).catch((e) => {
							Swal.fire({
								icon: "error",
								title: "Oops...",
								text: "Something went wrong!",
								allowOutsideClick: false,
								confirmButtonColor: '#1d8cf8',
							});
						})
					}

				}).catch((e) => {
					console.log(e)

				})
			}
		} else {
			axios.post(API_URL + "token/generate-token", { user_id: localStorage.getItem("user_id") }).then((res) => {
				let response = res.data;
				if (response?.token) {



					let jsonData = {
						"token": response?.token,
						"user_id": localStorage.getItem("user_id"),
						"case_id": localStorage.getItem("active_case_id"),
						"offer_id": offerID,
						"account_number": accountNumber,
						"account_holder_name": accountHolderName,
						"ifsc": ifscCode,
						"bank_name": bankName,
						"branch_address": branchAddress,
						"filename": fileName,
						"path": path,
						"name": personal?.name,
						"email_id": personal?.email_id
					}

					axios.post(API_URL + "user/add-bank-info-edit", jsonData).then((res) => {
						let response = res.data;
						if (response?.status === 200) {
							getProfileData();
							getAppliedOfferData();
							Swal.fire({
								title: "Congratulations!",
								text: response?.message,
								icon: "success",
								allowOutsideClick: false,
								confirmButtonColor: '#1d8cf8',
							}).then((result) => {
								if (result.isConfirmed) {
									handleClose()
								}
							});
						} else {
							Swal.fire({
								title: "Oops...",
								text: response?.message,
								icon: "warning",
								allowOutsideClick: false,
								confirmButtonColor: '#1d8cf8',
							}).then((result) => {
								if (result.isConfirmed) {
									handleClose()
								}
							});
						}
					}).catch((e) => {
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Something went wrong!",
							allowOutsideClick: false,
							confirmButtonColor: '#1d8cf8',
						});
					})
				}
			}).catch((e) => {
				console.log(e)

			})

		}
	}


	const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
	const MAX_FILE_SIZE_IMAGE = 2050 // 5MB



	const handleCancelledCheque = (e) => {
		const selectedFile = e.target.files;
		setCancelChequeError(false)
		setCancelChequeErrorMsg("");
		setCancelCheque(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setCancelChequeFileName(file_name)
		if (file_type === "image/png") {
			setCancelChequeeFileType("png")
		} else if (file_type === "image/jpg" || file_type === "image/jpeg") {
			setCancelChequeeFileType("jpg")
		} else if (file_type === "image/gif") {
			setCancelChequeeFileType("gif")
		} else if (file_type === "application/pdf") {
			setCancelChequeeFileType("pdf")
		}
		else {
			setCancelChequeeFileType("")
		}
		if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
			setCancelChequeError(true)
			setCancelChequeErrorMsg("Only JPEG, PNG, GIF and PDF images are allowed.");
		}
		if (selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_IMAGE) {
			setCancelChequeErrorMsg("File size is greater than 2 MB");
			setCancelChequeError(true)
		}
	}
	const [editMode, setEditMode] = useState(0);
	const [fileName, setFileName] = useState("");
	const [path, setPath] = useState("");
	useEffect(() => {
		if (Object.keys(userBankData).length) {
			//console.log("userBankData",userBankData);
			setAccountHolderName(userBankData?.account_holder_name);
			setAccountNumber(userBankData?.account_number);
			setIfscCode(userBankData?.ifsc);
			setConfirmAccountNumber(userBankData?.account_number);
			setBranchAddress(userBankData?.branch_address);
			handleGetBankInfoUsingIFSC(userBankData?.ifsc);
			setFileName(userBankData?.filename);
			setPath(userBankData?.path);
			setEditMode(1);
		}
	}, [userBankData]);


	const getPreviousBankDetails = () => {
		if (Object.keys(userBankData).length) {
			setAccountHolderName(userBankData?.account_holder_name);
			setAccountNumber(userBankData?.account_number);
			setIfscCode(userBankData?.ifsc);
			setConfirmAccountNumber(userBankData?.account_number);
			setBranchAddress(userBankData?.branch_address);
			handleGetBankInfoUsingIFSC(userBankData?.ifsc);
			setFileName(userBankData?.filename);
			setPath(userBankData?.path);
		}
	}

		useEffect(()=>{

		if(!editMode){

			getToken();

		}

	},[1]);

	    

	useEffect(()=>{

		if(accountNumber && accountNumber!="" ){

			if(!editMode){

			getToken();	

			}

		}



	},[accountNumber]);	



	const [patronid,setPatronid] = useState("");
	const [accessToken,setAccessToken] = useState("");
	const [accNumberCheckError,setAccNumberCheckError] = useState("");
	const [disabled,setDisabled] =useState(false);


	const verifyAccountNo = (accountNumber,accountHolderName,ifscCode) =>{

	  let jsonFormData = {

		  patronid:patronid,

		  token:accessToken,

		  accountNumber	:accountNumber,

		  accountHolderName:accountHolderName,

		  ifscCode:ifscCode

	  }

			  axios.post(API_URL+"api-auth/verify-account-number",jsonFormData).then((res) => {

				 // console.log(res.data);

			  if(res?.data?.data!=undefined){

  

				 if(res?.data?.data?.result?.active=='yes'){
				

				  if(res?.data?.data?.result?.nameMatch == 'yes'){

					 setDisabled(true);

				 	 setAccNumberCheckError("");

				  }else{

					setDisabled(false);

					setAccNumberCheckError("Account holder name mismatched");

				  }

				 }else{

					setDisabled(false);

					setAccNumberCheckError(res?.data?.data?.result?.reason);

				//	console.log("test",res?.data?.data);

				 }
				 
			  }else{

				setDisabled(false); 

				setAccNumberCheckError("Invalid account details")

			  }		  

			  }).catch((e) => {

				  console.log(e);

			  })	   

	}



	const getToken = () =>{

			  

		  axios.post(API_URL+"api-auth/token").then((res) => {

			  let response = res.data;

			  setPatronid(response?.data?.userId)

			  setAccessToken(response?.data?.id);			  

		  }).catch((e) => {

			  console.log(e);

		  })	  

	}

	useEffect(()=>{

		if(confirmAccountNumber!="" && accountHolderName!="" && ifscCode!="" && accountNumber!="" ){

			if(!editMode){

				verifyAccountNo(accountNumber,accountHolderName,ifscCode);

			}

		}

	},[accountNumber,accountHolderName,confirmAccountNumber,ifscCode]);





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
												<h4 className="singleTitle">My Offer</h4>
											</div>
											<div className="col-md-12">
												<h5 className="singleTitle loanRequest">Requested Loan Amount : {loanData?.loan_required_amount ? <CurrencyFormat value={loanData?.loan_required_amount} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true} prefix={'₹'} /> : ""}</h5>
											</div>
										</div>
										<div className="row">

											{profileData.length ? profileData?.map((v) => (

												<div className="col-md-6">
													<div className="userCard">
														<div className="card-header border-btm">
															<h4 className="card-title">{v?.bank_name}  {loanData?.purpose_of_loan_name ? "(" + loanData?.purpose_of_loan_name + ")" : ""}</h4>
														</div>
														<div className="user-cardBody">
															<div className="row">
																<div className="col-md-5">
																	<div className="showValues rm-margin">
																		<img className="bankImageLogo applyUserLoanImg" src={API_URL + v?.path} />
																		<h4> <CurrencyFormat value={v.disbursement_amount} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true} prefix={'₹'} /> <span className="approved">(Approved Amount)</span></h4>
																		
																	</div>
																</div>
																<div className="col-md-7">
																	<div className="showValues rm-margin">
																		<p>EMI : <CurrencyFormat value={v.monthly_installment_amount} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true} prefix={'₹'} /></p>
																		<p>Processing Fee : <CurrencyFormat value={parseFloat(v.processing_fee + (18 * v.processing_fee) / 100).toFixed(2)} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true} prefix={'₹'} /> <span className="incGst">(Inc. GST)</span></p>
																		<p>ROI : {v.rate_of_interest}%  <span className="incGst">{v.roi_type ? "(" + v.roi_type + ")" : ""} </span></p>
																		<p>Terms: {v.tenure} months</p>
																		{appliedOffers.includes(v.id) ?
																			<button className="btn btn-secondary loanDisable" disabled >Applied</button>
																			:
																			<Link className="apply-btn" to="#" onClick={() => handleShow(v?.id)}>Avail Now</Link>
																		}
																	</div>
																</div>
															</div>
														</div>

													</div>
												</div>

											)) : ""}





										</div>


									</div>
								</div>
							</div>
						}
					</div>
					<UserFooter />
				</div>

			</div>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				aria-labelledby="contained-modal-title-vcenter"
				centered
				size="lg"
				fullscreen={true}
			>
				<Modal.Header closeButton>
					<Modal.Title style={{ fontSize: "1.25rem" }}>Add Bank Information {(bmsg != "") ? <span style={{ 'color': 'red' }}>(Below bank details will be used to disburse loan)</span> : ""}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row add-bank-info">
						{(!editMode) ?
							<>
								<div className="col-md-6 label-line-height">
									<Form.Label htmlFor="accont_number">Account Number<span className="required">*</span></Form.Label>
									<Form.Control
										type="password"
										id="accont_number"
										aria-describedby="accountHelpBlock"
										placeholder="Account Number"
										value={accountNumber}
										onChange={handleAccountNumber}
										readOnly={editMode ? true : false}
									/>
									<Form.Text id="accountHelpBlock" muted>
										{accountNumberError}
									</Form.Text>
								</div>
								<div className="col-md-6 label-line-height">
									<Form.Label htmlFor="confirm_accont_number">Confirm Account Number<span className="required">*</span></Form.Label>
									<Form.Control
										type="text"
										id="confirm_accont_number"
										aria-describedby="confirmAccountHelpBlock"
										placeholder="Confirm Account Number"
										value={confirmAccountNumber}
										onChange={handleConfirmAccountNumber}
										onBlur={handleConfirnAccouctValidation}
										readOnly={editMode ? true : false}
									/>
									<Form.Text id="confirmAccountHelpBlock" muted>
										{confirmAccountNumberError}
									</Form.Text>
								</div>
								<div className="col-md-6 label-line-height">
									<Form.Label htmlFor="account_holder_name">Account Holder Name<span className="required">*</span></Form.Label>
									<Form.Control
										type="text"
										id="account_holder_name"
										aria-describedby="accountHolderHelpBlock"
										placeholder="Account Holder Name"
										value={accountHolderName}
										onChange={handleAccountHolderName}
										//readOnly={editMode ? true : false}
										readOnly={true}
									/>
									<Form.Text id="accountHolderHelpBlock" muted>
										{accountHolderNameError}
									</Form.Text>
								</div>
								<div className="col-md-6 label-line-height">
									<Form.Label htmlFor="ifsc_code">IFSC Code<span className="required">*</span></Form.Label>
									<Form.Control
										type="text"
										id="ifsc_code"
										aria-describedby="ifscHelpBlock"
										placeholder="IFSC Code"
										value={ifscCode}
										onChange={handleIfscCode}
										onBlur={(e) => { handleGetBankInfoUsingIFSC(e.target.value) }}
										readOnly={editMode ? true : false}
									/>
									<Form.Text id="ifscHelpBlock" muted>
										{ifscCodeError}
									</Form.Text>
								</div>
								<div className="col-md-6 label-line-height">

									<Form.Label htmlFor="upload_cheque">Upload Cancelled Cheque<span className="required">*</span></Form.Label>
									{(!editMode) ? <>
										<Form.Control
											type="file"
											id="upload_cheque"
											accept="image/png, image/jpeg, image/gif, application/pdf"
											aria-describedby="uploadHelpBlock"
											placeholder="Upload cancelled cheque"
											onChange={handleCancelledCheque}
											readOnly={editMode ? true : false}

										/>
										<Form.Text id="uploadHelpBlock" muted>
											{cancelChequeError ? cancelChequeErrorMsg : ""}
										</Form.Text></>
										: <span>{"  :  " + fileName}</span>}
								</div>
								{
									(bankName && branchAddress) ? <div className="col-md-12 label-line-height">
										<div><span className="fw-bold">Bank Name:</span> {bankName}</div>
										<div><span className="fw-bold">Branch Name:</span> {branchAddress}</div>
									</div> : ""
								}
							</> : <>{
								(accountHolderName && accountNumber && bankName && ifscCode && branchAddress) ? <div className="col-md-12">
									<div><p><b>Account Holder Name: </b>{accountHolderName}</p> </div>
									<div><p><b>Account Number: </b>{accountNumber}</p> </div>
									<div><p><b>Bank Name: </b>{bankName}</p></div>
									<div><p><b>IFSC Code: </b>{ifscCode}</p> </div>
									<div><p><b>Branch Name: </b>{branchAddress}</p></div>
								</div> : ""
							}
							</>}

					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" className="submit-btn-modal" onClick={handleSubmit}>Submit</Button>
				</Modal.Footer>
			</Modal>
			<ToastContainer />
		</>
	)
}

