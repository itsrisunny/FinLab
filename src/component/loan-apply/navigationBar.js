
import { useState,useEffect } from "react";
import chat from "../../assets/images/login-page/Chat1.png";

export default function NavigationBar({activeStatus, handleSteps,preFillData ,offers }){

	return(
		<>
			<div className="col-lg-3 col-md-12">
				<div className="navitemsPart">
					<ul className="mysidepills">
						<li className={(activeStatus >= 1 )?(activeStatus===5)?"sidebar-lists active loanNav":"sidebar-lists active":"sidebar-lists"} onClick={(e) => (activeStatus === 5)?e.preventDefault():handleSteps("1")}><span className="liText">Loan </span></li>
						<li className={(activeStatus > 2 )?(activeStatus===5)?"sidebar-lists active loanNav":"sidebar-lists active":"sidebar-lists"} onClick={(e) => (activeStatus === 5)?e.preventDefault():handleSteps("2")}><span className="liText">Personal </span></li>
						<li className={(activeStatus > 3 )?(activeStatus===5)?" sidebar-lists active loanNav":"sidebar-lists active":"sidebar-lists"} onClick={(e) => (activeStatus === 5)?e.preventDefault():handleSteps("3")}><span className="liText">Employment </span></li>
						{
							offers  ?  (<li className={(activeStatus > 4 )?(activeStatus===5)?"sidebar-lists active loanNav":"sidebar-lists active":"sidebar-lists"} onClick={() => handleSteps("5")}><span className="liText">My Offers</span></li>)  : ( preFillData?.files?.length ? <li className={(activeStatus > 4 )?(activeStatus===5)?"sidebar-lists active loanNav":"sidebar-lists active":"sidebar-lists"} onClick={() => handleSteps("5")}><span className="liText">My Offers</span></li> : <li className={(activeStatus > 4 )?(activeStatus===5)?"sidebar-lists active loanNav":"sidebar-lists active":"sidebar-lists"} onClick={(e) => (activeStatus === 5)?e.preventDefault():handleSteps("4")}><span className="liText">Document</span></li>)
						}
						
					</ul>
				</div>
			</div>
		</>
	)
}