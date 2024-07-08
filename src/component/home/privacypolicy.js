

import React, { useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import Header from "./../layouts/header";
import Footer from "./../layouts/footer";
function PrivacyPolicy() {
	return( 
<>
<Header/>
<div className="termsWrapper">
<div className="termsContent">
	<div className="container">
		<div className="row">
			<div className="col-md-12">
				<div className="termsComponent">
				<h3 className="topTermsHeading">Privacy Policy </h3>
				<p className="topParas">The privacy of all linked members is very important to Finlab.One(website). All information provided with users, visitors, and customers will be treated with integrity, security, and confidentiality. The privacy policy will explain how we gather and manage certain information, as well as how we acquire or receive data from you through your use of the website. By accessing or using our website, you agree to our website Privacy Policy. </p>
					<div className="accordion" id="accordionExample">
  <div className="card">
    <div className="card-header" id="headingTwo">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          1. Authorization for Contact 
        </button>
      </h2>
    </div>
    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div className="card-body">
        <p>By registering and/or using <a href="https://www.finlab.one" target="_blank" rel="noopener noreferrer">
        www.finlab.one
      </a> , you give authority to Finlab.One and its affiliates, partners, representatives etc. to: </p>
        <ul className="termsBullets">
        	<li>Provide you with services for the product you've chosen. </li>
        	<li>To reach you via email, phone, or text message.</li>
        	<li>Provide product knowledge.</li>
            <li>Offer promotional offers running on Finlab.One and offers by its associated third parties and business partners.</li>
        </ul>
        <p>Your information may be gathered for the reasons stated above. This policy allows for in-depth examination of the data. As a result, even if you have registered under the DNC, DND, or NCPR service/s, you thus acknowledge that you have allowed this website to contact you for the indicated objectives. Your authorization to us in this respect is effective as long as your account with us is active, whether by us or by you. These rules do not apply to the practices of organizations over which the website has no control or ownership, or to persons who are not managed or employed by <a href="https://www.finlab.one" target="_blank" rel="noopener noreferrer">
        www.finlab.one
      </a></p>
      </div>
    </div>
  </div>
  <div className="card">
    <div className="card-header" id="headingThree">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          2. Retainers of Personal Information 
        </button>
      </h2>
    </div>
    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div className="card-body">
	  <p>Any personal data of you shall be collected and stored by Finlab.One and its parent company BYND Finserve Consultant Private Limited that wholly owns <a href="https://www.finlab.one" target="_blank" rel="noopener noreferrer">
        www.finlab.one
      </a></p>
      </div>
    </div>
  </div>


  <div className="card">
    <div className="card-header" id="headingFour">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          3. Purpose of User Data Collection 
        </button>
      </h2>
    </div>
    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
      <div className="card-body">
	  <p>When you register for an account, use its services or goods, browse the site pages, or enter contests or contests advertised on the website, Finlab.One will collect your information and data. You may be asked for your first name, last name, email address, state and city of residence, gender, and date of birth while registering with this website. You are not anonymous to Finlab.One , once you register and sign at the website. </p>
	  <p>At the time of registration, you may be asked for your phone number, and SMS alerts regarding the site's services may be sent to your cellular device. You permit us to send you email and text notifications with your login information and other service needs, as well as promotional SMSs or emails, by registering with <a href="https://www.finlab.one" target="_blank" rel="noopener noreferrer">
        www.finlab.one
      </a>. </p>
	 <p>Your information is used to: </p>
     <ul className="termsBullets">
        	<li>Administrate or carry out the site's duties in connection with any agreements with our business partners.</li>
        	<li>Process orders or applications submitted by you.</li>
        	<li>Respond to queries or requests submitted by you.</li>
            <li>Resolve or foresee issues with any services provided to you.</li>
            <li>Send you details about special offers or promotions. We may send you information about new goods or services. These might be third-party offers or goods with which our website has a relationship, or they might be our own offers or goods.</li>
            <li>Send you emails, alerts, and notices related to your usage of Finlab.One's services or products.</li>
            <li>Improve the website and services provided by Finlab.One . We have your permission to combine information we get from you with information we get from other parties.</li>
            <li>Some elements on our website or our services may need you to provide personally identifiable information, which you may specify in your account area.</li>
            <li>As otherwise mentioned in this Privacy Policy.</li>
        </ul>

      </div>
    </div>
  </div>

  <div className="card">
    <div className="card-header" id="headingFive">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          4. Confidentiality, Information Sharing and Disclosure 
        </button>
      </h2>
    </div>
    <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
      <div className="card-body">
	  <p>We do not rent or sell your information to third parties, and we only do so in accordance with the Privacy Policy. We have the option of sharing the information with a commercial partner or affiliate. Finlab.One can also sell shares and/or transfer personally identifiable information to successors-in-interest in the event of a sale of any portion of the company's operations or if Finlab.One is reorganized, consolidated, or merged with another corporation and we are not the surviving corporation.</p>

		<p>We may employ third-party service providers to deliver our services to you. As specified in our contracts, we can guarantee that such parties will keep the information given to them secret. Access to your personally identifiable information and account information is tightly controlled and will only be used in line with internal protocols for the operation, development, and improvement of our services.</p>

		<p>We limit the use and acquisition of your personal information, but we may make aggregate or anonymous personal data or/and release these data in a non-personally identifiable manner. You will not be identified by the information.</p>
      </div>
    </div>
  </div>

   <div className="card">
    <div className="card-header" id="headingSix">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
          5. Cyber Security 
        </button>
      </h2>
    </div>
    <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
      <div className="card-body">
      <p>Finlab.One has the right to use suitable organizational or technological security measures to protect information acquired from you at any time. To protect against unlawful or unauthorized change or use of details, as well as any destruction, damage, or accidental loss of information, we might employ a variety of technological, physical, and administrative safeguards. However, no form of electronic storage or transmission via the internet is completely secure. As a result, we cannot guarantee complete security. You are also responsible for keeping your password and login id secure and secret, since we will not share these credentials with unrelated third parties.</p>
      </div>
    </div>
  </div>

<div className="card">
    <div className="card-header" id="headingSeven">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
          6. Log Files 
        </button>
      </h2>
    </div>
    <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
      <div className="card-body">
        <p>To analyze trends, track user movement in aggregate, administer the site, and collect broad demographic data for aggregate use, Finlab.One uses log files, which contain information such as browser type, internet protocol (IP), referring/exit pages, date/time stamp, platform type, internet service provider (ISP), and number of clicks.</p>
        <p>We can use this information to improve our services, marketing, site functioning, and analytics. We may compile these automatically from log data and other information we gather from or about you.</p>
        </div>
    </div>
  </div>

<div className="card">
    <div className="card-header" id="headingEight">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
          7. Cookies
        </button>
      </h2>
    </div>
    <div id="collapseEight" className="collapse" aria-labelledby="headingEight" data-parent="#accordionExample">
      <div className="card-body">
        <p>Both permanent cookies and session ID cookies can be used on Finlab.One. A cookie is a little piece of data saved on a user's computer that is linked to personal information. When you logout or shut your browser, session ID cookies are deleted and terminated, but a persistent cookie is a tiny text file that is retained on your computer's hard disc for a longer length of time.</p>

        <p>When you use the website, we may utilize PRP's session ID cookies to monitor your preferences. These also help to reduce server processing time and load times. PRP can use persistent cookies to save information such as whether you want your password to be remembered and other information. The PRP website's cookies do not include any information that may be used to identify you.</p>
      </div>
    </div>
  </div>

<div className="card">
    <div className="card-header" id="headingNine">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
          8. Law and Data Protection 
        </button>
      </h2>
    </div>
    <div id="collapseNine" className="collapse" aria-labelledby="headingNine" data-parent="#accordionExample">
      <div className="card-body">
<p>Without your prior written or verbal consent, Finlab.One can share your information with government agencies regulated by law in order to receive information for the purpose of verifying identity or detection, investigation, prevention, including prosecution, cyber incidents, punishment of offences, and other situations where disclosure is required to comply with any legal obligations. Any information can be needed to be disclosed with third party by Finlab.One by any order as per the law for time being in force.</p>
	</div>
    </div>
  </div>

  <div className="card">
    <div className="card-header" id="headingTen">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTen" aria-expanded="false" aria-controls="collapseNine">
          9. Unsubscribe
        </button>
      </h2>
    </div>
    <div id="collapseTen" className="collapse" aria-labelledby="headingTen" data-parent="#accordionExample">
      <div className="card-body">
        <p>You can request the removal of any personal data you have provided to us by sending us an email at care@finlab.one . Kindly be aware that we can't remove your personal data without also terminating your user account. We will not able to remove all data based on any live or past accounts with us which is mandated as per the law and compliance, and in-such cases only selective amendments might be possible.</p>

        <p>If you do not want to receive email notifications or other marketing information from us, please contact care@finlab.one with your request. Your request may take up to ten days to be processed.</p>
	</div>
    </div>
  </div>

  <div className="card">
    <div className="card-header" id="headingEleven">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
          10. Third-Party Data Collection and Third-Party Advertising 
        </button>
      </h2>
    </div>
    <div id="collapseEleven" className="collapse" aria-labelledby="headingEleven" data-parent="#accordionExample">
        <div className="card-body">
        <h4>Third Party Data Collection</h4>
        <p>Finlab.One may employ a third-party service provider to serve advertising for us across the internet and perhaps on the site. They have the ability to gather anonymous data about your visits to our website and interactions with our services and products. They can also use information about your visits to our website and other websites to target ads for services and products to you. This anonymous data is derived via the usage of a pixel tag, which is a widely used industry standard technique on many large websites. This procedure does not utilize or collect any personally identifying information. </p>
        <h4>Third Party Advertising</h4>
        <p>Other websites or affiliates may be linked to Finlab.one . Any personal information you give to these websites or affiliates is not ours. Such connected sites may have different privacy practices and terms and conditions, so we recommend that you read their privacy policies and other terms before visiting them. On our website, third parties such as lenders, credit card issuers, banks, and others provide a variety of services and goods such as loans and credit cards.</p>
        <p>Such firms can use information about your visits to the website (but not your address, email address, name, or phone number) to show you advertising on the site or on other third-party websites about goods and services that may or may not be of interest to you. If you choose to apply for products and/or services separately or reveal information to such providers, their Privacy Policies control how your information is used.</p>
	</div>
    </div>
  </div>

   <div className="card">
    <div className="card-header" id="headingTwelve">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
          11. Changes in Privacy Policy
        </button>
      </h2>
    </div>
    <div id="collapseTwelve" className="collapse" aria-labelledby="headingTwelve" data-parent="#accordionExample">
        <div className="card-body">
        <p>Finlab.One has the right, in its sole discretion, to modify or amend this Privacy Policy, as well as any other policy, terms, and conditions. We can update the terms and conditions to reflect any changes in our data practices. We recommend that you examine the Privacy Policy on a regular basis to keep current. </p>
        <p>This document has been published electronically and does not require signatures. <br></br> BYND Finserve Consultant Private  Limited <br></br> <strong>Address:</strong> Plot N0 19 Second Floor , Arjun Nagar, Sector – 33 , Gurgaon – 122001  <br></br> <strong>Email:</strong> care@finlab.one <br></br> You may reach out to us at care@finlab.one if you have any ideas, issues, or questions about our Privacy Policy. </p>
	</div>
    </div>
  </div>

     <div className="card">
    <div className="card-header" id="headingThirteen">
      <h2 className="mb-0">
        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">
          12. Disclaimer
        </button>
      </h2>
    </div>
    <div id="collapseThirteen" className="collapse" aria-labelledby="headingThirteen" data-parent="#accordionExample">
      <div className="card-body">

        <p>All material on Finlab.One is generic in nature and is intended to provide information about banking services and products. We make every effort to provide reliable and correct information, but we cannot be held liable for any inconsistencies. The website does not seek to infringe on any intellectual property or copyright problems. Every piece of information on our website is held in strict confidence and is subject to change at any moment without notice.</p>
        <p>If there are any modifications or modifications to the public utility, we will notify you as soon as possible. Though we have made attempts to maintain high standards of all content, Finlab.One is not legally obligated to fulfil any expected standards of clarity, accuracy, or quality of the content presented. Our firm's partners, employees, and related personnel are not liable for any harm, damage, or loss caused by the use of information on our site.</p>
        <p>It is agreed that visitors and customers who interact with the site do so at their own risk and discretion. The information on this website is legal and financial in nature. Visitors and consumers are encouraged to use caution in these situations. Every third party and visitor to Finlab.One is thus advised that the website's owner BYND Finserve Consultant Private  Limited, which acts as an intermediary between banks and financial services companies as well as individual lenders of some of the products mentioned on the website.</p>
        <p>Finlab.One , BYND Finserve Consultant Private  Limited, its directors, officers, employees, shareholders, and Finlab.One are not responsible for any user's credit buying decisions or investments, and each loan seeker/investor/prospect is solely responsible for the consequences of their actions.</p>

	</div>
    </div>
  </div>
</div>
				</div>
			</div>
		</div>
	</div>



</div>
</div>

<Footer/>
</>




)}
export default PrivacyPolicy;
