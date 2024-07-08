import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import InputMask from 'react-input-mask';
import axios from "axios";
import { API_URL } from './../../config/constant';
import Spinner from 'react-bootstrap/Spinner';
function Otp({phoneNumber, handleChangePhoneNumber, userId, preFillOTP, showMesageFun,isLoading}){
    const [firstDigit, setFirstDigit] = useState("")
    const [secondDigit, setSecondDigit] = useState("")
    const [thirdDigit, setThirdDigit] = useState("")
    const [fourthDigit, setFourthDigit] = useState("")
    const [otpInputError, setOtpInputError] = useState(false)
    const [isDisableBtn, setIsDisableBtn] = useState(false)
    let navigate = useNavigate()
    useEffect(() => {
        if(preFillOTP){
            let otpArray = (preFillOTP.toString()).split("");
            setFirstDigit(otpArray[0])
            setSecondDigit(otpArray[1])
            setThirdDigit(otpArray[2])
            setFourthDigit(otpArray[3])
        }
    },[preFillOTP])
    useEffect(()=>{
        isLoading(isDisableBtn)
    },[isDisableBtn]);
    const handleOTP = () => {
        if(handleValidation()){
            setIsDisableBtn(true)
            axios.post(API_URL+"token/generate-token",{user_id: userId}).then((res) => {
                let response = res.data;
                if(response?.token){
                    let otp = firstDigit+secondDigit+thirdDigit+fourthDigit;
                    axios.post(API_URL+"login/verify-otp",{otp: otp, user_id: userId, token: response?.token}).then((res) => {
                        let res_data = res?.data;
                        console.log(res_data);
                        if(res_data?.status === 200){
                           
                                localStorage.setItem("isAuthenticate", res_data?.data?.is_authenticate);
                                localStorage.setItem("user_id", res_data?.data?.user_id);
                                if(res_data?.data?.active_case_id){
                                    localStorage.setItem("active_case_id", res_data?.data?.active_case_id);
                                    localStorage.setItem("is_case_close", res_data?.data?.is_case_close);
                                }else{
                                    localStorage.removeItem("active_case_id")
                                    localStorage.removeItem("is_case_close");
                                }
                                showMesageFun({type:"success",message: res_data?.message}) 
                                if(!res_data?.data?.offerCount){
                                         navigate("/products")
                                    }else{
                                        navigate("/dashboard")
                                    }
                        }else{
                            console.log(res_data)
                            setOtpInputError(true)
                            showMesageFun({type:"danger",message: res_data?.message})
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
    const handleValidation = () => {
        let otp = firstDigit+secondDigit+thirdDigit+fourthDigit;
        let isFormValid = true;
        if(otp.length < 4){
            isFormValid = false;
            setOtpInputError(true)
        }
        return isFormValid;
    }
    const handleOTPInput = (e) => {
        setOtpInputError(false)     
        const fieldID = (e.target.name).split("-");        
        let fieldIntIndex = fieldID[1]
        if(fieldIntIndex === "1"){
            setFirstDigit(e.target.value)
        }
        if(fieldIntIndex === "2"){
            setSecondDigit(e.target.value)
        }
        if(fieldIntIndex === "3"){
            setThirdDigit(e.target.value)
        }
        if(fieldIntIndex === "4"){
            setFourthDigit(e.target.value)
        }
        const nextfield = document.querySelector(
            `input[name=text-${parseInt(fieldIntIndex) + 1}]`
        );
        if (nextfield !== null && e.target.value) {
            nextfield.focus();
        }
    }
    

   return( 
   <>

    <p>We sent you an SMS with the code to the number<br />+91 {phoneNumber} (<Link to="#" onClick={handleChangePhoneNumber}>change</Link>)<br />Please enter the code in the input field below</p>
    <div className="form-group input-login">
    <label for="mumber">OTP</label>
    <div className="otpsection">
        <InputMask mask="9" maskChar="" type="tel" className={otpInputError?"form-control error":"form-control"} name="text-1" onChange={handleOTPInput} autoComplete={"off"} value={firstDigit}/>
        <InputMask mask="9" maskChar="" type="tel" className={otpInputError?"form-control error":"form-control"} name="text-2" onChange={handleOTPInput} autoComplete={"off"} value={secondDigit}/>
        <InputMask mask="9" maskChar="" type="tel" className={otpInputError?"form-control error":"form-control"} name="text-3" onChange={handleOTPInput} autoComplete={"off"} value={thirdDigit}/>
        <InputMask mask="9" maskChar="" type="tel" className={otpInputError?"form-control error":"form-control"} name="text-4" onChange={handleOTPInput} autoComplete={"off"} value={fourthDigit}/>
    </div>
    
    </div>
    <div className="contibtns">
        <button className="btn btn-otp" onClick={handleOTP} disabled={isDisableBtn}>
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
                   
   </>);
}

export default Otp;