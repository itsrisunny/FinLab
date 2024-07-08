import React, { useEffect, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FinlabLogo from "../../../assets/images/header/logoback.svg"
import Spinner from 'react-bootstrap/Spinner';
import { API_URL } from './../../../config/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Index(){
	const [userEmail,setUserEmail] = useState("");
	const [password,setPassword] = useState("");
	const [userEmailError,setUserEmailError] = useState(false);
	const [passwordError,setPasswordError] = useState(false);
	const [isDisableBtn, setIsDisableBtn] = useState(false)
	let navigate = useNavigate();
   
	const isLogin=localStorage.getItem('isPartnerLogin');
	useEffect(() => {
		if(isLogin){
		return  navigate('/partners-admin/dashboard')
		
		 }
	  });

	const handelUser =(e) =>{
		setUserEmailError(false)
		setUserEmail(e.target.value)
	}

	const handelPassword =(e) =>{
		setPasswordError(false)
		setPassword(e.target.value)
	}

	const validateEmail = (email) => {
		return email.match(
		  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	  };
   
	const hanldeLoginDetails = () => { 
		if(handleValidation()){
			setIsDisableBtn(true)
			axios.post(API_URL+"token/generate-token",{user_id: "0"}).then((res) => {
				let response = res.data;
                if(response?.token){
                	let jsonFormData = {
						user: userEmail,
						password: password,
						token: response?.token
					}
					axios.post(API_URL+"partners-admin/verify-user",jsonFormData).then((res) => {
						let response = res.data;
						if(response?.status == 200){
							
							localStorage.setItem('isPartnerLogin',true);
							localStorage.setItem('partner_name',response.data?.name);
							localStorage.setItem('partner_email',response.data?.email_id);
							localStorage.setItem('partner_id',response.data?.partner_id);
							localStorage.setItem('id',response.data?.id);
							 
							toast.success(response?.message);
							return navigate('/partners-admin/dashboard');
						}
						if(response?.status == 404){
							toast.error(response?.message);
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

	const handleValidation = () => {
		let isFormValid = true;
        if(!userEmail){
			isFormValid = false;
			setUserEmailError(true);
		}
		if(!validateEmail(userEmail)){
			isFormValid = false;
			setUserEmailError(true);
		}
		if(!password){
			isFormValid = false;
			setPasswordError(true);
		}
		return isFormValid;
	}
    


	return(
		<>
			<div className="adminLogin">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="authentic-wrapper">
								<div className="authentic-inner">
									<div className="card">
										<div className="card-body">
											<div className="appbrandnig">
												<img src={FinlabLogo} />
											</div>
											<h4 className="welcomeHeading">Welcome to Finlab! 👋</h4>
											
											<div className="login-fields">
												<div className="form-group">
													    <label for="exampleInputEmail1">Email or Username</label>
													    <input type="text" className={userEmailError?"form-control errorlogin":"form-control"}  value={userEmail} onChange={handelUser} />
												</div>
												<div className="form-group form-password-toggle">
													    <label for="password">Password</label>
													     <input type="password" className={passwordError?"form-control errorlogin":"form-control"}  value={password}  onChange={handelPassword} />
												</div>
												<div className="form-group form-check">
											    	<input type="checkbox" className="form-check-input" id="exampleCheck1" />
											    	<label className="form-check-label" for="exampleCheck1">Remember Me</label>

											    	<label className="form-check-label" style={{"float": "right"}}><Link to="/partners/reset-password">Forgot Password?</Link></label>
											    </div>
											    <div className="form-group loginBtns">
											    	<button className="btn btn-adminLogin"onClick={hanldeLoginDetails} disabled={isDisableBtn}>
															{
																isDisableBtn?<><Spinner
															as="span"
															animation="border"
															size="sm"
															role="status"
															aria-hidden="true"
															/> Please Wait...</>:"Login"
															}</button>
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


            <ToastContainer />
		</>
	)
}