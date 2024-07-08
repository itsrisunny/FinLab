import React, {useEffect, useState} from "react";
import LoginHeader from "./../layouts/login-header";
import BussinessImage from "../../assets/images/products/Business-Image2.png";
import BussinessImagePotrait from "../../assets/images/products/Business-Image2-Potrait.png"
import PersonalImage from "../../assets/images/products/Personal-Loan-Image.png";
import HomeLoanImage from "../../assets/images/products/Home-Loan-Image.png";
import SuitCase from "../../assets/images/banner/suitcase.png";
import HomeLoanIcon from "../../assets/images/banner/mortgage.png";
import PersonalLoanIcon from "../../assets/images/banner/wallet.png";
import {Link, useNavigate} from "react-router-dom";
import CryptoJS from "crypto-js";
export default function Products() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
		setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);
	const [isAuthenticate, setIsAuthenticate] = useState(localStorage.getItem("isAuthenticate"))
	let navigate = useNavigate();
	useEffect(() => {
		window.scrollTo({
		    behavior: 'smooth',
		    top: 0
		})
		if(isAuthenticate !== "true"){
			navigate("/login")
		}
	},[isAuthenticate])
	return(
		<>
			<LoginHeader />

			<div className="loan-cards">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="card BusinessCardDiv">
					      <div className="card-body">
					      	<div className="card-icons">
								
					      		<img className="bigImageTer" src={isMobile ? BussinessImagePotrait : BussinessImage} />
					      	</div>
					      	<div className="loanTExtArea">
						        <h5 className="card-title"><span className="smIcons"><img src={SuitCase} /></span>Business Loan</h5>
						        <p className="card-text">Fuel your growth with tailored financing for entrepreneurial endeavors</p>
						        <Link to={"/loan-apply?_action="+CryptoJS.AES.encrypt("1", 'my-secret').toString()} className="apply-nowBTN">Apply Now</Link>
					        </div>
					      </div>
					    </div>
					</div>
				</div>
				<div className="row">
					{/**/}

					<div className="col-md-6">
						<div className="card HomeCardLoan PersonalCardLoan">
					      <div className="card-body">
					      	<div className="card-icons">
					      		<img className="bigImageTer" src={PersonalImage} />
					      	</div>
					      	<div className="loanTExtArea">
						        <h5 className="card-title"><span className="smIcons"><img src={PersonalLoanIcon} /></span>Personal Loan</h5>
								<p className="card-text">Quick cash for your needs, repay at your pace</p>
						        <Link to={"/loan-apply?_action="+CryptoJS.AES.encrypt("2", 'my-secret').toString()} className="apply-nowBTN">Apply Now</Link>
						       </div>
					      </div>
					    </div>
					</div>
					<div className="col-md-6">
						<div className="card HomeCardLoan">
					      <div className="card-body">
					      	<div className="card-icons">
					      		<img className="bigImageTer" src={HomeLoanImage} />
					      	</div>
					      	<div className="loanTExtArea">
								<h5 className="card-title"><span className="smIcons"><img src={HomeLoanIcon} /></span>{isMobile ? ("Home Loan") : (<>Home <br />Loan</>)} </h5>
								<p className="card-text">Make your dream home a reality with tailored financing</p>
						        <Link to="#" className="apply-nowBTN" disabled>Coming Soon</Link>
					        </div>
					      </div>
					    </div>
					</div>
				</div>
			</div>
			</div>
		</>
	)
}