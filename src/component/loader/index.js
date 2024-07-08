import React, { useEffect, useRef, useState} from "react";
import OneLoader from "../../assets/images/admin-dashboard/one-loader.png"
export default function Loader({dispaly}) {
	//console.log("loader",dispaly);
	return(

		<>
		<div className="loaderDiv" style={{display:dispaly}}>
			<div className="loaderComponent">
				<div className="spinner-border text-primary" role="status">
				  <span className="sr-only">Loading...</span>									  
				</div>
				<img className="loaderImg" src={OneLoader} />
			</div>
		</div>
		</>

	)
}

