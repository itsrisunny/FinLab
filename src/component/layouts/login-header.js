import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/login-page/logoback.svg" ;

export default function LoginHeadr(){
    return(
        <>
    <div className="login-header">
        <div className="container">
            <div className="row header-inner">
                <div className="col-lg-8 col-md-12"></div>
                <div className="col-lg-4 col-md-12">
                    <ul className="login-nav">
                        <li><Link to="#">Call us +1800-123-4567</Link></li>
                        <li><Link to="#">Emi calculator</Link></li> 
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
    <div className="container second-logo-area">
    <Link className="navbar-brand" to="/">
          
          <img src={logo} className="img-fluid login-logo" alt=""/>
        </Link>
    </div>

  
        </>
    )
}