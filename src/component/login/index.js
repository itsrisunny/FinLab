import React, { useState, useEffect} from "react";
import LoginHeader from "./../layouts/login-header";
import OTPComponent from "./otpComponent";
import MobileNumberComponent from "./mobileNumberComponent";
import LoginBGImage from "../../assets/images/login-page/Login1.png";
import InputMask from 'react-input-mask';
import axios from "axios";
import { API_URL } from './../../config/constant';
import Alert from 'react-bootstrap/Alert';
 import Loading from '../loader/index'
function Login(){
const [phoneNumber, setPhoneNumber] = useState("")
const [displayComp, setDisplayComp] = useState(0);
const [phoneNumberError, setPhoneNumberError] = useState(false)
const [preFillOTP, setPreFillOTP] = useState("")
const [userId, setUserId] = useState(0)
const [message, setMessage] = useState("");
const [isDisableBtn, setIsDisableBtn] = useState(false);
const [loadingBtn,setLoadingBtn] = useState(false);
const [show, setShow] = useState(false);
const [varient, setVariant] = useState("")
const handleValidation = () => {
    let isFormValid = true;
    if(!phoneNumber){
        isFormValid = false;
        setPhoneNumberError(true)
    }
    if((phoneNumber.replace(/ /g,'')).length !== 10){
        isFormValid = false;
        setPhoneNumberError(true)
    }
    return isFormValid;
}



const handleSubmit = (e) => {
    e.preventDefault();
    if(handleValidation()){
        setIsDisableBtn(true)
        axios.post(API_URL+"token/generate-token",{user_id: "0"}).then((res) => {
            let response = res.data;
            if(response?.token){
                axios.post(API_URL+"login/verify-mobile",{mobile: phoneNumber.replace(/ /g,''), token:response?.token}).then((res) => {
                    let res_data = res?.data;
                    if(res_data?.status === 200){
                        setDisplayComp(1);
                        setPreFillOTP(res_data?.data?.otp)
                        setUserId(res_data?.data?.user_id)
                        setMessage(res_data?.message)
                        setShow(true)
                        setVariant("success")
                        localStorage.setItem("mobile_no",phoneNumber.replace(/ /g,''));
                        setTimeout(() => { 
                            setShow(false)
                        }, 3000);
                     
                         
                    }
                    setIsDisableBtn(false)
                }).catch((e) => {
                    console.log(e)
                    setIsDisableBtn(false)
                })
            }
            
        }).catch((e) => {
            console.log(e)
            setIsDisableBtn(false)
        })
        
        
    }

}
const handlePhoneNumber = (e) => {
    setPhoneNumberError(false)
    setPhoneNumber(e.target.value)
}
useEffect(() => {
    localStorage.removeItem("isAuthenticate");
    localStorage.removeItem("user_id");
  window.scrollTo({
    behavior: 'smooth',
    top: 0
  })
}, [])
const handleChangePhoneNumber = () => {
    setDisplayComp(0)
}
const showMesageFun = (data) => {
    setShow(true)
    setMessage(data?.message)
    setVariant(data?.type)
}

const isLoading = (data) =>{
    //console.log("dataww",data);
   setLoadingBtn(data);      
}

useEffect(()=>{
    setLoadingBtn(isDisableBtn);
},[isDisableBtn]);
//const [display,setDispaly] = useState("flex");
return(
   <>
   <LoginHeader />
    {isDisableBtn? <Loading display={"flex"}/>: 
   <div className="container login-page " >
        <div className="row">
            <div className="col-lg-6 col-md-6">
               
                <div className="login-left-side">
                    <img src={LoginBGImage} alt="Login Background" className="img-fluid" />
                </div>
                <div className="circle-1">
                    <p>1</p>
                </div>
            </div>
            <div className="col-lg-6 col-md-6">
            {
                show?<>
                <Alert variant={varient} onClose={() => setShow(false)} dismissible>
                    {message}
                </Alert>
                </>:""
            }
            
            <h3 className="login-head">Log in</h3>
                <div className={!displayComp?"login-inner block":"login-inner none"}>
                    <MobileNumberComponent phoneNumberError={phoneNumberError} handlePhoneNumber={handlePhoneNumber} handleSubmit={handleSubmit} isDisableBtn={isDisableBtn}/>
                </div>
                <div className={displayComp?"login-inner login-otp block fade-in":"login-inner login-otp none"}> 
                    <OTPComponent preFillOTP={preFillOTP} phoneNumber={phoneNumber} handleChangePhoneNumber={handleChangePhoneNumber} userId={userId} showMesageFun={showMesageFun} isLoading={isLoading}/>
                </div>
            </div>

           
           
              
            </div>


        
    </div> 
   } 
   </>
)
}

export default Login;