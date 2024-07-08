import SmileImage from '../../assets/images/finalpage/smile_icon.png'
import LoginHeader from "./../layouts/login-header";
import NavigationBar from "../dashboard/navigationBar";


export default function Finalpage(){
	
	return(
		<>    
        <LoginHeader />       
        <div className="container">
				<div className="row">
                	<NavigationBar />
					<div className="col-lg-9 col-md-12" >
						<div className="above-box">
							<img src={SmileImage} />				
							<h2>Thank you for submission</h2>
							<h4>Hi, JOHN DOE</h4>
							<span>Ticket No: 2535THI8459</span>
						</div>
					</div>
        	    </div>
        </div>
		</>
	)
}