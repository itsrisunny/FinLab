import React, { useEffect, useRef, useState, Suspense} from "react";
import { Link} from "react-router-dom";
import oneAppliction from "../../assets/images/lender/One-application.png" 
import endTOEnd from "../../assets/images/lender/End-To-End.png"
import instFunding from "../../assets/images/lender/Instant-Funding.png"
import PersonalLoan from "../../assets/images/personal-loan Icon.png"
import BusinessLoan from "../../assets/images/businessLoanIcon.png"
import HomeLoan from "../../assets/images/homeLoanIcon.png"
import BankIndian from "../../assets/images/bank/bank-Indian-Bank.png"
import BankIcici from "../../assets/images/bank/bank-Icici.png"
import BankAxis from "../../assets/images/bank/bank-Axis.png"
import BankHDFC from "../../assets/images/bank/bank-HDFC.png"
import BankBajaj from "../../assets/images/bank/bank-Bajaj.png"
import BankGodrej from "../../assets/images/bank/bank-godrej.png"
import SubmitLoan from "../../assets/images/mechanics/submit-loan-icon.png"
import DocumentsLoan from "../../assets/images/mechanics/Documents.png"
import CreditHistory from "../../assets/images/mechanics/Credit-History-icon.png"
import OnlineDoc from "../../assets/images/mechanics/Online-document.png"
import WhyChoose from "../../assets/images/why-choose-us/Whychooseusbanner.png"
import Bank from "../../assets/images/why-choose-us/Bank.png"
import Money from "../../assets/images/why-choose-us/Money.png"
import EasyWay from "../../assets/images/why-choose-us/Easy-way.png"
import ReferImage from "../../assets/images/refer/ReferImage.png"
import EnquiryIcon from "../../assets/images/smiles/Enquiry_icon.png"
import LoanProcessed from "../../assets/images/smiles/LoanProcessed.png"
import UsersIcons from "../../assets/images/smiles/Users.png"
import ProfileIcons from "../../assets/images/voice/Profile _icon.png"
import WalletIcon from "../../assets/images/banner/wallet.png"
import SuitCase from "../../assets/images/banner/suitcase.png"
import Mortage from "../../assets/images/banner/mortgage.png"
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import CarouselComponent from "./CarouselComponent";
import Header from "./../layouts/header";
import Footer from "./../layouts/footer";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
function Home(props) {
  const homeRef = useRef(null);
  const servicesRef = useRef(null);
  const mechanicsoneRef = useRef(null);
  const aboutRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
    /*localStorage.removeItem("isAuthenticate");
    localStorage.removeItem("user_id");
    localStorage.removeItem("mobile_no");
    localStorage.removeItem("active_case_id");
    localStorage.removeItem("panName");
    localStorage.removeItem("user-name");*/
   // localStorage.clear();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;
  const [activeMenu, setActiveMenu] = useState("")
  var isInViewport = function(elem) {
    var distance = elem.getBoundingClientRect();
    return (
      distance.top >= 0 &&
      distance.left >= 0 &&
      distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
 useEffect(() => {
  window.scrollTo({
    behavior: 'smooth',
    top: 0
  })
  var findMe = document.querySelectorAll('.lender-row');
  var findMeT = document.querySelectorAll('.right-animation');

  window.addEventListener('scroll', function(event) { 
    if(!isMobile){
      findMe.forEach(element => {

        if (isInViewport(element)) {
          element.classList.add("animate");
        }
      });
      findMeT.forEach(element => {
        let dis = element.getBoundingClientRect()
        if (dis?.top < 550) {
          element.classList.add("animate");
        }
      });
    }
    
  }, false);
  
},[])
const offsetValue = 300;
function handleScroll(event) {
  let mechanicsOffset = mechanicsoneRef.current?.getBoundingClientRect();
  let servicesOffset = servicesRef.current?.getBoundingClientRect();
  let homeOffset = homeRef.current?.getBoundingClientRect();
  let aboutOffset = aboutRef.current?.getBoundingClientRect();

  if (homeOffset && homeOffset.top > -offsetValue) {
    setActiveMenu("home");
  }
  if (servicesOffset && servicesOffset.top < offsetValue) {
    setActiveMenu("services");
  }
  if (mechanicsOffset && mechanicsOffset.top < offsetValue) {
    setActiveMenu("mechanicsone");
  }
  if (aboutOffset && aboutOffset.top < offsetValue) {
    setActiveMenu("about-us");
  }
}

useEffect(() => {  
  window.addEventListener('scroll', handleScroll);
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
},[])

const navigateMenu = (section) => {
  let scrollOffset = 0;
  if(!isMobile) {
    if (section === "home") {
      const homeElement = homeRef.current;
      if (homeElement) {
        const { top } = homeElement.getBoundingClientRect();
        scrollOffset = window.scrollY + top;
      }
    } else if (section === "services") {
      const servicesElement = servicesRef.current;
      if (servicesElement) {
        const { top } = servicesElement.getBoundingClientRect();
        scrollOffset = window.scrollY + top - 80;
      }
    } else if (section === "mechanicsone") {
      const mechanicsElement = mechanicsoneRef.current;
      if (mechanicsElement) {
        const { top } = mechanicsElement.getBoundingClientRect();
        scrollOffset = window.scrollY + top;
      }
    } else if (section === "about-us") {
      const aboutElement = aboutRef.current;
      if (aboutElement) {
        const { top } = aboutElement.getBoundingClientRect();
        scrollOffset = window.scrollY + top - 50;
      }
    }
  
    window.scrollTo({ top: scrollOffset, behavior: 'smooth' });
  }
  else{
    if (section === "home") {
      const homeElement = homeRef.current;
      if (homeElement) {
        const { top } = homeElement.getBoundingClientRect();
        scrollOffset = window.scrollY + top;
      }
    } else if (section === "services") {
      const servicesElement = servicesRef.current;
      if (servicesElement) {
        const { top } = servicesElement.getBoundingClientRect();
        scrollOffset = window.scrollY + top - 100;
      }
    } else if (section === "mechanicsone") {
      const mechanicsElement = mechanicsoneRef.current;
      if (mechanicsElement) {
        const { top } = mechanicsElement.getBoundingClientRect();
        scrollOffset = window.scrollY + top - 100;
      }
    } else if (section === "about-us") {
      const aboutElement = aboutRef.current;
      if (aboutElement) {
        const { top } = aboutElement.getBoundingClientRect();
        scrollOffset = window.scrollY + top - 100;
      }
    }
  
    // Scroll to the calculated position
    window.scrollTo({ top: scrollOffset, behavior: 'smooth' });
  }
};

const [activeSlider, setActiveSlider] = useState(0)
const [defActive, setDefActive] = useState(0)
const onSlideFunction = (e) => {
  setActiveSlider(e)
}
const handleActive = (activeIndex) => {
  setActiveSlider(activeIndex)
  setDefActive(activeIndex)
}
const handleSelect = (selectedIndex, e) => {
  setDefActive(selectedIndex)
}
const carouselItems = [
  { id: 1, content: <h1>
    Discover Your <span>Perfect Loan</span> Solution Quickly And Effortlessly!
  </h1> },
  { id: 2, content: <h1>
    Sample <span>One</span>
   </h1>},
  { id: 3, content: <h1>
    Sample <span>Two</span>
  </h1>},
  {id:4, content:<h1>
    Sample <span>Three</span>
  </h1>}
];

const owlCarouselItems = [
  {id:1,userName:<p>"I paid on my private student loan for years and got nowhere. I defaulted and tried to negotiate the loans myself, but was unsuccessful. I hired Mr. Tate and he got me a better settlement than I expected."</p>
  ,userReview:<p className="userNameTest">Anna Doe</p>},
  {id:2,userName:<p>"I paid on my private student loan for years and got nowhere. I defaulted and tried to negotiate the loans myself, but was unsuccessful. I hired Mr. Tate and he got me a better settlement than I expected."</p>
  ,userReview:<p className="userNameTest">Anna Doe</p>},
  {id:3,userName:<p>"I paid on my private student loan for years and got nowhere. I defaulted and tried to negotiate the loans myself, but was unsuccessful. I hired Mr. Tate and he got me a better settlement than I expected."</p>
  ,userReview:<p className="userNameTest">Anna Doe</p>},
  {id:4,userName:<p>"I paid on my private student loan for years and got nowhere. I defaulted and tried to negotiate the loans myself, but was unsuccessful. I hired Mr. Tate and he got me a better settlement than I expected."</p>
  ,userReview:<p className="userNameTest">Anna Doe</p>},
  {id:5,userName:<p>"I paid on my private student loan for years and got nowhere. I defaulted and tried to negotiate the loans myself, but was unsuccessful. I hired Mr. Tate and he got me a better settlement than I expected."</p>
  ,userReview:<p className="userNameTest">Anna Doe</p>},
  {id:6,userName:<p>"I paid on my private student loan for years and got nowhere. I defaulted and tried to negotiate the loans myself, but was unsuccessful. I hired Mr. Tate and he got me a better settlement than I expected."</p>
  ,userReview:<p className="userNameTest">Anna Doe</p>},
  {id:7,userName:<p>"I paid on my private student loan for years and got nowhere. I defaulted and tried to negotiate the loans myself, but was unsuccessful. I hired Mr. Tate and he got me a better settlement than I expected."</p>
  ,userReview:<p className="userNameTest">Anna Doe</p>}
]
 return( 
  <>
 
  <div className="hero_area" ref={homeRef}>
      <Header navigateMenu={navigateMenu} activeMenu={activeMenu}/>
      <div className="checkdiv">
   <div className="backy" >
   <section className="slider_section " id="slider_section">
   <Suspense fallback={<div>Loading...</div>}>
          <CarouselComponent
            handleSelect={handleSelect}
            defActive={defActive}
            onSlideFunction={onSlideFunction}
            carouselItems={carouselItems}
          />
    </Suspense>
    <div className="threeCards">
      <div className="basicCards purpleFirst">
          <img src={WalletIcon} alt="WalletIcon" loading="lazy"/>
          <h4>Personal Loan</h4>
      </div>
      <div className="basicCards green">
          <img src={SuitCase} alt="SuitCase" loading="lazy"/>
          <h4>Business Loan</h4>
      </div>
      <div className="basicCards purpleSecond">
          <img src={Mortage} alt="Mortage" loading="lazy"/>
          <h4>Home Loan</h4>
      </div>
    </div>
    <div className=" slider_circle">
        <ol className="carousel-indicators slider_circle_ol">
          <li onClick={() => handleActive(0)} className={activeSlider === 0?"active":""}></li>
          <li onClick={() => handleActive(1)} className={activeSlider === 1?"active":""}></li>
          <li onClick={() => handleActive(2)} className={activeSlider === 2?"active":""}></li>
          <li onClick={() => handleActive(3)} className={activeSlider === 3?"active":""}></li>
        </ol>
        <div className="avail-slider">
          <Link to="/login">
          <span className="avialNow"><span className="avaitetxs">Avail<br />Offers</span></span>
          </Link>
        </div>
      </div>
</section>
    </div>
  
    <section className="lender-section">  
      <div className="container">
        <div className="lender-head">
          <h2 className="green-border">
            Need Multiple Lender <span>Options ?</span> Try Our platform!
          </h2>
          <div className="row lender-row right-animation" >
            <div className="row">
            <div className="col-lg-4 col-md-4 " data-animation="fadeInDown">
              <div className="lender-first lender-box">
                <img src={oneAppliction}  className="img-fluid" alt="oneAppliction"/>
                <div className="lender-content">
                  <h5>Your Gateway to Financial Freedom</h5>
                  <p>Are you tired of endless loan applications and rejections? Our platform is your one-stop solution to explore prequalified offers from various lenders. Say goodbye to the hassle and hello to convenience!</p>
                </div>
              </div>
            </div>
            <div className=" col-lg-4 col-md-4 " data-animation="fadeInDown">
              <div className="lender-second lender-box">
                <img src={endTOEnd}  className="img-fluid" alt="endTOEnd"/>
                <div className="lender-content">
                  <h5>Unlock Your Dreams with a Single click.</h5>
                  <p>Get prequalified loan offers that are tailored to your needs right away. There is no effect on your credit score, no commitments, simply an endless array of options.</p>
                </div> 
              </div>
            </div>
            <div className=" col-lg-4 col-md-4 " data-animation="fadeInDown">
              <div className="lender-third lender-box">
                <img src={instFunding}  className="img-fluid" alt="instFunding"/>
                <div className="lender-content">
                  <h5>Funds at Your Doorstep, Quicker Than Ever</h5>
                  <p>Experience instant funding with our leading lending partners. You can now have the funds directly deposited into your accounts within 24 hours of approval.</p>
                </div>
              </div>
            </div>
            </div>
            <div className="row second-row" style={{justifyContent:"center"}}>
            <div className=" col-lg-4 col-md-4 " data-animation="fadeInDown">
              <div className="lender-fourth lender-box">
                <img src={instFunding}  className="img-fluid" alt="instFunding"/>
                <div className="lender-content">
                  <h5>Personalized Solutions for Your Every Financial Need</h5>
                  <p>Whether it's a business, personal, or home loan, our platform will match you with the best
                    lending program to meet your specific needs. We'll be there for you at every step of the
                    journey..</p>
                </div>
              </div>
            </div>
            <div className=" col-lg-4 col-md-4 " data-animation="fadeInDown">
              <div className="lender-fifth lender-box">
                <img src={instFunding}  className="img-fluid" alt="instFunding"/>
                <div className="lender-content">
                  <h5>Explore a World of Lending Options from Trusted Partners</h5>
                  <p>Collaborate with reputable lenders governed by the RBI who will help you achieve your
                    financial objectives. Choose from a wide range of loans that are suited to your goals and
                    creditworthiness</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
 
    <section className="covered-section" ref={servicesRef}> 
    <div className="custom-gray"></div>
     <div className="inner-sec">
      <div className="covered-head">
        <h2 className="green-border">WE HAVE YOU COVERED
          <div className="border-line"></div>
        </h2>
       <p>We will match you with a loan program that meet your financial need. In short term liquidity, 
        by striving to make funds available to them within 24 hours of application.</p>
      </div>
      <div className="container">
      <div className="row right-animation equal-height">
        <div className="col-md-4">
          <div className="covered_blocks">
            <img src={BusinessLoan} className="imgcoverIcons" alt="Businessloan" />
            <h3>Business Loan</h3>
            <p>Unlock your business's potential with our flexible business loans, offering competitive rates and fast approval to fuel your growth and success.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="covered_blocks green-boxes">
            <img src={PersonalLoan} className="imgcoverIcons" alt="PersonalLoan" />
            <h3>Personal Loan</h3>
            <p>Achieve your personal goals with our hassle-free personal loans, featuring quick approval, competitive rates, and flexible terms tailored to your needs.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="covered_blocks">
            <img src={HomeLoan} className="imgcoverIcons" alt="HomeLoan" />
            <h3>Home Loan</h3>
            <p>Make your dream home a reality with our home loans, offering low interest rates, flexible terms, and fast approval.</p>
          </div>
        </div>
      </div>
      </div>
     </div>
     <div className="custom-gray bottom"></div>
   </section>

<section className="lender-content-section">
<div className="inside-lender">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h2 className="someofthebest">SOME OF THE TOP LENDERS, WHO ARE EAGER TO LEND YOU</h2>
      </div>
    </div>
  </div>
</div>
<div className="lender-black">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h4>Explore Loan Options from Respected RBI-Regulated Lenders to Support Your Financial Requirements.</h4>
        <div className="bank-officer">
          <ul className="bank-list">        
            <li><img src={BankGodrej} alt="BankGodrej" /></li>          
            <li><img src={BankBajaj} alt="BankBajaj" /></li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</div>
</section>
<section className="machanics"  ref={mechanicsoneRef}>
<div className="machanics-inner">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h2 className="green-border black-border">Simplifying the Loan Journey just for you</h2>
      </div>
    </div>
    <div className="row mechanics-border-first ">
      <div className="col-lg-6 col-md-6 left first-dotted-spaced  sub-head-mechanics">
        <div className="macheincs-content number-one">
          <h3>Submit Loan Details Online</h3>
          <p> Kick-start your financial journey with a few clicks. Our
            user-friendly platform makes it easy to provide your loan requirements.</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="macheincs-content imagepart">
          <img src={SubmitLoan} alt="SubmitLoan" loading="lazy" />                  
        </div>
      </div>
    </div>

    <div className="row mechanics-border-second">
      <div className="col-lg-6 col-md-6 second-dotted-spaced order-sec-2">
        <div className="macheincs-content imagepart">
        <img src={DocumentsLoan} alt="DocumentsLoan" loading="lazy"/> 
        </div>
      </div>
      <div className="col-lg-6 col-md-6 sub-head-mechanics">
        <div className="macheincs-content number-two">
          <h3>Online Document Submission</h3>
          <p> Streamline the approval process by uploading your documents securely online, saving you time and effort.
            </p>
        </div>
      </div>      
    </div>

    <div className="row mechanics-border-third">
      <div className="col-lg-6 col-md-6 third-dotted-spaced">
        <div className="macheincs-content number-three">
          <h3>Credit History Check</h3>
          <p>Let our advanced systems analyze your credit profile and match you with lenders who align with your creditworthiness.</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="macheincs-content imagepart">
        <img src={CreditHistory} alt="CreditHistory" loading="lazy" />
        </div>
      </div>      
    </div>
    <div className="row mechanics-border-fourth">
      <div className="col-lg-6 col-md-6 fourth-dotted-spaced order-sec-2">
        <div className="macheincs-content imagepart">
        <img src={OnlineDoc} alt="OnlineDoc" loading="lazy"/>        
        </div>
      </div>
      <div className="col-lg-6 col-md-6 mechanics-border-second">
        <div className="macheincs-content number-four">
          <h3>Loan Approval Notification</h3>
          <p> Celebrate as your dream lender approves your loan application, bringing you one step closer to realizing your financial goals.
          </p>
        </div>
      </div>      
    </div>
  </div>
</div>
</section>

<section className="whychooseus-section" ref={aboutRef}>
<div className="whyChoose-inner">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h2 className="green-border">What differentiates us from others?</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="why-choose-left">
          <img src={WhyChoose} alt="WhyChoose" loading="lazy"/>    
        </div>
      </div>

      <div className="col-md-6">
        <div className="why-choose-right">
          <div className="why-ChooseText">
            <img className="whyicons" src={Bank} alt="Bank" />
            <div className="text-why">
              <h3>Lowest Bank Fees</h3>
              <p>Enjoy unbeatable rates and keep more of your hard-earned money in your pocket.</p>
            </div>
          </div>

          <div className="why-ChooseText">
            <img className="whyicons" src={Money} alt="Money" />
            <div className="text-why">
              <h3>Loans up to ₹1 Crore</h3>
              <p> Access substantial funding to support your ambitious plans.</p>
            </div>
          </div>

          <div className="why-ChooseText">
            <img className="whyicons" src={EasyWay} alt="EasyWay" />
            <div className="text-why">
              <h3> Easy Application Process</h3>
              <p> Our user-friendly platform simplifies the loan journey, making it a breeze.</p>
            </div>
          </div>

        </div>
      </div>

    </div>





  </div>
</div>
</section>
<section className="recomment-Friend">
<div className="inner-recomment-Friend">
  <div className="container">
    <div className="row">
      <div className="col-md-6"> 
        <div className="recommend-img">
          <img src={ReferImage} className="recommetnImgsd" alt="ReferImage" loading="lazy" />    
        </div>
      </div>

      <div className="col-md-6">
        <div className="eagertoForge">
          <h2>Forging Friendships on the Path to Financial Freedom</h2>
          <p>We are a community of people brought together by a common interest in financial empowerment, rather than merely being a lending platform. As we move forward, we're excited to make new connections and encourage one another in our shared pursuit of financial freedom.</p>
          <div className="refer-btn">
            <Link to="#">Recommend To Friend</Link>
          </div>
          <div className="earn-btn">
            <span className="earnIcons">₹</span>Earn Rewards
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</section>

<section className="testimonilas-Section">
<div className="testimonilas-inner">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h2 className="green-border white-border">VOICE OF OUR CUSTOMERS</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
          <div className="muyowl-slider">
            <OwlCarousel className='owl-theme' items={isMobile?1:3}  loop margin={30}  autoplay={true} >
              {owlCarouselItems.map(items => (
                <div className='item' key={items.id}>
                <div className="testimonilas-content">
                  <img className="profielUsersr" src={ProfileIcons} alt="ProfileIcons" />
                  <div className="testimonial-cot">
                    {items.userReview}
                    {items.userName}
                    <p className="starts">
                    ★★★★★
                    </p>
                  </div>
                </div>
            </div>
              ))}
            </OwlCarousel>
          </div>


      </div>
    </div>
  </div>

</div>
</section>

<section className="spreading-smileSection">
<div className="spreading-inner">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h2>SPREADING SMILES ALL THE WAY…</h2>
      </div>
    </div>
  </div>
</div>
<div className="kpiSection">
<div className="container">
  <div className="row">
    
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="kpibox">
        <img src={EnquiryIcon} alt="EnquiryIcon" />
        <h3><CountUp end={12}>{({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} />
            </VisibilitySensor>
        )}</CountUp> Lakhs</h3>
        <p>Inquiries</p>
      </div>
    </div>

    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="kpibox">
        <img src={LoanProcessed} alt="LoanProcessed" />
        <h3><CountUp end={80}>{({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} />
            </VisibilitySensor>
        )}</CountUp> Lakh</h3>
        <p>Loans Processed</p>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="kpibox">
        <img src={EnquiryIcon} alt="EnquiryIcon" />
        <h3><CountUp end={20}>{({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} />
            </VisibilitySensor>
        )}</CountUp>+</h3>
        <p>Partner Banks</p>
      </div>
    </div>
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="kpibox">
        <img src={UsersIcons} alt="UsersIcons" />
        <h3><CountUp end={10}>{({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} />
            </VisibilitySensor>
        )}</CountUp> Lakh</h3>
        <p>Happy Users</p>
      </div>
    </div>
  </div>
</div>
</div>
</section>

 </div>
  </div>
 <Footer/>
 </>

);

}

export default Home;

