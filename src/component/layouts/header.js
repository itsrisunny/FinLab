import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/header/logofront.svg" 
import call from "../../assets/images/header/call.png"
import email from "../../assets/images/header/email.png" 
export default function Header({navigateMenu, activeMenu}) {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  
  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };
  
  return (
    <>
      <header className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-xl custom_nav-container ">
          <Link className="navbar-brand" to="/">
          
            <img src={logo} className="img-fluid" style={{"height":"40px"}} alt="finlab"/>
          </Link>

          {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className=""> </span>
          </button> */}
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={toggleNavbar}
            aria-controls="navbarSupportedContent" 
            aria-expanded={isNavbarCollapsed ? 'false' : 'true'} 
            aria-label="Toggle navigation"
          >
            <span className=""> </span>
          </button>

          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
          <div 
        className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} 
        id="navbarSupportedContent"
      >
            <ul className="navbar-nav  mx-auto ">
              <li className={activeMenu === "home"?"nav-item active":"nav-item"}>
                <Link className="nav-link" to="/" onClick={(e) => navigateMenu("home")}>Home</Link>
              </li>
              <li className={activeMenu === "services"?"nav-item active":"nav-item"}>
                <Link className="nav-link" to="/" onClick={(e) => navigateMenu("services")}>Services</Link>
              </li>
              <li className={activeMenu === "mechanicsone"?"nav-item active":"nav-item"}>
                <Link className="nav-link" to="/" onClick={(e) => navigateMenu("mechanicsone")}>How We Work?</Link>
              </li>
              <li className={activeMenu === "about-us"?"nav-item active":"nav-item"}>
                <Link className="nav-link" to="/" onClick={(e) => navigateMenu("about-us")}>Why Us</Link>
              </li>
              <li className={"nav-item"}>
                <NavLink className="nav-link" to="/partner">Partner With Us</NavLink>
              </li>
             
            </ul>
            <div className="user_option">
              <Link to="" className="user_link">
                <div className="user_call"><img src={call} className="img-fluid" style={{"height":"15px"}} alt=""/> +1800-123-4567 00</div>
                <div className="user_email"><img src={email} className="img-fluid" style={{"height":"15px"}} alt=""/> care@finlab.one</div>    
              </Link> 


              <Link to="/login" className="order_online avail-btn">                
                <div className="avail-offers">Avail Offers</div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
    </>
  );
}