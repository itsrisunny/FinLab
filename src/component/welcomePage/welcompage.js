import Congratulation from '../../assets/images/finalpage/congratulations.png'
import HdfcBank from '../../assets/images/finalpage/HDFC Bank.png'
import AxisLogo from '../../assets/images/finalpage/axis.png'
import BajaLogo from '../../assets/images/finalpage/bajaj.png'
import LoginHeader from "./../layouts/login-header";
import NavigationBar from "../dashboard/navigationBar";


export default function Welcomepage(){
	
	return(
		<>    
        <LoginHeader />       
        <div className="container">
				<div className="row">
                <NavigationBar />
			<div className="col-lg-9 col-md-12" >
				<div className="below-box">
					<img src={Congratulation} alt='Congratulation' />
					<h4>Your Pre Approved Offers From Our Lenders</h4>
					<div className="card finalcard">
						<div className="logosize">
							<img src={AxisLogo} placeholder="Axis Bank" alt='Bank Logo' />
							<br></br>
							<p>Axis Bank</p>
						</div>						
						<h5>₹ 1,50,000</h5>
						<p>
						EMI : ₹ 9680.80
						<br></br>
						ROI 10.90%
						<br></br>
						Terms: 72 months
						</p>
						<div className="btnsize">
						<button className="btn btn-login">Apply Now</button>
						</div>
						
					</div>	
					<div className="card finalcard">
						<div className="logosize">
							<img src={BajaLogo} placeholder="Bajaj Finserv" alt='' />
							<br></br>
							<p>Bajaj Finserv</p>
						</div>
						<h5>₹ 1,80,000</h5>
						<p>
						EMI : ₹ 10682.60
						<br></br>
						ROI 11.00%
						<br></br>
						Terms: 72 months
						</p>
						<div className="btnsize">
						<button className="btn btn-login">Apply Now</button>
						</div>
					</div>
					<div className="card finalcard">
					<div className="logosize">
							<img src={HdfcBank} placeholder="Hdfc Bank" alt='' />
							<br></br>
							<p>HDFC Bank</p>
						</div>
						<h5>₹ 1,60,000</h5>
						<p>
						EMI : ₹ 9991.50
						<br></br>
						ROI 11.02%
						<br></br>
						Terms: 72 months
						</p>
						<div className="btnsize">
						<button className="btn btn-login">Apply Now</button>
						</div>
					</div>		
				</div>
			</div>
            </div>
            </div>
		</>
	)
}