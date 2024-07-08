import React, { useEffect, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import JohnDoe from "../../assets/images/admin-dashboard/john.jpg"
import FinlabLogo from "../../assets/images/admin-dashboard/logo.png"
export default function UserHeader(){
	const navigate=useNavigate();
	const isAuthenticate=localStorage.getItem('isAuthenticate');
	//console.log("test",( isLogin));
    useEffect(() => {
        if( isAuthenticate === null){
          navigate('/login')
        }
      });

	const[userName,setUserName] = useState("");

	 useEffect(()=>{
		setUserName(localStorage.getItem('user-name'))
	 },[localStorage.getItem('user-name')])

	return(
		<>
			<div className="topNavigationBlack">
				<div className="dashboradHead">
					<img src={FinlabLogo} />
				</div>

				<div className="profileRight">
					<nav className="nav navbar-nav moveRight">
						<ul className=" navbar-right">
							<li className="nav-item dropdown open" >
							<Link to="#" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
							<img src={JohnDoe} />{userName}
							</Link>
							<div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
							<Link className="dropdown-item" to="#"> Profile</Link>

							<Link className="dropdown-item" to="#">Help</Link>
							</div>
							</li>
						</ul>
					</nav>
				</div>

			</div>
		</>
	)
}