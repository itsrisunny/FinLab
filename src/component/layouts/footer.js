import React from "react";
import LogoFooter from "../../assets/images/header/logofront.svg" 
import Facebook from "../../assets/images/footer/Facebook.png" 
import Twitter from "../../assets/images/footer/Twitter.png" 
import Instagram from "../../assets/images/footer/Instagram.png"
import Linkdin from "../../assets/images/footer/Linkdin.png"
import {Link} from "react-router-dom"
export default function Footer(props) {
      return(  
        <>  
           
             <footer className="footer_section">
             <div className="footer-bg">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6 footer-links">
          <div className="footer-logo">
            <img src={LogoFooter} className="img-footer img-fluid" alt="" />
          </div>
          <div className="footer-content">
            <p className="para">
            With a dedication to breaking down barriers and cultivating a financial empowerment
            community, we aspire to be your staunch supporters on the path to financial freedom.
            <br></br>
            Discover how easy it is to contact multiple lenders with a single application by using our
            platform. Get in touch with us right away!!

            </p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6  footer-links">
          <ul>
            <li><h4>Our Services </h4></li>
            <li><Link to="/products">Business Loan</Link></li>
            <li><Link to="#">Personal Loan</Link></li>
            <li><Link to="#">Home Loan/LAP</Link></li>
            <li><Link to="#">Car Loan</Link></li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 footer-links">
          <ul>
            <li><h4>Why Us?</h4></li>
            <li><Link to="#">Easy Steps</Link></li>
            <li><Link to="#">Low Bank Fees</Link></li>
            <li><Link to="#">Assurance</Link></li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 footer-links">
          <ul>
            <li><h4>Contact Us</h4></li>
            <li><Link to="#">Send Mail to Us</Link></li>
          </ul>
          <div className="footer-follow">
            <p className="follow-us">Follow us on</p>
            <ul className="links-area">
              <li><Link to="#"><img src={Facebook} alt="finlab-facebook page" /></Link></li>
              <li><Link to="#"><img src={Twitter} alt="finlab-twitter page" /></Link></li>
              <li><Link to="#"><img src={Instagram} alt="finlab-Instagram page" /></Link></li>
              <li><Link to="#"><img src={Linkdin} alt="finlab-linkdin page" /></Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-hr"></div>
    </div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">Finlab © {(new Date).getFullYear()} All rights reserved.</div>
        <div className="col-md-6">Made with <i className="fa fa-heart" aria-hidden="true" style={{color:'#ff0707'}}></i> in India</div>
      </div>
    </div>
    </div>
  </footer>

         </>
         );
	}