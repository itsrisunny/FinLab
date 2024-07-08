import React, {useEffect, useState} from "react";
import CurrencyInput from 'react-currency-input-field';
import InputMask from 'react-input-mask';
import axios from "axios";
import { API_URL } from './../../config/constant';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ActiveDirectorComponent from './activeDirectorComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import numberToText from "number-to-text";
require('number-to-text/converters/en-in');
export default function SelfEmployeeComponent({handleNextToUplaod, preFillData ,caseId, businessTypeSelect, loading}){
	//console.log(businessTypeSelect)
	const [iFile, setIFile] = useState((businessTypeSelect == "1" || businessTypeSelect == "6")?"none":"both")
	const [gstin, setGstin] = useState("")
	const [gstinError, setGstinError] = useState(false)
	
	const [businessVintage, setBusinessVintage] = useState("")
	const [businessVintageError, setBusinessVintageError] = useState(false)
	const [anualTurnOver, setAnualTurnOver] = useState("")
	const [anualTurnOverError, setAnualTurnOverError] = useState(false)
	const [anualProfit, setAnualProfit] = useState("")
	const [anualProfitError, setAnualProfitError] = useState(false)
	const [industry, setIndustry] = useState("")
	const [industryError, setIndustryError] = useState(false)
	const [subIndustry, setSubIndustry] = useState("")
	const [subIndustryError, setSubIndustryError] = useState(false)
	const [businessReg, setBusinessReg] = useState("")
	const [businessRegError, setBusinessRegError] = useState(false)
	const [itrAvailable, setItrAvailable] = useState("")
	const [itrAvailableError, setItrAvailableError] = useState(false)
	const [isDisableBtn, setIsDisableBtn] = useState(false)
	const [noActiveDir, setNoActiveDir] = useState("")
	const [noActiveDirError, setNoActiveDirError] = useState(false)
	const [noActiveDirInvalidError, setNoActiveDirInvalidError] = useState(false)
	const [submitDisable,setSubmitDisable] = useState(true);
	const [dirData, setDirData] = useState(false);
	const [industryData,setIndustryData] = useState([]);
	const [subIndustryData,setSubIndustryData] = useState([]);
	const [display,setDisplay] = useState("none");
	const [anualProfitCompError,setAnualProfitCompError] = useState("");
	const handleIFile = (e) => {
		setBusinessRegError(false)
		setItrAvailableError(false)
		setGstinError(false)
		setIFile(e.target.value)
	}
	useEffect(() => {
		if(businessTypeSelect != "1" || businessTypeSelect != "6"){
			setIFile("both")
		}
	},[businessTypeSelect])
	useEffect(() => {
		getToken();
	},[])
	const handleGstin = (e) => {
		setGstinError(false)
		setGstNumberCheckError(false);
		setGstNumbervaild(false)
		setGstin((e.target.value).toUpperCase())
		
	}
	const valideGSTIN = (e) => {
		if(e.target.value.length == 15){
        verifyGstNo((e.target.value).toUpperCase());
		}
	}
	const handleBusinessVintage = (e) => {
		setBusinessVintageError(false)
		setBusinessVintage(e.target.value)
	}
	const handleAnualTurnOver = (e) => {
		setAnualTurnOverError(false)
		setAnualTurnOver(e ? (e > 0) ? e : 0 :0)
	}
	const handleAnualProfit = (e) => {
		setAnualProfitError(false)
		setAnualProfit(e ? (e > 0) ? e : 0 :0)
		//console.log(e)
	}
	const handleIndustry = (e) => {
		setIndustryError(false)
		setIndustry(e.target.value);
		setSubIndustry("");
		getSubIndustryData(e.target.value);
	}
	const handleSubIndustry = (e) => {
		setSubIndustryError(false)
		setSubIndustry(e.target.value)
	}
	const handleBusinessReg = (e) => {
		setBusinessRegError(false)
		setBusinessReg(e.target.value)
	}
	const handleItrAvailable = (e) => {
		setItrAvailableError(false)
		setItrAvailable(e.target.value)
	}
	const handleValidation = () => {

		let isFormValid = true;
		if(businessTypeSelect == "2" || businessTypeSelect == "3" || businessTypeSelect == "4"){
			if(noActiveDir == ""){
				isFormValid = false;
				setNoActiveDirError(true)
			}
			if(noActiveDir <= 0){
				isFormValid = false;
				setNoActiveDirInvalidError(true)
			}
		}
		
		if(!businessVintage){
			isFormValid = false;
			setBusinessVintageError(true)
		}
		if(!anualTurnOver){
			isFormValid = false;
			setAnualTurnOverError(true)
		}
		if(!anualProfit){
			isFormValid = false;
			setAnualProfitError(true)
		}
		if(!industry){
			isFormValid = false;
			setIndustryError(true)
		}
		if(!subIndustry){
			isFormValid = false;
			setSubIndustryError(true)
		}
		if((iFile === "itr") && !businessReg){
			isFormValid = false;
			setBusinessRegError(true)
		}
		if((iFile === "itr" || iFile === "both") && !itrAvailable){
			isFormValid = false;
			setItrAvailableError(true)
		}
		if((iFile === "gstin" || iFile === "both") && !gstin){
			isFormValid = false;
			setGstinError(true)
		}
		if((iFile === "gstin" || iFile === "both") && gstin.length < 15){
				isFormValid = false;
				setGstinError(true)
		}
		return isFormValid;
	}


	const handleSelfEmployeeForm = () => {
		if(handleValidation()){
			setDisplay("flex");
			setIsDisableBtn(true)
			axios.post(API_URL+"token/generate-token",{user_id: localStorage.getItem("user_id")}).then((res) => {
				let response = res.data;
                if(response?.token){
					let jsonFormData = {
						case_id: caseId,
						i_file: iFile,
						gstin: (iFile=='gstin' || iFile == 'both')?gstin:"",
						is_itr_available: (iFile=='itr' || iFile == 'both')?itrAvailable:"",
						business_vintage: businessVintage,
						annual_turnover: anualTurnOver,
						gross_annual_profit: anualProfit,
						industry: industry,
						sub_industry: subIndustry,
						token: response?.token,
						is_business_registered:(iFile=='itr')?businessReg:"",
						number_of_active_director: noActiveDir
					}
					if(iFile=='none' || iFile=='itr'){
						axios.post(API_URL+"user/employement-detail",jsonFormData).then((res) => {
												let response = res.data;
												if(response?.status === 200){
													if(noActiveDir && parseInt(noActiveDir) !=0 && !dirData){
														setShow(true)
													}else{
														handleNextToUplaod("employed", iFile)
													}
													
												}
												setDisplay("none");
												setIsDisableBtn(false)
											}).catch((e) => {
												setDisplay("none");
												setIsDisableBtn(false)
											})  
					}else{
						let jsonFormD = {
							patronid:patronid,
							token:accessToken,
							gst	:gstin
						}
				  
								axios.post(API_URL+"api-auth/verify-gst-number",jsonFormD).then((res) => {
									//console.log(res.data);
								if(res?.data?.data!=undefined){
									let response = res.data;
								  //  console.log("response",response?.data?.result?.gstnDetailed?.legalNameOfBusiness);
								  //console.log(localStorage.getItem('panName'));
								   if(localStorage.getItem('panName').replace(/ /g,'') == (response?.data?.result?.gstnDetailed?.legalNameOfBusiness).replace(/ /g,'')){
				                      
									axios.post(API_URL+"user/employement-detail",jsonFormData).then((res) => {
										let response = res.data;
										if(response?.status === 200){
											if(noActiveDir && parseInt(noActiveDir) !=0 && !dirData){
												setShow(true)
											}else{
												handleNextToUplaod("employed", iFile)
											}
											
										}
										setDisplay("none");
										setIsDisableBtn(false)
									}).catch((e) => {
										setDisplay("none");
										setIsDisableBtn(false)
									})
                                       


									  setGstNumberCheckError(false);
									  setGstNumbervaild(true);
				  
								   }else{
									setDisplay("none");
										setIsDisableBtn(false)
									  setGstin("");
									  setGstNumberCheckError(true);
									  setGstNumbervaild(false);
								   }				
								}else{
									setDisplay("none");
										setIsDisableBtn(false)
								  setGstin("");
								  setGstNumberCheckError(true);
								  setGstNumbervaild(false);
								}	  
								}).catch((e) => {
									console.log(e);
								})
					}
					

					//






				}
			}).catch((e) => {
				setDisplay("none");
            	console.log(e)
            })
		}
	}
   
	useEffect(()=>{
		getIndustryData();
	},[1]);



	const getIndustryData = () => {
		     
					axios.post(API_URL+"admin/get-industry-data").then((res) => {
						let response = res.data;
						if(response?.status === 200){
							
							setIndustryData(res.data.data.industry)	
					}
					}).catch((e) => {
			           console.log(e)
			        })	
	}

	const getSubIndustryData = (industry) => {
		const jsonData = {
			"id":industry
		}
		axios.post(API_URL+"admin/get-sub-industry-data",jsonData).then((res) => {
			let response = res.data;
			if(response?.status === 200){
				
				setSubIndustryData(res.data.data.subIndustry)		
			}
		}).catch((e) => {
		   console.log(e)
		})
	}
	
    
	useEffect(() => {
		
	  if(Object.keys(preFillData).length){
		let selfEmp = preFillData?.self_employee_detail;
		 setIFile(selfEmp?.i_file?selfEmp?.i_file:"none");
		 setBusinessVintage(selfEmp?.business_vintage?selfEmp?.business_vintage:"");
		 setItrAvailable(selfEmp?.is_itr_available?selfEmp?.is_itr_available:"");
		 setGstin(selfEmp?.gstin?selfEmp?.gstin:"");
		 setAnualTurnOver(selfEmp?.annual_turnover?selfEmp?.annual_turnover:"");
		 setAnualProfit(selfEmp?.gross_Annual_profit?selfEmp?.gross_Annual_profit:"");
		 setIndustry(selfEmp?.industry?selfEmp?.industry:"");
		 if(selfEmp?.industry!=""){
			getSubIndustryData(selfEmp?.industry);
		 }
		 
		 setSubIndustry(selfEmp?.sub_industry?selfEmp?.sub_industry:"");	
		 setBusinessReg(selfEmp?.is_business_registered?selfEmp?.is_business_registered:"");
		 setNoActiveDir(selfEmp?.number_of_active_director?selfEmp?.number_of_active_director:"");  
		 if(selfEmp?.number_of_active_director !="" && selfEmp?.number_of_active_director > 0){
			setDirData(true);
		 }
	  }					
	},[preFillData])

	
	const handleNoActiveDir = (e) => {
		setNoActiveDirError(false)
		setNoActiveDirInvalidError(false)
		setNoActiveDir(e.target.value)
	}

	const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   
  const [dataForm,setDataForm] = useState("");

  const processData = (nameObj,panNoObj,aadharNoObj,panDocObj,aadharFrontObj,aadharBackObj) =>{
                // console.log(nameObj[1],panNoObj,aadharNoObj,panDocObj,aadharFrontObj,aadharBackObj)
                        
				let xx =  Object.keys( nameObj).length
			        let panDoc = [];
					let afc =[];
					let abc =[];
			 		for (let i=0;i<xx;i++) {
						panDoc.push(panDocObj[i])
			 		}
					 for (let i=0;i<xx;i++) {
						afc.push(aadharFrontObj[i])
			 		}
					 for (let i=0;i<xx;i++) {
						abc.push(aadharBackObj[i])
			 		}
					// console.log("xs",afc);
				    let formData = new FormData()
					formData.append('case_id', caseId)
					formData.append('name', JSON.stringify(nameObj))
					formData.append('pan_card', JSON.stringify(panNoObj))
					formData.append('aadhar_card', JSON.stringify(aadharNoObj))
					panDoc.forEach((v, i) => {
		    			formData.append('pan_doc', panDoc[i])
		    		})
					afc.forEach((v, i) => {
		    			formData.append('aadhar_front_doc', afc[i])
		    		})
					abc.forEach((v, i) => {
		    			formData.append('aadhar_back_doc', abc[i])
		    		})

					setDataForm(formData);
  }

  const checkSubmitDisableBtn = (data)=>{
	setSubmitDisable(data);
	if(data){
		setDataForm("");
	}
  }

  const submitData = () =>{
	setSubmitDisable(true);
	axios.post(API_URL+"token/generate-token",{user_id: localStorage.getItem("user_id")}).then((res) => {
		let response = res.data;
                if(response?.token){
					
					axios.post(API_URL+"director/save",dataForm).then((res) => {
						let response = res.data;
						
						if(response?.status === 200){
							//console.log(response?.data)  
							toast.success(response?.message);
							setShow(false);
							setDirData(true);
						}
						//console.log(response)
						
					}).catch((e) => {
			            console.log(e)
			           
			        })
				}
		}).catch((e) => {
			console.log(e)
		})
  }

  useEffect(()=>{
	loading(display)
},[display]);

const checkGrossAnnualProfit = (e) =>{
	let anualProfitData = e.target.value.replace('₹','').replaceAll(',','');
    if (parseInt(anualTurnOver) < parseInt(anualProfitData)) {
		setAnualProfit("");
		setAnualProfitCompError("Gross annual profit must be less than turnover yearly.")
	}else{
		setAnualProfitCompError("");
	}
	
}

	const [patronid,setPatronid] = useState("");
	const [accessToken,setAccessToken] = useState("");
	const [gstNumberCheckError,setGstNumberCheckError] = useState(false);
	const [gstNumbervaild,setGstNumbervaild] = useState(false);

	const verifyGstNo = (gst) =>{
	  let jsonFormData = {
		  patronid:patronid,
		  token:accessToken,
		  gst	:gst
	  }

			  axios.post(API_URL+"api-auth/verify-gst-number",jsonFormData).then((res) => {
				  //console.log(res.data);
			  if(res?.data?.data!=undefined){
				  let response = res.data;
				//console.log(localStorage.getItem('panName'));
				 if(localStorage.getItem('panName').replace(/ /g,'') == (response?.data?.result?.gstnDetailed?.legalNameOfBusiness).replace(/ /g,'')){

					setGstNumberCheckError(false);
					setGstNumbervaild(true);

				 }else{
					setGstin("");
					setGstNumberCheckError(true);
					setGstNumbervaild(false);
				 }				
			  }else{
				setGstin("");
				setGstNumberCheckError(true);
				setGstNumbervaild(false);
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

		getToken();

	},[1]);




	return(
		<>
			{
				businessTypeSelect == "2" || businessTypeSelect == "3" || businessTypeSelect == "4"?<>
					<div className="form-group loan-in">
						<label>No. of active directors or partners</label>
						<div className="">
							<InputMask mask="9" maskChar="" className={noActiveDirError?"salary-input error":"salary-input"} placeholder="No. of active directors or partners" value={noActiveDir} onChange={handleNoActiveDir} readOnly={dirData} />
							<div className="alertbox">{noActiveDirError?<small >Please fill here</small>:(noActiveDirInvalidError ? <small >Active director must be greater than 0. </small>:"")}</div>
						</div>
					</div>
				</>:""
			}
			
			<div className="form-group loan-in">
				<label>I File</label>
				<div className="">
					<div className="form-check form-check-inline radio-btn">
						<input className="form-check-input" type="radio" name="iFile" value="gstin" id="gstin" checked={iFile === "gstin"?true:false} onChange={handleIFile}/>
						<label className="form-check-label" for="gstin">GSTIN</label>
					</div>
					<div className="form-check form-check-inline radio-btn">
						<input className="form-check-input" type="radio" name="iFile" value="itr" id="itr" checked={iFile === "itr"?true:false} onChange={handleIFile} />
						<label className="form-check-label" for="itr">ITR</label>
					</div>
					<div className="form-check form-check-inline radio-btn">
						<input className="form-check-input" type="radio" name="iFile" value="both" id="both" checked={iFile === "both"?true:false} onChange={handleIFile} />
						<label className="form-check-label" for="both">Both</label>
					</div>
					{
						businessTypeSelect == "1" || businessTypeSelect == "6"?<div className="form-check form-check-inline radio-btn">
						<input className="form-check-input" type="radio" name="iFile" value="none" id="none" checked={iFile === "none"?true:false} onChange={handleIFile} />
						<label className="form-check-label" for="none">None</label>
					</div>:""
					}
					
				</div>
			</div>
			<div className="form-group loan-in" style={{display:(iFile === "gstin" || iFile === "both")?"block":"none"}}>
				<label>Provide GSTIN Number</label>
				<div className="">
					{/*<input type="text" className={gstinError?"salary-input error":"salary-input"} placeholder="Enter GSTIN Number" value={gstin} onChange={handleGstin}/>*/}
				<InputMask mask="99aaaaa9999a9a*" maskChar="" className={gstinError?"salary-input error":"salary-input"} placeholder="Enter GSTIN Number (22AAAAA0000A1ZZ)" value={gstin} onChange={handleGstin} onBlur={valideGSTIN} />
				{gstNumbervaild ? <span class="greenTick1"><i class="fa fa-check"></i></span> : ""}

				<div className="alertbox">{gstinError?<small >Please fill here</small>:(gstNumberCheckError ? <small >Invalid GST number </small>:"")}</div>
				</div>
			</div>
			<div className="form-group loan-in" style={{display:(iFile === "itr" || iFile === "both")?"block":"none"}}>
				<label>ITR Availability</label>
				<div className="row year-month">
					<div className="col-md-12">
						<select value={itrAvailable} className={itrAvailableError?"form-control error":"form-control"} onChange={handleItrAvailable}>
	      					<option value="">Select ITR availability</option>
	      					<option value="1">Last 3 Yr+</option>
	      					<option value="2">Last 2 Yr</option>
	      					<option value="3">Last 1 Yr</option>
	   					</select>
						<div className="alertbox">{itrAvailableError && <small >Please select one</small>}</div>
					</div>
				</div>
			</div>
			<div className="form-group loan-in" style={{display:(iFile === "itr")?"block":"none"}}>
				<label>Is your business registered ?</label>
				<div className="row year-month">
					<div className="col-md-12">
						<select value={businessReg} className={businessRegError?"form-control error":"form-control"} onChange={handleBusinessReg}>
	      					<option value="">Select is your business registered ?</option>
	      					<option value="yes">Yes</option>
	      					<option value="no">No</option>
	   					</select>
						   <div className="alertbox">{businessRegError && <small >Please select one</small>}</div>
					</div>
				</div>
			</div>
			
			
			<div className="form-group loan-in">
				<label>Business Vintage</label>
				<div className="row year-month">
					<div className="col-md-12">
						<select value={businessVintage} className={businessVintageError?"form-control error":"form-control"} onChange={handleBusinessVintage}>
	      					<option value="">Select business vintage</option>
	      					<option value="1">{"> 2 Yr"}</option>
	      					<option value="2">2-3 Yr</option>
	      					<option value="3">3+ Yrs.</option>
	   					</select>
						   <div className="alertbox">{businessVintageError && <small >Please select one</small>}</div>
					</div>
				</div>
			</div>
			<div className="form-group loan-in">
				<label>Turnover Yearly (Annual Sales)</label>
				<div className="">
					<CurrencyInput
						type="tel"
						  className={anualTurnOverError?"salary-input error":"salary-input"}
						  value={anualTurnOver}
						  placeholder="Enter turnover yearly (annual sales)"
						  defaultValue={""}
						  decimalsLimit={0}
						  intlConfig={{ locale: 'en-IN', currency: 'INR' }}
						  prefix="₹"
						  onValueChange={handleAnualTurnOver}
					/>
					<span className="textSize"> {anualTurnOver?numberToText.convertToText(anualTurnOver,{language:"en-in"}):""}</span>
				</div>
				<div className="alertbox">{anualTurnOverError && <small >Please fill here</small>}</div>
			</div>
			<div className="form-group loan-in">
				<label>Gross Annual Profit {iFile === "none"?"":"( As per latest ITR Filed)"}</label>
				<div className="">
					<CurrencyInput
						type="tel"
						  className={anualProfitError?"salary-input error":"salary-input"}
						  value={anualProfit}
						  placeholder={iFile === "none"?"Enter gross annual profit":"Enter gross annual profit ( As per latest ITR Filed)"}
						  defaultValue={""}
						  decimalsLimit={0}
						  intlConfig={{ locale: 'en-IN', currency: 'INR' }}
						  prefix="₹"
						  onValueChange={handleAnualProfit}
						  onBlur={checkGrossAnnualProfit}
					/>
					<span className="textSize"> {anualProfit?numberToText.convertToText(anualProfit,{language:"en-in"}):""}</span>
				</div>
				<div className="alertbox">{(anualProfitCompError)?anualProfitCompError : anualProfitError && <small >Please fill here</small>}</div>
			</div>
			{/* <div className="form-group loan-in">
				<label>Industry</label>
				<div className="">
					<input type="text" className={industryError?"salary-input error":"salary-input"} placeholder="Select industry" value={industry} onChange={handleIndustry}/>
				</div>
			</div> */}
			<div className="form-group loan-in">
					<label>Industry</label>
						<select className={industryError?"salary-input error":"salary-input"} onChange={handleIndustry} value={industry} >
							<option value="">Select Industry</option>
							{
								industryData?.map((v, i) => {
									return(<option value={v?.id} >{v?.name}</option>)
								})
							}
						</select>
						<div className="alertbox">{industryError && <small >Please select here</small>}</div>
			</div>
			{/* <div className="form-group loan-in">
				<label>Sub Industry</label>
				<div className="">
					<input type="text" className={subIndustryError?"salary-input error":"salary-input"} placeholder="Select sub industry" value={subIndustry} onChange={handleSubIndustry}/>
				</div>
			</div> */}
			<div className="form-group loan-in">
					<label>Sub-Industry</label>
						{industry?(industry!=15)?
						<select className={subIndustryError?"salary-input error":"salary-input"} onChange={handleSubIndustry} value={subIndustry} >
							<option value="">Select Sub-Industry</option>
							{
								subIndustryData?.map((v, i) => {
									return(<option value={v?.id} >{v?.name}</option>)
								})
							}
						</select>
						:
						<input type="text" className={subIndustryError?"salary-input error":"salary-input"} placeholder="Enter Sub-Industry" value={subIndustry} onChange={handleSubIndustry}/>
						:
						<select className={subIndustryError?"salary-input error":"salary-input"} onChange={handleSubIndustry} value={subIndustry} >
							<option value="">Select Sub-Industry</option>
							{
								subIndustryData?.map((v, i) => {
									return(<option value={v?.id} >{v?.name}</option>)
								})
							}
						</select>
						}
						<div className="alertbox">{subIndustryError && <small >Please select here</small>}</div>
			</div>
			<div className="continue-btn loan-in">
                <button className="btn btn-login" onClick={handleSelfEmployeeForm} disabled={isDisableBtn}>
			                {
			                    isDisableBtn?<><Spinner
			                  as="span"
			                  animation="border"
			                  size="sm"
			                  role="status"
			                  aria-hidden="true"
			                /> Please Wait...</>:"Continue"
			                }</button>
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
		          <Modal.Title>Enter Active Directors/Partners Detail</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		          <ActiveDirectorComponent noActiveDir={noActiveDir} processData = {processData} checkSubmitDisableBtn={checkSubmitDisableBtn}  />
		        </Modal.Body>
		        <Modal.Footer>
		          <Button variant="secondary" onClick={handleClose}>
		            Close
		          </Button>
		          <Button variant="primary" disabled={submitDisable} onClick={submitData}>Submit</Button>
		        </Modal.Footer>
		      </Modal>
			  <ToastContainer />
		</>
	)
}