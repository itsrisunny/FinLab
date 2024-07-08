import React, { useEffect, useRef, useState } from "react";
import Header from "./../layouts/header";
import Footer from "./../layouts/footer";
import Spinner from 'react-bootstrap/Spinner';
import { API_URL } from './../../config/constant';
import InputMask from 'react-input-mask';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import PartnershipImage from "./../../assets/images/partnership-image.png"


export default function Partner() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [panNumber, setPanNumber] = useState("");
    const [panNumberError, setPanNumberError] = useState(false);
    const [gst, setGst] = useState("");
    const [gstError, setGstError] = useState(false);
    const [panName, setPanName] = useState("");
    const [panNameError, setPanNameError]= useState(false);
    const [pinCode, setPinCode] = useState("");
    const [pinCodeError, setPinCodeError] = useState(false);
    const [streetAddress, setStreetAddress] = useState("");
    const [streetAddressError, setStreetAddressError] = useState(false);
    const [landmark, setLandmark]= useState("")
    const [landmarkError, setLandmarkError]= useState(false)
    const [city, setCity]= useState("");
    const [cityError, setCityError]= useState(false)
    const [state, setState]= useState("");
    const [stateError, setStateError]= useState(false)
    const [registerAs, setRegisterAs]= useState("")
    const [registerAsError, setRegisterAsError]= useState(false)
    const [companyRegister, setCompanyRegister] = useState("");
    const [companyRegisterError, setCompanyRegisterError] = useState(false);
    const [registerUpload, setRegisterUpload]= useState([]);
    const [registerUploadError, setRegisterUploadError]= useState(false)
    const [officeSetup, setOfficeSetup]= useState("");
    const [officeSetupError, setOfficeSetupError]= useState(false)
    const [employeeNumber, setEmployeeNumber]= useState("");
    const [employeeNumberError, setEmployeeNumberError]= useState(false);
    const [businessVintage, setBusinessVintage]= useState("");
    const [businessVintageError, setBusinessVintageError]= useState(false);
    const [bankName, setBankName]= useState("");
    const [bankNameError, setBankNameError]= useState(false);
    const [account, setAccount] = useState("");
    const [accountError, setAccountError] = useState(false);
    const [iFSC, setIFSC] = useState("");
    const [iFSCError ,setIFSCError] = useState("");
    const [branch, setBranch] = useState("");
    const [branchError, setBranchError] = useState(false);
    const [cancelledCheck, setCancelledCheck]= useState([])
    const [cancelledCheckError, setCancelledCheckError]= useState(false)
    const [kyc, setKyc] = useState([])
    const [kycError, setKycError] = useState(false)
    const [uploadGst, setUploadGst]= useState([]);
    const [uploadGstError, setUploadGstError]= useState(false);
    const [isDisableBtn, setIsDisableBtn] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [errorMessage1, setErrorMessage1] = useState(false)
    const [errorMessage2, setErrorMessage2] = useState(false)
    const [errorMessage3, setErrorMessage3] = useState(false)
    
  
    useEffect(() => {
        localStorage.removeItem("isAuthenticate");
        localStorage.removeItem("user_id");
    },[])

    
    const allowedTypes = ["image/jpeg", "image/png", "image/gif","application/pdf"];
	const allowedPdfTypes = ["application/pdf"];
	const MAX_FILE_SIZE_IMAGE = 2050 // 2MB
	const MAX_FILE_SIZE_PDF = 5120 // 5MB

    const navigateMenu = (section) => {
    }
    useEffect(() => {
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        })
    }, [])


    const getAddressByPin = (e) => {
		if((e.target.value).length === 6){
			axios.get("https://api.postalpincode.in/pincode/"+e.target.value).then((res) => {
				if(res?.data.length){
					if(res?.data[0]?.PostOffice && res?.data[0]?.PostOffice.length){
						let data = res?.data[0]?.PostOffice[0]
							setState(data?.State)
							setStateError(false)
							setCity(data?.District)
							setCityError(false)
					}else{
							setState("")
							setCity("")
					}
				}else{
						setState("")
						setCity("")		
				}
			}).catch((e) => {
				console.log(e)
	        })
		}
		
	}




    const handleMobileNumber = (e) => {
        setPhoneNumber(e.target.value)
        setPhoneNumberError(false);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailError(false);
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handlePanNumber = (e)=>{
        setPanNumberError(false); 
        setPanNumber((e.target.value).toUpperCase());
        /*if(e.target.value.length == 10){
            verifyPancardNo((e.target.value).toUpperCase());
		}*/
		if(e.target.value.length < 10){
            setPanName("");
            setGst("");
            setPinCode("");
            setStreetAddress("");
            setCity("");
            setState("");
		}
    }

    const handleGst = (e)=>{
        setGst((e.target.value).toUpperCase())
        setGstError(false);  
        getToken();

		/*if(e.target.value.length == 15){
            verifyGstNo((e.target.value).toUpperCase());
		}*/
		if(e.target.value.length < 15){
  
		}
    }

    const handlePanName =(e)=>{
        setPanName(e.target.value);
        setPanNameError(false);
    }

    const handlePinCode = (e)=>{
        setPinCode(e.target.value);
        setPinCodeError(false);
    }

    const handleAddress = (e)=>{
        setStreetAddress(e.target.value) 
        setStreetAddressError(false);
    }

    const handleLandmark = (e) =>{
        setLandmark(e.target.value);
        setLandmarkError(false);
    }

    const handleCity = (e)=>{
        setCity(e.target.value);
        setCityError(false);
    }

    const handleState = (e)=>{
        setState(e.target.value);
        setStateError(false);
    }

    const handleRegisterAs = (e)=>{
        setRegisterAs(e.target.value);
        setRegisterAsError(false)
    }

    const handleCompanyRegister = (e)=>{
        setCompanyRegister(e.target.value);
        setCompanyRegisterError(false)

    }

    const handleRegistrationProof = (e)=>{
        const selectedFile = e.target.files;
        let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
        setRegisterUpload(selectedFile)
        setRegisterUploadError(false);
      	
		if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
		    setRegisterUploadError(true);
            setErrorMessage("JPEG, PNG, and GIF images are allowed.");
		}
		if(selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_IMAGE){
          setRegisterUploadError(true);
          setErrorMessage("File size must be less than 2 MB");
	    }  
    }

    const handleOfficeSetup = (e)=>{
        setOfficeSetup(e.target.value);
        setOfficeSetupError(false)
    }

    const handleEmployeeNumber= (e)=>{
        setEmployeeNumber(e.target.value);
        setEmployeeNumberError(false)
    }

    const handleBusinessVintage =(e)=>{
        setBusinessVintage(e.target.value)  
        setBusinessVintageError(false)
    }

    const handleBankName = (e) =>{
        setBankName(e.target.value)
        setBankNameError(false);
    }

    const handleAccount = (e) =>{
        setAccount(e.target.value);
        setAccountError(false)
    }

    const handleIFSC = (e)=>{
        setIFSC(e.target.value);
        setIFSCError("");
    }

    const handleBranch = (e)=>{
        setBranch(e.target.value);
        setBranchError(false)
    }

    const handleCancelCheck = (e)=>{
      
        const selectedFile = e.target.files;
        let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;

        setCancelledCheck(selectedFile)
        setCancelledCheckError(false);
      	
		if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
		    setCancelledCheckError(true);
            setErrorMessage1("JPEG, PNG, and GIF images are allowed.");
		}
		if(selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_IMAGE){
          setCancelledCheckError(true);
          setErrorMessage1("File size must be less than 2 MB");
	    }  

    }

    const handleKYC = (e)=>{ 
        const selectedFile = e.target.files;
        let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;

        setKyc(selectedFile)
        setKycError(false);
      	
		if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
		    setKycError(true);
            setErrorMessage2("JPEG, PNG, and GIF images are allowed.");
		}
		if(selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_IMAGE){
            setKycError(true);
            setErrorMessage2("File size must be less than 2 MB.");
	    }  
    }

    const handleUploadGst = (e)=>{
        const selectedFile = e.target.files;
        let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;

        setUploadGst(selectedFile)
        setUploadGstError(false);
      	
		if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
		    setUploadGstError(true);
            setErrorMessage3("JPEG, PNG, and GIF images are allowed.");
		}
		if(selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_IMAGE){
            setUploadGstError(true);
            setErrorMessage3("File size must be less than 2 MB.");
	    }  
    }

    const handleGetBankInfoUsingIFSC = (data) => {
		axios.get("https://ifsc.razorpay.com/"+data).then((res) => {
			let response = res.data;
			if(Object.keys(response).length){
				//setBankName(response?.BANK)
                setBranchError(false);
				setBranch(response?.BRANCH+", "+response?.CITY)
			}else{
				setIFSCError("Invalid IFSC code.")
				//setBankName("")
				setBranch("")
			}
			
		}).catch((e) => {
			setIFSCError("Invalid IFSC code.")
			//setBankName("")
			setBranch("")
		})
	}

    const handleValidation = () => {
        let formIsValid = true;

        if (!email) {
            formIsValid = false;
            setEmailError(true)
        }
        if (!validateEmail(email)) {
            formIsValid = false;
            setEmailError(true)
        }

        if (!phoneNumber) {
            formIsValid = false;
            setPhoneNumberError(true)
        }
        if((phoneNumber.replace(/ /g,'')).length !== 10){
	        formIsValid = false;
	        setPhoneNumberError(true)
	    }
        if (!panNumber) {
            formIsValid = false;
            setPanNumberError(true)
        }
        if(panNumber.length !== 10){
	        formIsValid = false;
	        setPanNumberError(true)
	    }
        if (!gst) {
            formIsValid = false;
            setGstError(true)
        }
        if (!panName) {
            formIsValid = false;
            setPanNameError(true)
        }
        if (!pinCode) {
            formIsValid = false;
            setPinCodeError(true)
        }
        if(pinCode.length !== 6){
	        formIsValid = false;
	        setPinCodeError(true)
	    }
        if (!streetAddress) {
            formIsValid = false;
            setStreetAddressError(true)
        }
        if (!landmark) {
            formIsValid = false;
            setLandmarkError(true)
        }
        if (!city) {
            formIsValid = false;
            setCityError(true)
        }
        if (!state) {
            formIsValid = false;
            setStateError(true)
        }
        if (!registerAs) {
            formIsValid = false;
            setRegisterAsError(true)
        }
        if (!companyRegister) {
            formIsValid = false;
            setCompanyRegisterError(true)
        }
        if(companyRegister == "Yes"){
            if (!Object.keys(registerUpload).length) {
                formIsValid = false;
                setRegisterUploadError(true)
            }
        }
        if (!officeSetup) {
            formIsValid = false;
            setOfficeSetupError(true)
        }
        if (!employeeNumber) {
            formIsValid = false;
            setEmployeeNumberError(true)
        }
        if (!businessVintage) {
            formIsValid = false;
            setBusinessVintageError(true)
        }
        if (!bankName) {
            formIsValid = false;
            setBankNameError(true)
        }
        if (!account) {
            formIsValid = false;
            setAccountError(true)
        }
        if (!iFSC) {
            formIsValid = false;
            setIFSCError("Please fill here");
        }
        if (!branch) {
            formIsValid = false;
            setBranchError(true)
        }
        if (!Object.keys(cancelledCheck).length) {
            formIsValid = false;
            setCancelledCheckError(true)
        }
        if (!Object.keys(kyc).length) {
            formIsValid = false;
            setKycError(true)
        }
        if (!Object.keys(uploadGst ).length) {
            formIsValid = false;
            setUploadGstError(true)
        }
        return formIsValid;
    }


    const handleSubmit = async () => {
      
       if(handleValidation()){
           setIsDisableBtn(true)
             axios.post(API_URL+"token/generate-token",{user_id: "0"}).then((res) => {
                let response = res.data;
                if(response?.token){
                    let x = phoneNumber.split(" ");
                       let phNo = x.join("");
                    let formData = new FormData();
                    formData.append('mobile_number', phNo);
                    formData.append('email_id', email);
                    formData.append('pan_card', panNumber);
                    formData.append('gst', gst);
                    formData.append('name', panName);
                    formData.append('street', streetAddress);
                    formData.append('landmark', landmark);
                    formData.append('city', city);
                    formData.append('state', state);
                    formData.append('pincode', pinCode);
                    formData.append('register_as', registerAs);
                    formData.append('is_company_registered', companyRegister);
                    formData.append('office_setup', officeSetup);
                    formData.append('no_of_employees', employeeNumber);
                    formData.append('business_vintage', businessVintage);
                    formData.append('bank_name', bankName);
                    formData.append('account_no', account);
                    formData.append('ifsc', iFSC);
                    formData.append('branch', branch);
                    formData.append('token', response?.token);
                    if(registerUpload.length){
                       formData.append('register_upload', registerUpload[0]);
                    }
                    if(cancelledCheck.length){
                       formData.append('cancelled_check', cancelledCheck[0]);
                    }
                    if(kyc.length){
                        formData.append('kyc', kyc[0]);
                    }
                    if(uploadGst.length){
                        formData.append('upload_gst', uploadGst[0]);
                    }
                 
					axios.post(API_URL+"partner/save",formData).then((res) => {
						let response = res?.data;
                       
						if(response?.status == 200){   
							// toast.success(response?.message);
                            Swal.fire({
                                title: "",
                                text: response?.message,
                                icon: "success",
                                confirmButtonText: "Got It"
                              });
						}else{ 
                          //  toast.error(response?.message);
                            Swal.fire({
                                title: "",
                                text: response?.message,
                                icon: "error",
                                confirmButtonText: "Got It"
                              });
                        }
						setIsDisableBtn(false)
					}).catch((e) => {
			            console.log(e)
			            setIsDisableBtn(false)
			        })
                }

             }).catch((e) => {
            	console.log(e)
            })
       }
    }


    const [panNumberCheckError,setPanNumberCheckError] = useState("");

    const verifyPancardNo = (pan) =>{
      let jsonFormData = {
          // patronid:patronid,
          // token:accessToken,
          pan	:pan
      }
              axios.post(API_URL+"api-auth/verify-pan-number-v3",jsonFormData).then((res) => {
                 // console.log(res.data);
              if(res?.data?.data!=undefined){
                  let response = res.data;
                  setPanName(response?.data?.result?.name);
                 
                  setPanNumberCheckError(false);
                  setPanNameError(false);
              }else{
                setPanName("");
                setPanNumber("");
                setGst("");
                  setPanNumberCheckError(true);
              }
              }).catch((e) => {
                  console.log(e);
              })	   
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
				//  console.log("response",response?.data?.result?.gstnDetailed?.legalNameOfBusiness);
				//console.log(panName,response?.data?.result?.gstnDetailed?.legalNameOfBusiness);
				 if(panName.replace(/ /g,'') == (response?.data?.result?.gstnDetailed?.legalNameOfBusiness).replace(/ /g,'')){

					setGstNumberCheckError(false);
					setGstNumbervaild(true);
                    setPinCode(response?.data?.result?.gstnDetailed?.principalPlacePincode);
                    setStreetAddress(response?.data?.result?.gstnDetailed?.principalPlaceStreet);
                    setCity(response?.data?.result?.gstnDetailed?.principalPlaceDistrict);
                    setState(response?.data?.result?.gstnDetailed?.principalPlaceState);

				 }else{
					setGst("");
                    setPinCode("");
                    setStreetAddress("");
                    setCity("");
                    setState("");
					setGstNumberCheckError(true);
					setGstNumbervaild(false);
				 }				
			  }else{
				    setGst("");
                    setPinCode("");
                    setStreetAddress("");
                    setCity("");
                    setState("");
				    setGstNumberCheckError(true);
				    setGstNumbervaild(false);
			  }	  
			  }).catch((e) => {
				  console.log(e);
			  })	   
	}

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
				  console.log(res.data);
			  if(res?.data?.data!=undefined){
				 if(res?.data?.data?.result?.active=='yes'){
				  if(res?.data?.data?.result?.nameMatch == 'yes'){
					 setDisabled(true);
				 	 setAccNumberCheckError("");
				  }else{
					setDisabled(false);
                    setBranch("");
					setAccNumberCheckError("Account holder name mismatched");
				  }
				 }else{
					setDisabled(false);
                    setBranch("");
					setAccNumberCheckError(res?.data?.data?.result?.reason);
				//	console.log("test",res?.data?.data);
				 }		 
			  }else{
				setDisabled(false); 
                setBranch("");
				setAccNumberCheckError("Invalid account details")
			  }		  
			  }).catch((e) => {
				  console.log(e);
			  })	   
	}

    useEffect(()=>{
		if(bankName!="" && iFSC!="" && account!="" ){
				verifyAccountNo(account,bankName,iFSC);
		}
	},[account,bankName,iFSC]);




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




    return (
        <>
            <div className="hero_area">
                <Header navigateMenu={navigateMenu} />
                <div className='partner-area'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-6 col-md-4'>
                                <div className="partner-left">
                                    <div className="eagertoForge partner-center"><h2>RIGHT PARTNERSHIPS CAN GO A LONG WAY!</h2><h2 style={{color:"#02BD64"}}>Inviting applications now...</h2></div>
                                    <div className="recommend-img"><img src={PartnershipImage} className=" partner-center recommetnImgsd" alt="ReferImage" /></div>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-8'>

                                <div className="form-wrap">
                                    
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="name-label" for="name">Mobile Number</label>
                                                    <InputMask mask="999 999 9999" type="tel" maskChar="" placeholder="Enter Mobile Number" className={phoneNumberError ? "form-control error" : "form-control"}  value={phoneNumber} onChange={handleMobileNumber} />
                                                    {phoneNumberError && <small className="alertbox">Please fill here</small>}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="email-label" for="email">Email ID</label>
                                                    <input type="email" name="email" id="email" placeholder="Enter Email ID" className={emailError ? "form-control error" : "form-control"} value={email} onChange={handleEmail} />
                                                    {emailError && <small className="alertbox">Please fill here</small>}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="number-label" for="number">PAN # (<small>company or Individual</small>)</label>
                                                    <InputMask mask="aaaaa9999a" maskChar="" className={panNumberError ? "form-control error" : "form-control"} placeholder="DFRSC3456F" value={panNumber} onChange={handlePanNumber} />
                                                    {panNumberError ? <small className="alertbox">Please fill here</small>:(panNumberCheckError ? <small className="alertbox">Invalid PAN number</small> :"")}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="number-label" for="number">GST</label>
                                                    <InputMask mask="99aaaaa9999a9a*" maskChar="" className={gstError ? "form-control error" : "form-control"} placeholder="22AAAAA0000A1Z5"  value={gst} onChange={handleGst}/>
                                                    {gstError ? <small className="alertbox">Please fill here</small>:(gstNumberCheckError ? <small className="alertbox">Invalid GST number</small> :"")}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="number-label" for="number">Name as per PAN  </label>
                                                    <input type="text"  className={panNameError ? "form-control error" : "form-control"} placeholder="Name as per PAN"  value={panName} onChange={handlePanName} />
                                                    {panNameError && <small className="alertbox">Please fill here</small>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="number-label" for="number">Pin code  </label>
                                                    <InputMask mask="999999" type="tel" maskChar=""  className={pinCodeError ? "form-control error" : "form-control"} placeholder="Enter Pincode " value={pinCode}  onChange={handlePinCode} onKeyUp={(e) => getAddressByPin(e)} />
                                                    {pinCodeError && <small className="alertbox">Please fill here</small>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Street</label>
                                                    <textarea  className={streetAddressError ? "form-control error" : "form-control"}  placeholder="Enter your street..."  value={streetAddress} onChange={handleAddress}></textarea>
                                                    {streetAddressError && <small className="alertbox">Please fill here</small>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Landmark</label>
                                                    <textarea  className={landmarkError ? "form-control error" : "form-control"}  placeholder="Enter your landmark..."  value={landmark} onChange={handleLandmark}></textarea>
                                                    {landmarkError && <small className="alertbox">Please fill here</small>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>City</label>
                                                    <textarea  className={cityError ? "form-control error" : "form-control"} placeholder="Enter your city..."  value={city} onChange={handleCity}></textarea>
                                                    {cityError && <small className="alertbox">Please fill here</small>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>State</label>
                                                    <textarea  className={stateError ? "form-control error" : "form-control"}  placeholder="Enter your state..."  value={state} onChange={handleState}></textarea>
                                                    {stateError && <small className="alertbox">Please fill here</small>}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Want to register as</label>
                                                    <select id="dropdown4" name="role" className={registerAsError ? "form-control error" : "form-control"} onChange={handleRegisterAs} value={registerAs}>
                                                        <option value="">Select</option>
                                                        <option value="Lead Aggregator">Lead Aggregator</option>
                                                        <option value="DSA-Company">DSA-Company</option>
                                                        <option value="DSA-Individual">DSA-Individual</option>
                                                    </select>
                                                    {registerAsError && <small className="alertbox">Please fill here</small>}            
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Is your company registered</label>
                                                    <select id="dropdown3" name="role" className={companyRegisterError ? "form-control error" : "form-control"} onChange={handleCompanyRegister} value={companyRegister}>
                                                        <option value="">Select</option>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                    {companyRegisterError && <small className="alertbox">Please fill here</small>}     
                                                </div>
                                            </div>
                                            {(companyRegister == "Yes")?
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="number-label" for="number">Upload Registration proof </label>
                                                    <input type="file" accept="image/png, image/jpeg, image/gif"  className={registerUploadError?"partner-file form-control error":"partner-file form-control"} placeholder="" onChange={handleRegistrationProof} />
                                                    <span className="vrtext message">* File Format: JPEG, PNG</span>
                                                    {(registerUploadError)?(errorMessage)? <small className="alertbox">{errorMessage}</small>:<small className="alertbox">Please fill here</small>:""}  
                                                </div>
                                            </div>
                                           :"" }
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Do you have office setup</label>
                                                    <select id="dropdown2" name="role" className={officeSetupError ? "form-control error" : "form-control"} onChange={handleOfficeSetup} value={officeSetup}>
                                                        <option value="">Select</option>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                    {officeSetupError && <small className="alertbox">Please fill here</small>}  
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>No of employees </label>
                                                    <select id="dropdowns" name="role" className={employeeNumberError ? "form-control error" : "form-control"} onChange={handleEmployeeNumber} value={employeeNumber}>
                                                        <option value="">Select</option>
                                                        <option value="1-5">1-5</option>
                                                        <option value="5-10">5-10</option>
                                                        <option value="10+">10+</option>
                                                    </select>
                                                    {employeeNumberError && <small className="alertbox">Please fill here</small>}  
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Business Vintage  </label>
                                                    <select id="dropdown1" name="role" className={businessVintageError ? "form-control error" : "form-control"} onChange={handleBusinessVintage} value={businessVintage} >
                                                        <option value="">Select</option>
                                                        <option value="Below 1 year">Below 1 year</option>
                                                        <option value="1-3yr">1-3yr</option>
                                                        <option value="above 3 year">above 3 year</option>
                                                    </select>
                                                    {businessVintageError && <small className="alertbox">Please fill here</small>} 
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row '>
                                            <div className='col-md-12'>
                                                <h5>Bank Details</h5>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="number-label" for="number">Name</label>
                                                    <input type="text"  className={bankNameError ? "form-control error" : "form-control"} placeholder="Enter Name" onChange={handleBankName} value={bankName}/>
                                                    {bankNameError ? <small className="alertbox">Please fill here</small>:(accNumberCheckError ? <small className="alertbox">Invalid Account Details</small> :"")} 
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="number-label" for="number">Account No.</label>
                                                    <input type="text"  className={accountError ? "form-control error" : "form-control"} placeholder="Enter Account No." onChange={handleAccount} value={account}/>
                                                    {accountError && <small className="alertbox">Please fill here</small>} 
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="number-label" for="number">IFSC</label>
                                                    <input type="text"  className={iFSCError ? "form-control error" : "form-control"} placeholder="Enter IFSC"  value={iFSC} onChange={handleIFSC}  onBlur={(e)=>{handleGetBankInfoUsingIFSC(e.target.value)}}/>
                                                    {iFSCError && <small className="alertbox">{iFSCError}</small>} 
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="number-label" for="number">Branch</label>
                                                    <input type="text" className={branchError ? "form-control error" : "form-control"} placeholder="Your Branch" value={branch} onChange={handleBranch}/>
                                                    {branchError && <small className="alertbox">Please fill here</small>} 
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="number-label" for="number">Upload Cancelled check </label>
                                                    <input type="file" accept="image/png, image/jpeg"  className={cancelledCheckError?"partner-file form-control error":"partner-file form-control"} placeholder=""  onChange={handleCancelCheck}/>
                                                    <span className="vrtext message">* File Format: JPEG, PNG</span>
                                                    {(cancelledCheckError)?(errorMessage1)? <small className="alertbox">{errorMessage1}</small>:<small className="alertbox">Please fill here</small>:""}  
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="number-label" for="number">Upload KYC </label>
                                                    <input type="file"   accept=".pdf"  className={kycError?"partner-file form-control error":"partner-file form-control"} placeholder=""  onChange={handleKYC} />
                                                    <span className="vrtext message">* File Format: PDF</span>
                                                    {(kycError)?(errorMessage2)? <small className="alertbox">{errorMessage2}</small>:<small className="alertbox">Please fill here</small>:""}  
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label id="number-label" for="number">Upload GST </label>
                                                    <input type="file" accept=".pdf"  className={uploadGstError?"partner-file form-control error":"partner-file form-control"} placeholder=""   onChange={handleUploadGst}/>
                                                    <span className="vrtext message">* File Format: PDF</span>
                                                    {(uploadGstError)?(errorMessage3)? <small className="alertbox">{errorMessage3}</small>:<small className="alertbox">Please fill here</small>:""}  
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 m-auto join-now">
                                                <button type="submit" id="submit" className="btn btn-partner" onClick={handleSubmit} disabled={isDisableBtn}>
                                                {
                                                        isDisableBtn?<><Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    /> Please Wait...</>:"Join Now"
                                                    } 
                                                 </button>
                                            </div>
                                        </div>

                                    
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <ToastContainer />
        </>
    )

}