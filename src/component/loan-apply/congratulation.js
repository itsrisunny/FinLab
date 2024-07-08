import React, {useEffect, useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SmileImage from '../../assets/images/finalpage/smile_icon.png';


export default function Finalpage({activeCard, resData,preFillData,profileData}){
	const navigate=useNavigate(); 
	const goToDashBoard = () =>{
		navigate('/dashboard')
	}
    const [name,setName] = useState("");
    const [caseNo,setCaseNo] = useState("");

	useEffect(()=>{
		if(Object.keys(profileData).length){
			//console.log(Object.keys(preData?.loan_requirement));
			if(Object.keys(profileData?.user_detail).length){
				setCaseNo(profileData?.user_detail?.case_number);
			}
			if(Object.keys(profileData?.personal_detail).length){
				setName(profileData?.personal_detail?.name);
			}else{
				setName(resData?.name);
			}
		}else{
			//ddd
			setName(resData?.name);
			setCaseNo(resData?.case_number);
		}
	},[profileData,resData])
	

	return(
		<>   
			<div className="col-lg-6 col-md-12" style={{display:(activeCard === "congratulation" && !preFillData)?"block":"none"}}>
				<div className="above-box" style={{}} >
					<img src={SmileImage} />				
					<h2>Thank you for submission</h2>
					<h4>Hi {name},</h4>
					<span>Ticket No: {caseNo}</span>
					
				</div>
				<div className="above-box" >
				<span><button className="btn btn-primary" onClick={goToDashBoard}>Go to Dashboard</button></span>
				</div>
				
				
			</div>
			
		</>
	)
}