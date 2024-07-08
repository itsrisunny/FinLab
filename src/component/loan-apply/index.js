import React, {useEffect, useState} from "react";
import LoginHeader from "./../layouts/login-header";
import NavigationBar from "./navigationBar";
import LoanDescription from "./loanDescription";
import EmployerDetails from "./employerDetails";
import PersonalDetails from "./personalDetails";
import SalariedDocument from "./salariedDocument";
import SelfEmployeeDocument from "./selfEmployeeDocument";
import Congratulation from "./congratulation";
import Offers from "./offers";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { API_URL } from './../../config/constant';
import CryptoJS from "crypto-js";
import {useLocation} from "react-router-dom"
import Loading from "../loader/index";
export default function Dashboard(){
	const [isAuthenticate, setIsAuthenticate] = useState(localStorage.getItem("isAuthenticate"))
	let navigate = useNavigate();
	const [loanAmount, setLoanAmount] = useState(50000)
	const [loanPurpose, setLoanPurpose] = useState("")
	const [subLoanPurpose, setSubLoanPurpose] = useState("")
	const [duration, setDuration] = useState("")
	const [loanPurposeError, setLoanPurposeError] = useState(false)
	const [subLoanPurposeError, setSubLoanPurposeError] = useState(false)
	const [durationError, setDurationError] = useState(false)
	const [activeCard, setActiveCard] = useState("loan-card")
	const [activeStatus, setActiveStatus]  = useState(0)
	const [userType, setUserType] = useState("salaried")
	const [businessType, setBusinesType] = useState("")
	const [iFileType, setIFileType] = useState("")
	const [isDisableBtn, setIsDisableBtn] = useState(false)
	const [display,setDisplay] = useState("none");
	const [caseId, setCaseId] = useState("")
	const [resData, setResData] = useState("")
	const [profileData, setProfileData] = useState([]);
	const handleRange = (e) => {
		setLoanAmount(parseInt(e[1]))
	}
	const handleDuration = (duration) => {
		setDurationError(false)
		setDuration(duration)
	}
	const handleLoanPurpose = (e) => {
		setLoanPurposeError(false)
		setLoanPurpose(e.target.value)
	}
	const handleSubLoanPurpose = (e) => {
		setSubLoanPurposeError(false)
		setSubLoanPurpose(e.target.value)
	}
	const {search} = useLocation();
	const handleLoanAmount = (e) => {
		//console.log(parseInt(e))

		setLoanAmount(e?e:0);
	}
	useEffect(() => {
		const searchParams = new URLSearchParams(search);
		const param = searchParams.get("_action");
		const secretPass = "my-secret";
		const bytes = CryptoJS.AES.decrypt(param.replace(/ /g,"+") , secretPass)
		const data = bytes.toString(CryptoJS.enc.Utf8);
		setLoanPurpose(data)
	},[search])
	useEffect(() => {		
		
		window.scrollTo({
		    behavior: 'smooth',
		    top: 0
		})
		if(isAuthenticate !== "true"){
			navigate("/login")
		}else{
			
			if(localStorage.getItem("active_case_id")!= null && localStorage.getItem("is_case_close") == "false"){
				getProfileData();
			}
			
			
		}
	},[isAuthenticate])

    const getProfileData = () =>{
		setDisplay("flex")
		axios.post(API_URL+"token/generate-token",{user_id: localStorage.getItem("user_id")}).then((res) => {
			let response = res.data;
			if(response?.token){
				let jsonFormData = {
					caseId:localStorage.getItem("active_case_id"),
					token: response?.token
				}
				axios.post(API_URL+"profile/details",jsonFormData).then((res) => {
					let response = res.data;
					if(response?.status === 200){
						setProfileData(response?.respData);
                        let loan = response?.respData?.loan_requirement;   

						setLoanAmount(loan?.loan_required_amount ? loan?.loan_required_amount : 50000 );
						setLoanPurpose(loan?.purpose_of_loan ? loan?.purpose_of_loan : "");
						setSubLoanPurpose(loan?.sub_loan_of_purpose ? loan?.sub_loan_of_purpose : "");
						setDuration(loan?.loan_duration ? loan?.loan_duration : "")
						setUserType(response?.respData?.user_detail?.user_type ? response?.respData?.user_detail?.user_type : "salaried")
						setBusinesType(response?.respData?.personal_detail?.business_type ? response?.respData?.personal_detail?.business_type : "" )
						localStorage.setItem("panName",response?.respData?.personal_detail?.name ? response?.respData?.personal_detail?.name :"")
						
					}
					setDisplay("none")
					
				}).catch((e) => {
					setDisplay("none")
					console.log(e)
				})
			}
			
		}).catch((e) => {
			setDisplay("none")
			console.log(e)
			setIsDisableBtn(false)
		})
		
	} 
	useEffect(() => {
		
		if(localStorage.getItem('active_case_id')){
			setCaseId(localStorage.getItem('active_case_id'))
		}
	},[localStorage.getItem('active_case_id'),display])
	const handleValidationLoan = () => {
		let isFormValid = true;
		if(!loanPurpose){
			setLoanPurposeError(true)
			isFormValid = false
		}
		if(loanPurpose !== "5" && !subLoanPurpose){
			setSubLoanPurposeError(true)
			isFormValid = false
		}
		if(!duration){
			setDurationError(true)
			isFormValid = false
		}
		return isFormValid;
	}
	const handleLoanDescription = () => {
		if(handleValidationLoan()){
			setDisplay("flex")
			setIsDisableBtn(true)
			axios.post(API_URL+"token/generate-token",{user_id: localStorage.getItem("user_id")}).then((res) => {
				let response = res.data;
                if(response?.token){
                	let jsonFormData = {
						userID:localStorage.getItem("user_id"),
						loanAmount:loanAmount,
						loanPurpose:loanPurpose,
						subLoanPurpose:subLoanPurpose,
						durationOfLaon:duration,
						token: response?.token,
						caseId : ((localStorage.getItem('active_case_id') != null )?localStorage.getItem('active_case_id'):"")
					}
					axios.post(API_URL+"user/loan-requirement",jsonFormData).then((res) => {
						let response = res.data;
						if(response?.status === 200){
							setCaseId(response?.case_id)
							localStorage.setItem("active_case_id", response?.case_id)
							setActiveStatus(2)
							setActiveCard("personal-detail")
						}
						setIsDisableBtn(false)
						setDisplay("none")
					}).catch((e) => {
			            console.log(e)
			            setIsDisableBtn(false)
						setDisplay("none")
			        })
                }
                
			}).catch((e) => {
				console.log(e)
				setIsDisableBtn(false)
				setDisplay("none")
			})
			
		}
	}
	const handleNextStep = (activeType, businessType) => {
		setActiveStatus(3)
		setUserType(activeType)
		setActiveCard("employer-detail")
		setBusinesType(businessType)
	}
	const handleNextToUplaod = (activeType, IFileType) => {
		setActiveStatus(4)
		setUserType(activeType)
		setActiveCard("upload-document")
		if(IFileType){
			setIFileType(IFileType)
		}
	}
	const handleCongratulation = (case_number) => {
		setResData(case_number)
		setActiveStatus(5)
		setActiveCard("congratulation")
	}
	const handleSteps = (cardId) => { 
		if(activeStatus <= 5 && cardId === "1"){
			setActiveCard("loan-card")
		}
		if(activeStatus <= 5 && activeStatus >= 2 && cardId === "2"){
			setActiveCard("personal-detail")
		}
		if(activeStatus <= 5 && activeStatus >= 3 && cardId === "3"){
			setActiveCard("employer-detail")
		}
		if(activeStatus <= 5 && activeStatus >= 4 && cardId === "4"){
			setActiveCard("upload-document")
		}
		if(activeStatus <= 5 && activeStatus >= 5 && cardId === "5"){
			setActiveCard("congratulation")
		}
		
	}

   	const [offers,setOffers]=useState(false)
	useEffect(()=>{
		getPrefiledData(profileData);
		getOfferData(profileData);
		
	 },[profileData])
	 
	 function getPrefiledData(preData){
		 if(Object.keys(preData).length){
			 //console.log(Object.keys(preData?.loan_requirement));
			 if(Object.keys(preData?.loan_requirement).length){
				setActiveStatus(2)
			 }
			 if(Object.keys(preData?.personal_detail).length){
				setActiveStatus(3)
			 }
			 if(Object.keys(preData?.salaried_detail).length || Object.keys(preData?.self_employee_detail).length){
				setActiveStatus(4)
			 }
			 if(preData?.files.length){
				setActiveStatus(5);
				handleSteps(5);
				setActiveCard("congratulation")
			 }
		 }
 
	 }
	  
	  function getOfferData(preData){
  
		  if(Object.keys(preData).length){
			  			  
			  if(preData?.offers.length){
				setOffers(true)
			  }
		  }
  
	  }
	 
	 const loading =(data) =>{
		setDisplay(data);
	 } 
	
	 const handelMinValue =()=>{
		if(loanAmount<50000){
			setLoanAmount(50000);
		}
	 }

	  const panName = (data) =>{
		//console.log("panName",data);
		localStorage.setItem("panName",data);

	 }
	return(
		<>
			<LoginHeader />
			<div className="container">
				<div className="row">
					<NavigationBar activeStatus={activeStatus} handleSteps={handleSteps} preFillData = {profileData} offers={offers} />
					<LoanDescription handleLoanAmount={handleLoanAmount} activeCard={activeCard} preFillData = {profileData?.loan_requirement} loanAmount={loanAmount} handleLoanDescription={handleLoanDescription} handleRange={handleRange} handleLoanPurpose={handleLoanPurpose} loanPurpose={loanPurpose} duration={duration} handleDuration={handleDuration} loanPurposeError={loanPurposeError} durationError={durationError} isDisableBtn={isDisableBtn} handleSubLoanPurpose={handleSubLoanPurpose} subLoanPurpose={subLoanPurpose} subLoanPurposeError={subLoanPurposeError} handelMinValue={handelMinValue}/>
					<PersonalDetails caseId={caseId} loanPurpose={loanPurpose} activeCard={activeCard} preFillData = {profileData} handleNextStep={handleNextStep} loading={loading}  panName={panName}/>
					<EmployerDetails caseId={caseId} activeCard={activeCard}  preFillData = {profileData} employmentDetail={userType}  handleNextToUplaod={handleNextToUplaod} businessTypeSelect={businessType} loading={loading}/>
					<SalariedDocument caseId={caseId} activeCard={activeCard} preFillData = {profileData} userType={userType} handleCongratulation={handleCongratulation} loading={loading} />
					<SelfEmployeeDocument caseId={caseId} activeCard={activeCard} preFillData = {profileData} userType={userType} businessTypeSelect={businessType} iFileType={iFileType} handleCongratulation={handleCongratulation} loading={loading}/>
					<Congratulation activeCard={activeCard} resData={resData} preFillData = {offers} profileData = {profileData} />
					{/*<Offers activeCard={activeCard} resData={resData} preFillData = {offers} />*/}
					<Loading dispaly={display} />
				</div>
			</div>
			
		</>
	)
}