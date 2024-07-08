import React from "react";
import { Link } from "react-router-dom";
import Header from "./../layouts/header";
import Footer from "./../layouts/footer";

function Declaration() {
    return (
        <>
            <Header />
                <div class="termsContent">
                    <div className="container">
                        <h3>User Self Declaration</h3>
<br></br>
                        <h4>Borrower Information:</h4>
                        <ol>
                            <li>I, hereby declare that the information provided in this loan application is true, accurate, and complete to the best of my knowledge. I understand that any misrepresentation may result in the rejection of my loan application.</li>
                        </ol>

                        <h4>Financial Information:</h4>
                        <ol>
                            <li>I acknowledge that the financial information provided, including income, expenses, and liabilities, is a true reflection of my current financial status.</li>
                            <li>I understand that the lender may verify the information provided and that intentional misrepresentation may lead to legal consequences.</li>
                        </ol>

                        <h4>Loan Purpose and Intention:</h4>
                        <ol>
                            <li>I declare that the loan amount requested is solely for the purpose stated in this application, and I will use the funds for the intended use.</li>
                            <li>I understand that any change in the purpose of the loan requires prior approval from the lender.</li>
                        </ol>

                        <h4>Terms and Conditions:</h4>
                        <ol>
                            <li>I have read and understood the terms and conditions of the loan as outlined in the <Link to="/terms-of-use">T&C section</Link>.</li>
                            <li>I acknowledge that I am responsible for repaying the loan according to the agreed-upon terms, including interest rates, repayment schedule, and any associated fees.</li>
                        </ol>

                        <h4>Credit Check Authorization:</h4>
                        <p>I authorize the FinLab to conduct a credit check to assess my creditworthiness as part of the loan application process.</p>

                        <h4>Communication Consent:</h4>
                        <p>I consent to receive communications from the FinLab / lender, including but not limited to, loan status updates, disclosures, and other relevant information, via email, phone, or mail.</p>

                        <h4>Declaration:</h4>
                        <p>I hereby declare that I have provided accurate information, understand the terms and conditions, and agree to abide by the obligations outlined.</p>

                    </div>
                    </div>
            <Footer />
        </>
    );
}

export default Declaration;
