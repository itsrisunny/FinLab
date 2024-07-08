import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import InputMask from 'react-input-mask';
import Spinner from 'react-bootstrap/Spinner';
export default function MobileNumber({phoneNumberError, handlePhoneNumber, handleSubmit, isDisableBtn}){
	return(
		 <>
			<p>Please enter your phone number. You will receive a password to enter your account</p>
            <div className="form-group input-login">
            <label for="mumber">Phone Number</label>

            <InputMask mask="999 999 9999" maskChar="" type="tel" className={phoneNumberError?"form-control error":"form-control"} onChange={handlePhoneNumber} />
            </div>
            <div className="form-group form-check terms-sec">
                  <input type="checkbox" className="form-check-input terms-conditions" id="exampleCheck1" checked/>
                  <label className="form-check-label terms-conditions" for="exampleCheck1">I/We confirm that we have read and understood the <Link to="/terms-of-use" target='_blank' className="link-terms">'Terms and Conditions'</Link>, <Link to="/privacypolicy"  target='_blank' className="link-terms">'Privacy Policy'</Link> and agree to the <Link to="/declaration"  target='_blank' className="link-terms">'Declaration'</Link> .</label>
  			  	</div>
            <div>
                <button className="btn btn-otp" onClick={handleSubmit} disabled={isDisableBtn}>
                {
                    isDisableBtn?<><Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> Please Wait...</>:"Proceed With OTP"
                } </button>
            </div>
		</>
              
	)
}