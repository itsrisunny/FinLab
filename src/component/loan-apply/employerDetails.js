import React, {useEffect, useState} from "react";
import SalariedComponent from "./salariedComponent"
import SelfEmployeeComponent from "./selfEmployeeComponent"
export default function EmployerDetail({activeCard,preFillData ,employmentDetail, businessTypeSelect, handleNextToUplaod, caseId,loading}){
	return(
		<>
			<div className="col-md-12 col-lg-6" style={{display:(activeCard === "employer-detail")?"block":"none"}}>
			<h4 className="top-heading employer-head">Enter Employment details</h4>
			<div className="inner-employement">
				{
					employmentDetail === "salaried"?<SalariedComponent handleNextToUplaod={handleNextToUplaod} preFillData = {preFillData} caseId={caseId} loading={loading}/>:<SelfEmployeeComponent handleNextToUplaod={handleNextToUplaod}  preFillData = {preFillData} caseId={caseId} businessTypeSelect={businessTypeSelect} loading={loading}/>
				}
				
			</div>
			</div>
		</>
	)
}