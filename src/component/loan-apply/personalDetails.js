import React, {useEffect, useState} from "react";
import ChatGirlImage from "../../assets/images/login-page/Chat girl.png";
import TriangleLeft from "../../assets/images/login-page/triangle-left.png";
import InputMask from 'react-input-mask';
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom";
import {doSomething} from "../../utilities/loginSignZyUtilities"
import moment from "moment";
import { API_URL } from './../../config/constant';
import Spinner from 'react-bootstrap/Spinner';
import CurrencyInput from 'react-currency-input-field';
import Loading from '../loader/index'
import numberToText from "number-to-text";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('number-to-text/converters/en-in');

export default function PersonalDetail({activeCard, preFillData,handleNextStep, caseId, loanPurpose,loading,panName}){
	const [mobileNumber, setMobileNumber] = useState((localStorage.getItem('mobile_no') != null)?localStorage.getItem('mobile_no'):"")
	const [mobileNumberError, setMobileNumberError] = useState(false)
	const [panNumber, setPanNumber] = useState("")
	const [panNumberError, setPanNumberError] = useState(false)
	const [gender, setGender] = useState("male")
	const [emailId, setEmailId] = useState("")
	const [emailIdError, setEmailIdError] = useState(false)
	const [pinCode, setPinCode] = useState("")
	const [pinCodeError, setPinCodeError] = useState(false)
	const [dob, setDob] = useState("")
	const [dobError, setDobError] = useState(false)
	const [name, setName] = useState("")
	const [nameError, setNameError] = useState(false)
	const [relationshipStatus, setRelationshipStatus] = useState("")
	const [relationshipStatusError, setRelationshipStatusError] = useState(false)
	const [aadhaar, setAadhaar] = useState("")
	const [aadhaarError, setAadhaarError] = useState(false)
	const [state, setState] = useState("")
	const [stateError, setStateError] = useState(false)
	const [city, setCity] = useState("")
	const [cityError, setCityError] = useState(false)
	const [street, setStreet] = useState("")
	const [streetError, setStreetError] = useState(false)
	const [stateCurrent, setStateCurrent] = useState("")
	const [stateCurrentError, setStateCurrentError] = useState(false)
	const [cityCurrent, setCityCurrent] = useState("")
	const [cityCurrentError, setCityCurrentError] = useState(false)
	const [streetCurrent, setStreetCurrent] = useState("")
	const [streetCurrentError, setStreetCurrentError] = useState(false)
	const [isSameAddress, setIsSameAddress] = useState(false)
	const [pinCodeCurrent, setPinCodeCurrent] = useState("")
	const [pinCodeCurrentError, setPinCodeCurrentError] = useState(false)
	const [addOne, setAddOne] = useState("")
	const [addOneError, setAddOneError] = useState(false)
	const [addTwo, setAddTwo] = useState("")
	const [addTwoError, setAddTwoError] = useState(false)
	const [addOneCurrent, setAddOneCurrent] = useState("")
	const [addOneCurrentError, setAddOneCurrentError] = useState(false)
	const [addTwoCurrent, setAddTwoCurrent] = useState("")
	const [addTwoCurrentError, setAddTwoCurrentError] = useState(false)
	const [employmentDetail, setEmploymentDetail] = useState((loanPurpose == "1" || loanPurpose == 1)?"employed":"salaried")
	const [businessType, setBusinessType] = useState("")
	const [businessTypeError, setBusinessTypeError] = useState(false)
	const [businessTypeOther, setBusinessTypeOther] = useState("")
	const [businessTypeOtherError, setBusinessTypeOtherError] = useState(false)
	const [businessTypeData, setBusinessTypeData] = useState([])
	const [allBusinessTypeData, setAllBusinessTypeData] = useState([])
	const [subBusinessTypeData, setSubBusinessTypeData] = useState([])
	const [subBusinessType, setSubBusinessType] = useState("")
	const [subBusinessTypeError, setSubBusinessTypeError] = useState(false)
	const [isDisableBtn, setIsDisableBtn] = useState(false);
	const [businessTypeLabel, setBusinessTypeLabel] = useState("")
	const [doi, setDoi] = useState("");
	const [display,setDisplay] = useState("none");
	const [panValid, setPanValid] = useState(false)
	const [aadhaarValid, setAadhaarValid] = useState(false)
	const [pastLoan,setPastLoan] = useState("");
	const [pastLoanError, setPastLoanError] = useState(false);
	const [loader, setLoader] = useState(false)
	const [pastLoanAmount,setPastLoanAmount] = useState(0);
	const [pastLoanAmountError, setPastLoanAmountError] = useState(false);
	const [readonly, setReadOnly] = useState(false)
	const [panNumberExistError, setPanNumberExistError] = useState(false)

	useEffect(()=>{
		panName(name);
	},[name])

	useEffect(() => {
		if(loanPurpose == "1" || loanPurpose == 1){
			setEmploymentDetail("employed")
		}else{
			setEmploymentDetail("salaried")
		}		
	},[loanPurpose])

	
	const handleEmployementDetail = (e) => {
		setEmploymentDetail(e.target.value)
	}
	const handleMobileNumber = (e) => {
		setMobileNumberError(false)
		setMobileNumber(e.target.value)
	}
	const handlePanNumber = (e) => {
		setPanNumberError(false)
		setPanNumberExistError(false)
		setPanNumberCheckError(false)
		setPanNumber((e.target.value).toUpperCase())
		// getToken();
		
		if(e.target.value.length == 10){
			checkPanNumber(e.target.value)
            

		}else{
			setPanValid(false)
			setReadOnly(false)
		}

		if(e.target.value.length < 10){

            setName("");

		}
	}
	const handleGender = (e) => {
		setGender(e.target.value)
	}
	const handleEmailID = (e) => {
		setEmailIdError(false)
		setEmailId(e.target.value)
	}
	const handlePinCode = (e) => {
		setPinCodeError(false)
		setPinCode(e.target.value)
	}
	const formatDateFn = (date) => {
	    const selectedDate = new Date(date)
	    return selectedDate.getFullYear()+"/"+parseInt(selectedDate.getMonth()+1)+"/"+selectedDate.getDate();
	} 
	const handleDateOfBirth = (e) => {
		setDobError(false)
		setDob(e)
	}
	const handleName = (e) => {
		setNameError(false)
		setName(e.target.value)
	}
	const handleRelashipStatus = (e) => {
		setRelationshipStatusError(false)
		setRelationshipStatus(e.target.value)
	}
	const handleAadhaar = (e) => {
		setAadhaarError(false)
		setAadhaar(e.target.value)	
		setAadhaarValid(false)
		if(e.target.value.length == 14){
            
            verifyAadharNo((e.target.value).replace(/\s+/g, ''));

		}	
	}
	/*useEffect(() => {
		console.log(doSomething(5))
	},[doSomething])*/
	const getAddressByPin = (e, type) => {
		if((e.target.value).length === 6){
			axios.get("https://api.postalpincode.in/pincode/"+e.target.value).then((res) => {
				if(res?.data.length){
					if(res?.data[0]?.PostOffice && res?.data[0]?.PostOffice.length){
						let data = res?.data[0]?.PostOffice[0]
						if(type === "permanent"){
							setState(data?.State)
							setStateError(false)
							setCity(data?.Block+", "+data?.District)
							setCityError(false)
						}else{
							setStateCurrent(data?.State)
							setStateCurrentError(false)
							setCityCurrent(data?.Block+", "+data?.District)
							setCityCurrentError(false)
						}
						
					}else{
						if(type === "permanent"){
							setState("")
							setCity("")
						}else{
							setStateCurrent("")
							setCityCurrent("")
						}
					}
				}else{
					if(type === "permanent"){
						setState("")
						setCity("")
					}else{
						setStateCurrent("")
						setCityCurrent("")
					}
				}
			}).catch((e) => {
				console.log(e)
	        })
		}
		
	}
	const validateEmail = (email) => {
	  return email.match(
	    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	  );
	};
	const handleState = (e) => {
		setStateError(false)
		setState(e.target.value)
	}
	const handleCity = (e) => {
		setCityError(false)
		setCity(e.target.value)
	}
	const handleStreet = (e) => {
		setStreetError(false)
		setStreet(e.target.value)
	}
	const handleAddOne = (e) => {
		setAddOneError(false)
		setAddOne(e.target.value)
	}
	const handleAddTwo = (e) => {
		setAddTwoError(false)
		setAddTwo(e.target.value)
	}
	const handleAddOneCurrent = (e) => {
		setAddOneCurrentError(false)
		setAddOneCurrent(e.target.value)
	}
	const handleAddTwoCurrent = (e) => {
		setAddTwoCurrentError(false)
		setAddTwoCurrent(e.target.value)
	}
	const handleStateCurrent = (e) => {
		setStateCurrentError(false)
		setStateCurrent(e.target.value)
	}
	const handleCityCurrent = (e) => {
		setCityCurrentError(false)
		setCityCurrent(e.target.value)
	}
	const handleStreetCurrent = (e) => {
		setStreetCurrentError(false)
		setStreetCurrent(e.target.value)
	}
	const handlePinCodeCurrent = (e) => {
		setPinCodeCurrentError(false)
		setPinCodeCurrent(e.target.value)
	}
	const handleBusinessType = (e) => {
		setBusinessTypeError(false)
		setBusinessType(e.target.value)
		let sub_data = [];
		allBusinessTypeData.map((v, i) => {
			if(v.parent_id == e.target.value){
				sub_data.push(v)
			}
		})
		setSubBusinessTypeData(sub_data);

        var index = e.nativeEvent.target.selectedIndex;
		var text =e.nativeEvent.target[index].text;
		//console.log("text",text);
		setBusinessTypeLabel(text)


	}
	const handleSubBusinessType = (e) => {
		setSubBusinessTypeError(false)
		setSubBusinessType(e.target.value)
	}
	const handleBusinessTypeOther = (e) => {
		setBusinessTypeOtherError(false)
		setBusinessTypeOther(e.target.value)
	
	}
	const handleSameAddress = (e) => {
		setIsSameAddress(e.target.checked)
		if(e.target.checked){
			setStateCurrent(state)
			setStateCurrentError(false)
			setCityCurrent(city)
			setCityCurrentError(false)
			setStreetCurrent(street)
			setStreetCurrentError(false)
			setPinCodeCurrent(pinCode)
			setPinCodeCurrentError(false)
			setAddOneCurrent(addOne)
			setAddTwoCurrent(addTwo)
			setAddOneCurrentError(false)
			setAddTwoCurrentError(false)
		}
		
	}
    const [emailExist,setEmailExit]=useState(false);
	const checkEmailExist = () =>{
		if(handleValidation()){
			var jsonData = {
				"email_id":emailId,
				"case_id":caseId
			}
	
			axios.post(API_URL + "user/check-user-email ", jsonData).then((res) => {
				let response = res.data;
				
				if (response?.status == 200) {
					setEmailExit(response?.data?.emailExists);
					if(!response?.data?.emailExists){
						
						hanldePersonalDetail();
					}else{
						setEmailIdError(true);
					}
				}
	
			}).catch((e) => {
				console.log(e)
			})
		}
        
	}
	const checkPanNumber = (e) => {
		setLoader(true)
		axios.post(API_URL+"user/check-user-pan",{pan: e, case_id:caseId, loanPurpose: loanPurpose}).then((res) => {
			setLoader(false)
			let response = res.data;
			if(response?.status == 200 && response?.data?.panExists){
				setPanNumberExistError(true)
			}else{
				verifyPancardNo((e).toUpperCase());
			}
		}).catch((e) => {
			console.log(e)
		})
	}
	useEffect(()=>{
		loading(display)
	},[display]);



	const handleValidation = () => {
		
		let isFormValid = true;
		if(employmentDetail === "employed" && !businessType){
			isFormValid = false;
			setBusinessTypeError(true)
		}
		if(employmentDetail === "employed" && businessType == "6" && !businessTypeOther){
			isFormValid = false;
			setBusinessTypeOtherError(true)
		}
		if(employmentDetail === "employed" && businessType == "5" && !subBusinessType){
			isFormValid = false;
			setSubBusinessTypeError(true)
		}
		if(!mobileNumber){
			isFormValid = false;
			setMobileNumberError(true)
		}
		if((mobileNumber.replace(/ /g,'')).length !== 10){
	        isFormValid = false;
	        setMobileNumberError(true)
	    }
	    if(!panNumber){
			isFormValid = false;
			setPanNumberError(true)
		}
		if(panNumber.length !== 10){
	        isFormValid = false;
	        setPanNumberError(true)
	    }
	    if(!aadhaar && employmentDetail === "salaried"){
			isFormValid = false;
			setAadhaarError(true)
		}
		if((aadhaar.replace(/ /g,'')).length !== 12  && employmentDetail === "salaried"){
	        isFormValid = false;
			setAadhaarError(true)
	    }
	    if(!name){
			isFormValid = false;
			setNameError(true)
		}
		if(!dob){
			isFormValid = false;
			setDobError(true)
		}
		
		if(!pinCode){
			isFormValid = false;
			setPinCodeError(true)
		}
		if(pinCode.length !== 6){
	        isFormValid = false;
	        setPinCodeError(true)
	    }
	    if(!addOne){
			isFormValid = false;
			setAddOneError(true)
		}
		if(!addTwo){
			isFormValid = false;
			setAddTwoError(true)
		}
		if(!city){
			isFormValid = false;
			setCityError(true)
		}
		if(!state){
			isFormValid = false;
			setStateError(true)
		}
		if(!street){
			isFormValid = false;
			setStreetError(true)
		}
		if(employmentDetail === "salaried"){
			if(!addOneCurrent){
				isFormValid = false;
				setAddOneCurrentError(true)
			}
			if(!addTwoCurrent){
				isFormValid = false;
				setAddTwoCurrentError(true)
			}
		    
			if(!pinCodeCurrent){
				isFormValid = false;
				setPinCodeCurrentError(true)
			}
			if(pinCodeCurrent.length !== 6){
		        isFormValid = false;
		        setPinCodeCurrentError(true)
		    }
		    if(!cityCurrent){
				isFormValid = false;
				setCityCurrentError(true)
			}
			if(!stateCurrent){
				isFormValid = false;
				setStateCurrentError(true)
			}
			if(!streetCurrent){
				isFormValid = false;
				setStreetCurrentError(true)
			}
			if(!relationshipStatus){
				isFormValid = false;
				setRelationshipStatusError(true)
			}
		}
	    if(!emailId){
			isFormValid = false;
			setEmailIdError(true)
		}
		if(!validateEmail(emailId)){
			isFormValid = false;
			setEmailIdError(true)
		}
		if(!pastLoan){
			isFormValid = false;
			setPastLoanError(true)
		}else{
			if(pastLoan=="Yes"){
				if(!pastLoanAmount || pastLoanAmount ==0){
					isFormValid = false;
			         setPastLoanAmountError(true);
				}
			}
		}
		
		return isFormValid;
	}
	const hanldePersonalDetail = () => { 
		setDisplay("flex");
		//if(handleValidation()){
			setIsDisableBtn(true)
			axios.post(API_URL+"token/generate-token",{user_id: localStorage.getItem("user_id")}).then((res) => {
				let response = res.data;
                if(response?.token){
                	let jsonFormData = {
						case_id:caseId,
						user_type: employmentDetail,
						business_type: businessType,
						sub_business_type: businessTypeLabel =='Professional' ?subBusinessType:"",
						other_business_type: businessTypeLabel =='Others' ?businessTypeOther?businessTypeOther:"":"",
						name: name,
						mobile_number: mobileNumber,
						email_id: emailId,
						pan_card: panNumber,
						aadhaar: aadhaar,
						dob: loanPurpose == 2?formatDateFn(dob):((businessType==1)?formatDateFn(dob):""),
						doi: loanPurpose == 2?"":(businessType==1)?doi?formatDateFn(doi):"":formatDateFn(dob),
						permanant_address_1: addOne,
						permanant_address_2: addTwo,
						permanant_landmark: street,
						permanant_pin_code: pinCode,
						permanant_state: state,
						permanant_city: city,
						current_address_1: addOneCurrent,
						current_address_2: addTwoCurrent,
						current_landmark: streetCurrent,
						current_pin_code: pinCodeCurrent,
						current_state: stateCurrent,
						current_city: cityCurrent,
						gender: gender,
						relationship_status: relationshipStatus,
						token: response?.token,
						past_loan: pastLoan,
						past_loan_amount : pastLoanAmount,
					}



					//console.log("personal-detail",jsonFormData);
				/*	axios.post(API_URL+"user/personal-detail",jsonFormData).then((res) => {
						let response = res.data;
						if(response?.status === 200){
							handleNextStep(employmentDetail, businessType)
							setDisplay("none");
						}
						setIsDisableBtn(false)
					}).catch((e) => {
			            console.log(e);
						setDisplay("none");
			            setIsDisableBtn(false)
			        }) */
					//added
					let jsonFormD = {
						// patronid:patronid,
						// token:accessToken,
						pan	:panNumber
					}	
					if(!panValid){
						axios.post(API_URL+"api-auth/verify-pan-number-v3",jsonFormD).then((res) => {
							if(res?.data?.data!=undefined){
										axios.post(API_URL+"user/personal-detail",jsonFormData).then((res) => {
											let response = res.data;
											if(response?.status === 200){
												handleNextStep(employmentDetail, businessType)
											}else{
												toast.success(response?.message)
											}
											setDisplay("none");
											setIsDisableBtn(false)
										}).catch((e) => {
											console.log(e);
											setDisplay("none");
											setIsDisableBtn(false)
										})
									setPanNumberCheckError(false);
									setNameError(false);
							}else{
								    setDisplay("none");
									setIsDisableBtn(false)
								setName("");
								setPanNumberCheckError(true);
							}
							}).catch((e) => {
								console.log(e);
							})
					}else{
						axios.post(API_URL+"user/personal-detail",jsonFormData).then((res) => {
							let response = res.data;
							if(response?.status === 200){
								handleNextStep(employmentDetail, businessType)
							}else{
								toast.error(response?.message)
							}
							setDisplay("none");
							setIsDisableBtn(false)
						}).catch((e) => {
							console.log(e);
							setDisplay("none");
							setIsDisableBtn(false)
						})
					}
				}
            }).catch((e) => {
				setDisplay("none");
            	console.log(e)
            })
		//}
	}
	useEffect(() => {
		getBusinessType()
	},[])
	const getBusinessType = () => {
		axios.get(API_URL+"master/business-type").then((res) => {
			let response = res.data;
			setAllBusinessTypeData(response?.data)
			let filter_data = response?.data.filter((v) => {
				return v.parent_id === 0;
			});
			setBusinessTypeData(filter_data)		
		}).catch((e) => {
            console.log(e)
        })
	}

	useEffect(() => {
		if(Object.keys(preFillData).length){
		setEmploymentDetail(preFillData?.user_detail?.user_type?preFillData?.user_detail?.user_type:"employed");
		let personalDetails = preFillData?.personal_detail;
		setBusinessType(personalDetails?.business_type);
		setBusinessTypeLabel(personalDetails?.business_type_name);
		setMobileNumber(personalDetails?.mobile_numnber?personalDetails?.mobile_numnber:(localStorage.getItem('mobile_no') != null)?localStorage.getItem('mobile_no'):"");
		setEmailId(personalDetails?.email_id?personalDetails?.email_id:"");
		setPanNumber(personalDetails?.pan_card?personalDetails?.pan_card:"");
		setName(personalDetails?.name?personalDetails?.name:"");
		if(personalDetails?.dob_doi){
		let yourDate = new Date(personalDetails?.dob_doi)
			if(personalDetails?.business_type==1){
		    	setDob(yourDate); 
		  	}
		}
		if(preFillData?.loan_requirement?.purpose_of_loan == "2"){
			if(personalDetails?.dob_doi){
				let yourDate = new Date(personalDetails?.dob_doi)
		    	setDob(yourDate); 
			}
		}
		if(personalDetails?.doi){
			if(personalDetails?.business_type==1){
			let yourDate = new Date(personalDetails?.doi)
		    setDoi(yourDate);
			}else{
				let yourDate = new Date(personalDetails?.doi)
				setDob(yourDate);
			}
		}
		setAadhaar(personalDetails?.aadhaar?personalDetails?.aadhaar:"");
		setGender(personalDetails?.gender?personalDetails?.gender:"");
		setRelationshipStatus(personalDetails?.relaship_status?personalDetails?.relaship_status:"");
		setAddOne(personalDetails?.permanant_address_1?personalDetails?.permanant_address_1:"");
		setAddTwo(personalDetails?.permanant_address_2?personalDetails?.permanant_address_2:"");
		setStreet(personalDetails?.permanant_landmark?personalDetails?.permanant_landmark:"");
		setPinCode((personalDetails?.permanant_pin_code)?personalDetails?.permanant_pin_code.toString():"");
		setCity(personalDetails?.permanant_city?personalDetails?.permanant_city:"");
		setState(personalDetails?.permanant_state?personalDetails?.permanant_state:"");
        setAddOneCurrent(personalDetails?.current_address_1?personalDetails?.current_address_1:"");
		setAddTwoCurrent(personalDetails?.current_address_2?personalDetails?.current_address_2:"");
	    setStreetCurrent(personalDetails?.current_landmark?personalDetails?.current_landmark:"");
        setPinCodeCurrent((personalDetails?.current_pin_code)?personalDetails?.current_pin_code.toString():"")
		setStateCurrent(personalDetails?.current_state?personalDetails?.current_state:"");
		setCityCurrent(personalDetails?.current_city?personalDetails?.current_city:"");	
		setBusinessTypeOther(personalDetails?.other_business?personalDetails?.other_business:"");
		setSubBusinessType(personalDetails?.sub_business_type?personalDetails?.sub_business_type:"");	
		setPastLoan(personalDetails?.past_loan?personalDetails?.past_loan:"");
		setPastLoanAmount(personalDetails?.past_loan_amount?personalDetails?.past_loan_amount:0);
		}		
						
	},[preFillData])
	
	const handleDateOfInc = (e) => {
		setDoi(e)
	}

	const handlePastLoan = (e) =>{
          setPastLoan(e.target.value);
		  if(e.target.value == "No" || e.target.value == ""){
			setPastLoanAmount(0);
			setPastLoanAmountError("");
		  }
		  setPastLoanError(false);
			  
	}

	const handlePastLoanAmount = (e) =>{
			setPastLoanAmount(e ? (e > 0) ? e : 0 :0);
			setPastLoanAmountError(false);
	}    
	

	const calculateMaxDate = () => {
		return moment().subtract(18, 'years').toDate(); // 18 years ago from the current date
	  };


  	  const [patronid,setPatronid] = useState("");
      const [accessToken,setAccessToken] = useState("");

	  const [panNumberCheckError,setPanNumberCheckError] = useState("");



	  const verifyPancardNo = (pan) =>{
	  	setLoader(true)
		let jsonFormData = {
			// patronid:patronid,
			// token:accessToken,
			pan	:pan
		}
				axios.post(API_URL+"api-auth/verify-pan-number-v3",jsonFormData).then((res) => {
				if(res?.data?.data!=undefined){
					let response = res.data;
					setName(response?.data?.result?.name);
					setDob(new Date(response?.data?.result?.dob));
					setReadOnly(true)
					//console.log(new Date(response?.data?.result?.dob))
					setPanNumberCheckError(false);
					setNameError(false);
					setPanValid(true)
				}else{
					setName("");
					setPanNumberCheckError(true);
					setPanValid(false)
					setReadOnly(false)
				}
				setLoader(false)
				}).catch((e) => {
					console.log(e);
					setPanValid(false)
					setLoader(false)
					setReadOnly(false)
				})	   
	  }

	  const [aadhaarNumberCheckError,setAadhaarNumberCheckError] = useState("");

	const  verifyAadharNo= (aadhaar) =>{
		setLoader(true)
		let jsonFormData = {
			// patronid:patronid,
			// token:accessToken,
			uid	:aadhaar
		}
				axios.post(API_URL+"api-auth/verify-aadhar-number-v3",jsonFormData).then((res) => {
				if(res?.data?.data!=undefined){
					let response = res.data;
					if(res?.data?.data?.result?.verified){
						setAadhaarNumberCheckError(false);
						setAadhaarValid(true)
					}
					else{
						setAadhaar("");
						setAadhaarNumberCheckError(true);
						setAadhaarValid(false)
					}
					
				}else{
					setAadhaar("");
					setAadhaarValid(false)
					setAadhaarNumberCheckError(true);
				}
				setLoader(false)
				}).catch((e) => {
					console.log(e);
					setLoader(false)
				})	   
	  }
  
/*
	  const getToken = () =>{
			axios.post(API_URL+"api-auth/token").then((res) => {
				let response = res.data;
				setPatronid(response?.data?.userId)
				setAccessToken(response?.data?.id);
			}).catch((e) => {
				console.log(e);
			})	  
	  }
*/
	const [isEditable, setIsEditable] = useState(true);
	const [emailExistVerify, setEmailExistVerify] = useState(false)
	const sendVerificationEmail = (e) => {
		setEmailExistVerify(false)
	  	if(validateEmail(e.target.value)){
	  		axios.post(API_URL+"user/send-verification",{email: e.target.value, loanType: loanPurpose, caseId: caseId}).then((res) => {
				let response = res.data;
				if(response?.status == 400 && response?.data?.emailExists){
					setEmailExistVerify(true)
				}else{
					toast.success("Verification link sent to your email address. If you did not receive the email, please check your spam/junk folder."); 
					setIsEditable(false)
				}
			}).catch((e) => {
				console.log(e);
			})
	  	}
	}
	
	const disableEmailInput = () => {
		setIsEditable(true)
	}

	return(
		<>	
			{loader?<Loading />:""}
			<div className="col-md-12 col-lg-6" style={{display:(activeCard === "personal-detail")?"block":"none"}} >
			<h4 className="top-heading employer-head">Enter Personal details</h4>
			<div className="inner-employement">
				<div className="input-radio loan-in radio-btn">
				{
					loanPurpose === "1"?<><div className="salary-radio" >
						<input type="radio" name="employment-type" value={"employed"} checked={employmentDetail === "employed"?true:false} onChange={handleEmployementDetail} id="employed"/>
						<label for="employed">Self Employed</label>
					</div></>:""
				}
					
					{loanPurpose === "2"?<><div className="salary-radio">
						<input type="radio" name="employment-type" value={"salaried"} checked={employmentDetail === "salaried"?true:false} onChange={handleEmployementDetail} id="salaried"/>
						<label for="salaried">Salaried</label>
					</div></>:""}
					
				</div>
				<div className="form-group loan-in" style={{"display":employmentDetail === "salaried"?"none":"block"}}>
					<label>Type of Business</label>
					<div className="row year-month">
						<div className="col-md-12">
							<select className={businessTypeError?"form-control error":"form-control"} onChange={handleBusinessType}>
		      					<option value="">Select type of business</option>
		      					{
		      						businessTypeData.map((v, i) => {
		      							return(<option value={v?.id} selected={(v?.id == preFillData?.personal_detail?.business_type)?true:""} >{v?.name}</option>)
		      						})
		      					}
		   					</select>
						   <div className="alertbox">{businessTypeError && <small >Please select here</small>}</div>
						</div>
					</div>
				</div>
				<div className="form-group loan-in" style={{"display":employmentDetail === "employed" && businessType == "5"?"block":"none"}}>
					<label>Select Profession</label>
					<div className="row year-month">
						<div className="col-md-12">
							<select className={subBusinessTypeError?"form-control error":"form-control"} onChange={handleSubBusinessType}>
		      					<option value="">Select Profession</option>
		      					{
		      						subBusinessTypeData.map((v, i) => {
		      							return(<option value={v?.id} selected={(v?.id == preFillData?.personal_detail?.sub_business_type)?true:""  } >{v?.name}</option>)
		      						})
		      					}
		   					</select>
						   <div className="alertbox">{subBusinessTypeError && <small >Please select here</small>}</div>
						</div>
					</div>
				</div>
				<div className="form-group loan-in" style={{"display":businessType == "6"?"block":"none"}}>
					<label>Type of Business</label>
					<div className="row year-month">
						<div className="col-md-12">
							<input type="text" value={businessTypeOther} onChange={handleBusinessTypeOther} className={businessTypeOtherError?"salary-input error":"salary-input"} placeholder="Enter type of business"/>
						</div>
					</div>
				</div>
				<div className="form-group loan-in row">
					<div className="col-md-6 spacing">
						<label>Mobile Number</label>
						<div className="">
							<InputMask mask="999 999 9999" type="tel" maskChar="" className={mobileNumberError?"salary-input error":"salary-input"} value={mobileNumber} placeholder="999 999 9999" onChange={handleMobileNumber} readOnly={(localStorage.getItem('mobile_no') != null)?true:false}/>
						</div>
						{mobileNumberError && <small className="alertbox">Please fill here</small>}
					</div>
					<div className="col-md-6 spacing">
						<label>Email ID</label>
						<div className="">
						<input type="text" value={emailId} onChange={handleEmailID} className={emailIdError?"salary-input error":"salary-input"} placeholder="Enter email id" onBlur={sendVerificationEmail} disabled={!isEditable}/>
						</div>
						{
							!isEditable?<span style={{
							"position": "absolute",
						    "cursor": "pointer",
						    "color": "#5271ff"
						}} onClick={disableEmailInput}>Edit</span>:""}
						{emailIdError?emailExist?<small className="alertbox">Email already exists </small>: <small className="alertbox">Please fill here</small>:""}
						{emailExistVerify?<small className="alertbox">Email already exists. </small>: ""}
					</div>
				</div>
				<div className="form-group loan-in row">
					<div className="col-md-6 spacing">
						<label>PAN # {employmentDetail === "employed"?(businessType?(businessType == "1"?"(Individual)":"(Company)"):""):""}</label>
						<div className="">
						<InputMask mask="aaaaa9999a" maskChar="" className={panNumberError?"salary-input error":"salary-input"} value={panNumber} placeholder="AZSPT5997H" onChange={handlePanNumber}/>
						{panValid?<i className="fa fa-check" style={{"position": "absolute","color": "green"}}></i>:""}
						</div>
						{panNumberError?<small className="alertbox">Please fill here</small>:(panNumberCheckError ? <small className="alertbox">Invalid PAN number</small> :(panNumberExistError?<small className="alertbox">PAN Number already registered with us!</small>:""))}

					</div>
					<div className="col-md-6 spacing" style={{display:(employmentDetail === "employed")?"none":"block"}}>
						<label>Aadhaar Number</label>
						<div className="">
						<InputMask mask="9999 9999 9999" maskChar="" type="tel" className={aadhaarError?"salary-input error":"salary-input"} value={aadhaar} placeholder="9999 9999 9999" onChange={handleAadhaar}/>
						{aadhaarValid?<i className="fa fa-check" style={{"position": "absolute","color": "green"}}></i>:""}
						</div>
						{aadhaarError? <small className="alertbox">Please fill here</small>:(aadhaarNumberCheckError ? <small className="alertbox">Invalid aadhaar number</small> :"")}
					</div>
					<div className="col-md-6 spacing" style={{display:(employmentDetail === "employed")?"block":"none"}}>
						<label>{businessType == "1"?"Date Of Birth":"Date of Incorporation"}</label>
						<div className="">
						<DatePicker className={dobError?"salary-input error":"salary-input"} onChange={handleDateOfBirth} selected={dob} dateFormat="dd/MM/yyyy" placeholderText={businessType == "1"?"Date Of Birth":"Date of Incorporation"} dropdownMode="select" showMonthDropdown showYearDropdown adjustDateOnChange maxDate={(businessType == "1")?calculateMaxDate():new Date()} onKeyDown={(e) => {e.preventDefault(); }} readOnly={readonly}/>
						</div>
						{dobError && <small className="alertbox">Please fill here</small>}
					</div>
				</div>
				<div className="form-group loan-in row">
					{
						businessType == "1"?<div className="col-md-6 spacing">
						<label>Date Of Incorporation</label>
						<div className="">
						<DatePicker className={dobError?"salary-input error":"salary-input"} onChange={handleDateOfInc} selected={doi} dateFormat="dd/MM/yyyy" placeholderText="Date Of Incorporation" dropdownMode="select" showMonthDropdown showYearDropdown adjustDateOnChange maxDate={new Date()} onKeyDown={(e) => {e.preventDefault(); }}/>
						</div>
						{dobError && <small className="alertbox">Please fill here</small>}
						</div>:""
					}
					<div className={(employmentDetail === "employed" &&  businessType != "1")?"col-md-12 spacing":"col-md-6 spacing"}>
						<label>Name {employmentDetail === "employed"?(businessType?(businessType == "1"?"(Company or Individual)":"(Company)"):""):""}</label>
						<div className="">
						<input type="text" className={nameError?"salary-input error":"salary-input"} placeholder={employmentDetail === "employed"?(businessType?(businessType == "1"?"Name (Company or Individual)":"Name (Company)"):"Name"):"Name"} onChange={handleName} value={name} readOnly/>
						</div>
						{nameError && <small className="alertbox">Please fill here</small>}
					</div>
					<div className="col-md-6 spacing" style={{display:(employmentDetail === "employed")?"none":"block"}}>
						<label>Date Of Birth</label>
						<div className="">
						<DatePicker className={dobError?"salary-input error":"salary-input"} onChange={handleDateOfBirth} selected={dob} dateFormat="dd/MM/yyyy" placeholderText="Date Of Birth" dropdownMode="select" showMonthDropdown showYearDropdown adjustDateOnChange maxDate={calculateMaxDate()} onKeyDown={(e) => {e.preventDefault(); }} disabled/>
						</div>
						{dobError && <small className="alertbox">Please select DOB</small>}
					</div>
				</div>

				<div className="current-address">
					<label className="permanent">{employmentDetail === "salaried"?"Permanent Address":"Company Address"}</label>
					<div className="form-group loan-in row">
						<div className="col-md-6 spacing">
							<label>Addess 1</label>
							<div className="">
							<input type="text" className={addOneError?"salary-input error":"salary-input"} placeholder="Enter address 1" value={addOne} onChange={handleAddOne}/>
							</div>
						</div>
						<div className="col-md-6 spacing">
							<label>Addess 2</label>
							<div className="">
							<input type="text" className={addTwoError?"salary-input error":"salary-input"} placeholder="Enter address 2" value={addTwo} onChange={handleAddTwo}/>
							</div>
						</div>
					</div>
					<div className="form-group loan-in row">
						<div className="col-md-6 spacing">
							<label>Landmark</label>
							<div className="">
							<input type="text" className={streetError?"salary-input error":"salary-input"} placeholder="Enter landmark" value={street} onChange={handleStreet}/>
							</div>
						</div>
						<div className="col-md-6 spacing">
							<label>Pin code</label>
							<div className="">
							<InputMask mask="999999" type="tel" maskChar="" className={pinCodeError?"salary-input error":"salary-input"} placeholder="Enter pin code" value={pinCode} onChange={handlePinCode} onKeyUp={(e) => getAddressByPin(e, "permanent")}/>
							</div>
						</div>
						
					</div>
					<div className="form-group loan-in row">
						<div className="col-md-6 spacing">
							<label>State</label>
							<div className="">
							<input type="text" className={stateError?"salary-input error":"salary-input"} placeholder="Enter state" value={state} onChange={handleState}/>
							</div>
						</div>
						<div className="col-md-6 spacing">
							<label>City, District</label>
							<div className="">
							<input type="text" className={cityError?"salary-input error":"salary-input"} placeholder="Enter city" value={city} onChange={handleCity}/>
							</div>
						</div>						
					</div>
					{(addOneError || addTwoError || streetError || pinCodeError || stateError || cityError) && <small className="alertbox">Please fill all columns</small>}					
				</div>
				{
					employmentDetail === "salaried"?<>
				<div className="same-as form-check">
					<input type="checkbox" className="form-check-input" checked={isSameAddress} onChange={handleSameAddress}/>
					<label className=" form-check-label">Current address same as permanent address
					</label>
				</div>
				
				<div className="current-address">
					<label className="permanent">Current Address</label>
					<div className="form-group loan-in row">
						<div className="col-md-6 spacing">
							<label>Addess 1</label>
							<div className="">
							<input type="text" className={addOneCurrentError?"salary-input error":"salary-input"} placeholder="Enter address 1" value={addOneCurrent} onChange={handleAddOneCurrent}/>
							</div>
						</div>
						<div className="col-md-6 spacing">
							<label>Addess 2</label>
							<div className="">
							<input type="text" className={addTwoCurrentError?"salary-input error":"salary-input"} placeholder="Enter address 2" value={addTwoCurrent} onChange={handleAddTwoCurrent}/>
							</div>
						</div>
					</div>
					<div className="form-group loan-in row">
						<div className="col-md-6 spacing">
							<label>Landmark</label>
							<div className="">
							<input type="text" className={streetCurrentError?"salary-input error":"salary-input"} placeholder="Enter landmark" value={streetCurrent} onChange={handleStreetCurrent}/>
							</div>
						</div>
						<div className="col-md-6 spacing">
							<label>Pin code</label>
							<div className="">
							<InputMask mask="999999" type="tel" maskChar="" className={pinCodeCurrentError?"salary-input error":"salary-input"} placeholder="Enter pin code" value={pinCodeCurrent} onChange={handlePinCodeCurrent} onKeyUp={(e) => getAddressByPin(e, "current")}/>
							</div>
						</div>
						
					</div>
					<div className="form-group loan-in row">
						<div className="col-md-6 spacing">
							<label>State</label>
							<div className="">
							<input type="text" className={stateCurrentError?"salary-input error":"salary-input"} placeholder="Enter state" value={stateCurrent} onChange={handleStateCurrent}/>
							</div>
						</div>
						<div className="col-md-6 spacing">
							<label>City, District</label>
							<div className="">
							<input type="text" className={cityCurrentError?"salary-input error":"salary-input"} placeholder="Enter city" value={cityCurrent} onChange={handleCityCurrent}/>
							</div>
						</div>
						
					</div>
					{(addOneCurrentError || addTwoCurrentError || streetCurrentError || pinCodeCurrentError || stateCurrentError || cityCurrentError ) 
						&& <small className="alertbox">Please fill all columns</small>}
				</div>

				
				<div className="form-group loan-in">
					<label>Gender</label>
					<div className="">
					<div className="form-check form-check-inline radio-btn">
  						<input className="form-check-input" type="radio" name="gender" value="male" id="male" checked={gender === "male"?true:false} onChange={handleGender}/>
  						<label className="form-check-label" for="male">Male</label>
					</div>
					<div className="form-check form-check-inline radio-btn">
  						<input className="form-check-input" type="radio" name="gender" value="female" id="female" checked={gender === "female"?true:false} onChange={handleGender} />
  						<label className="form-check-label" for="female">Female</label>
					</div>
					<div className="form-check form-check-inline radio-btn">
  						<input className="form-check-input" type="radio" name="gender" value="others" id="others" checked={gender === "others"?true:false} onChange={handleGender} />
  						<label className="form-check-label" for="others">Others</label>
					</div>
					</div>
				</div>
				<div className="form-group loan-in">
					<label>Relationship status</label>
					<div className="row year-month">
						<div className="col-md-12">
							<select value={relationshipStatus} className={relationshipStatusError?"form-control error":"form-control"} onChange={handleRelashipStatus}>
		      					<option value="">Select relationship status </option>
		      					<option value="Single">Single</option>
		      					<option value="Married">Married</option>
		      					<option value="Other">Other</option>
		   					</select>
						</div>
					</div>
					{relationshipStatusError && <small className="alertbox">Please select one</small>}
				</div>	

				</>:""}

                <div className="form-group loan-in">
					<label> Do you have any active Loan(s) (Personal , Home, ..etc) ?</label>
					<div className="row year-month">
						<div className="col-md-12">
							<select value={pastLoan} className={pastLoanError?"form-control error":"form-control"} onChange={handlePastLoan}>
		      					<option value="">Select</option>
		      					<option value="Yes" >Yes</option>
		      					<option value="No" >No</option>
		      				</select>
						   <div className="alertbox">{pastLoanError && <small >Please select here</small>}</div>
						</div>
					</div>
				</div> 

				<div className="loan-in" style={{"display":(pastLoan=="Yes")?"block":"none"}}>
					       <label>How much EMI (mention total monthly EMI commitment ) you are paying currently ?</label>
							<CurrencyInput
							  className="salary-input"
							  value={pastLoanAmount}
							  placeholder="Past loan"
							  decimalsLimit={0}
							  intlConfig={{ locale: 'en-IN', currency: 'INR' }}
							  prefix="₹"
							  onValueChange={handlePastLoanAmount}
							  //disabled={true}
							 
							/>
							
							<div className="textSize" > {numberToText.convertToText(pastLoanAmount,{language:"en-in"})}</div>
							<div className="alertbox" style={{"marginTop":"5px"}}>{pastLoanAmountError && <small >Please select here</small>}</div>
				</div> 

				<div className="form-group form-check terms-sec">
	    			<input type="checkbox" className="form-check-input terms-conditions" id="exampleCheck1" checked/>
	    			<label className="form-check-label terms-conditions" for="exampleCheck1">I/We confirm that we have read and understood the <Link to="/terms-of-use" target='_blank' className="link-terms">'Terms and Conditions'</Link> and agree to the 'Declaration'
					 provided in the <Link to="/declaration"  target='_blank' className="link-terms">'Click Here'</Link> link.</label>
  				</div>
				<div className="continue-btn  personal-continue">
                    <button className="btn btn-login" onClick={checkEmailExist} disabled={isDisableBtn}>
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
			</div>
			</div>
			<div className="col-md-12  col-lg-3 chat-triangle" style={{"display":"none"}}>
				<div className=" employer-sec">
					<div className="triabgel-Icons"><img src={TriangleLeft} /></div>
					<div className="chatIcons">
						<img src={ChatGirlImage} />
					</div>
					<div className="chatText">
						<p>Hi there, I'm Grace. I'll help you complete the questions to get you the best quote possible!</p>
					</div>
				</div>				
			</div>	
			<ToastContainer />  
		</>
	)
}