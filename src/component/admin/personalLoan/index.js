import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { API_URL } from "../../../config/constant";
import AddOffer from "./addOffers";
import WelComeNote from "./welcomeNote";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { jsPDF } from "jspdf";
import CurrencyFormat from "react-currency-format";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";
import CurrencyInput from "react-currency-input-field";
import numberToText from "number-to-text";
import Form from "react-bootstrap/Form";
import generateData from "./generateData";
import JSZip from "jszip";
import Loader from "../../loader/";
import verifiedImage from "../../../assets/images/admin-dashboard/verified.svg";
require("number-to-text/converters/en-in");

const CaseNumberInLead = ({ menuAccess }) => {
  const [loader, setLoader] = useState(false);
  let { caseID, type, offerId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loanTypeData, setloanTypeData] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [getSelectedOfferData, setGetSelectedOfferData] = useState([]);
  const [aadhaarValid, setAadhaarValid] = useState(false);
  const [panValid, setPanValid] = useState(false);
  const [panValidP, setPanValidP] = useState(false);
  useEffect(() => {
    getAllBankList();
    getUserData();
    getLoanPurposeData();
  }, [1]);

  const [submitDisable, setSubmitDisable] = useState(true);
  const [submitWelcomeDisable, setSubmitWelcomeDisable] = useState(true);
  const [ShowUploadDoc, setShowUploadDoc] = useState(false);
  const [bankData, setBankData] = useState("");
  const [tempBankData, setTempBankData] = useState("");
  const [loanData, setLoanData] = useState("");
  const [dataForm, setDataForm] = useState("");
  const [show, setShow] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [showLoanAmout, setShowLoanAmount] = useState(false);
  const [showEmployementDetails, setShowEmployementDetails] = useState(false);
  const [showPersonalDetails, setPersonalDetails] = useState(false);
  const [bankDetailsShow, setBankDetailsShow] = useState(false);
  const [directorShow, setDirectorShow] = useState(false);
  const [showRemarks, setShowRemarks] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setEditModeOffer(0);
  };
  const [acceptedOffers, setAcceptedOffers] = useState([]);

  const handleShowOffer = () => {
    setShowOffer(true);
  };
  const handleCloseOffer = () => {
    setShowOffer(false);
  };

  const handleCloseLoanAmount = () => {
    setShowLoanAmount(false);
  };
  const handleCloseEmployementDetails = () => {
    setShowEmployementDetails(false);
  };
  const handleClosePesonalDetails = () => {
    setPersonalDetails(false);
    setDoiError(false);
    setDobError(false);
  };

  const handleCloseBankDetails = () => {
    setBankDetailsShow(false);
  };
  const handleCloseDirectorDetails = () => {
    setDirectorShow(false);
  };
  const handleRemarksShow = () => {
    setShowRemarks(false);
  };
  const handleShowRemarks = () => {
    setShowRemarks(true);
  };
  const [offeredBank, setOfferedBank] = useState([]);

  const [subLoanPurposeData, setSubLoanPurposeData] = useState("");
  const [ph, setPh] = useState("000000000");

  const [isDisableAll, setIsDisableAll] = useState(type == 4 ? true : false);

  const [welcomeNoteData, setWelcomeNoteData] = useState("");
  const [isWelcomeData, setIsWelcomeData] = useState(false);

  const [pastLoan, setPastLoan] = useState("");
  const [pastLoanError, setPastLoanError] = useState(false);

  const [pastLoanAmount, setPastLoanAmount] = useState(0);
  const [pastLoanAmountError, setPastLoanAmountError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [gstin, setGstin] = useState("");
  const [gstinError, setGstinError] = useState(false);
  const [itrAvailable, setItrAvailable] = useState("");
  const [itrAvailableError, setItrAvailableError] = useState(false);

  const [businessVintage, setBusinessVintage] = useState("");
  const [businessVintageError, setBusinessVintageError] = useState(false);

  const [anualTurnOver, setAnualTurnOver] = useState(0);
  const [anualTurnOverError, setAnualTurnOverError] = useState(false);

  const [anualProfit, setAnualProfit] = useState(0);
  const [anualProfitError, setAnualProfitError] = useState(false);
  const [industryData, setIndustryData] = useState([]);
  const [industry, setIndustry] = useState("");
  const [industryError, setIndustryError] = useState(false);
  const [subIndustryData, setSubIndustryData] = useState([]);
  const [subIndustry, setSubIndustry] = useState("");
  const [subIndustryError, setSubIndustryError] = useState(false);

  const [anualProfitCompError, setAnualProfitCompError] = useState("");

  const [empId, setEmpId] = useState("");

  const [businessTypeData, setBusinessTypeData] = useState([]);
  const [allBusinessTypeData, setAllBusinessTypeData] = useState([]);
  const [businessType, setBusinessType] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [panNumber, setPanNumber] = useState("");
  const [panNumberError, setPanNumberError] = useState(false);
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState(false);
  const [doi, setDoi] = useState("");
  const [addOneCurrent, setAddOneCurrent] = useState("");
  const [addOneError, setAddOneError] = useState(false);
  const [addTwoCurrent, setAddTwoCurrent] = useState("");
  const [addTwoCurrentError, setAddTwoCurrentError] = useState(false);
  const [streetCurrent, setStreetCurrent] = useState("");
  const [streetCurrentError, setStreetCurrentError] = useState(false);
  const [pinCodeCurrent, setPinCodeCurrent] = useState("");
  const [pinCodeCurrentError, setPinCodeCurrentError] = useState(false);
  const [stateCurrent, setStateCurrent] = useState("");
  const [stateCurrentError, setStateCurrentError] = useState(false);
  const [cityCurrent, setCityCurrent] = useState("");
  const [cityCurrentError, setCityCurrentError] = useState(false);
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState(false);
  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [relationshipStatusError, setRelationshipStatusError] = useState(false);
  const [addOnePermanent, setAddOnePermanent] = useState("");
  const [addOnePermanentError, setAddOnePermanentError] = useState(false);
  const [addTwoPermanent, setAddTwoPermanent] = useState("");
  const [addTwoPermanentError, setAddTwoPermanentError] = useState(false);
  const [streetPermanent, setStreetPermanent] = useState("");
  const [streetPermanentError, setStreetPermanentError] = useState(false);
  const [pinCodePermanent, setPinCodePermanent] = useState("");
  const [pinCodePermanentError, setPinCodePermanentError] = useState(false);
  const [statePermanent, setStatePermanent] = useState("");
  const [statePermanentError, setStatePermanentError] = useState(false);
  const [cityPermanent, setCityPermanent] = useState("");
  const [cityPermanentError, setCityPermanentError] = useState(false);

  const [personalDetailsId, setPersonalDetailsId] = useState("");
  const [businessTypeError, setBusinessTypeError] = useState(false);
  const [dobHide, setDobHide] = useState(false);
  const [doiError, setDoiError] = useState(false);

  const getAllBankList = () => {
    axios
      .post(API_URL + "admin/get-all-bank-list")
      .then((res) => {
        let response = res?.data;

        if (response?.status === 200) {
          setBankData(response?.data);
          setTempBankData(response?.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUserData = () => {
    setLoader(true);
    let formData = {
      caseId: caseID,
      adminId: localStorage.getItem("adminId"),
    };
    axios
      .post(API_URL + "admin/get-user-loan-appication", formData)
      .then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          // console.log(response?.respData)
          let resp = response?.respData;
          let pancardFile = "";
          let businessregDatas = "";
          let bankStatementFile = "";
          let itrFile = [];
          let partnershipDeed = "";
          let directorKyc = "";
          let aadhaarFront = "";
          let aadhaarBack = "";
          let salarySlip = [];

          if (Object.keys(resp).length) {
            let panData = resp?.files.filter(
              (x) => x.document_type === "pan_card"
            );
            pancardFile = panData[0]?.path;

            let businessregData = resp?.files.filter(
              (x) => x.document_type === "business_registration"
            );
            businessregDatas = businessregData[0]?.path;

            let bankStatementData = resp?.files.filter(
              (x) => x.document_type === "bank_statement"
            );
            bankStatementFile = bankStatementData[0]?.path;

            let itrData = resp?.files.filter((x) => x.document_type === "itr");
            let fileItr = itrData.map((x) => {
              return x.path;
            });
            itrFile = fileItr;

            let partnershipDeedData = resp?.files.filter(
              (x) => x.document_type === "partnership_deed"
            );
            partnershipDeed = partnershipDeedData[0]?.path;

            let aadhaarFrontData = resp?.files.filter(
              (x) => x.document_type === "aadhaar_front"
            );
            aadhaarFront = aadhaarFrontData[0]?.path;

            let directorKycData = resp?.files.filter(
              (x) => x.document_type === "director_kyc"
            );
            directorKyc = directorKycData[0]?.path;

            let aadhaarBackData = resp?.files.filter(
              (x) => x.document_type === "aadhaar_back"
            );
            aadhaarBack = aadhaarBackData[0]?.path;

            let salData = resp?.files.filter(
              (x) => x.document_type === "salary_slip"
            );
            let salD = salData.map((x) => {
              return x.path;
            });
            salarySlip = salD;
          }

          let created_by = "";
          if (
            resp?.user_detail?.user_id == resp?.loan_requirement?.created_by ||
            resp?.loan_requirement?.created_by == null ||
            resp?.loan_requirement?.created_by == "admin"
          ) {
            created_by = "FinLab";
          } else {
            created_by = "Partner";
          }

          setloanTypeData(
            resp?.loan_requirement?.purpose_of_loan_name
              ? resp?.loan_requirement?.purpose_of_loan_name
              : ""
          );
          setApplicantEmail(
            resp?.personal_detail?.email_id
              ? resp?.personal_detail?.email_id
              : ""
          );
          setApplicantName(
            resp?.personal_detail?.name ? resp?.personal_detail?.name : ""
          );

          let bankDetailsOffers = resp?.bank_details ? resp?.bank_details : [];

          if (bankDetailsOffers.length) {
            let offerAcept = bankDetailsOffers.map((x) => {
              return x.offer_id;
            });
            setAcceptedOffers(offerAcept);
          }

          let WelcomDetails = resp?.welcome_data ? resp?.welcome_data : [];

          if (WelcomDetails.length) {
            setIsWelcomeData(true);
          }

          /*********rm dublicate bank ditals*********** */
          let newBankDetailArray = [];
          let uniqueObject = {};
          if (resp?.bank_details) {
            for (let i in resp?.bank_details) {
              let objTitle = resp?.bank_details[i]["account_number"];
              uniqueObject[objTitle] = resp?.bank_details[i];
            }

            for (let i in uniqueObject) {
              newBankDetailArray.push(uniqueObject[i]);
            }
          }

          setPh(
            resp?.user_detail?.case_number
              ? resp?.user_detail?.case_number
              : "0000000000"
          );
          setIsVerified(resp?.is_verified > 0 ? true : false);

          setData([
            {
              is_pan_verified: resp?.verified_data?.is_pan_verified
                ? true
                : false,
              is_gstin_verified: resp?.verified_data?.is_gstin_verified
                ? true
                : false,
              name: resp?.personal_detail?.name
                ? resp?.personal_detail?.name
                : "",
              caseNumber: resp?.user_detail?.case_number
                ? resp?.user_detail?.case_number
                : "",
              emailId: resp?.personal_detail?.email_id
                ? resp?.personal_detail?.email_id
                : "",
              phoneNumber: resp?.user_detail?.mobile_number
                ? resp?.user_detail?.mobile_number
                : "",
              loanAmountRequired: resp?.loan_requirement?.loan_required_amount
                ? resp?.loan_requirement?.loan_required_amount
                : "",
              loanType: resp?.loan_requirement?.purpose_of_loan_name
                ? resp?.loan_requirement?.purpose_of_loan_name
                : "",
              appliedDate: resp?.loan_requirement?.created_at
                ? resp?.loan_requirement?.created_at
                : "",
              offerAdded: response?.respData?.user_detail?.active_offer_id
                ? "Yes"
                : "No",
              source: created_by ? created_by : "",
              loanId: resp?.loan_requirement?.id
                ? resp?.loan_requirement?.id
                : "",
              loanPurposeId: resp?.loan_requirement?.purpose_of_loan
                ? resp?.loan_requirement?.purpose_of_loan
                : "",
              loanPurpose: resp?.loan_requirement?.purpose_of_loan_name
                ? resp?.loan_requirement?.purpose_of_loan_name
                : "",
              subLoanPurposeId: resp?.loan_requirement?.sub_loan_of_purpose
                ? resp?.loan_requirement?.sub_loan_of_purpose
                : "",
              subLoanPurpose: resp?.loan_requirement?.sub_loan_of_purpose_name
                ? resp?.loan_requirement?.sub_loan_of_purpose_name
                : "",
              loanDuration: resp?.loan_requirement?.loan_duration
                ? resp?.loan_requirement?.loan_duration
                : "",
              personalDetailsId: resp?.personal_detail?.id
                ? resp?.personal_detail?.id
                : "",
              businessTypeId: resp?.personal_detail?.business_type
                ? resp?.personal_detail?.business_type
                : "",
              businessType: resp?.personal_detail?.business_type_name
                ? resp?.personal_detail?.business_type_name
                : "",
              panNumber: resp?.personal_detail?.pan_card
                ? resp?.personal_detail?.pan_card
                : "",
              dateOfBirth: resp?.personal_detail?.dob_doi
                ? resp?.personal_detail?.dob_doi
                : "",
              othersBusinessName: resp?.personal_detail?.other_business
                ? resp?.personal_detail?.other_business
                : "",
              subBusinessName: resp?.personal_detail?.sub_business_type_name
                ? resp?.personal_detail?.sub_business_type_name
                : "",
              gender: resp?.personal_detail?.gender,
              relationship_status: resp?.personal_detail?.relaship_status,
              dateOfIncorporation: resp?.personal_detail?.doi
                ? resp?.personal_detail?.doi
                : "",
              companyName: resp?.salaried_detail?.company_name
                ? resp?.salaried_detail?.company_name
                : "",
              companyAddress: {
                address1: resp?.personal_detail?.permanant_address_1
                  ? resp?.personal_detail?.permanant_address_1
                  : "",
                address2: resp?.personal_detail?.permanant_address_2
                  ? resp?.personal_detail?.permanant_address_2
                  : "",
                landmark: resp?.personal_detail?.permanant_landmark
                  ? resp?.personal_detail?.permanant_landmark
                  : "",
                pincode: resp?.personal_detail?.permanant_pin_code
                  ? resp?.personal_detail?.permanant_pin_code
                  : "",
                state: resp?.personal_detail?.permanant_state
                  ? resp?.personal_detail?.permanant_state
                  : "",
                city: resp?.personal_detail?.permanant_city
                  ? resp?.personal_detail?.permanant_city
                  : "",
              },
              currentAddress: {
                address1: resp?.personal_detail?.current_address_1
                  ? resp?.personal_detail?.current_address_1
                  : "",
                address2: resp?.personal_detail?.current_address_2
                  ? resp?.personal_detail?.current_address_2
                  : "",
                landmark: resp?.personal_detail?.current_landmark
                  ? resp?.personal_detail?.current_landmark
                  : "",
                pincode: resp?.personal_detail?.current_pin_code
                  ? resp?.personal_detail?.current_pin_code
                  : "",
                state: resp?.personal_detail?.current_state
                  ? resp?.personal_detail?.current_state
                  : "",
                city: resp?.personal_detail?.current_city
                  ? resp?.personal_detail?.current_city
                  : "",
              },
              pastLoan: resp?.personal_detail?.past_loan
                ? resp?.personal_detail?.past_loan
                : "",
              pastLoanAmount: resp?.personal_detail?.past_loan_amount
                ? resp?.personal_detail?.past_loan_amount
                : 0,
              empId: resp?.self_employee_detail?.id
                ? resp?.self_employee_detail?.id
                : "",
              gstinNumber: resp?.self_employee_detail?.gstin
                ? resp?.self_employee_detail?.gstin
                : "",
              i_file: resp?.self_employee_detail?.i_file
                ? resp?.self_employee_detail?.i_file
                : "",
              itrAvailabilityId: resp?.self_employee_detail?.is_itr_available
                ? resp?.self_employee_detail?.is_itr_available
                : "",
              itrAvailability: resp?.self_employee_detail?.is_itr_available
                ? "Last " + resp?.self_employee_detail?.is_itr_available + " Yr"
                : "",
              businessVintageId: resp?.self_employee_detail?.business_vintage
                ? resp?.self_employee_detail?.business_vintage
                : "",
              businessVintage: resp?.self_employee_detail?.business_vintage
                ? resp?.self_employee_detail?.business_vintage + " Yr"
                : "",
              turnoverYearly: resp?.self_employee_detail?.annual_turnover
                ? resp?.self_employee_detail?.annual_turnover
                : "",
              grossProfit: resp?.self_employee_detail?.gross_Annual_profit
                ? resp?.self_employee_detail?.gross_Annual_profit
                : "",
              industryName: resp?.self_employee_detail?.industry_name
                ? resp?.self_employee_detail?.industry_name
                : "",
              industry: resp?.self_employee_detail?.industry
                ? resp?.self_employee_detail?.industry
                : "",
              subIndustry: resp?.self_employee_detail?.sub_industry
                ? resp?.self_employee_detail?.sub_industry
                : "",
              subIndustryName: resp?.self_employee_detail?.sub_industry_name
                ? resp?.self_employee_detail?.sub_industry_name
                : "",
              uploadPancard: pancardFile ? pancardFile : "",
              uploadBusinessRegistration: businessregDatas
                ? businessregDatas
                : "",
              uploadBankStatement: bankStatementFile ? bankStatementFile : "",
              uploadItr: itrFile ? itrFile : "",
              uploadDirectorKyc: directorKyc ? directorKyc : "",
              uploadPartnershipDeed: partnershipDeed ? partnershipDeed : "",
              uploadAadhaarFront: aadhaarFront ? aadhaarFront : "",
              uploadAadhaarBack: aadhaarBack ? aadhaarBack : "",
              uploadSalarySlip: salarySlip ? salarySlip : "",
              offerData: resp?.offers ? resp?.offers : [],
              directorData: resp?.director_data ? resp?.director_data : [],
              bankDetails: resp?.bank_details ? newBankDetailArray : [],
              aadhaar: resp?.personal_detail?.aadhaar
                ? resp?.personal_detail?.aadhaar
                : "-",
              salariedCompInfo: {
                name: resp?.salaried_detail?.company_name
                  ? resp?.salaried_detail?.company_name
                  : "-",
                tenure: resp?.salaried_detail?.compnay_tenure
                  ? resp?.salaried_detail?.compnay_tenure
                  : "-",
                fixedSalary: resp?.salaried_detail?.net_fixed_salary
                  ? resp?.salaried_detail?.net_fixed_salary
                  : "-",
                comapnyEmail: resp?.salaried_detail?.official_email_id
                  ? resp?.salaried_detail?.official_email_id
                  : "-",
                totalExp: resp?.salaried_detail?.total_experience
                  ? resp?.salaried_detail?.total_experience
                  : "-",
                workingAs: resp?.salaried_detail?.working_as
                  ? resp?.salaried_detail?.working_as
                  : "-",
                noticePeriod: resp?.salaried_detail?.are_serving_notice_period
                  ? resp?.salaried_detail?.are_serving_notice_period
                  : "-",
                salaryRecievedVia: resp?.salaried_detail?.salary_recieved_via
                  ? resp?.salaried_detail?.salary_recieved_via
                  : "-",
              },
            },
          ]);

          if (type == 2 || type == 4) {
            if (resp?.offers.length) {
              let xdata = resp?.offers.filter((x) => {
                if (x.id == offerId) {
                  return x;
                }
              });

              setGetSelectedOfferData(xdata);
            }
          }
          /*********remove bank from list that offered already*********** */

          let offered_bank = resp?.offers
            ? resp?.offers.map((x) => {
                return x.bank_name;
              })
            : ["x"];
          setOfferedBank(offered_bank);
        }
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
        console.log(e);
      });
  };

  useEffect(() => {
    if (tempBankData.length && offeredBank.length) {
      let v = tempBankData.filter((x) => !offeredBank.includes(x.bank_name));
      setBankData(v);
    }
  }, [tempBankData, offeredBank]);

  const getLoanPurposeData = () => {
    axios
      .get(API_URL + "master/loan-purpose")
      .then((res) => {
        let response = res?.data;

        if (response?.status === 200) {
          let filter_data = response?.data.filter((v) => {
            return v.parent_id === 0;
          });

          setLoanData(filter_data);
        }

        let subloan_data = response?.data.filter((v) => {
          return v.parent_id === 1;
        });

        setSubLoanPurposeData(subloan_data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const checkSubmitDisableBtn = (data) => {
    setSubmitDisable(data);
    if (data) {
      setDataForm("");
    }
  };

  const processData = (
    bank,
    loanAmt,
    emi,
    roi,
    tenure,
    processingFee,
    roiType
  ) => {
    const jsonData = {
      caseId: caseID,
      bankId: bank,
      loanAmt: loanAmt,
      emi: emi,
      roi: roi,
      tenure: tenure,
      processingFee: processingFee,
      roiType: roiType,
    };
    if (editModeOffer) {
      jsonData["editId"] = editId;
    }
    setDataForm(jsonData);
    //  console.log("data",jsonData);
  };

  const submitData = () => {
    setSubmitDisable(true);
    const jsonData = {
      email: applicantEmail,
      name: applicantName,
      offerData: dataForm,
    };
    axios
      .post(API_URL + "admin/save-user-offer", jsonData)
      .then((res) => {
        let response = res.data;

        if (response?.status === 200) {
          //console.log(response?.data)
          toast.success(response?.message);
          setShow(false);
          navigate("/admin/lead-case");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const changeStatus = (id, status) => {
    const dataForm = {
      id: id,
      status: status,
    };
    axios
      .post(API_URL + "admin/update-offer-status", dataForm)
      .then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          toast.success(response?.message);
          getUserData();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [previousData, setPreviousData] = useState([]);
  const editOfferData = (offerData) => {
    setPreviousData(offerData);
  };

  const handleDecline = () => {
    Swal.fire({
      title: "Do you want to Decline the Application?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        diclineApplication();
      } else if (result.isDenied) {
      }
    });
  };
  const [patronid, setPatronid] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const getToken = () => {
    axios
      .post(API_URL + "api-auth/token")
      .then((res) => {
        let response = res.data;
        setPatronid(response?.data?.userId);
        setAccessToken(response?.data?.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getToken();
  }, []);
  const handleVerifyPanGstin = () => {
    setLoader(true);
    let formData = {
      case_id: caseID,
      patronid: patronid,
      token: accessToken,
      loanType: 2,
    };
    axios
      .post(API_URL + "api-auth/verify-pan-gstin", formData)
      .then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          toast.success(response?.message);
          getUserData();
        } else {
          toast.error(response?.message);
        }
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };

  const diclineApplication = () => {
    const jsonData = {
      email: applicantEmail,
      name: applicantName,
      case_id: caseID,
    };
    axios
      .post(API_URL + "admin/decline-application", jsonData)
      .then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          toast.success(response?.message);
          navigate("/admin/lead-case");
          //getUserData();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [editModeOffer, setEditModeOffer] = useState(0);
  const [dataOfOffer, setdataOfOffer] = useState({});
  const [editId, setEditId] = useState(0);
  const editData = (data) => {
    setEditModeOffer(1);
    setdataOfOffer(data);
    setShow(true);
    setEditId(data?.id);
  };

  const [loanAmountData, setLoanAmountData] = useState({});
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanPurpose, setLoanPurpose] = useState("");
  const [subLoanPurpose, setSubLoanPurpose] = useState("");
  const [subLoanPurposeError, setSubLoanPurposeError] = useState(false);
  const [loanDuration, setLoanDuration] = useState(0);
  const [loanDurationError, setLoanDurationError] = useState(false);
  const [loanId, setLoanID] = useState("");

  const editLoanAmount = (data) => {
    setLoanID(data?.loanId);
    setShowLoanAmount(true);
    setLoanAmountData(data);
    setLoanAmount(data?.loanAmountRequired);
    setLoanPurpose(data?.loanPurposeId);
    setSubLoanPurpose(data?.subLoanPurposeId);
    setLoanDuration(data?.loanDuration);
  };

  const handleLoan = (e) => {
    setLoanAmount(e ? (e > 0 ? e : 0) : 0);
  };

  const handleLoanPurpose = (e) => {
    setLoanPurpose(e.target.value);
  };

  const handleDuration = (e) => {
    setLoanDurationError(false);
    setLoanDuration(e.target.value);
  };

  const handleSubLoanPurpose = (e) => {
    setSubLoanPurposeError(false);
    setSubLoanPurpose(e.target.value);
  };

  const handleLoanAmountValidation = () => {
    let isFormValid = true;
    if (!subLoanPurpose) {
      isFormValid = false;
      setSubLoanPurposeError(true);
    }

    if (!loanDuration) {
      isFormValid = false;
      setLoanDurationError(true);
    }

    if (loanDuration == 0) {
      isFormValid = false;
      setLoanDurationError(true);
    }

    return isFormValid;
  };

  const UpdateLoanAmountData = () => {
    if (handleLoanAmountValidation()) {
      const jsonData = {
        id: loanId,
        loan_required_amount: loanAmount,
        purpose_of_loan: loanPurpose,
        sub_loan_of_purpose: subLoanPurpose,
        loan_duration: loanDuration,
      };

      axios
        .post(API_URL + "admin/update-user-loan-data", jsonData)
        .then((res) => {
          let response = res.data;

          if (response?.status === 200) {
            //console.log(response?.data)
            toast.success(response?.message);
            setShowLoanAmount(false);
            getUserData();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const [monthlyIncomeError, setMonthlyIncomeError] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [salaryRecievedInError, setSalaryRecievedInError] = useState(false);
  const [salaryRecievedIn, setSalaryRecievedIn] = useState("");
  const [companyNameError, setCompanyNameError] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [tenureError, setTenureError] = useState(false);
  const [tenure, setTenure] = useState("");
  const [experienceError, setExperienceError] = useState(false);
  const [experience, setExperience] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [npError, setNpErorr] = useState(false);
  const [np, setNp] = useState("");
  const [workingError, setWorkingErorr] = useState(false);
  const [working, setWorking] = useState("");

  const handleMonthlyIncome = (e) => {
    setMonthlyIncomeError(false);
    setMonthlyIncome(e ? e : 0);
  };

  const handleSalaryRecieved = (e) => {
    setSalaryRecievedInError(false);
    setSalaryRecievedIn(e.target.value);
  };
  const handleCompanyName = (e) => {
    setCompanyNameError(false);
    setCompanyName(e.target.value);
  };
  const handleTenure = (e) => {
    setTenureError(false);
    setTenure(e.target.value);
  };

  const handleExperience = (e) => {
    setExperienceError(false);
    setExperience(e.target.value);
  };
  const handleEmail = (e) => {
    setEmailError(false);
    setEmail(e.target.value);
  };
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const handleNp = (e) => {
    setNpErorr(false);
    setNp(e.target.value);
  };
  const handleWorking = (e) => {
    setWorkingErorr(false);
    setWorking(e.target.value);
  };

  const handleValidation = () => {
    let isFormValid = true;
    if (!monthlyIncome) {
      isFormValid = false;
      setMonthlyIncomeError(true);
    }
    if (!salaryRecievedIn) {
      isFormValid = false;
      setSalaryRecievedInError(true);
    }
    if (!companyName) {
      isFormValid = false;
      setCompanyNameError(true);
    }
    if (!tenure) {
      isFormValid = false;
      setTenureError(true);
    }
    if (!experience) {
      isFormValid = false;
      setExperienceError(true);
    }
    if (!email) {
      isFormValid = false;
      setEmailError(true);
    }
    if (!validateEmail(email)) {
      isFormValid = false;
      setEmailError(true);
    }
    if (!np) {
      isFormValid = false;
      setNpErorr(true);
    }
    if (!working) {
      isFormValid = false;
      setWorkingErorr(true);
    }
    return isFormValid;
  };

  const sendWelcomeNote = () => {
    let formData = new FormData();
    if (welcomeNoteData.length) {
      formData.append("welcome_note", welcomeNoteData[0]);
    }
    formData.append("offer_id", offerId);
    formData.append("case_id", caseID);
    formData.append("email", applicantEmail);
    formData.append("name", applicantName);

    axios
      .post(API_URL + "admin/save-welcome-note-data", formData)
      .then((res) => {
        let response = res.data;

        if (response?.status === 200) {
          toast.success(response?.message);
          setShow(false);
          getUserData();
          handleCloseOffer();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getIndustryData();
  }, []);
  const getIndustryData = () => {
    axios
      .post(API_URL + "admin/get-industry-data")
      .then((res) => {
        let response = res.data;
        let respo = response?.data?.industry;

        setIndustryData(respo);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [iFile, setIFile] = useState("");
  const [nameOnPan, setNameOnPan] = useState("");
  const editEmployementDetails = (data) => {
    setShowEmployementDetails(true);
    console.log(data);
    setCompanyName(data?.salariedCompInfo?.name);
    setTenure(data?.salariedCompInfo?.tenure);
    setMonthlyIncome(data?.salariedCompInfo?.fixedSalary);
    setSalaryRecievedIn(data?.salariedCompInfo?.salaryRecievedVia);
    setEmail(data?.salariedCompInfo?.comapnyEmail);
    setExperience(data?.salariedCompInfo?.totalExp);
    setWorking(data?.salariedCompInfo?.workingAs);
    setNp(data?.salariedCompInfo?.noticePeriod);
  };

  const handleComapnyName = (e) => {
    setGstinError(false);
    setGstin(e.target.value);
  };

  const handleItrAvailable = (e) => {
    setItrAvailableError(false);
    setItrAvailable(e.target.value);
  };

  const handleBusinessVintage = (e) => {
    setBusinessVintageError(false);
    setBusinessVintage(e.target.value);
  };

  const handleAnualTurnOver = (e) => {
    setAnualTurnOverError(false);
    setAnualTurnOver(e ? (e > 0 ? e : 0) : 0);
  };

  const handleAnualProfit = (e) => {
    setAnualProfitError(false);
    setAnualProfit(e ? (e > 0 ? e : 0) : 0);
  };

  const handleIndustry = (e) => {
    setIndustryError(false);
    setIndustry(e.target.value);
    setSubIndustry("");
    let inId = e.target.value;
    if (inId) {
      const jsonData = {
        id: inId,
      };

      axios
        .post(API_URL + "admin/get-sub-industry-data", jsonData)
        .then((res) => {
          let response = res.data;
          let respo = response?.data?.subIndustry;
          setSubIndustryData(respo);

          if (response?.status === 200) {
            //console.log(response?.data)
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleSubIndustry = (e) => {
    setSubIndustryError(false);
    setSubIndustry(e.target.value);
  };

  const handleEmployeeValidation = () => {
    let isFormValid = true;
    if (!gstin && (iFile == "both" || iFile == "gstin")) {
      isFormValid = false;
      setGstinError(true);
    }
    if (gstinCheckError && (iFile == "both" || iFile == "gstin")) {
      isFormValid = false;
      setGstinError(true);
    }
    if (!itrAvailable && (iFile == "both" || iFile == "itr")) {
      isFormValid = false;
      setItrAvailableError(true);
    }
    if (!businessVintage) {
      isFormValid = false;
      setBusinessVintageError(true);
    }
    if (!anualTurnOver) {
      isFormValid = false;
      setAnualTurnOverError(true);
    }
    if (anualTurnOver == 0) {
      isFormValid = false;
      setAnualTurnOverError(true);
    }
    if (!anualProfit) {
      isFormValid = false;
      setAnualProfitError(true);
    }
    if (anualProfit == 0) {
      isFormValid = false;
      setAnualProfitError(true);
    }
    if (!industry) {
      isFormValid = false;
      setIndustryError(true);
    }
    if (!subIndustry) {
      isFormValid = false;
      setSubIndustryError(true);
    }

    return isFormValid;
  };

  const UpdateEmployementDetailsData = () => {
    if (handleValidation()) {
      axios
        .post(API_URL + "token/generate-token", { user_id: caseID })
        .then((res) => {
          let response = res.data;
          if (response?.token) {
            let jsonData = {
              case_id: caseID,
              net_fixed_salary: monthlyIncome,
              salary_recieved_via: salaryRecievedIn,
              company_name: companyName,
              compnay_tenure: tenure,
              total_experience: experience,
              official_email_id: email,
              are_serving_notice_period: np,
              working_as: working,
              token: response?.token,
            };
            axios
              .post(API_URL + "user/salired-detail", jsonData)
              .then((res) => {
                let response = res.data;
                if (response?.status === 200) {
                  toast.success(response?.message);
                  setShowEmployementDetails(false);
                  getUserData();
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
    }
  };

  useEffect(() => {
    getBusinessType();
  }, []);
  const getBusinessType = () => {
    axios
      .get(API_URL + "master/business-type")
      .then((res) => {
        let response = res.data;
        setAllBusinessTypeData(response?.data);
        let filter_data = response?.data.filter((v) => {
          return v.parent_id === 0;
        });
        setBusinessTypeData(filter_data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editPersonalDetails = (data) => {
    console.log(data);
    setPersonalDetails(true);
    setBusinessType(data?.businessTypeId);
    setName(data?.name);
    setPanNumber(data?.panNumber);
    setAadhaar(data?.aadhaar);
    if (data?.dateOfBirth !== "") {
      let yourDate = new Date(data?.dateOfBirth);
      setDob(yourDate);
    }

    if (data?.dateOfIncorporation !== "") {
      let yourDate2 = new Date(data?.dateOfIncorporation);
      setDoi(yourDate2);
    }
    if (data?.businessTypeId === 1) {
      setDobHide(true);
    }
    setGender(data?.gender);
    setRelationshipStatus(data?.relationship_status);
    setAddOneCurrent(data?.companyAddress?.address1);
    setAddTwoCurrent(data?.companyAddress?.address2);
    setStreetCurrent(data?.companyAddress?.landmark);
    setPinCodeCurrent(data?.companyAddress?.pincode);
    setStateCurrent(data?.companyAddress?.state);
    setCityCurrent(data?.companyAddress?.city);
    setPersonalDetailsId(data?.personalDetailsId);
    setPastLoan(data?.pastLoan);
    setPastLoanAmount(data?.pastLoanAmount);

    setAddOnePermanent(data?.currentAddress?.address1);
    setAddTwoPermanent(data?.currentAddress?.address2);
    setStreetPermanent(data?.currentAddress?.landmark);
    setPinCodePermanent(data?.currentAddress?.pincode);
    setStatePermanent(data?.currentAddress?.state);
    setCityPermanent(data?.currentAddress?.city);
  };

  const handleName = (e) => {
    setNameError(false);
    setName(e.target.value);
  };

  const handlePanNumber = (e) => {
    setPanNumberError(false);
    setPanNumber(e.target.value.toUpperCase());
    if (e.target.value.length == 10) {
      checkPanNumber(e.target.value);
    } else {
      setPanValidP(false);
    }

    if (e.target.value.length < 10) {
      setName("");
    }
  };

  const handleBusinessType = (e) => {
    setBusinessTypeError(false);
    setBusinessType(e.target.value);
    if (e.target.value != 1) {
      setDobHide(false);
    } else {
      setDobHide(true);
    }
  };

  const handleDateOfBirth = (e) => {
    setDobError(false);
    setDob(e);
  };

  const handleDateOfInc = (e) => {
    setDoiError(false);
    setDoi(e);
  };

  const handleAddOneCurrent = (e) => {
    setAddOneError(false);
    setAddOneCurrent(e.target.value);
  };

  const handleAddTwoCurrent = (e) => {
    setAddTwoCurrentError(false);
    setAddTwoCurrent(e.target.value);
  };

  const handleStreetCurrent = (e) => {
    setStreetCurrentError(false);
    setStreetCurrent(e.target.value);
  };

  const handlePinCodeCurrent = (e) => {
    setPinCodeCurrentError(false);
    setPinCodeCurrent(e.target.value);
  };

  const handleStateCurrent = (e) => {
    setStateCurrentError(false);
    setStateCurrent(e.target.value);
  };
  const handleCityCurrent = (e) => {
    setCityCurrentError(false);
    setCityCurrent(e.target.value);
  };

  const handleAddOnePermanent = (e) => {
    setAddOnePermanentError(false);
    setAddOnePermanent(e.target.value);
  };

  const handleAddTwoPermanent = (e) => {
    setAddTwoPermanentError(false);
    setAddTwoPermanent(e.target.value);
  };

  const handleStreetPermanent = (e) => {
    setStreetPermanentError(false);
    setStreetPermanent(e.target.value);
  };

  const handlePinCodePermanent = (e) => {
    setPinCodePermanentError(false);
    setPinCodePermanent(e.target.value);
  };

  const handleStatePermanent = (e) => {
    setStatePermanentError(false);
    setStatePermanent(e.target.value);
  };
  const handleCityPermanent = (e) => {
    setCityPermanentError(false);
    setCityPermanent(e.target.value);
  };

  const handleGender = (e) => {
    setGenderError(false);
    setGender(e.target.value);
  };

  const handleRelationShipStatus = (e) => {
    setRelationshipStatusError(false);
    setRelationshipStatus(e.target.value);
  };

  const handleValidationPersonalDetails = () => {
    let isFormValid = true;
    if (!name) {
      isFormValid = false;
      setNameError(true);
    }
    if (!panNumber) {
      isFormValid = false;
      setPanNumberError(true);
    }
    if (panNumber.length !== 10) {
      isFormValid = false;
      setPanNumberError(true);
    }
    if (!dob) {
      isFormValid = false;
      setDobError(true);
    }
    if (!aadhaar) {
      isFormValid = false;
      setAadhaarError(true);
    }
    if (!addOneCurrent) {
      isFormValid = false;
      setAddTwoCurrentError(true);
    }
    if (!addTwoCurrent) {
      isFormValid = false;
      setAddTwoCurrentError(true);
    }
    if (!cityCurrent) {
      isFormValid = false;
      setCityCurrentError(true);
    }
    if (!stateCurrent) {
      isFormValid = false;
      setStateCurrentError(true);
    }
    if (!streetCurrent) {
      isFormValid = false;
      setStreetCurrentError(true);
    }

    if (!addOnePermanent) {
      isFormValid = false;
      setAddTwoPermanentError(true);
    }
    if (!addTwoPermanent) {
      isFormValid = false;
      setAddTwoPermanentError(true);
    }
    if (!cityPermanent) {
      isFormValid = false;
      setCityPermanentError(true);
    }
    if (!statePermanent) {
      isFormValid = false;
      setStatePermanentError(true);
    }
    if (!streetPermanent) {
      isFormValid = false;
      setStreetPermanentError(true);
    }

    if (!pastLoan) {
      isFormValid = false;
      setPastLoanError(true);
    }
    if (pastLoan == "Yes") {
      if (!pastLoanAmount) {
        isFormValid = false;
        setPastLoanAmountError(true);
      }
    }

    return isFormValid;
  };

  const UpdatePersonalDetailsData = () => {
    if (handleValidationPersonalDetails()) {
      //setSubmitDisable(true);
      const jsonData = {
        id: personalDetailsId,
        name: name,
        panNumber: panNumber,
        aadhaar: aadhaar,
        dateOfBirth: dob,
        address1: addOneCurrent,
        address2: addTwoCurrent,
        landmark: streetCurrent,
        pincode: pinCodeCurrent,
        state: stateCurrent,
        city: cityCurrent,
        gender: gender,
        relationship_status: relationshipStatus,
        permanentaddress1: addOnePermanent,
        permanentaddress2: addTwoPermanent,
        permanentlandmark: streetPermanent,
        permanentpincode: pinCodePermanent,
        permanentstate: statePermanent,
        permanentcity: cityPermanent,

        pastLoan: pastLoan,
        pastLoanAmount: pastLoanAmount,
        case_id: caseID,
      };

      axios
        .post(API_URL + "admin/update-user-profile-data", jsonData)
        .then((res) => {
          let response = res.data;

          if (response?.status === 200) {
            //console.log(response?.data)
            toast.success(response?.message);
            setPersonalDetails(false);
            getUserData();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const checkWelcomSubmitDisableBtn = (data) => {
    setSubmitWelcomeDisable(data);
    if (data) {
      setWelcomeNoteData("");
    }
  };

  const getAddressByPin = (e, type) => {
    if (e.target.value.length === 6) {
      axios
        .get("https://api.postalpincode.in/pincode/" + e.target.value)
        .then((res) => {
          if (res?.data.length) {
            if (res?.data[0]?.PostOffice && res?.data[0]?.PostOffice.length) {
              let data = res?.data[0]?.PostOffice[0];
              if (type === "Permanent") {
                setPinCodePermanentError(false);
                setStatePermanent(data?.State);
                setCityPermanent(data?.Block + ", " + data?.District);
              } else {
                setPinCodeCurrentError(false);
                setStateCurrent(data?.State);
                setCityCurrent(data?.Block + ", " + data?.District);
              }
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountHolderNameError, setAccountHolderNameError] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [ifscCodeError, setIfscCodeError] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");

  const [preAccountNo, setPreAccountNo] = useState("");

  const EditBankDetails = (data, accont_number) => {
    setPreAccountNo(accont_number);
    setBankDetailsShow(true);
    setAccountNumber(data?.account_number);
    setAccountHolderName(data?.account_holder_name);
    setIfscCode(data?.ifsc);
    handleGetBankInfoUsingIFSC(data?.ifsc);
  };

  const handleAccountNumber = (e) => {
    setAccountNumberError("");
    setAccountNumber(e.target.value);
  };

  const handleAccountHolderName = (e) => {
    setAccountHolderNameError("");
    setAccountHolderName(e.target.value);
  };
  const handleIfscCode = (e) => {
    setIfscCodeError("");
    setIfscCode(e.target.value);
  };
  const handleGetBankInfoUsingIFSC = (data) => {
    axios
      .get("https://ifsc.razorpay.com/" + data)
      .then((res) => {
        let response = res.data;
        if (Object.keys(response).length) {
          setBankName(response?.BANK);
          setBranchAddress(response?.BRANCH + ", " + response?.CITY);
        } else {
          setIfscCodeError("Invalid IFSC code.");
          setBankName("");
          setBranchAddress("");
        }
      })
      .catch((e) => {
        setIfscCodeError("Invalid IFSC code.");
        setBankName("");
        setBranchAddress("");
      });
  };

  const handleBankValidation = () => {
    let isFormValid = true;
    if (!accountNumber) {
      setAccountNumberError("Please enter account number.");
      isFormValid = false;
    }

    if (!accountHolderName) {
      setAccountHolderNameError("Please enter account holder name.");
      isFormValid = false;
    }
    if (!ifscCode) {
      setIfscCodeError("Please enter IFSC code.");
      isFormValid = false;
    }
    if (ifscCodeError) {
      isFormValid = false;
    }

    return isFormValid;
  };

  const UpdateBankInfoData = () => {
    if (handleBankValidation()) {
      //setSubmitDisable(true);
      const jsonData = {
        account_holder_name: accountHolderName,
        account_number: accountNumber,
        ifsc: ifscCode,
        branch_address: branchAddress,
        pre_account_number: preAccountNo,
      };

      axios
        .post(API_URL + "admin/update-user-bank-detail-data", jsonData)
        .then((res) => {
          let response = res.data;

          if (response?.status === 200) {
            //console.log(response?.data)
            toast.success(response?.message);
            setBankDetailsShow(false);
            getUserData();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const [dirName, setDirName] = useState("");
  const [dirNameError, setDirNameError] = useState(false);
  const [dirPanNo, setDirPanNo] = useState("");
  const [dirPanNoError, setDirPanNoError] = useState(false);
  const [dirId, setDirId] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [aadhaarError, setAadhaarError] = useState(false);

  const handleDirName = (e) => {
    setDirNameError(false);
    setDirName(e.target.value);
  };

  const handleDirPanNumber = (e) => {
    setDirPanNoError(false);
    setDirPanNo(e.target.value.toUpperCase());

    if (e.target.value.length == 10) {
      verifyPancardNoDirector(e.target.value.toUpperCase());
    } else {
      setPanValid(false);
    }
    if (e.target.value.length < 10) {
      setDirName("");
    }
  };

  const handleAadhaar = (e) => {
    setAadhaarError(false);
    setAadhaar(e.target.value);
    if (e.target.value.length == 14) {
      verifyAadhaarcardNoDirector(e.target.value.replace(/\s+/g, ""));
    } else {
      setAadhaarValid(false);
    }
  };

  const handleDirectorValidation = () => {
    let isFormValid = true;
    if (!dirName) {
      isFormValid = false;
      setDirNameError(true);
    }

    if (!dirPanNo || dirPanNoError) {
      isFormValid = false;
      setDirPanNoError(true);
    }
    if (dirPanNo.length !== 10) {
      isFormValid = false;
      setDirPanNoError(true);
    }
    if (!aadhaar || aadhaarError) {
      setAadhaarError(true);
      isFormValid = false;
    }
    if (aadhaar.replace(/ /g, "").length !== 12) {
      setAadhaarError(true);
      isFormValid = false;
    }

    if (!dirId) {
      if (!directorPanCard.length) {
        isFormValid = false;
        setDirectorPanCardError(true);
      }
      if (!directorAadharFront.length) {
        isFormValid = false;
        setDirectorAadharFrontError(true);
      }
      if (!directorAadharBack.length) {
        isFormValid = false;
        setDirectorAadharBackError(true);
      }
    }

    return isFormValid;
  };

  const UpdateNoOfDirectos = (caseID) => {
    let formData = new FormData();
    formData.append("case_id", caseID);
    axios
      .post(API_URL + "director/update-no-of-director", formData)
      .then((res) => {
        let response = res.data;

        if (response?.status === 200) {
          //console.log(response?.data)
          // toast.success(response?.message);
          // setDirectorShow(false);
          // getUserData();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const UpdateDirectorInfoData = () => {
    if (handleDirectorValidation()) {
      if (dirId) {
        let formData = new FormData();
        formData.append("id", dirId);
        formData.append("name", dirName);
        formData.append("pan_card", dirPanNo);
        formData.append("aadhar_card", aadhaar);

        if (directorPanCard.length) {
          formData.append("pan_doc", directorPanCard[0]);
        }
        if (directorAadharFront.length) {
          formData.append("aadhar_front_doc", directorAadharFront[0]);
        }
        if (directorAadharBack.length) {
          formData.append("aadhar_back_doc", directorAadharBack[0]);
        }

        axios
          .post(API_URL + "admin/update-director-detail-data", formData)
          .then((res) => {
            let response = res.data;

            if (response?.status === 200) {
              //console.log(response?.data)
              toast.success(response?.message);
              setDirectorShow(false);
              getUserData();
            }
          })
          .catch((e) => {
            console.log(e);
          });

        setDirectorAadharBack([]);
        setDirectorAadharFront([]);
        setDirectorPanCard([]);
      } else {
        let formData = new FormData();
        formData.append("case_id", caseID);
        formData.append("name", JSON.stringify({ 0: dirName }));
        formData.append("pan_card", JSON.stringify({ 0: dirPanNo }));
        formData.append("aadhar_card", JSON.stringify({ 0: aadhaar }));

        if (directorPanCard.length) {
          formData.append("pan_doc", directorPanCard[0]);
        }
        if (directorAadharFront.length) {
          formData.append("aadhar_front_doc", directorAadharFront[0]);
        }
        if (directorAadharBack.length) {
          formData.append("aadhar_back_doc", directorAadharBack[0]);
        }

        axios
          .post(API_URL + "director/save", formData)
          .then((res) => {
            let response = res.data;

            if (response?.status === 200) {
              //console.log(response?.data)
              toast.success(response?.message);
              setDirectorShow(false);
              UpdateNoOfDirectos(caseID);
              getUserData();
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  const [remark, setRemark] = useState("");
  const [remarkError, setRemarkError] = useState(false);
  const [remarksData, setRemarksData] = useState([]);

  useEffect(() => {
    getRemarks();
  }, []);

  const getRemarks = () => {
    const jsonData = {
      case_id: caseID,
    };

    axios
      .post(API_URL + "admin/get-agent-remark", jsonData)
      .then((res) => {
        let response = res.data;
        if (response?.status === 200) {
          let respo = response.data;

          setRemarksData(respo?.agentRemark);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleRemarksValidation = () => {
    let isFormValid = true;
    if (!remark) {
      isFormValid = false;
      setRemarkError(true);
    }

    return isFormValid;
  };

  const handleRemarksData = (e) => {
    setRemarkError(false);
    setRemark(e.target.value);
  };

  const AddRemarks = () => {
    if (handleRemarksValidation()) {
      const jsonData = {
        case_id: caseID,
        remark: remark,
        reated_by: localStorage.getItem("adminId"),
        created_by_type: "admin",
      };

      axios
        .post(API_URL + "admin/add-agent-remark", jsonData)
        .then((res) => {
          let response = res.data;

          if (response?.status === 200) {
            //console.log(response?.data)
            toast.success(response?.message);
            setShowRemarks(false);
            getRemarks();
            getUserData();
            setRemark("");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const welcomeProcessData = (userFileData) => {
    // console.log("userFileData[0]",userFileData[0])
    setWelcomeNoteData(userFileData);
  };

  const convertIntoZip = async () => {
    setLoader(true);
    var zip = new JSZip();
    let ds = await axios
      .post(API_URL + "zip-file", { case_id: caseID })
      .then((res) => {
        setLoader(false);
        return res?.data?.path_array;
      })
      .catch((e) => {
        return [];
      });

    for (let i = 0; i < ds.length; i++) {
      const base64Response = await fetch(
        `data:image/jpeg;base64,${ds[i].bufferData}`
      )
        .then((res) => {
          return res;
        })
        .catch((e) => {
          console.log(e);
        });
      const blob = await base64Response.blob();
      zip.file(ds[i].file_name, blob);
    }
    // console.log(zip);
    const zipData = await zip.generateAsync({
      type: "blob",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(zipData);
    link.download = ph + ".zip";
    link.click();
  };

  const [panFile, setPanFile] = useState([]);
  const [panCardFileName, setPanCardFileName] = useState("");
  const [panCardFileType, setPanCardFileType] = useState("");
  const [panCardError, setPanCardError] = useState(false);
  const [panCardErrorMsg, setPanCardErrorMsg] = useState(false);

  const [aadhaarFront, setAadhaarFront] = useState([]);
  const [aadhaarFrontName, setAadhaarFrontName] = useState("");
  const [aadhaarFrontType, setAadhaarFrontType] = useState("");
  const [aadhaarFrontError, setAadhaarFrontError] = useState(false);
  const [aadhaarFrontErrorMsg, setAadhaarFrontErrorMsg] = useState(false);

  const [aadhaarBack, setAadhaarBack] = useState([]);
  const [aadhaarBackName, setAadhaarBackName] = useState("");
  const [aadhaarBackType, setAadhaarBackType] = useState("");
  const [aadhaarBackError, setAadhaarBackError] = useState(false);
  const [aadhaarBackErrorMsg, setAadhaarBackErrorMsg] = useState(false);

  const [salaryStatement, setSalaryStatement] = useState([]);
  const [salaryStatementName, setSalaryStatementName] = useState("");
  const [salaryStatementType, setSalaryStatementType] = useState("");
  const [salaryStatementError, setSalaryStatementError] = useState(false);
  const [salaryStatementErrorMsg, setSalaryStatementErrorMsg] = useState(false);

  const [salaryStatementP, setSalaryStatementP] = useState([]);
  const [salaryStatementPName, setSalaryStatementPName] = useState("");
  const [salaryStatementPType, setSalaryStatementPType] = useState("");
  const [salaryStatementPError, setSalaryStatementPError] = useState(false);
  const [salaryStatementPErrorMsg, setSalaryStatementPErrorMsg] =
    useState(false);

  const [salaryStatementT, setSalaryStatementT] = useState([]);
  const [salaryStatementTName, setSalaryStatementTName] = useState("");
  const [salaryStatementTType, setSalaryStatementTType] = useState("");
  const [salaryStatementTError, setSalaryStatementTError] = useState(false);
  const [salaryStatementTErrorMsg, setSalaryStatementTErrorMsg] =
    useState(false);

  const [bankStatement, setBankStatement] = useState([]);
  const [bankStatementName, setBankStatementName] = useState("");
  const [bankStatementType, setBankStatementType] = useState("");
  const [bankStatementError, setBankStatementError] = useState(false);
  const [bankStatementErrorMsg, setBankStatementErrorMsg] = useState(false);
  const [bankStatementFile, setBankStatementFile] = useState("");

  const [formSixteen, setFormSixteen] = useState([]);
  const [formSixteenName, setFormSixteenName] = useState("");
  const [formSixteenType, setFormSixteenType] = useState("");
  const [formSixteenError, setFormSixteenError] = useState(false);
  const [formSixteenErrorMsg, setFormSixteenErrorMsg] = useState(false);

  const [formSixteenP, setFormSixteenP] = useState([]);
  const [formSixteenPName, setFormSixteenPName] = useState("");
  const [formSixteenPType, setFormSixteenPType] = useState("");
  const [formSixteenPError, setFormSixteenPError] = useState(false);
  const [formSixteenPErrorMsg, setFormSixteenPErrorMsg] = useState(false);

  const handleUploadDocOpen = () => {
    setShowUploadDoc(true);
  };

  const handleUploadDocButtonClose = () => {
    setShowUploadDoc(false);
    setPanCardError(false);
    setPanCardErrorMsg(false);
    setBankStatementError(false);
    setBankStatementErrorMsg(false);
    setFormSixteenError(false);
    setFormSixteenErrorMsg(false);
    setPanFile([]);
    setPanCardFileName("");

    setFormSixteen([]);
    setFormSixteenName("");

    setFormSixteenPError(false);
    setFormSixteenPErrorMsg(false);
    setFormSixteenP([]);
    setFormSixteenPName("");
  };

  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  const allowedPdfTypes = ["application/pdf"];
  const MAX_FILE_SIZE_IMAGE = 2050; // 5MB
  const MAX_FILE_SIZE_PDF = 5120; // 5MB

  const handlePanCard = (e) => {
    setPanCardError(false);
    setPanCardErrorMsg("");
    const selectedFile = e.target.files;
    setPanFile(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setPanCardFileName(file_name);
    if (file_type === "image/png") {
      setPanCardFileType("png");
    } else if (file_type === "image/jpg" || file_type === "image/jpeg") {
      setPanCardFileType("jpg");
    } else if (file_type === "image/gif") {
      setPanCardFileType("gif");
    } else {
      setPanCardFileType("");
    }
    if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
      setPanCardError(true);
      setPanCardErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
    }
    if (
      selectedFile.length &&
      selectedFile[0].size / 1024 > MAX_FILE_SIZE_IMAGE
    ) {
      setPanCardErrorMsg("File size is greater than 2 MB");
      setPanCardError(true);
    }
  };

  const handleAadharFront = (e) => {
    const selectedFile = e.target.files;
    setAadhaarFrontError(false);
    setAadhaarFrontErrorMsg("");
    setAadhaarFront(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setAadhaarFrontName(file_name);
    if (file_type === "image/png") {
      setAadhaarFrontType("png");
    } else if (file_type === "image/jpg" || file_type === "image/jpeg") {
      setAadhaarFrontType("jpg");
    } else if (file_type === "image/gif") {
      setAadhaarFrontType("gif");
    } else {
      setAadhaarFrontType("");
    }
    if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
      setAadhaarFrontError(true);
      setAadhaarFrontErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
    }
    if (
      selectedFile.length &&
      selectedFile[0].size / 1024 > MAX_FILE_SIZE_IMAGE
    ) {
      setAadhaarFrontErrorMsg("File size is greater than 2 MB");
      setAadhaarFrontError(true);
    }
  };
  const handleAadharBack = (e) => {
    const selectedFile = e.target.files;
    setAadhaarBackError(false);
    setAadhaarBackErrorMsg("");
    setAadhaarBack(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setAadhaarBackName(file_name);
    if (file_type === "image/png") {
      setAadhaarBackType("png");
    } else if (file_type === "image/jpg" || file_type === "image/jpeg") {
      setAadhaarBackType("jpg");
    } else if (file_type === "image/gif") {
      setAadhaarBackType("gif");
    } else {
      setAadhaarBackType("");
    }
    if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
      setAadhaarBackError(true);
      setAadhaarBackErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
    }
    if (
      selectedFile.length &&
      selectedFile[0].size / 1024 > MAX_FILE_SIZE_IMAGE
    ) {
      setAadhaarBackErrorMsg("File size is greater than 2 MB");
      setAadhaarBackError(true);
    }
  };
  const handleSalaryStatement = (e) => {
    const selectedFile = e.target.files;
    setSalaryStatementError(false);
    setSalaryStatementErrorMsg("");
    setSalaryStatement(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setSalaryStatementName(file_name);
    if (file_type === "application/pdf") {
      setSalaryStatementType("pdf");
    } else {
      setSalaryStatementType("");
    }
    for (var i = 0; i < selectedFile.length; i++) {
      if (
        selectedFile.length &&
        !allowedPdfTypes.includes(selectedFile[i]?.type)
      ) {
        setSalaryStatementError(true);
        setSalaryStatementErrorMsg("Only PDF are allowed.");
      }
      if (
        selectedFile.length &&
        selectedFile[i].size / 1024 > MAX_FILE_SIZE_PDF
      ) {
        setSalaryStatementErrorMsg("File size is greater than 5 MB");
        setSalaryStatementError(true);
      }
    }
  };

  const handleSalaryStatementP = (e) => {
    const selectedFile = e.target.files;
    setSalaryStatementPError(false);
    setSalaryStatementPErrorMsg("");
    setSalaryStatementP(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setSalaryStatementPName(file_name);
    if (file_type === "application/pdf") {
      setSalaryStatementPType("pdf");
    } else {
      setSalaryStatementPType("");
    }
    for (var i = 0; i < selectedFile.length; i++) {
      if (
        selectedFile.length &&
        !allowedPdfTypes.includes(selectedFile[i]?.type)
      ) {
        setSalaryStatementPError(true);
        setSalaryStatementPErrorMsg("Only PDF are allowed.");
      }
      if (
        selectedFile.length &&
        selectedFile[i].size / 1024 > MAX_FILE_SIZE_PDF
      ) {
        setSalaryStatementPErrorMsg("File size is greater than 5 MB");
        setSalaryStatementPError(true);
      }
    }
  };

  const handleSalaryStatementT = (e) => {
    const selectedFile = e.target.files;
    setSalaryStatementTError(false);
    setSalaryStatementTErrorMsg("");
    setSalaryStatementT(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setSalaryStatementTName(file_name);
    if (file_type === "application/pdf") {
      setSalaryStatementTType("pdf");
    } else {
      setSalaryStatementTType("");
    }
    for (var i = 0; i < selectedFile.length; i++) {
      if (
        selectedFile.length &&
        !allowedPdfTypes.includes(selectedFile[i]?.type)
      ) {
        setSalaryStatementTError(true);
        setSalaryStatementTErrorMsg("Only PDF are allowed.");
      }
      if (
        selectedFile.length &&
        selectedFile[i].size / 1024 > MAX_FILE_SIZE_PDF
      ) {
        setSalaryStatementTErrorMsg("File size is greater than 5 MB");
        setSalaryStatementTError(true);
      }
    }
  };

  const handleBankStatement = (e) => {
    const selectedFile = e.target.files;
    setBankStatementError(false);
    setBankStatementErrorMsg("");
    setBankStatement(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setBankStatementName(file_name);
    if (file_type === "application/pdf") {
      setBankStatementType("pdf");
    } else {
      setBankStatementType("");
    }
    for (var i = 0; i < selectedFile.length; i++) {
      if (
        selectedFile.length &&
        !allowedPdfTypes.includes(selectedFile[i]?.type)
      ) {
        setBankStatementError(true);
        setBankStatementErrorMsg("Only PDF are allowed.");
      }
      if (
        selectedFile.length &&
        selectedFile[i].size / 1024 > MAX_FILE_SIZE_PDF
      ) {
        setBankStatementErrorMsg("File size is greater than 5 MB");
        setBankStatementError(true);
      }
    }
  };

  const handleFormSixteen = (e) => {
    const selectedFile = e.target.files;
    setFormSixteenError(false);
    setFormSixteenErrorMsg("");
    //setFormSixteen(formSixteen.concat(Array.prototype.slice.call(selectedFile)))
    setFormSixteen(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setFormSixteenName(file_name);
    if (file_type === "application/pdf") {
      setFormSixteenType("pdf");
    } else {
      setFormSixteenType("");
    }
    for (var i = 0; i < selectedFile.length; i++) {
      if (
        selectedFile.length &&
        !allowedPdfTypes.includes(selectedFile[i]?.type)
      ) {
        setFormSixteenError(true);
        setFormSixteenErrorMsg("Only PDF are allowed.");
      }
      if (
        selectedFile.length &&
        selectedFile[i].size / 1024 > MAX_FILE_SIZE_PDF
      ) {
        setFormSixteenErrorMsg("File size is greater than 5 MB");
        setFormSixteenError(true);
      }
    }
    //sixteenRef.current.value = "";
  };

  const handleFormSixteenP = (e) => {
    const selectedFile = e.target.files;
    setFormSixteenPError(false);
    setFormSixteenPErrorMsg("");
    //setFormSixteenP(formSixteen.concat(Array.prototype.slice.call(selectedFile)))
    setFormSixteenP(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setFormSixteenPName(file_name);
    if (file_type === "application/pdf") {
      setFormSixteenPType("pdf");
    } else {
      setFormSixteenPType("");
    }
    for (var i = 0; i < selectedFile.length; i++) {
      if (
        selectedFile.length &&
        !allowedPdfTypes.includes(selectedFile[i]?.type)
      ) {
        setFormSixteenPError(true);
        setFormSixteenPErrorMsg("Only PDF are allowed.");
      }
      if (
        selectedFile.length &&
        selectedFile[i].size / 1024 > MAX_FILE_SIZE_PDF
      ) {
        setFormSixteenPErrorMsg("File size is greater than 5 MB");
        setFormSixteenPError(true);
      }
    }
    //sixteenRef.current.value = "";
  };

  const handleDocumentsValidation = () => {
    let isFormValid = true;
    if (panCardErrorMsg) {
      isFormValid = false;
      setPanCardError(true);
    }

    if (bankStatementErrorMsg) {
      isFormValid = false;
      setBankStatementError(true);
    }

    if (formSixteenErrorMsg) {
      isFormValid = false;
      setFormSixteenError(true);
    }
    if (formSixteenPErrorMsg) {
      isFormValid = false;
      setFormSixteenPError(true);
    }
    if (
      panFile.length ||
      bankStatement.length ||
      formSixteen.length ||
      formSixteenP.length
    ) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }

    return isFormValid;
  };

  const handleUploadDocument = async () => {
    if (handleDocumentsValidation()) {
      let formData = new FormData();
      formData.append("case_id", caseID);

      if (panFile.length) {
        formData.append("pan_card", panFile[0]);
      }
      if (aadhaarFront.length) {
        formData.append("aadhaar_front", aadhaarFront[0]);
      }
      if (aadhaarBack.length) {
        formData.append("aadhaar_back", aadhaarBack[0]);
      }
      if (salaryStatement.length) {
        formData.append("salary_slip", salaryStatement[0]);
      }
      if (salaryStatementP.length) {
        formData.append("salary_slip", salaryStatementP[0]);
      }
      if (salaryStatementT.length) {
        formData.append("salary_slip", salaryStatementT[0]);
      }
      /*formSixteen.forEach((v, i) => {
        formData.append('itr', formSixteen[i])
      })*/
      if (formSixteen.length) {
        formData.append("itr", formSixteen[0]);
      }
      if (formSixteenP.length) {
        formData.append("itr", formSixteenP[0]);
      }
      if (bankStatement.length) {
        formData.append("bank_statement", bankStatement[0]);
      }
      formData.append("admin", "admin");
      console.log("foem", formData);
      setLoader(true);
      axios
        .post(API_URL + "files/upload", formData)
        .then((res) => {
          let response = res.data;
          if (response?.status === 200) {
            toast.success("Documents Uploaded Sucessfully");
            setShowUploadDoc(false);
            getUserData();
          }
          setLoader(false);
        })
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });
    }
  };
  const [directorPanCard, setDirectorPanCard] = useState([]);
  const [directorPanCardName, setDirectorPanCardName] = useState("");
  const [directorPanCardType, setDirectorPanCardType] = useState("");
  const [directorPanCardErrorMsg, setDirectorPanCardErrorMsg] = useState("");
  const [directorPanCardError, setDirectorPanCardError] = useState(false);

  const handleDirectorPanCard = (e) => {
    setDirectorPanCardError(false);
    setDirectorPanCardErrorMsg("");
    const selectedFile = e.target.files;
    setDirectorPanCard(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setDirectorPanCardName(file_name);
    if (file_type === "image/png") {
      setDirectorPanCardType("png");
    } else if (file_type === "image/jpg" || file_type === "image/jpeg") {
      setDirectorPanCardType("jpg");
    } else if (file_type === "image/gif") {
      setDirectorPanCardType("gif");
    } else {
      setDirectorPanCardType("");
    }
    if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
      setDirectorPanCardError(true);
      setDirectorPanCardErrorMsg("Invaid format");
    }
    if (
      selectedFile.length &&
      selectedFile[0].size / 1024 > MAX_FILE_SIZE_IMAGE
    ) {
      setDirectorPanCardErrorMsg("File size is greater than 2 MB");
      setDirectorPanCardError(true);
    }
  };

  const [directorAadharFront, setDirectorAadharFront] = useState([]);
  const [directorAadharFrontName, setDirectorAadharFrontName] = useState("");
  const [directorAadharFrontType, setDirectorAadharFrontType] = useState("");
  const [directorAadharFrontErrorMsg, setDirectorAadharFrontErrorMsg] =
    useState("");
  const [directorAadharFrontError, setDirectorAadharFrontError] =
    useState(false);

  const handleDirectorAadharFront = (e) => {
    setDirectorAadharFrontError(false);
    setDirectorAadharFrontErrorMsg("");
    const selectedFile = e.target.files;
    setDirectorAadharFront(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setDirectorAadharFrontName(file_name);
    if (file_type === "image/png") {
      setDirectorAadharFrontType("png");
    } else if (file_type === "image/jpg" || file_type === "image/jpeg") {
      setDirectorAadharFrontType("jpg");
    } else if (file_type === "image/gif") {
      setDirectorAadharFrontType("gif");
    } else {
      setDirectorAadharFrontType("");
    }
    if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
      setDirectorAadharFrontError(true);
      setDirectorAadharFrontErrorMsg("Invaid format");
    }
    if (
      selectedFile.length &&
      selectedFile[0].size / 1024 > MAX_FILE_SIZE_IMAGE
    ) {
      setDirectorAadharFrontErrorMsg("File size is greater than 2 MB");
      setDirectorAadharFrontError(true);
    }
  };

  const [directorAadharBack, setDirectorAadharBack] = useState([]);
  const [directorAadharBackName, setDirectorAadharBackName] = useState("");
  const [directorAadharBackType, setDirectorAadharBackType] = useState("");
  const [directorAadharBackErrorMsg, setDirectorAadharBackErrorMsg] =
    useState("");
  const [directorAadharBackError, setDirectorAadharBackError] = useState(false);

  const handleDirectorAadharBack = (e) => {
    setDirectorAadharBackError(false);
    setDirectorAadharBackErrorMsg("");
    const selectedFile = e.target.files;
    setDirectorAadharBack(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setDirectorAadharBackName(file_name);
    if (file_type === "image/png") {
      setDirectorAadharBackType("png");
    } else if (file_type === "image/jpg" || file_type === "image/jpeg") {
      setDirectorAadharBackType("jpg");
    } else if (file_type === "image/gif") {
      setDirectorAadharBackType("gif");
    } else {
      setDirectorAadharBackType("");
    }
    if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
      setDirectorAadharBackError(true);
      setDirectorAadharBackErrorMsg("Invaid format");
    }
    if (
      selectedFile.length &&
      selectedFile[0].size / 1024 > MAX_FILE_SIZE_IMAGE
    ) {
      setDirectorAadharBackErrorMsg("File size is greater than 2 MB");
      setDirectorAadharBackError(true);
    }
  };

  const checkGrossAnnualProfit = (e) => {
    //console.log("ss",anualTurnOver,e.target.value.replace('₹','').replaceAll(',',''))
    let anualProfitData = e.target.value.replace("₹", "").replaceAll(",", "");
    if (parseInt(anualTurnOver) < parseInt(anualProfitData)) {
      setAnualProfit("");
      setAnualProfitCompError(
        "Gross annual profit must be less than turnover yearly."
      );
    } else {
      setAnualProfitCompError("");
    }
  };

  const calculateMaxDate = () => {
    return moment().subtract(18, "years").toDate(); // 18 years ago from the current date
  };

  // The logic is for handling going back in previous page for individual case(s).
  const handleBackButton = () => {
    navigate(-1);
  };

  const handlePastLoan = (e) => {
    setPastLoan(e.target.value);
    if (e.target.value == "No" || e.target.value == "") {
      setPastLoanAmount(0);
      setPastLoanAmountError(false);
    }
    setPastLoanError(false);
  };

  const handlePastLoanAmount = (e) => {
    setPastLoanAmount(e ? (e > 0 ? e : 0) : 0);
    setPastLoanAmountError(false);
  };

  const handleAddDirector = () => {
    setDirectorShow(true);
    setDirNameError(false);
    setAadhaarError(false);
    setDirPanNoError(false);
    setDirectorPanCardError(false);
    setDirectorAadharFrontError(false);
    setDirectorAadharBackError(false);
    setDirName("");
    setDirPanNo("");
    setAadhaar("");
    setDirId("");
  };
  const [panNumberCheckError, setPanNumberCheckError] = useState("");
  const verifyPancardNo = (pan) => {
    setLoader(true);
    let jsonFormData = {
      pan: pan,
    };
    axios
      .post(API_URL + "api-auth/verify-pan-number-v3", jsonFormData)
      .then((res) => {
        if (res?.data?.data != undefined) {
          let response = res.data;
          setName(response?.data?.result?.name);
          setDob(new Date(response?.data?.result?.dob));
          /*if ( businessType!= 1) {
            setDoi(new Date(response?.data?.result?.dob));
          } else {
            setDob(new Date(response?.data?.result?.dob));
          }*/
          setPanValidP(true);
          //console.log(new Date(response?.data?.result?.dob))
          setPanNumberCheckError(false);
          setNameError(false);
        } else {
          setName("");
          setPanNumberCheckError(true);
          setPanNumber("");
          setDoi("");
          setDob("");
          setPanValidP(false);
        }
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
        setPanValidP(false);
      });
  };

  const [panNumberDirectorCheckError, setPanNumberDirectorCheckError] =
    useState("");
  const verifyPancardNoDirector = (pan) => {
    setLoader(true);
    let jsonFormData = {
      pan: pan,
    };
    axios
      .post(API_URL + "api-auth/verify-pan-number-v3", jsonFormData)
      .then((res) => {
        if (res?.data?.data != undefined) {
          let response = res.data;
          setDirName(response?.data?.result?.name);
          setDirPanNoError(false);
          setDirNameError(false);
          setPanValid(true);
        } else {
          setDirPanNoError(true);
          setDirNameError(true);
          setPanValid(false);
        }
        setLoader(false);
      })
      .catch((e) => {
        setPanValid(false);
        setLoader(false);
      });
  };

  const [aadhaarNumberCheckError, setAadhaarNumberCheckError] = useState("");

  const verifyAadhaarcardNoDirector = (aadhaar) => {
    setLoader(true);
    let jsonFormData = {
      uid: aadhaar,
    };
    axios
      .post(API_URL + "api-auth/verify-aadhar-number-v3", jsonFormData)
      .then((res) => {
        if (res?.data?.data != undefined) {
          let response = res.data;
          if (res?.data?.data?.result?.verified) {
            setAadhaarValid(true);
            setAadhaarError(false);
          } else {
            setAadhaarValid(false);
            setAadhaarError(true);
          }
        } else {
          setAadhaarValid(false);
          setAadhaarError(true);
        }
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };
  const panRef = useRef();
  const salaryFirstRef = useRef();
  const salarySecondRef = useRef();
  const salaryThirdRef = useRef();
  const aadhaarFrontRef = useRef();
  const aadhaarBackRef = useRef();
  const bankRef = useRef();
  const sixteenRef = useRef();
  const sixteenRefP = useRef();
  const removeFile = (e, type, index = null) => {
    if (type == "pan") {
      panRef.current.value = "";
      setPanFile([]);
      setPanCardFileName("");
      setPanCardFileType("");
      setPanCardError(false);
      setPanCardErrorMsg(false);
    }
    if (type == "salaryFirst") {
      salaryFirstRef.current.value = "";
      setSalaryStatement([]);
      setSalaryStatementName("");
      setSalaryStatementType("");
      setSalaryStatementError(false);
      setSalaryStatementErrorMsg(false);
    }
    if (type == "salarySecond") {
      salarySecondRef.current.value = "";
      setSalaryStatementP([]);
      setSalaryStatementPName("");
      setSalaryStatementPType("");
      setSalaryStatementPError(false);
      setSalaryStatementPErrorMsg(false);
    }
    if (type == "salaryThird") {
      salaryThirdRef.current.value = "";
      setSalaryStatementT([]);
      setSalaryStatementTName("");
      setSalaryStatementTType("");
      setSalaryStatementTError(false);
      setSalaryStatementTErrorMsg(false);
    }
    if (type == "aadhaarFront") {
      aadhaarFrontRef.current.value = "";
      setAadhaarFront([]);
      setAadhaarFrontName("");
      setAadhaarFrontType("");
      setAadhaarFrontError(false);
      setAadhaarFrontErrorMsg(false);
    }
    if (type == "aadhaarBack") {
      aadhaarBackRef.current.value = "";
      setAadhaarBack([]);
      setAadhaarBackName("");
      setAadhaarBackType("");
      setAadhaarBackError(false);
      setAadhaarBackErrorMsg(false);
    }
    if (type == "bankStatement") {
      bankRef.current.value = "";
      setBankStatement([]);
      setBankStatementName("");
      setBankStatementType("");
      setBankStatementError(false);
      setBankStatementErrorMsg(false);
    }
    if (type == "formSixteen") {
      sixteenRef.current.value = "";
      //setFormSixteen(formSixteen.filter((v, i) => i !== index));
      setFormSixteen([]);
      setFormSixteenName("");
      setFormSixteenType("");
      setFormSixteenError(false);
      setFormSixteenErrorMsg(false);
    }
    if (type == "formSixteenP") {
      sixteenRefP.current.value = "";
      //setFormSixteen(formSixteen.filter((v, i) => i !== index));
      setFormSixteenP([]);
      setFormSixteenPName("");
      setFormSixteenPType("");
      setFormSixteenPError(false);
      setFormSixteenPErrorMsg(false);
    }
  };
  const [panNumberExistError, setPanNumberExistError] = useState(false);
  const [gstinVerified, setGstinVerified] = useState(false);
  const checkPanNumber = (e) => {
    axios
      .post(API_URL + "user/check-user-pan", { pan: e, case_id: caseID })
      .then((res) => {
        setLoader(false);
        let response = res.data;
        if (response?.status == 200 && response?.data?.panExists) {
          setPanNumberExistError(true);
        } else {
          verifyPancardNo(e.toUpperCase());
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleIfile = (e) => {
    setIFile(e.target.value);
  };
  const [gstinCheckError, setGstinCheckError] = useState(false);
  const valideGSTIN = (e) => {
    if (e.target.value.length == 15) {
      verifyGstNo(e.target.value.toUpperCase());
    }
  };
  const verifyGstNo = (gst) => {
    let jsonFormData = {
      patronid: patronid,
      token: accessToken,
      gst: gst,
    };
    setLoader(true);
    axios
      .post(API_URL + "api-auth/verify-gst-number", jsonFormData)
      .then((res) => {
        if (res?.data?.data != undefined) {
          let response = res.data;
          if (
            nameOnPan.trim().replace(/ /g, "") ==
            (response?.data?.result?.gstnDetailed?.legalNameOfBusiness)
              .trim()
              .replace(/ /g, "")
          ) {
            setGstinVerified(true);
          } else {
            setGstinVerified(false);
            setGstinCheckError(true);
          }
        } else {
          setGstinVerified(false);
        }
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };
  const handleSameAddress = (e) => {
    if (e.target.checked) {
      setAddOnePermanent(addOneCurrent);
      setAddTwoPermanent(addTwoCurrent);
      setStreetPermanent(streetCurrent);
      setPinCodePermanent(pinCodeCurrent);
      setStatePermanent(stateCurrent);
      setCityPermanent(cityCurrent);
    } else {
      setAddOnePermanent("");
      setAddTwoPermanent("");
      setStreetPermanent("");
      setPinCodePermanent("");
      setStatePermanent("");
      setCityPermanent("");
    }
  };
  return (
    <>
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar menuAccess={menuAccess} />
          <div className="adminMain-wrapper">
            <AdminHeader />
            <div className="mainContent">
              {loader ? (
                <Loader display={"flex"} />
              ) : (
                <div className="main-body">
                  <div className="col-md-12 moveRight">
                    <button
                      className="btn-warning"
                      style={{ height: "2rem" }}
                      onClick={handleBackButton}
                    >
                      <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>
                    {isVerified == 0 && type == 1 ? (
                      <>
                        <span>
                          {" "}
                          <button
                            className="btn btn-warning"
                            onClick={handleVerifyPanGstin}
                          >
                            Verify PAN
                          </button>
                        </span>
                      </>
                    ) : (
                      ""
                    )}

                    <span>
                      {" "}
                      <button
                        className="btn btn-primary"
                        onClick={handleUploadDocOpen}
                        disabled={isDisableAll}
                      >
                        Upload Documents
                      </button>
                    </span>
                    <span>
                      {" "}
                      <button
                        className="btn btn-secondary"
                        onClick={handleShowRemarks}
                      >
                        Add Remarks
                      </button>
                    </span>

                    {type == 1 ? (
                      <>
                        <span>
                          {" "}
                          <button
                            onClick={(e) => {
                              generateData(data);
                            }}
                            className="btn btn-primary"
                            disabled={!isVerified ? "disabled" : ""}
                          >
                            <i
                              className="fa fa-download"
                              aria-hidden="true"
                            ></i>{" "}
                            Application
                          </button>
                        </span>
                        <span>
                          {" "}
                          <button
                            onClick={convertIntoZip}
                            className="btn btn-primary"
                            disabled={!isVerified ? "disabled" : ""}
                          >
                            <i
                              className="fa fa-download"
                              aria-hidden="true"
                            ></i>{" "}
                            Documents
                          </button>{" "}
                        </span>
                        <span>
                          {" "}
                          <button
                            className="btn btn-primary"
                            onClick={handleShow}
                            disabled={!isVerified ? "disabled" : ""}
                          >
                            Add Offer
                          </button>
                        </span>
                        <span>
                          {" "}
                          <button
                            className="btn btn-warning"
                            onClick={handleDecline}
                          >
                            Declined
                          </button>
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                    {type == 2 || type == 4 ? (
                      <span>
                        {" "}
                        <button
                          className="btn btn-warning"
                          disabled={isWelcomeData}
                          onClick={handleShowOffer}
                        >
                          Welcome Letter
                        </button>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  {data.map((v, i) => (
                    <div className="row gutters-sm">
                      <div className="col-md-12 mb-3">
                        <div className="card case-admin">
                          <h5 className="case-heading">Application Details</h5>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="row ">
                                  <div className="col-sm-4">
                                    <h6>Case Id:</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {" "}
                                    {v.caseNumber}
                                  </div>
                                </div>
                                <div className="row ">
                                  <div className="col-sm-4">
                                    <h6>Status:</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {" "}
                                    ---
                                  </div>
                                </div>
                                <div className="row ">
                                  <div className="col-sm-4">
                                    <h6>Source:</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {" "}
                                    {v.source}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row ">
                                  <div className="col-sm-6">
                                    <h6>Applied date:</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
                                    {v.appliedDate
                                      ? moment(
                                          v.appliedDate,
                                          "YYYY-MM-DD hh:mm:ss"
                                        ).format("DD/MM/YYYY")
                                      : ""}
                                  </div>
                                </div>
                                <div className="row ">
                                  <div className="col-sm-6">
                                    <h6>Last updated date:</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
                                    ---
                                  </div>
                                </div>
                                <div className="row ">
                                  <div className="col-sm-6">
                                    <h6>Agent Name:</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
                                    ---
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="card case-admin">
                          <h5 className="case-heading">Loan Amount</h5>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="row ">
                                  <div className="col-sm-4">
                                    <h6>Name:</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {" "}
                                    {v.name}
                                  </div>
                                </div>
                                <div className="row ">
                                  <div className="col-sm-4">
                                    <h6>Email Id: </h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {" "}
                                    {v.emailId}
                                  </div>
                                </div>
                                <div className="row ">
                                  <div className="col-sm-4">
                                    <h6>Phone number: </h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {" "}
                                    {v.phoneNumber ? v.phoneNumber : ""}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row ">
                                  <div className="col-sm-6">
                                    <h6>Loan amount req:</h6>
                                  </div>
                                  <div className="col-sm-5 text-secondary">
                                    {" "}
                                    {v.loanAmountRequired ? (
                                      <CurrencyFormat
                                        value={v.loanAmountRequired}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        thousandSpacing={"2s"}
                                        prefix={"₹"}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>

                                  <button
                                    className="btn"
                                    style={{ padding: "0px" }}
                                    onClick={(e) => {
                                      editLoanAmount(v);
                                    }}
                                    disabled={isDisableAll}
                                  >
                                    <i
                                      className="fa fa-edit"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </div>

                                <div className="row ">
                                  <div className="col-sm-6">
                                    <h6>Loan purpose: </h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
                                    {" "}
                                    {v.loanPurpose}
                                  </div>
                                </div>

                                <div className="row ">
                                  <div className="col-sm-6">
                                    <h6>Sub loan purpose:</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
                                    {" "}
                                    {v.subLoanPurpose}
                                  </div>
                                </div>

                                <div className="row ">
                                  <div className="col-sm-6">
                                    <h6>Loan duration:</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
                                    {" "}
                                    {v.loanDuration
                                      ? v.loanDuration + " Year(s)"
                                      : ""}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="card case-admin">
                          <h5 className="case-heading">Personal details</h5>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="row ">
                                  <div className="col-sm-4">
                                    <h6>Name:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.name ? v.name : ""}
                                  </div>
                                  <button
                                    className="btn"
                                    style={{ padding: "0px" }}
                                    onClick={(e) => {
                                      editPersonalDetails(v);
                                    }}
                                    disabled={isDisableAll}
                                  >
                                    <i
                                      className="fa fa-edit"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </div>

                                <div className="row">
                                  <div className="col-sm-4">
                                    <h6>Pan Number:</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {v.panNumber ? v.panNumber : ""} &nbsp;
                                    {v?.is_pan_verified ? (
                                      <img
                                        src={verifiedImage}
                                        alt="verified"
                                        style={{ height: "13px" }}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <h6>Aadhaar Number:</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {v.aadhaar ? v.aadhaar : ""} &nbsp;
                                    {v?.is_pan_verified && v.aadhaar != "-" ? (
                                      <img
                                        src={verifiedImage}
                                        alt="verified"
                                        style={{ height: "13px" }}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <h6>Date of birth:</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {v.dateOfBirth
                                      ? moment(
                                          v.dateOfBirth,
                                          "YYYY-MM-DD hh:mm:ss"
                                        ).format("DD/MM/YYYY")
                                      : ""}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <h6>Gender:</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {v.gender ? v.gender : ""}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <h6>Relationship Status:</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {v.relationship_status
                                      ? v.relationship_status
                                      : ""}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <h6>Permanent Address:</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {v.companyAddress.address1
                                      ? v.companyAddress.address1 + ", "
                                      : ""}
                                    {v.companyAddress.address2
                                      ? v.companyAddress.address2 + ", "
                                      : ""}
                                    {v.companyAddress.landmark
                                      ? v.companyAddress.landmark + ", "
                                      : ""}
                                    {v.companyAddress.city
                                      ? v.companyAddress.city + ", "
                                      : ""}
                                    {v.companyAddress.state
                                      ? v.companyAddress.state + ", "
                                      : ""}
                                    {v.companyAddress.pincode}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <h6>Current Address:</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {v.currentAddress.address1
                                      ? v.currentAddress.address1 + ", "
                                      : ""}
                                    {v.currentAddress.address2
                                      ? v.currentAddress.address2 + ", "
                                      : ""}
                                    {v.currentAddress.landmark
                                      ? v.currentAddress.landmark + ", "
                                      : ""}
                                    {v.currentAddress.city
                                      ? v.currentAddress.city + ", "
                                      : ""}
                                    {v.currentAddress.state
                                      ? v.currentAddress.state + ", "
                                      : ""}
                                    {v.currentAddress.pincode}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <h6> Past loan, Credit card :</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {v.pastLoan ? v.pastLoan : ""}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <h6>EMI you are paying currently :</h6>
                                  </div>
                                  <div className="col-sm-8 text-secondary">
                                    {v.pastLoanAmount && v.pastLoan == "Yes" ? (
                                      <CurrencyFormat
                                        value={v.pastLoanAmount}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        thousandSpacing={"2s"}
                                        prefix={"₹"}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-sm-5">
                                    <h6>Comapny Name:</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
                                    {v.salariedCompInfo?.name}
                                  </div>
                                  <button
                                    className="btn"
                                    style={{ padding: "0px" }}
                                    onClick={(e) => {
                                      editEmployementDetails(v);
                                    }}
                                    disabled={isDisableAll}
                                  >
                                    <i
                                      className="fa fa-edit"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </div>
                                <div className="row">
                                  <div className="col-sm-5">
                                    <h6>Tenure:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.salariedCompInfo?.tenure}
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-sm-5">
                                    <h6>Salary:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.salariedCompInfo?.fixedSalary ? (
                                      <CurrencyFormat
                                        value={v.salariedCompInfo?.fixedSalary}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        thousandSpacing={"2s"}
                                        prefix={"₹"}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-5">
                                    <h6>Official Email ID:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.salariedCompInfo?.comapnyEmail}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-5">
                                    <h6>Total Experience:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.salariedCompInfo?.totalExp}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-5">
                                    <h6>Working as:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.salariedCompInfo?.workingAs}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-5">
                                    <h6>Notice Period:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.salariedCompInfo?.noticePeriod}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-5">
                                    <h6>Salary Received In:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.salariedCompInfo?.salaryRecievedVia}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className="card case-admin h-100">
                          <h5 className="case-heading">Uploaded documents</h5>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                {v.uploadPancard ? (
                                  <p>
                                    Pancard document{" "}
                                    <Link
                                      to={API_URL + v.uploadPancard}
                                      download="#"
                                      target="_blank"
                                    >
                                      Download
                                    </Link>
                                  </p>
                                ) : (
                                  ""
                                )}
                                {v.uploadBusinessRegistration ? (
                                  <p>
                                    Business registration proof{" "}
                                    <Link
                                      to={
                                        API_URL + v.uploadBusinessRegistration
                                      }
                                      download="#"
                                      target="_blank"
                                    >
                                      Download
                                    </Link>
                                  </p>
                                ) : (
                                  ""
                                )}
                                {v.uploadBankStatement ? (
                                  <p>
                                    12 Months bank statement{" "}
                                    <Link
                                      to={API_URL + v.uploadBankStatement}
                                      download="#"
                                      target="_blank"
                                    >
                                      Download
                                    </Link>
                                  </p>
                                ) : (
                                  ""
                                )}

                                {v.uploadAadhaarFront ? (
                                  <p>
                                    Aadhar Card Front{" "}
                                    <Link
                                      to={API_URL + v.uploadAadhaarFront}
                                      download="#"
                                      target="_blank"
                                    >
                                      Download
                                    </Link>
                                  </p>
                                ) : (
                                  ""
                                )}

                                {v.uploadAadhaarBack ? (
                                  <p>
                                    Aadhar Card Back{" "}
                                    <Link
                                      to={API_URL + v.uploadAadhaarBack}
                                      download="#"
                                      target="_blank"
                                    >
                                      Download
                                    </Link>
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="col-md-6">
                                {v.uploadDirectorKyc ? (
                                  <p>
                                    MOA/AOA{" "}
                                    <Link
                                      to={API_URL + v.uploadDirectorKyc}
                                      download="#"
                                      target="_blank"
                                    >
                                      Download
                                    </Link>
                                  </p>
                                ) : (
                                  ""
                                )}

                                {v.uploadPartnershipDeed ? (
                                  <p>
                                    Partnership Deed{" "}
                                    <Link
                                      to={API_URL + v.uploadPartnershipDeed}
                                      download="#"
                                      target="_blank"
                                    >
                                      Download
                                    </Link>
                                  </p>
                                ) : (
                                  ""
                                )}

                                {v?.uploadSalarySlip.length
                                  ? v?.uploadSalarySlip.map((k, j) => (
                                      <p>
                                        Salary Slip{" "}
                                        <Link
                                          to={API_URL + k}
                                          download="#"
                                          target="_blank"
                                        >
                                          Download
                                        </Link>
                                      </p>
                                    ))
                                  : ""}

                                {v?.uploadItr.length
                                  ? v?.uploadItr.map((k, j) => (
                                      <p>
                                        ITR{" "}
                                        <Link
                                          to={API_URL + k}
                                          download="#"
                                          target="_blank"
                                        >
                                          Download
                                        </Link>
                                      </p>
                                    ))
                                  : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <div className="card case-admin">
                          <h5 className="case-heading">Offers details</h5>
                          <div className="card-body">
                            <table
                              style={{ width: "100%" }}
                              className="table table-stripped"
                            >
                              <thead>
                                <tr>
                                  <th className="table-head">Bank Name</th>
                                  <th className="table-head">Loan Amount</th>
                                  <th className="table-head">EMI</th>
                                  <th className="table-head">ROI</th>
                                  <th className="table-head">Tenure</th>
                                  <th className="table-head">Processing Fee</th>
                                  <th className="table-head">ROI Type</th>
                                  <th className="table-head">
                                    Offer Created at
                                  </th>
                                  <th className="table-head">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {v.offerData?.length
                                  ? v.offerData.map((row, index) => (
                                      <tr
                                        key={index}
                                        style={{
                                          borderBottom: "1px solid #ddd",
                                        }}
                                      >
                                        <td className="table-body">
                                          {row.bank_name}
                                        </td>
                                        <td className="table-body">
                                          {row.disbursement_amount ? (
                                            <CurrencyFormat
                                              value={row.disbursement_amount}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              thousandSpacing={"2s"}
                                              prefix={"₹"}
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        <td className="table-body">
                                          {row.monthly_installment_amount ? (
                                            <CurrencyFormat
                                              value={
                                                row.monthly_installment_amount
                                              }
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              thousandSpacing={"2s"}
                                              prefix={"₹"}
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        <td className="table-body">
                                          {row.rate_of_interest
                                            ? row.rate_of_interest + " %"
                                            : ""}
                                        </td>
                                        <td className="table-body">
                                          {row.tenure
                                            ? row.tenure + " Months"
                                            : ""}
                                        </td>
                                        <td className="table-body">
                                          {row.processing_fee ? (
                                            <CurrencyFormat
                                              value={row.processing_fee}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              thousandSpacing={"2s"}
                                              prefix={"₹"}
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        <td className="table-body">
                                          {row.roi_type}
                                        </td>
                                        <td className="table-body">
                                          {row.created_at
                                            ? moment(
                                                row.created_at,
                                                "YYYY-MM-DD hh:mm:ss"
                                              ).format("DD/MM/YYYY")
                                            : ""}
                                        </td>
                                        {acceptedOffers.length &&
                                        acceptedOffers.includes(row.id) ? (
                                          <td className="table-body">
                                            <button className="btn btn-success">
                                              Accepted Offer
                                            </button>
                                          </td>
                                        ) : (
                                          <td className="table-body">
                                            {row.status ? (
                                              <button
                                                className="btn btn-primary mr-2"
                                                onClick={() =>
                                                  changeStatus(row.id, 0)
                                                }
                                                disabled={isDisableAll}
                                              >
                                                Active
                                              </button>
                                            ) : (
                                              <button
                                                className="btn  mr-2 btn-danger"
                                                onClick={() =>
                                                  changeStatus(row.id, 1)
                                                }
                                                disabled={isDisableAll}
                                              >
                                                InActive
                                              </button>
                                            )}

                                            <button
                                              className="btn btn-primary"
                                              onClick={(e) => {
                                                editData(row);
                                              }}
                                              disabled={isDisableAll}
                                            >
                                              <i
                                                className="fa fa-edit"
                                                aria-hidden="true"
                                              ></i>
                                            </button>
                                          </td>
                                        )}
                                      </tr>
                                    ))
                                  : ""}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {type == 2 || type == 4 ? (
                        <div className="col-md-12 mb-3">
                          <div className="card case-admin">
                            <h5 className="case-heading">Bank details</h5>
                            <div className="card-body">
                              <table
                                style={{ width: "100%" }}
                                className="table table-stripped"
                              >
                                <thead>
                                  <tr>
                                    <th className="table-head">
                                      Account Number{" "}
                                    </th>
                                    <th className="table-head">
                                      Account Holder Name
                                    </th>
                                    <th className="table-head">IFSC</th>
                                    <th className="table-head">
                                      Branch Address
                                    </th>

                                    <th className="table-head">
                                      Cancelled Cheque Doc.
                                    </th>

                                    {/*<th className="table-head">Action</th>*/}
                                  </tr>
                                </thead>
                                <tbody>
                                  {v.bankDetails?.length
                                    ? v.bankDetails.map((row, index) => (
                                        <tr
                                          key={index}
                                          style={{
                                            borderBottom: "1px solid #ddd",
                                          }}
                                        >
                                          <td className="table-body">
                                            {row.account_number}
                                          </td>
                                          <td className="table-body">
                                            {row.account_holder_name}
                                          </td>
                                          <td className="table-body">
                                            {row.ifsc}
                                          </td>
                                          <td className="table-body">
                                            {row.branch_address}
                                          </td>
                                          <td className="table-body">
                                            {" "}
                                            <Link
                                              to={API_URL + row.path}
                                              target="_blank"
                                              download="#"
                                            >
                                              Download
                                            </Link>{" "}
                                          </td>
                                          {/*<td className="table-body">

                                      <button className="btn btn-primary" onClick={() => EditBankDetails(row, row.account_number)} disabled={isDisableAll} ><i className="fa fa-edit" aria-hidden="true"></i></button>

                                </td>*/}
                                        </tr>
                                      ))
                                    : ""}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}

                  <div className="row gutters-sm">
                    <div className="col-md-12">
                      <div className="card case-admin mb-3">
                        <h5 className="case-heading">Remarks Details</h5>
                        <div className="card-body">
                          <table
                            style={{ width: "100%" }}
                            className="table table-stripped"
                          >
                            <thead>
                              <tr>
                                <th className="table-head">Remarks</th>
                                <th className="table-head">Created DateTime</th>
                              </tr>
                            </thead>
                            <tbody>
                              {remarksData?.length
                                ? remarksData.map((row, index) => {
                                    return (
                                      <tr
                                        key={index}
                                        style={{
                                          borderBottom: "1px solid #ddd",
                                        }}
                                      >
                                        <td className="table-body">
                                          {row.remark}
                                        </td>
                                        <td className="table-body">
                                          {row.created_at
                                            ? moment
                                                .utc(
                                                  row.created_at,
                                                  "YYYY-MM-DD hh:mm:ss"
                                                )
                                                .local()
                                                .format("DD/MM/YYYY hh:mm:ss A")
                                            : ""}
                                        </td>
                                      </tr>
                                    );
                                  })
                                : ""}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <AdminFooter />
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddOffer
            bankData={bankData}
            processData={processData}
            checkSubmitDisableBtn={checkSubmitDisableBtn}
            previousData={previousData}
            loanTypeData={loanTypeData}
            edit={editModeOffer}
            dataOfOffer={dataOfOffer}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={submitDisable}
            onClick={submitData}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showOffer}
        onHide={handleCloseOffer}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Accepted Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WelComeNote
            offerData={getSelectedOfferData}
            welcomeProcessData={welcomeProcessData}
            checkWelcomSubmitDisableBtn={checkWelcomSubmitDisableBtn}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseOffer}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={submitWelcomeDisable}
            onClick={sendWelcomeNote}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showLoanAmout}
        onHide={handleCloseLoanAmount}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Loan Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 col-lg-12">
            <>
              <div className="inner-employement">
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Loan amount Req.</label>
                    <div className="loan-in">
                      <CurrencyInput
                        className="salary-input"
                        value={loanAmount}
                        placeholder="₹ 1,00,000"
                        decimalsLimit={0}
                        intlConfig={{ locale: "en-IN", currency: "INR" }}
                        prefix="₹"
                        onValueChange={handleLoan}
                        readOnly
                      />
                    </div>
                    <span className="textSize">
                      {" "}
                      {numberToText.convertToText(loanAmount, {
                        language: "en-in",
                      })}
                    </span>
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Loan Purpose</label>
                    <select
                      value={loanPurpose}
                      className={"salary-input"}
                      onChange={(e) => {
                        handleLoanPurpose(e);
                      }}
                      disabled={true}
                    >
                      <option value="">Select Loan Purpose</option>
                      {loanData
                        ? loanData.map((xx) => {
                            return <option value={xx?.id}>{xx?.name}</option>;
                          })
                        : ""}
                    </select>
                  </div>
                </div>
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Sub Loan Purpose</label>
                    <select
                      value={subLoanPurpose}
                      className={
                        subLoanPurposeError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      onChange={(e) => {
                        handleSubLoanPurpose(e);
                      }}
                    >
                      <option value="">Sub Loan Purpose</option>
                      {subLoanPurposeData
                        ? subLoanPurposeData.map((xx) => {
                            return <option value={xx?.id}>{xx?.name}</option>;
                          })
                        : ""}
                    </select>
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Loan duration</label>
                    <InputMask
                      mask="9999"
                      maskChar=""
                      name={"tenure"}
                      className={
                        loanDurationError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      value={loanDuration}
                      placeholder="72 Months"
                      onChange={(e) => {
                        handleDuration(e);
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLoanAmount}>
            Close
          </Button>
          <Button variant="primary" onClick={UpdateLoanAmountData}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEmployementDetails}
        onHide={handleCloseEmployementDetails}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Company Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 col-lg-12">
            <>
              <div className="inner-employement">
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Company Name</label>
                    <div className="loan-in">
                      <input
                        type="text"
                        className={
                          companyNameError
                            ? "salary-input error"
                            : "salary-input"
                        }
                        placeholder="Your company name"
                        value={companyName}
                        onChange={handleCompanyName}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Tenure</label>
                    <select
                      value={tenure}
                      className={
                        tenureError ? "salary-input error" : "salary-input"
                      }
                      onChange={handleTenure}
                    >
                      <option value="">Select tenure in current company</option>
                      <option value="0-6 Months">0-6 Months</option>
                      <option value="6-12 Months">6-12 Months</option>
                      <option value="1-2 Year">1-2 Year</option>
                      <option value="2-3 Years">2-3 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>
                </div>
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Monthly Inhand Salary</label>
                    <div className="loan-in">
                      <CurrencyInput
                        type="tel"
                        className={
                          monthlyIncomeError
                            ? "salary-input error"
                            : "salary-input"
                        }
                        value={monthlyIncome}
                        placeholder="₹ 1,00,000"
                        defaultValue={""}
                        decimalsLimit={0}
                        intlConfig={{ locale: "en-IN", currency: "INR" }}
                        prefix="₹"
                        onValueChange={handleMonthlyIncome}
                      />
                      <span className="textSize">
                        {" "}
                        {monthlyIncome
                          ? numberToText.convertToText(monthlyIncome, {
                              language: "en-in",
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Salary received via</label>
                    <select
                      value={salaryRecievedIn.toLowerCase()}
                      className={
                        salaryRecievedInError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      onChange={handleSalaryRecieved}
                    >
                      <option value="">Select salary received via </option>
                      <option value="bank">Bank</option>
                      <option value="cash">Cash</option>
                      <option value="cheque">Cheque</option>
                    </select>
                  </div>
                </div>

                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Official Email ID</label>
                    <input
                      type="text"
                      className={
                        emailError ? "salary-input error" : "salary-input"
                      }
                      value={email}
                      onChange={handleEmail}
                      placeholder="Your offcial email-id"
                    />
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Total Experience</label>
                    <select
                      value={experience}
                      className={
                        experienceError ? "salary-input error" : "salary-input"
                      }
                      onChange={handleExperience}
                    >
                      <option value="">Select total work experience</option>
                      <option value="0-6 Months">0-6 Months</option>
                      <option value="6-12 Months">6-12 Months</option>
                      <option value="1-2 Year">1-2 Year</option>
                      <option value="2-3 Years">2-3 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5-10 Years">5-10 Years</option>
                      <option value="10+ Years">10+ Years</option>
                    </select>
                  </div>
                </div>

                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Working as</label>
                    <select
                      value={working}
                      className={
                        workingError ? "salary-input error" : "salary-input"
                      }
                      onChange={handleWorking}
                    >
                      <option value="">Select working as</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Contractual">Contractual</option>
                    </select>
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Notice Period</label>
                    <select
                      value={np}
                      className={
                        npError ? "salary-input error" : "salary-input"
                      }
                      onChange={handleNp}
                    >
                      <option value="">Select notice period</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEmployementDetails}>
            Close
          </Button>
          <Button variant="primary" onClick={UpdateEmployementDetailsData}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showPersonalDetails}
        onHide={handleClosePesonalDetails}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Personal details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 col-lg-12">
            <>
              <div className="inner-employement">
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Name</label>
                    <input
                      type="text"
                      className={
                        nameError ? "salary-input error" : "salary-input"
                      }
                      onChange={handleName}
                      value={name}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Date of birth</label>
                    <div className="loan-in">
                      <DatePicker
                        className={
                          dobError ? "salary-input error" : "salary-input"
                        }
                        onChange={handleDateOfBirth}
                        selected={dob}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Date Of Birth"
                        dropdownMode="select"
                        showMonthDropdown
                        showYearDropdown
                        adjustDateOnChange
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Pan Number</label>
                    <InputMask
                      mask="aaaaa9999a"
                      maskChar=""
                      className={
                        panNumberError ? "salary-input error" : "salary-input"
                      }
                      placeholder="AZSPT5997H"
                      onChange={handlePanNumber}
                      value={panNumber}
                    />
                    {panValidP ? (
                      <i
                        className="fa fa-check"
                        style={{ position: "absolute", color: "green" }}
                      ></i>
                    ) : (
                      ""
                    )}
                    <span>
                      {panNumberCheckError ? (
                        <small className="alertMode">Invalid pan number</small>
                      ) : (
                        ""
                      )}
                    </span>
                    <span>
                      {!panNumberCheckError && panNumberExistError ? (
                        <small className="alertMode">
                          Pan number already exists!
                        </small>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Aadhaar Number</label>
                    <InputMask
                      mask="9999 9999 9999"
                      maskChar=""
                      className={
                        panNumberError ? "salary-input error" : "salary-input"
                      }
                      placeholder="9999 9999 9999"
                      onChange={handleAadhaar}
                      value={aadhaar}
                    />
                    {aadhaarValid ? (
                      <i
                        className="fa fa-check"
                        style={{ position: "absolute", color: "green" }}
                      ></i>
                    ) : (
                      ""
                    )}
                    <span>
                      {panNumberCheckError ? (
                        <small className="alertMode">Invalid pan number</small>
                      ) : (
                        ""
                      )}
                    </span>
                    <span>
                      {!panNumberCheckError && panNumberExistError ? (
                        <small className="alertMode">
                          Pan number already exists!
                        </small>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Relationship Status</label>
                    <select
                      className={
                        addOneError ? "salary-input error" : "salary-input"
                      }
                      value={relationshipStatus}
                      onChange={handleRelationShipStatus}
                    >
                      <option value="">Select Relationship Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Gender</label>
                    <select
                      className={
                        addOneError ? "salary-input error" : "salary-input"
                      }
                      value={gender.toLowerCase()}
                      onChange={handleGender}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <div className="address-section">Permanent Address</div>
                  </div>
                </div>
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Addess 1</label>
                    <input
                      type="text"
                      className={
                        addOneError ? "salary-input error" : "salary-input"
                      }
                      placeholder="Enter address 1"
                      value={addOneCurrent}
                      onChange={handleAddOneCurrent}
                    />
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Addess 2</label>
                    <input
                      type="text"
                      className={
                        addTwoCurrentError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      placeholder="Enter address 2"
                      value={addTwoCurrent}
                      onChange={handleAddTwoCurrent}
                    />
                  </div>
                </div>

                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Landmark</label>
                    <input
                      type="text"
                      className={
                        streetCurrentError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      placeholder="Enter landmark"
                      value={streetCurrent}
                      onChange={handleStreetCurrent}
                    />
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Pin code</label>
                    <InputMask
                      mask="999999"
                      type="tel"
                      maskChar=""
                      className={
                        pinCodeCurrentError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      placeholder="Enter pin code"
                      value={pinCodeCurrent}
                      onChange={handlePinCodeCurrent}
                      onKeyUp={(e) => getAddressByPin(e, "current")}
                    />
                  </div>
                </div>
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>City, District</label>
                    <input
                      type="text"
                      className={
                        statePermanentError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      placeholder="Enter City, District"
                      value={cityCurrent}
                      onChange={handleCityCurrent}
                    />
                  </div>
                  <div className="col-md-6 spacing">
                    <label>State</label>
                    <input
                      type="text"
                      className={
                        stateCurrentError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      placeholder="Enter state"
                      value={stateCurrent}
                      onChange={handleStateCurrent}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <div className="address-section">Current Address</div>
                    <div>
                      <input type="checkbox" onChange={handleSameAddress} />{" "}
                      Check if Current Address is same as Permanent Address
                    </div>
                  </div>
                </div>
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Addess 1</label>
                    <input
                      type="text"
                      className={
                        addOnePermanentError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      placeholder="Enter address 1"
                      value={addOnePermanent}
                      onChange={handleAddOnePermanent}
                    />
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Addess 2</label>
                    <input
                      type="text"
                      className={
                        addTwoPermanentError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      placeholder="Enter address 2"
                      value={addTwoPermanent}
                      onChange={handleAddTwoPermanent}
                    />
                  </div>
                </div>

                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Landmark</label>
                    <input
                      type="text"
                      className={
                        streetPermanentError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      placeholder="Enter landmark"
                      value={streetPermanent}
                      onChange={handleStreetPermanent}
                    />
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Pin code</label>
                    <InputMask
                      mask="999999"
                      type="tel"
                      maskChar=""
                      className={
                        pinCodePermanentError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      placeholder="Enter pin code"
                      value={pinCodePermanent}
                      onChange={handlePinCodePermanent}
                      onKeyUp={(e) => getAddressByPin(e, "Permanent")}
                    />
                  </div>
                </div>
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>City, District</label>
                    <input
                      type="text"
                      className={
                        statePermanentError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      placeholder="Enter City, District"
                      value={cityPermanent}
                      onChange={handleCityPermanent}
                    />
                  </div>
                  <div className="col-md-6 spacing">
                    <label>State</label>
                    <input
                      type="text"
                      className={
                        statePermanentError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      placeholder="Enter state"
                      value={statePermanent}
                      onChange={handleStatePermanent}
                    />
                  </div>
                </div>
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Past loan, Credit card :</label>
                    <div className="row year-month">
                      <div className="col-md-12">
                        <select
                          value={pastLoan}
                          className={
                            pastLoanError
                              ? "salary-input error"
                              : "salary-input"
                          }
                          onChange={handlePastLoan}
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 spacing"
                    style={{ display: pastLoan == "Yes" ? "block" : "none" }}
                  >
                    <label>EMI you are paying currently :</label>
                    <CurrencyInput
                      className={
                        pastLoanAmountError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      value={pastLoanAmount}
                      placeholder="Past loan"
                      decimalsLimit={0}
                      intlConfig={{ locale: "en-IN", currency: "INR" }}
                      prefix="₹"
                      onValueChange={handlePastLoanAmount}
                      //disabled={true}
                    />
                    <span className="textSize">
                      {" "}
                      {pastLoanAmount
                        ? numberToText.convertToText(pastLoanAmount, {
                            language: "en-in",
                          })
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePesonalDetails}>
            Close
          </Button>
          <Button variant="primary" onClick={UpdatePersonalDetailsData}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={bankDetailsShow}
        onHide={handleCloseBankDetails}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Bank Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row add-bank-info">
            <div className="col-md-6 label-line-height">
              <Form.Label htmlFor="accont_number">
                Account Number<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="accont_number"
                aria-describedby="accountHelpBlock"
                placeholder="Account Number"
                value={accountNumber}
                onChange={handleAccountNumber}
              />
              <Form.Text id="accountHelpBlock" muted>
                {accountNumberError}
              </Form.Text>
            </div>

            <div className="col-md-6 label-line-height">
              <Form.Label htmlFor="account_holder_name">
                Account Holder Name<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="account_holder_name"
                aria-describedby="accountHolderHelpBlock"
                placeholder="Account Holder Name"
                value={accountHolderName}
                onChange={handleAccountHolderName}
              />
              <Form.Text id="accountHolderHelpBlock" muted>
                {accountHolderNameError}
              </Form.Text>
            </div>
            <div className="col-md-6 label-line-height">
              <Form.Label htmlFor="ifsc_code">
                IFSC Code<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="ifsc_code"
                aria-describedby="ifscHelpBlock"
                placeholder="IFSC Code"
                value={ifscCode}
                onChange={handleIfscCode}
                onBlur={(e) => {
                  handleGetBankInfoUsingIFSC(e.target.value);
                }}
                // readOnly={editMode ? true : false}
              />
              <Form.Text id="ifscHelpBlock" muted>
                {ifscCodeError}
              </Form.Text>
            </div>

            {bankName && branchAddress ? (
              <div className="col-md-12 label-line-height">
                <div>
                  <span className="fw-bold">Bank Name:</span> {bankName}
                </div>
                <div>
                  <span className="fw-bold">Branch Name:</span> {branchAddress}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBankDetails}>
            Close
          </Button>
          <Button
            variant="primary"
            className="submit-btn-modal"
            onClick={UpdateBankInfoData}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showRemarks}
        onHide={handleRemarksShow}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Remarks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 col-lg-12">
            <>
              <div className="inner-employement">
                <div className="form-group loan-in row">
                  <div className="col-md-12 spacing">
                    <label>Remarks:</label>
                    <input
                      type="text"
                      className={
                        remarkError ? "salary-input error" : "salary-input"
                      }
                      onChange={handleRemarksData}
                      value={remark}
                    />
                  </div>
                </div>
              </div>
            </>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRemarksShow}>
            Close
          </Button>
          <Button variant="primary" onClick={AddRemarks}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={ShowUploadDoc}
        onHide={handleUploadDocButtonClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="col-sm-12 mb-3">
              <div className=" h-100">
                <div className="card-body">
                  <h5 className="d-flex align-items-center mb-3">
                    Upload Documents
                  </h5>

                  <div className="row multiuploads">
                    <div className="col-sm-5">
                      <h6>Pan Card Image:</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        onChange={handlePanCard}
                        className={
                          panCardError
                            ? "form-control errorlogin"
                            : "form-control"
                        }
                        ref={panRef}
                      />
                      {panFile.length ? (
                        <i
                          className="fa fa-times fa-times-red"
                          onClick={(e) => removeFile(e, "pan")}
                        ></i>
                      ) : (
                        ""
                      )}
                      {panCardErrorMsg ? (
                        <span className="vrtext message">
                          {panCardErrorMsg}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="row multiuploads">
                    <div className="col-sm-5">
                      <h6>Aadhaar Front Image:</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        onChange={handleAadharFront}
                        className={
                          aadhaarFrontError
                            ? "form-control errorlogin"
                            : "form-control"
                        }
                        ref={aadhaarFrontRef}
                      />
                      {aadhaarFront.length ? (
                        <i
                          className="fa fa-times fa-times-red"
                          onClick={(e) => removeFile(e, "aadhaarFront")}
                        ></i>
                      ) : (
                        ""
                      )}
                      {aadhaarFrontErrorMsg ? (
                        <span className="vrtext message">
                          {panCardErrorMsg}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="row multiuploads">
                    <div className="col-sm-5">
                      <h6>Aadhaar Back Image:</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        onChange={handleAadharBack}
                        className={
                          aadhaarBackError
                            ? "form-control errorlogin"
                            : "form-control"
                        }
                        ref={aadhaarBackRef}
                      />
                      {aadhaarBack.length ? (
                        <i
                          className="fa fa-times fa-times-red"
                          onClick={(e) => removeFile(e, "aadhaarBack")}
                        ></i>
                      ) : (
                        ""
                      )}
                      {aadhaarBackErrorMsg ? (
                        <span className="vrtext message">
                          {panCardErrorMsg}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="row multiuploads">
                    <div className="col-sm-5">
                      <h6>1st Month Salary Slip:</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleSalaryStatement}
                        className={
                          panCardError
                            ? "form-control errorlogin"
                            : "form-control"
                        }
                        ref={salaryFirstRef}
                      />
                      {salaryStatement.length ? (
                        <i
                          className="fa fa-times fa-times-red"
                          onClick={(e) => removeFile(e, "salaryFirst")}
                        ></i>
                      ) : (
                        ""
                      )}
                      {panCardErrorMsg ? (
                        <span className="vrtext message">
                          {panCardErrorMsg}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row multiuploads">
                    <div className="col-sm-5">
                      <h6>2nd Month Salary Slip:</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleSalaryStatementP}
                        className={
                          panCardError
                            ? "form-control errorlogin"
                            : "form-control"
                        }
                        ref={salarySecondRef}
                      />
                      {salaryStatementP.length ? (
                        <i
                          className="fa fa-times fa-times-red"
                          onClick={(e) => removeFile(e, "salarySecond")}
                        ></i>
                      ) : (
                        ""
                      )}
                      {panCardErrorMsg ? (
                        <span className="vrtext message">
                          {panCardErrorMsg}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row multiuploads">
                    <div className="col-sm-5">
                      <h6>3rd Month Salary Slip:</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleSalaryStatementT}
                        className={
                          panCardError
                            ? "form-control errorlogin"
                            : "form-control"
                        }
                        ref={salaryThirdRef}
                      />
                      {salaryStatementT.length ? (
                        <i
                          className="fa fa-times fa-times-red"
                          onClick={(e) => removeFile(e, "salaryThird")}
                        ></i>
                      ) : (
                        ""
                      )}
                      {panCardErrorMsg ? (
                        <span className="vrtext message">
                          {panCardErrorMsg}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="row multiuploads">
                    <div className="col-sm-5">
                      <h6>12 Months Bank Statement:</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        accept="application/pdf"
                        //placeholder="Upload welcome note"
                        className={
                          bankStatementError
                            ? "form-control errorlogin"
                            : "form-control"
                        }
                        onChange={handleBankStatement}
                        ref={bankRef}
                      />
                      {bankStatement.length ? (
                        <i
                          className="fa fa-times fa-times-red"
                          onClick={(e) => removeFile(e, "bankStatement")}
                        ></i>
                      ) : (
                        ""
                      )}
                      {bankStatementErrorMsg ? (
                        <span className="vrtext message">
                          {bankStatementErrorMsg}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="row multiuploads">
                    <div className="col-sm-5">
                      <h6>Current Year ITR:</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        accept="application/pdf"
                        //placeholder="Upload welcome note"
                        onChange={handleFormSixteen}
                        className={
                          formSixteenError
                            ? "form-control errorlogin"
                            : "form-control"
                        }
                        ref={sixteenRef}
                      />
                      {formSixteen.length ? (
                        <i
                          className="fa fa-times fa-times-red"
                          onClick={(e) => removeFile(e, "formSixteen")}
                        ></i>
                      ) : (
                        ""
                      )}
                      {formSixteenErrorMsg ? (
                        <span className="vrtext message">
                          {formSixteenErrorMsg}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row multiuploads">
                    <div className="col-sm-5">
                      <h6>Previous Year ITR:</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        accept="application/pdf"
                        //placeholder="Upload welcome note"
                        onChange={handleFormSixteenP}
                        className={
                          formSixteenPError
                            ? "form-control errorlogin"
                            : "form-control"
                        }
                        ref={sixteenRefP}
                      />
                      {formSixteenP.length ? (
                        <i
                          className="fa fa-times fa-times-red"
                          onClick={(e) => removeFile(e, "formSixteenP")}
                        ></i>
                      ) : (
                        ""
                      )}
                      {formSixteenPErrorMsg ? (
                        <span className="vrtext message">
                          {formSixteenPErrorMsg}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUploadDocButtonClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUploadDocument}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default CaseNumberInLead;
