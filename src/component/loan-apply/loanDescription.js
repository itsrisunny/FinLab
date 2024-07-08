import React, {useEffect, useState} from "react";
import InputMask from 'react-input-mask';
import {currencyFormat} from "../../utilities/commonUtilities"
import ChatGirlImage from "../../assets/images/login-page/Chat girl.png";
import TriangleLeft from "../../assets/images/login-page/triangle-left.png";
import CurrencyInput from 'react-currency-input-field';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import { API_URL } from './../../config/constant';
import numberToText from "number-to-text";
require('number-to-text/converters/en-in');
export default function LoanDescription({activeCard, preFillData ,loanAmount, handleLoanDescription, handleRange, handleLoanPurpose, duration, handleDuration, loanPurposeError, durationError, isDisableBtn, loanPurpose, handleSubLoanPurpose, subLoanPurpose, subLoanPurposeError, handleLoanAmount,handelMinValue}){
	const [hideInfo, setHideInfo] = useState("none")
	const [loanPurposeData, setLoanPurposeData] = useState([])
	const [subLoanPurposeData, setSubLoanPurposeData] = useState([])
	const [allLoanPurposeList, setAllLoanPurposeList] = useState([])
	const handleHover = (type) => {
		if(type === "enter"){
			setHideInfo("block")
		}else{
			setHideInfo("none")
		}
	}
	useEffect(() => {
		getLoanPurposeData()

	},[])
	const handleLoanPurposeSelect = (e) => {
		handleLoanPurpose(e)
		let sub_data = [];
		allLoanPurposeList.map((v, i) => {
			if(v.parent_id == e.target.value){
				sub_data.push(v)
			}
		})
		setSubLoanPurposeData(sub_data)
	}
	const getLoanPurposeData = () => {
		axios.get(API_URL+"master/loan-purpose").then((res) => {
			let response = res.data;
			setAllLoanPurposeList(response?.data)
			let filter_data = response?.data.filter((v) => {
				return v.parent_id === 0;
			});
			setLoanPurposeData(filter_data)
				
		}).catch((e) => {
            console.log(e)
        })
	}
	useEffect(() => {
		if(loanPurpose){
			let sub_data = [];
			allLoanPurposeList.map((v, i) => {
				if(v.parent_id == loanPurpose){
					sub_data.push(v)
				}
			})
			setSubLoanPurposeData(sub_data)
		}
	},[loanPurpose, allLoanPurposeList])
	

	return(
		<>
			<div className="col-lg-6 col-md-12" style={{display:(activeCard === "loan-card")?"block":"none"}}>
				<h4 className="top-heading">How much do you want to borrow?</h4>
				<div className="form-group label">
					<div className="loan-amount p-20">
					<label>Loan amount</label>
						<div className="loan-in">
							<CurrencyInput
							  className="salary-input"
							  value={loanAmount}
							  placeholder="₹ 1,00,000"
							  decimalsLimit={0}
							  intlConfig={{ locale: 'en-IN', currency: 'INR' }}
							  prefix="₹"
							  onValueChange={handleLoanAmount}
							  //disabled={true}
							  onBlur={handelMinValue}
							/>
							{/*<input type="text" placeholder="₹ 1,00,000" value={currencyFormat(loanAmount)} disabled={true}/>*/}
						</div>
						<span className="textSize"> {numberToText.convertToText(loanAmount,{language:"en-in"})}</span>
					</div>
					{/* <div className="range p-20" onMouseEnter={() => handleHover("enter")} onMouseLeave={() => handleHover("leave")}> */}
					<div className="range p-20" >
						<RangeSlider

					        className="single-thumb"
					        min="50000" 
					        /*max={loanPurpose == 2?"2500000":"10000000"}
					        step={loanPurpose == 2?"5000":"10000"}*/
					        max="10000000"
					        step="10000"
					        onInput={handleRange}
							value={[50000,parseInt(loanAmount)]}
							thumbsDisabled={[true, false]}
        					rangeSlideDisabled={true}

					      />
						 
					</div>
					<div className="loan-purpose p-20">
					<label>Loan purpose</label>
						<select className={loanPurposeError?"form-control custom-select custom-select-sm error":"form-control custom-select custom-select-sm"} onChange={handleLoanPurposeSelect} value={loanPurpose} disabled={loanPurpose?true:false} >
							<option value="">Select Loan Purpose</option>
							{
								loanPurposeData.map((v, i) => {
									return(<option value={v?.id} selected={(v?.id === preFillData?.purpose_of_loan)?"true":""} >{v?.name}</option>)
								})
							}
						</select>
						<div className="alertbox">{loanPurposeError && <small >Please select here</small>}</div>
					</div>
					{
						subLoanPurposeData.length?<>
							<div className="loan-purpose p-20">
								<label>Sub Loan purpose</label>
								<select value={preFillData?.sub_loan_of_purpose?preFillData?.sub_loan_of_purpose:subLoanPurpose} className={loanPurposeError?"form-control custom-select custom-select-sm error":"form-control custom-select custom-select-sm"} onChange={handleSubLoanPurpose} >
									<option value="">Select Sub Loan Purpose</option>
									{
										subLoanPurposeData.map((v, i) => {
											return(<option value={v?.id} >{v?.name}</option>)
										})
									}
								</select>
								<div className="alertbox">{subLoanPurposeError && <small >Please select here</small>}</div>
							</div>
						</>:""
					}
				  	
					<div className="duration p-20">
					<label>Duration of loan</label>
					<div className="row year-bottom-margin">
						<div className="col-lg-4 col-md-6 col-sm-6">
						 <button className={(durationError?"years-btn error":(duration === "1"?"years-btn active":"years-btn"))} onClick={() => handleDuration("1")}>1 year</button>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-6">
							<button className={(durationError?"years-btn error":(duration === "2"?"years-btn active":"years-btn"))} onClick={() => handleDuration("2")}>2 years</button>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-6">
							<button className={(durationError?"years-btn error":(duration === "3"?"years-btn active":"years-btn"))} onClick={() => handleDuration("3")}>3 years</button>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-6">
							<button className={(durationError?"years-btn error":(duration === "4"?"years-btn active":"years-btn"))} onClick={() => handleDuration("4")}>4 years</button>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-6">
							<button className={(durationError?"years-btn error":(duration === "5"?"years-btn active":"years-btn"))} onClick={() => handleDuration("5")}>5 years</button>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-6">
							<button className={(durationError?"years-btn error":(duration === "5+"?"years-btn active":"years-btn"))} onClick={() => handleDuration("5+")}>5+ years</button>
						</div>
					</div>
					{durationError && <small className="alertbox" >Please select one</small>}
					</div>
					

					
					<div>
                        <button className="btn btn-login" onClick={handleLoanDescription} disabled={isDisableBtn}>
			                {
			                    isDisableBtn?<><Spinner
			                  as="span"
			                  animation="border"
			                  size="sm"
			                  role="status"
			                  aria-hidden="true"
			                /> Please Wait...</>:"Continue"
			                } </button>
                    </div>
				</div>
			</div>
			<div className="col-lg-3 col-md-12 chat-triangle" style={{"display":hideInfo}}>
				<div className="char-girl-img">
					<div className="triabgel-Icons"><img src={TriangleLeft} /></div>
					<div className="chatIcons">
						<img src={ChatGirlImage} />
					</div>
					<div className="chatText">
						<p>I'll help you complete the questions to get you the best quote possible!</p>
					</div>
				</div>				
			</div>			
		</>
	)
}