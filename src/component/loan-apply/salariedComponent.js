import React, {useEffect, useState} from "react";
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field';
import axios from "axios";
import { API_URL } from './../../config/constant';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function SalariedComponent({handleNextToUplaod, preFillData , caseId,loading}){
	const [monthlyIncomeError, setMonthlyIncomeError] = useState(false)
	const [monthlyIncome, setMonthlyIncome] = useState("")
	const [salaryRecievedInError, setSalaryRecievedInError] = useState(false)
	const [salaryRecievedIn, setSalaryRecievedIn] = useState("")
	const [companyNameError, setCompanyNameError] = useState(false)
	const [companyName, setCompanyName]	 = useState("")
	const [tenureError, setTenureError] = useState(false)
	const [tenure, setTenure]	 = useState("")
	const [experienceError, setExperienceError] = useState(false)
	const [experience, setExperience]	 = useState("")
	const [emailError, setEmailError] = useState(false)
	const [email, setEmail]	 = useState("")
	const [npError, setNpErorr] = useState(false)
	const [np, setNp]	 = useState("")
	const [workingError, setWorkingErorr] = useState(false)
	const [working, setWorking]	 = useState("")
	const [isDisableBtn, setIsDisableBtn] = useState(false)
	const [display,setDisplay] = useState("none");
	const handleMonthlyIncome = (e) => {
		setMonthlyIncomeError(false)
		setMonthlyIncome(e?e:0)
	}
	const handleSalaryRecieved = (e) => {
		setSalaryRecievedInError(false)
		setSalaryRecievedIn(e.target.value)
	}
	const handleCompanyName = (e) => {
		setCompanyNameError(false)
		setCompanyName(e.target.value)
	}
	const handleTenure = (e) => {
		setTenureError(false)
		setTenure(e.target.value)
	}
	const handleExperience = (e) => {
		setExperienceError(false)
		setExperience(e.target.value)
	}
	const handleEmail = (e) => {
		setEmailError(false)
		setEmail(e.target.value)
	}
	const validateEmail = (email) => {
	  return email.match(
	    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	  );
	};
	const handleNp = (e) => {
		setNpErorr(false)
		setNp(e.target.value)
	}
	const handleWorking = (e) => {
		setWorkingErorr(false)
		setWorking(e.target.value)
	}
	const handleValidation = () => {
		let isFormValid = true;
		if(!monthlyIncome){
			isFormValid = false;
			setMonthlyIncomeError(true)
		}
		if(!salaryRecievedIn){
			isFormValid = false;
			setSalaryRecievedInError(true)
		}
		if(!companyName){
			isFormValid = false;
			setCompanyNameError(true)
		}
		if(!tenure){
			isFormValid = false;
			setTenureError(true)
		}
		if(!experience){
			isFormValid = false;
			setExperienceError(true)
		}
		if(!email){
			isFormValid = false;
			setEmailError(true)
		}
		if(!validateEmail(email)){
			isFormValid = false;
			setEmailError(true)
		}
		if(!np){
			isFormValid = false;
			setNpErorr(true)
		}
		if(!working){
			isFormValid = false;
			setWorkingErorr(true)
		}
		return isFormValid;
	}
	const handleSalaried = () => {
		
		if(handleValidation()){
			setDisplay("flex");
			setIsDisableBtn(true)
			axios.post(API_URL+"token/generate-token",{user_id: localStorage.getItem("user_id")}).then((res) => {
				let response = res.data;
                if(response?.token){
					let jsonFormData = {
						case_id: caseId,
						net_fixed_salary: monthlyIncome,
						salary_recieved_via: salaryRecievedIn,
						company_name: companyName,
						compnay_tenure: tenure,
						total_experience: experience,
						official_email_id: email,
						are_serving_notice_period: np,
						working_as: working,
						token: response?.token
					}
					setIsDisableBtn(false)
					axios.post(API_URL+"user/salired-detail",jsonFormData).then((res) => {
						let response = res.data;
						if(response?.status === 200){
							handleNextToUplaod("salaried")
						}else{
							toast.error(response?.message)
						}
						setIsDisableBtn(false)
						setDisplay("none");
					}).catch((e) => {
						
			            console.log(e)
			            setIsDisableBtn(false)
						setDisplay("none");
						
			        })
					
				}
			}).catch((e) => {
				
            	console.log(e)
				setDisplay("none");
            })
		}
	}
    
	useEffect(() => {
	    if(Object.keys(preFillData).length){
		let salary = preFillData?.salaried_detail;
		setMonthlyIncome(salary?.net_fixed_salary?salary?.net_fixed_salary:"");
		setSalaryRecievedIn(salary?.salary_recieved_via?salary?.salary_recieved_via:"");
		setCompanyName(salary?.company_name?salary?.company_name:"");
		setTenure(salary?.compnay_tenure?salary?.compnay_tenure:"");
		setExperience(salary?.total_experience?salary?.total_experience:"");
		setEmail(salary?.official_email_id?salary?.official_email_id:"");
		setNp(salary?.are_serving_notice_period?salary?.are_serving_notice_period:"");
		setWorking(salary?.working_as?salary?.working_as:"");
	  }					
	},[preFillData])

	useEffect(()=>{
		loading(display)
	},[display]);

	const [isEditable, setIsEditable] = useState(true);
	const [emailExistVerify, setEmailExistVerify] = useState(false)
	const sendVerificationEmail = (e) => {
		setEmailExistVerify(false)
	  	if(validateEmail(e.target.value)){
	  		axios.post(API_URL+"user/send-verification-email",{email: e.target.value, caseId:  caseId}).then((res) => {
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
			<div className="form-group loan-in">
					<label>Your fix net take home salary (Monthly)</label>
					<div className="">
						<CurrencyInput
							type="tel"
						  className={monthlyIncomeError?"salary-input error":"salary-input"} value={monthlyIncome}
						  placeholder="₹ 1,00,000"
						  defaultValue={""}
						  decimalsLimit={0}
						  intlConfig={{ locale: 'en-IN', currency: 'INR' }}
						  prefix="₹"
						  onValueChange={handleMonthlyIncome}
						/>
					</div>
				</div>
				<div className="form-group loan-in">
					<label>Salary received via</label>
					<div className="row year-month">
						<div className="col-md-12">
							<select value={salaryRecievedIn} className={salaryRecievedInError?"form-control error":"form-control"} onChange={handleSalaryRecieved}>
		      					<option value="">Select salary received via </option>
		      					<option value="bank">Bank</option>
		      					<option value="cash">Cash</option>
		      					<option value="cheque">Cheque</option>
		   					</select>
						</div>
					</div>
				</div>
				<div className="form-group loan-in">
					<label>Your company name</label>
					<div className="">
						<input type="text" className={companyNameError?"salary-input error":"salary-input"} placeholder="Your company name" value={companyName} onChange={handleCompanyName}/>
					</div>
				</div>
				<div className="form-group">
					<div className="row year-month">
						<div className="col-md-6 spacing">
							<label>Your tenure in current company</label>
							<select value={tenure} className={tenureError?"form-control error":"form-control"} onChange={handleTenure}>
  								<option value="">Select tenure in current company</option>
		      					<option value="0-6 Months">0-6 Months</option>
		      					<option value="6-12 Months">6-12 Months</option>
		      					<option value="1-2 Year">1-2 Year</option>
		      					<option value="2-3 Years">2-3 Years</option>
								<option value="3-5 Years">3-5 Years</option>
								<option value="5+ Years">5+ Years</option>
		   					</select>
						</div>
						<div className="col-md-6 spacing">
					   		<label>Your total work experience</label>
					   		<select value={experience} className={experienceError?"form-control error":"form-control"} onChange={handleExperience}>
		      					<option value="">Select total work experience</option>
		      					<option value="0-6 Months">0-6 Months</option>
		      					<option value="6-12 Months">6-12 Months</option>
		      					<option value="1-2 Year">1-2 Year</option>
		      					<option value="2-3 Years">2-3 Years</option>
								<option value="3-5 Years">3-5 Years</option>
								<option value="5-10 Years">5-10 Years</option>
								<option value="10+ Years">10+ Years</option>
   							</select>
					   	</div>
					</div>
				</div>
				<div className="form-group loan-in">
					<label>Your official email-id</label>
					<div className="">
						<input type="text" className={emailError?"salary-input error":"salary-input"} value={email} onChange={handleEmail} placeholder="Your offcial email-id" onBlur={sendVerificationEmail} disabled={!isEditable}/>
						{
							!isEditable?<div style={{
							"position": "absolute",
						    "cursor": "pointer",
						    "color": "#5271ff"
						}} onClick={disableEmailInput}>Edit</div>:""}
					</div>
				</div>
				<div className="form-group loan-in">
					<div className="row year-month">
						<div className="col-md-6 spacing">
							<label>Are you serving notice period?</label>
							<select value={np} className={npError?"form-control error":"form-control"} onChange={handleNp}>
  								<option value="">Select notice period</option>
		      					<option value="Yes">Yes</option>
		      					<option value="No">No</option>
		   					</select>
						</div>
						<div className="col-md-6 spacing">
					   		<label>Are you working as/on?</label>
					   		<select value={working} className={workingError?"form-control error":"form-control"} onChange={handleWorking}>
		      					<option value="">Select working as</option>
		      					<option value="Full Time">Full Time</option>
		      					<option value="Part Time">Part Time</option>
		      					<option value="Consultant">Consultant</option>
		      					<option value="Contractual">Contractual</option>
   							</select>
					   	</div>
					</div>
				</div>
				<div className="continue-btn loan-in">
                    <button className="btn btn-login" onClick={handleSalaried} disabled={isDisableBtn}>
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
            <ToastContainer />
		</>
	)
}