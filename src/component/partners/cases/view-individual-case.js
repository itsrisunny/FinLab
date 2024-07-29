import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AdminHeader from "../layouts/partner-admin-header";
import AdminFooter from "../layouts/partner-admin-footer";
import AdminNavBar from "../layouts/partner-admin-nav-bar";
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
  let { caseID, type, offerId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loanTypeData, setloanTypeData] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [getSelectedOfferData, setGetSelectedOfferData] = useState([]);
  useEffect(() => {
    getAllBankList();
    getUserData();
    getLoanPurposeData();
  }, [1]);

  const [pastLoan, setPastLoan] = useState("");
  const [pastLoanError, setPastLoanError] = useState(false);

  const [pastLoanAmount, setPastLoanAmount] = useState(0);
  const [pastLoanAmountError, setPastLoanAmountError] = useState(false);
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
  const [loader, setLoader] = useState(false);
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
  };

  const handleCloseBankDetails = () => {
    setBankDetailsShow(false);
  };
  const handleCloseDirectorDetails = () => {
    setDirectorShow(false);
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
  const handleRemarksShow = () => {
    setShowRemarks(false);
  };
  const handleShowRemarks = () => {
    setShowRemarks(true);
  };
  const [offeredBank, setOfferedBank] = useState([]);

  const [subLoanPurposeData, setSubLoanPurposeData] = useState("");
  const [ph, setPh] = useState("000000000");

  const [welcomeNoteData, setWelcomeNoteData] = useState("");

  const [isDisableAll, setIsDisableAll] = useState(type == 4 ? true : false);
  const [isWelcomeData, setIsWelcomeData] = useState(false);

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
            resp?.loan_requirement?.created_by == null
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

          setData([
            {
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
              subBusinessId: resp?.personal_detail?.sub_business_type
                ? resp?.personal_detail?.sub_business_type
                : "",
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
              agent_name: resp?.loan_requirement?.agent_name,
              source: resp?.loan_requirement?.created_by,
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
  const [loanDuration, setLoanDuration] = useState(0);
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
    setLoanAmount(e ? e : 0);
  };

  const handleLoanPurpose = (e) => {
    setLoanPurpose(e.target.value);
  };

  const handleDuration = (e) => {
    setLoanDuration(e.target.value);
  };

  const handleSubLoanPurpose = (e) => {
    setSubLoanPurpose(e.target.value);
  };

  const UpdateLoanAmountData = () => {
    //setSubmitDisable(true);
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
          console.log(response?.data);
          toast.success(response?.message);
          setShowLoanAmount(false);
          getUserData();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [iFile, setIFile] = useState("");
  const [gstinVerified, setGstinVerified] = useState(false);
  const [gstinCheckError, setGstinCheckError] = useState(false);
  const handleIfile = (e) => {
    setIFile(e.target.value);
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

  const [nameOnPan, setNameOnPan] = useState("");
  const editEmployementDetails = (data) => {
    setNameOnPan(data?.name);
    setShowEmployementDetails(true);
    setEmpId(data?.empId);
    setGstin(data?.gstinNumber);
    setItrAvailable(data?.itrAvailabilityId);
    setBusinessVintage(data?.businessVintageId);
    setAnualTurnOver(data?.turnoverYearly);
    setAnualProfit(data?.grossProfit);
    setIndustry(data?.industry);
    setSubIndustry(data?.subIndustry);
    setIFile(data?.i_file ? data?.i_file : "both");
    if (data?.industry) {
      const jsonData = {
        id: data?.industry,
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

  const handleGstin = (e) => {
    setGstinError(false);
    setGstin(e.target.value.toUpperCase());
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
    setAnualTurnOver(e ? e : 0);
  };

  const handleAnualProfit = (e) => {
    setAnualProfitError(false);
    setAnualProfit(e ? e : 0);
  };

  const handleIndustry = (e) => {
    setIndustryError(false);
    setIndustry(e.target.value);
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
    if (handleEmployeeValidation()) {
      //setSubmitDisable(true);
      const jsonData = {
        id: empId,
        gstin: gstin,
        is_itr_available: itrAvailable,
        business_vintage: businessVintage,
        annual_turnover: anualTurnOver,
        gross_Annual_profit: anualProfit,
        industry: industry,
        sub_industry: subIndustry,
        i_file: iFile,
        case_id: caseID,
      };

      axios
        .post(API_URL + "admin/update-self-employee-detail-data", jsonData)
        .then((res) => {
          let response = res.data;

          if (response?.status === 200) {
            //console.log(response?.data)
            toast.success(response?.message);
            setShowEmployementDetails(false);
            getUserData();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const [businessTypeData, setBusinessTypeData] = useState([]);
  const [allBusinessTypeData, setAllBusinessTypeData] = useState([]);
  const [businessType, setBusinessType] = useState("");
  const [othersBusinessName, setOthersBusinessName] = useState("");
  const [othersBusinessNameError, setOthersBusinessNameError] = useState(false);
  const [profession, setProfession] = useState("");
  const [professionError, setProfessionError] = useState(false);
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
  const [personalDetailsId, setPersonalDetailsId] = useState("");
  const [businessTypeError, setBusinessTypeError] = useState(false);
  const [dobHide, setDobHide] = useState(false);
  const [doiError, setDoiError] = useState(false);
  const [ProfessionDataDropDown, setProfessionDataDropDown] = useState([]);
  useEffect(() => {
    getBusinessType();
  }, []);
  const getBusinessType = () => {
    axios
      .get(API_URL + "master/business-type")
      .then((res) => {
        let response = res.data;
        setProfessionDataDropDown(response?.data);
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
    setPersonalDetails(true);
    setBusinessType(data?.businessTypeId);
    setProfession(data?.subBusinessId);
    setOthersBusinessName(data?.othersBusinessName);
    setName(data?.name);
    setPanNumber(data?.panNumber);
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

    setAddOneCurrent(data?.companyAddress?.address1);
    setAddTwoCurrent(data?.companyAddress?.address2);
    setStreetCurrent(data?.companyAddress?.landmark);
    setPinCodeCurrent(data?.companyAddress?.pincode);
    setStateCurrent(data?.companyAddress?.state);
    setCityCurrent(data?.companyAddress?.city);
    setPersonalDetailsId(data?.personalDetailsId);
  };

  const handleName = (e) => {
    setNameError(false);
    setName(e.target.value);
  };
  function validatePAN(pan_number) {
    var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return regex.test(pan_number);
  }
  const handlePanNumber = (e) => {
    setPanNumberError(false);
    setPanNumber(e.target.value.toUpperCase());
  };
  const validatePanNumber = (e) => {
    if (validatePAN(e.target.value)) {
      axios
        .post(API_URL + "api-auth/verify-pan-number-v3", {
          pan: e.target.value,
        })
        .then((res) => {
          if (res?.data?.data != undefined) {
            let response = res.data;
            setNameError(false);
            setName(response?.data?.result?.name);
            setPanNumberError(false);
            if (businessType != 1) {
              setDoi(new Date(response?.data?.result?.dob));
            } else {
              setDob(new Date(response?.data?.result?.dob));
            }
          } else {
            setName("");
            setDoi("");
            setDob("");
            setNameError(false);
            setPanNumberError(true);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const validateDirPanNumber = (e) => {
    if (validatePAN(e.target.value)) {
      axios
        .post(API_URL + "api-auth/verify-pan-number-v3", {
          pan: e.target.value,
        })
        .then((res) => {
          if (res?.data?.data != undefined) {
            let response = res.data;
            setDirNameError(false);
            setDirName(response?.data?.result?.name);
            setDirPanNoError(false);
          } else {
            setDirNameError(true);
            setDirName("");
            setDirPanNoError(true);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const verifyAadharNo = (e) => {
    if (e.target.value.replace(/ /g, "").length > 11) {
      axios
        .post(API_URL + "api-auth/verify-aadhar-number-v3", {
          uid: e.target.value,
        })
        .then((res) => {
          if (res?.data?.data != undefined) {
            let response = res.data;
            if (res?.data?.data?.result?.verified) {
              setAadhaarError(false);
            } else {
              setAadhaarError(true);
            }
          } else {
            setAadhaarError(true);
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
  const handleOthersBusinessName = (e) => {
    setOthersBusinessNameError(false);
    setOthersBusinessName(e.target.value);
  };

  const handleProfession = (e) => {
    setProfessionError(false);
    setProfession(e.target.value);
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
  const handleValidationPersonalDetails = () => {
    let isFormValid = true;
    if (!businessType) {
      isFormValid = false;
      setBusinessTypeError(true);
    }

    if (businessType == 6 && !othersBusinessName) {
      isFormValid = false;
      setOthersBusinessNameError(true);
    }

    if (businessType == 5 && !profession) {
      isFormValid = false;
      setProfessionError(true);
    }
    if (!panNumber) {
      isFormValid = false;
      setPanNumberError(true);
    }
    if (panNumber.length !== 10) {
      isFormValid = false;
      setPanNumberError(true);
    }

    if (!name) {
      isFormValid = false;
      setNameError(true);
    }
    if (businessType === 1) {
      if (!dob) {
        isFormValid = false;
        setDobError(true);
      }
    }

    if (businessType != 1) {
      if (!doi) {
        isFormValid = false;
        setDoiError(true);
      }
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

    return isFormValid;
  };
  const UpdatePersonalDetailsData = () => {
    if (handleValidationPersonalDetails()) {
      //setSubmitDisable(true);
      const jsonData = {
        id: personalDetailsId,
        businessType: businessType,
        subBusinessType: businessType == 6 ? "" : profession,
        othersBusinessName: businessType == 6 ? othersBusinessName : "",
        name: name,
        panNumber: panNumber,
        dateOfBirth: businessType != 1 ? "" : dob,
        dateOfIncorporation: doi,
        address1: addOneCurrent,
        address2: addTwoCurrent,
        landmark: streetCurrent,
        pincode: pinCodeCurrent,
        state: stateCurrent,
        city: cityCurrent,
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
  const panRef = useRef();
  const businessRef = useRef();
  const bankRef = useRef();
  const sixteenRef = useRef();
  const sixteenRefP = useRef();
  const dirRef = useRef();
  const deedRef = useRef();
  const removeFile = (e, type, index = null) => {
    if (type == "pan") {
      panRef.current.value = "";
      setPanFile([]);
      setPanCardFileName("");
      setPanCardFileType("");
      setPanCardError(false);
      setPanCardErrorMsg(false);
    }
    if (type == "businessDoc") {
      businessRef.current.value = "";
      setBusinessDoc([]);
      setBusinessDocName("");
      setBusinessTypeErrorMsg("");
      setBusinessTypeDocError(false);
      setBusinessFileType(false);
    }
    if (type == "bankStatement") {
      bankRef.current.value = "";
      setBankStatement([]);
      setBankStatementName("");
      setBankStatementType("");
      setBankStatementError(false);
      setBankStatementErrorMsg(false);
      setBankStatementFile("");
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
    if (type == "directorKYC") {
      dirRef.current.value = "";
      setDirectorKYC([]);
      setDirectorKYCName("");
      setDirectorKYCType("");
      setDirectorKYCError(false);
      setDirectorKYCErrorMsg(false);
    }
    if (type == "partnershipDeed") {
      deedRef.current.value = "";
      setPartnershipDeed([]);
      setPartnershipDeedName("");
      setPartnershipDeedType("");
      setPartnershipDeedError(false);
      setPartnershipDeedErrorMsg(false);
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
              setPinCodeCurrentError(false);
              setStateCurrent(data?.State);

              setCityCurrent(data?.Block + ", " + data?.District);
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

  const editDirectorDetails = (data) => {
    setDirId(data?.id);
    setDirectorShow(true);
    setDirName(data?.name);
    setDirPanNo(data?.pan_card);
    setAadhaar(data?.aadhar_card);
  };

  const handleDirName = (e) => {
    setDirNameError(false);
    setDirName(e.target.value);
  };

  const handleDirPanNumber = (e) => {
    setDirPanNoError(false);
    setDirPanNo(e.target.value.toUpperCase());
  };

  const handleAadhaar = (e) => {
    setAadhaarError(false);
    setAadhaar(e.target.value);
  };

  const handleDirectorValidation = () => {
    let isFormValid = true;
    if (!dirName) {
      isFormValid = false;
      setDirNameError(true);
    }

    if (!dirPanNo) {
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

  const downloadData = () => {
    let v = data[0];
    const dataUrlList = [];

    let a = v.uploadPancard ? dataUrlList.push(API_URL + v.uploadPancard) : "";

    a = v.uploadBusinessRegistration
      ? dataUrlList.push(API_URL + v.uploadBusinessRegistration)
      : "";

    a = v.uploadBankStatement
      ? dataUrlList.push(API_URL + v.uploadBankStatement)
      : "";

    a = v.uploadAadhaarFront
      ? dataUrlList.push(API_URL + v.uploadAadhaarFront)
      : "";

    a = v.uploadAadhaarBack
      ? dataUrlList.push(API_URL + v.uploadAadhaarBack)
      : "";

    a = v.uploadDirectorKyc
      ? dataUrlList.push(API_URL + v.uploadDirectorKyc)
      : "";

    a = v.uploadPartnershipDeed
      ? dataUrlList.push(API_URL + v.uploadPartnershipDeed)
      : "";

    a = v?.uploadSalarySlip.length
      ? v?.uploadSalarySlip.map((k, j) => dataUrlList.push(API_URL + k))
      : "";

    a = v?.uploadItr.length
      ? v?.uploadItr.map((k, j) => dataUrlList.push(API_URL + k))
      : "";

    convertIntoZip(dataUrlList);

    // console.log(dataUrlList);

    // dataUrlList?.map((x) => {
    //   window.open(x);
    // });
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

  const [bussnessDoc, setBusinessDoc] = useState([]);
  const [bussnessDocName, setBusinessDocName] = useState("");
  const [businessTypeErrorMsg, setBusinessTypeErrorMsg] = useState(false);
  const [bisinessTypeDocError, setBusinessTypeDocError] = useState(false);
  const [businessFileType, setBusinessFileType] = useState("");

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

  const [directorKYC, setDirectorKYC] = useState([]);
  const [directorKYCName, setDirectorKYCName] = useState("");
  const [directorKYCType, setDirectorKYCType] = useState("");
  const [directorKYCError, setDirectorKYCError] = useState(false);
  const [directorKYCErrorMsg, setDirectorKYCErrorMsg] = useState(false);

  const [partnershipDeed, setPartnershipDeed] = useState([]);
  const [partnershipDeedName, setPartnershipDeedName] = useState("");
  const [partnershipDeedType, setPartnershipDeedType] = useState("");
  const [partnershipDeedError, setPartnershipDeedError] = useState(false);
  const [partnershipDeedErrorMsg, setPartnershipDeedErrorMsg] = useState(false);

  const handleUploadDocOpen = () => {
    setShowUploadDoc(true);
  };

  const handleUploadDocButtonClose = () => {
    setShowUploadDoc(false);
    setPanCardError(false);
    setPanCardErrorMsg(false);
    setBusinessTypeDocError(false);
    setBusinessTypeErrorMsg(false);
    setBankStatementError(false);
    setBankStatementErrorMsg(false);
    setFormSixteenError(false);
    setFormSixteenErrorMsg(false);
    setDirectorKYCError(false);
    setDirectorKYCErrorMsg(false);
    setPartnershipDeedError(false);
    setPartnershipDeedErrorMsg(false);
    setPanFile([]);
    setPanCardFileName("");
    setBusinessDoc([]);
    setBusinessDocName("");
    setFormSixteen([]);
    setFormSixteenName("");
    setDirectorKYC("");
    setDirectorKYCName("");
    setPartnershipDeed([]);
    setPartnershipDeedName("");
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

  const handleBusinessProofDoc = (e) => {
    const selectedFile = e.target.files;
    setBusinessTypeDocError(false);
    setBusinessTypeErrorMsg("");
    setBusinessDoc(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setBusinessDocName(file_name);
    if (file_type === "application/pdf") {
      setBusinessFileType("pdf");
    } else {
      setBusinessFileType("");
    }
    if (
      selectedFile.length &&
      !allowedPdfTypes.includes(selectedFile[0]?.type)
    ) {
      setBusinessTypeError(true);
      setBusinessTypeErrorMsg("Only PDF are allowed.");
    }
    if (
      selectedFile.length &&
      selectedFile[0].size / 1024 > MAX_FILE_SIZE_PDF
    ) {
      setBusinessTypeErrorMsg("File size is greater than 2 MB");
      setBusinessTypeError(true);
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

  const handleDirectorKYC = (e) => {
    const selectedFile = e.target.files;
    setDirectorKYCError(false);
    setDirectorKYCErrorMsg("");
    setDirectorKYC(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setDirectorKYCName(file_name);
    if (file_type === "application/pdf") {
      setDirectorKYCType("pdf");
    } else {
      setDirectorKYCType("");
    }
    if (
      selectedFile.length &&
      !allowedPdfTypes.includes(selectedFile[0]?.type)
    ) {
      setDirectorKYCError(true);
      setDirectorKYCErrorMsg("Only PDF are allowed.");
    }
    if (
      selectedFile.length &&
      selectedFile[0].size / 1024 > MAX_FILE_SIZE_PDF
    ) {
      setDirectorKYCErrorMsg("File size is greater than 2 MB");
      setDirectorKYCError(true);
    }
  };

  const handlePartnershipDeed = (e) => {
    const selectedFile = e.target.files;
    setPartnershipDeedError(false);
    setPartnershipDeedErrorMsg("");
    setPartnershipDeed(selectedFile);
    let file_name = selectedFile[0]?.name;
    let file_type = selectedFile[0]?.type;
    setPartnershipDeedName(file_name);
    if (file_type === "application/pdf") {
      setPartnershipDeedType("pdf");
    } else {
      setPartnershipDeedType("");
    }
    for (var i = 0; i < selectedFile.length; i++) {
      if (
        selectedFile.length &&
        !allowedPdfTypes.includes(selectedFile[i]?.type)
      ) {
        setPartnershipDeedError(true);
        setPartnershipDeedErrorMsg("Only PDF are allowed.");
      }
      if (
        selectedFile.length &&
        selectedFile[i].size / 1024 > MAX_FILE_SIZE_PDF
      ) {
        setPartnershipDeedErrorMsg("File size is greater than 5 MB");
        setPartnershipDeedError(true);
      }
    }
  };

  const handleDocumentsValidation = () => {
    let isFormValid = true;
    if (panCardErrorMsg) {
      isFormValid = false;
      setPanCardError(true);
    }
    if (businessTypeErrorMsg) {
      isFormValid = false;
      setBusinessTypeDocError(true);
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

    if (directorKYCErrorMsg) {
      isFormValid = false;
      setDirectorKYCError(true);
    }

    if (partnershipDeedErrorMsg) {
      isFormValid = false;
      setPartnershipDeedError(true);
    }
    if (
      panFile.length ||
      bussnessDoc.length ||
      bankStatement.length ||
      formSixteen.length ||
      formSixteenP.length ||
      directorKYC.length ||
      partnershipDeed.length
    ) {
      isFormValid = true;
    } else {
      isFormValid = false;
    }

    return isFormValid;
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

  const handleUploadDocument = async () => {
    if (handleDocumentsValidation()) {
      let formData = new FormData();
      formData.append("case_id", caseID);

      if (panFile.length) {
        formData.append("pan_card", panFile[0]);
      }
      if (bussnessDoc.length) {
        formData.append("business_registration", bussnessDoc[0]);
      }
      if (directorKYC.length) {
        formData.append("director_kyc", directorKYC[0]);
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
      if (partnershipDeed.length) {
        formData.append("partnership_deed", partnershipDeed[0]);
      }
      if (bankStatement.length) {
        formData.append("bank_statement", bankStatement[0]);
      }
      formData.append("admin", "admin");
      //console.log("foem", formData);
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

  const checkGrossAnnualProfit = (e) => {
    //console.log(anualTurnOver,anualProfit)
    if (anualTurnOver < anualProfit) {
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

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="layout-wrapper">
        <div className="layout-container">
          <AdminNavBar menuAccess={menuAccess} />
          <div className="adminMain-wrapper">
            <AdminHeader />
            {loader ? (
              <Loader display={"flex"} />
            ) : (
              <div className="mainContent">
                <div className="main-body">
                  <div className="col-md-12 moveRight">
                    <button
                      className="btn-danger"
                      style={{ height: "2rem" }}
                      onClick={handleBackButton}
                    >
                      <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>
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
                        {/* <span> <button className="btn btn-primary" onClick={handleShow}>Add Offer</button></span> */}
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
                                    {v?.source}
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
                                    {v.agent_name}
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
                                    {v.phoneNumber ? (
                                      <CurrencyFormat
                                        value={v.phoneNumber}
                                        displayType={"text"}
                                        format="### ### ####"
                                      />
                                    ) : (
                                      ""
                                    )}
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
                          <h5 className="case-heading">Business details</h5>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="row ">
                                  <div className="col-sm-6">
                                    <h6>Type of business:</h6>
                                  </div>
                                  <div className="col-sm-5 text-secondary">
                                    {v.businessType ? v.businessType : ""}
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
                                {(v.businessType === "Professional" ||
                                  v.businessType === "Other") && (
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <h6>Profession:</h6>
                                    </div>
                                    <div className="col-sm-5 text-secondary">
                                      {v.businessType === "Professional"
                                        ? v?.subBusinessName
                                        : v?.othersBusinessName}
                                    </div>
                                  </div>
                                )}

                                <div className="row">
                                  <div className="col-sm-6">
                                    <h6>Name (Company):</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
                                    {v.name ? v.name : ""}
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-sm-6">
                                    <h6>Pan Number:</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
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
                                  <div className="col-sm-6">
                                    <h6>Date of birth:</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
                                    {v.dateOfBirth
                                      ? moment(
                                          v.dateOfBirth,
                                          "YYYY-MM-DD hh:mm:ss"
                                        ).format("DD/MM/YYYY")
                                      : ""}
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-sm-6">
                                    <h6>Date of incorporation:</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
                                    {v.dateOfIncorporation
                                      ? moment(
                                          v.dateOfIncorporation,
                                          "YYYY-MM-DD hh:mm:ss"
                                        ).format("DD/MM/YYYY")
                                      : ""}
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-sm-6">
                                    <h6>Address:</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
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
                                  <div className="col-sm-6">
                                    <h6> Past loan, Credit card :</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
                                    {v.pastLoan != "undefined"
                                      ? v?.pastLoan
                                      : ""}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <h6>EMI you are paying currently :</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
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
                                    <h6>I File:</h6>
                                  </div>
                                  <div className="col-sm-6 text-secondary">
                                    {v.i_file ? v.i_file.toUpperCase() : "-"}
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
                                <span
                                  style={{
                                    display: v.i_file == "none" ? "none" : "",
                                  }}
                                >
                                  <div
                                    className="row"
                                    style={{
                                      display:
                                        v.i_file == "both" ||
                                        v.i_file == "gstin"
                                          ? ""
                                          : "none",
                                    }}
                                  >
                                    <div className="col-sm-5">
                                      <h6>GSTIN number:</h6>
                                    </div>
                                    <div className="col-sm-6 text-secondary">
                                      {v.gstinNumber} &nbsp;
                                      {v.is_gstin_verified ? (
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

                                  <div
                                    className="row"
                                    style={{
                                      display:
                                        v.i_file == "both" || v.i_file == "itr"
                                          ? ""
                                          : "none",
                                    }}
                                  >
                                    <div className="col-sm-5">
                                      <h6>Itr availability:</h6>
                                    </div>
                                    <div className="col-sm-7 text-secondary">
                                      {v.itrAvailability}
                                    </div>
                                  </div>
                                </span>
                                <div className="row">
                                  <div className="col-sm-5">
                                    <h6>Business vintage:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.businessVintageId == "1"
                                      ? "> 2 Yr"
                                      : v.businessVintageId == "2"
                                      ? "2-3 Yr"
                                      : v.businessVintageId == "3"
                                      ? "3+ Yrs."
                                      : ""}
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-sm-5">
                                    <h6>Turnover Yearly:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.turnoverYearly ? (
                                      <CurrencyFormat
                                        value={v.turnoverYearly}
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
                                    <h6>Gross annual profit:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.grossProfit ? (
                                      <CurrencyFormat
                                        value={v.grossProfit}
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
                                    <h6>Industry:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.industryName
                                      ? v.industryName
                                      : v.industry}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-5">
                                    <h6>Sub Industry:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                    {v.subIndustryName
                                      ? v.industry == 15
                                        ? v.subIndustry
                                        : v.subIndustryName
                                      : v.subIndustry}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="card mb-3">
                          <h5 className="case-heading">Director details</h5>
                          <div className="card-body">
                            <div className="custom-cardHead">
                              <button
                                className="btn btn-primary"
                                onClick={handleAddDirector}
                              >
                                Add Director
                                <i
                                  class="fa fa-plus-circle"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>

                            <table
                              style={{ width: "100%" }}
                              className="table table-stripped"
                            >
                              <thead>
                                <tr>
                                  <th className="table-head">Director Name</th>
                                  <th className="table-head">Pan No.</th>
                                  <th className="table-head">Aadhar No.</th>
                                  <th className="table-head">Pan Doc.</th>
                                  <th className="table-head">
                                    Aadhar Front Doc.
                                  </th>
                                  <th className="table-head">
                                    Aadhar Back Doc.
                                  </th>

                                  <th className="table-head">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {v.directorData?.length
                                  ? v.directorData.map((row, index) => (
                                      <tr
                                        key={index}
                                        style={{
                                          borderBottom: "1px solid #ddd",
                                        }}
                                      >
                                        <td className="table-body">
                                          {row.name}
                                        </td>
                                        <td className="table-body">
                                          {row.pan_card}
                                        </td>
                                        <td className="table-body">
                                          {row.aadhar_card ? (
                                            <CurrencyFormat
                                              value={row.aadhar_card}
                                              displayType={"text"}
                                              format="#### #### ####"
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        <td className="table-body">
                                          {" "}
                                          <Link
                                            to={API_URL + row.pan_doc_path}
                                            target="_blank"
                                            download="#"
                                          >
                                            Download
                                          </Link>{" "}
                                        </td>
                                        <td className="table-body">
                                          {" "}
                                          <Link
                                            to={
                                              API_URL +
                                              row.aadhar_front_doc_path
                                            }
                                            target="_blank"
                                            download="#"
                                          >
                                            Download
                                          </Link>{" "}
                                        </td>
                                        <td className="table-body">
                                          {" "}
                                          <Link
                                            to={
                                              API_URL + row.aadhar_back_doc_path
                                            }
                                            target="_blank"
                                            download="#"
                                          >
                                            Download
                                          </Link>{" "}
                                        </td>

                                        <td className="table-body">
                                          <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                              editDirectorDetails(row)
                                            }
                                            disabled={isDisableAll}
                                          >
                                            Edit
                                          </button>
                                        </td>
                                      </tr>
                                    ))
                                  : ""}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="card mb-3">
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
                                              Edit
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
                        <div className="col-md-12">
                          <div className="card mb-3">
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

                                    <th className="table-head">Action</th>
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
                                          <td className="table-body">
                                            <button
                                              className="btn btn-primary"
                                              onClick={() =>
                                                EditBankDetails(
                                                  row,
                                                  row.account_number
                                                )
                                              }
                                              disabled={isDisableAll}
                                            >
                                              Edit
                                            </button>
                                          </td>
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
                      <div className="card mb-3">
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
              </div>
            )}
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
                      className={"salary-input"}
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
                      className={"salary-input"}
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
          <Modal.Title>Employment details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 col-lg-12">
            <>
              <div className="inner-employement">
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>I File</label>
                    <div className="loan-in">
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="i_file"
                          value="both"
                          onClick={handleIfile}
                          checked={iFile == "both" ? true : false}
                        />{" "}
                        BOTH
                      </label>{" "}
                      &nbsp; &nbsp;
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="i_file"
                          value="gstin"
                          onClick={handleIfile}
                          checked={iFile == "gstin" ? true : false}
                        />{" "}
                        GSTIN
                      </label>{" "}
                      &nbsp; &nbsp;
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="i_file"
                          value="itr"
                          onClick={handleIfile}
                          checked={iFile == "itr" ? true : false}
                        />{" "}
                        ITR
                      </label>{" "}
                      &nbsp; &nbsp;
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="i_file"
                          value="none"
                          onClick={handleIfile}
                          checked={iFile == "none" ? true : false}
                        />{" "}
                        NONE
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className="form-group loan-in row"
                  style={{ display: iFile == "none" ? "none" : "" }}
                >
                  <div
                    className="col-md-6 spacing"
                    style={{
                      display:
                        iFile == "gstin" || iFile == "both" ? "" : "none",
                    }}
                  >
                    <label>GSTIN Number</label>
                    <div className="loan-in">
                      <InputMask
                        mask="99aaaaa9999a9a*"
                        maskChar=""
                        className={
                          gstinError ? "salary-input error" : "salary-input"
                        }
                        placeholder="22AAAAA0000A1Z5"
                        value={gstin}
                        onChange={handleGstin}
                      />
                      {gstinVerified ? (
                        <i
                          className="fa fa-check"
                          style={{ position: "absolute", color: "green" }}
                        ></i>
                      ) : (
                        ""
                      )}
                      <span>
                        {gstinCheckError ? (
                          <small className="alertMode">
                            This GSTIN is not match with PAN!
                          </small>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </div>
                  <div
                    className="col-md-6 spacing"
                    style={{
                      display: iFile == "itr" || iFile == "both" ? "" : "none",
                    }}
                  >
                    <label>Itr Availability</label>
                    <select
                      value={itrAvailable}
                      className={
                        itrAvailableError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      onChange={handleItrAvailable}
                    >
                      <option value="">Select ITR availability</option>
                      <option value="1">Last 3 Yr+</option>
                      <option value="2">Last 2 Yr</option>
                      <option value="3">Last 1 Yr</option>
                    </select>
                  </div>
                </div>
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Business vintage</label>
                    <select
                      value={businessVintage}
                      className={
                        businessVintageError
                          ? "salary-input error"
                          : "salary-input"
                      }
                      onChange={handleBusinessVintage}
                    >
                      <option value="">Select business vintage</option>
                      <option value="1">{"> 2 Yr"}</option>
                      <option value="2">2-3 Yr</option>
                      <option value="3">3+ Yrs.</option>
                    </select>
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Turnover Yearly</label>
                    <div className="loan-in">
                      <CurrencyInput
                        type="tel"
                        className={
                          anualTurnOverError
                            ? "salary-input error"
                            : "salary-input"
                        }
                        value={anualTurnOver}
                        placeholder="Enter turnover yearly (annual sales)"
                        defaultValue={""}
                        decimalsLimit={0}
                        intlConfig={{ locale: "en-IN", currency: "INR" }}
                        prefix="₹"
                        onValueChange={handleAnualTurnOver}
                      />
                      <span className="textSize">
                        {" "}
                        {anualTurnOver
                          ? numberToText.convertToText(anualTurnOver, {
                              language: "en-in",
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Gross annual profit</label>
                    <div className="loan-in">
                      <CurrencyInput
                        type="tel"
                        className={
                          anualProfitError
                            ? "salary-input error"
                            : "salary-input"
                        }
                        value={anualProfit}
                        placeholder="Enter gross annual profit"
                        defaultValue={""}
                        decimalsLimit={0}
                        intlConfig={{ locale: "en-IN", currency: "INR" }}
                        prefix="₹"
                        onValueChange={handleAnualProfit}
                        onBlur={checkGrossAnnualProfit}
                      />
                      <span className="textSize">
                        {" "}
                        {anualProfit
                          ? numberToText.convertToText(anualProfit, {
                              language: "en-in",
                            })
                          : ""}
                      </span>
                    </div>
                    <div className="alertbox">
                      {anualProfitCompError
                        ? anualProfitCompError
                        : anualProfitError && <small>Please fill here</small>}
                    </div>
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Industry</label>
                    <select
                      value={industry}
                      className={
                        industryError ? "salary-input error" : "salary-input"
                      }
                      onChange={(e) => {
                        handleIndustry(e);
                      }}
                    >
                      <option value="">Select Industry</option>
                      {industryData
                        ? industryData.map((xx) => {
                            return <option value={xx?.id}>{xx?.name}</option>;
                          })
                        : ""}
                    </select>
                  </div>
                </div>

                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Sub Industry</label>
                    {industry ? (
                      industry != 15 ? (
                        <select
                          value={subIndustry}
                          className={
                            subIndustryError
                              ? "salary-input error"
                              : "salary-input"
                          }
                          onChange={(e) => {
                            handleSubIndustry(e);
                          }}
                        >
                          <option value="">Select Sub Industry</option>
                          {subIndustryData
                            ? subIndustryData.map((xx) => {
                                return (
                                  <option value={xx?.id}>{xx?.name}</option>
                                );
                              })
                            : ""}
                        </select>
                      ) : (
                        <input
                          type="text"
                          className={
                            subIndustryError
                              ? "salary-input error"
                              : "salary-input"
                          }
                          placeholder="Enter Sub-Industry"
                          value={subIndustry}
                          onChange={handleSubIndustry}
                        />
                      )
                    ) : (
                      <select
                        value={subIndustry}
                        className={
                          subIndustryError
                            ? "salary-input error"
                            : "salary-input"
                        }
                        onChange={(e) => {
                          handleSubIndustry(e);
                        }}
                      >
                        <option value="">Select Sub Industry</option>
                        {subIndustryData
                          ? subIndustryData.map((xx) => {
                              return <option value={xx?.id}>{xx?.name}</option>;
                            })
                          : ""}
                      </select>
                    )}
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
                    <label>Type of business</label>
                    <div className="loan-in">
                      <select
                        className={
                          businessTypeError
                            ? "salary-input error"
                            : "salary-input"
                        }
                        value={businessType}
                        onChange={handleBusinessType}
                      >
                        <option value="">Select type of business</option>
                        {businessTypeData.map((v, i) => {
                          return <option value={v?.id}>{v?.name}</option>;
                        })}
                      </select>
                    </div>
                  </div>

                  {(businessType == 5 || businessType == 6) && (
                    <div className="col-md-6 spacing">
                      <label>Profession</label>
                      <div className="loan-in">
                        {businessType == 5 ? (
                          <select
                            className={
                              professionError
                                ? "salary-input error"
                                : "salary-input"
                            }
                            value={profession}
                            onChange={handleProfession}
                          >
                            <option value="">Select Profession</option>
                            {ProfessionDataDropDown.filter((v) => {
                              return v.parent_id == 5;
                            }).map((v, i) => (
                              <option key={i} value={v?.id}>
                                {v?.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className={
                              othersBusinessNameError
                                ? "salary-input error"
                                : "salary-input"
                            }
                            onChange={handleOthersBusinessName}
                            value={othersBusinessName}
                          />
                        )}
                      </div>
                    </div>
                  )}
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
                      onKeyUp={validatePanNumber}
                      value={panNumber}
                    />
                  </div>

                  <div className="col-md-6 spacing">
                    <label>Name (Comapany)</label>
                    <input
                      type="text"
                      className={
                        nameError ? "salary-input error" : "salary-input"
                      }
                      onChange={handleName}
                      value={name}
                    />
                  </div>
                  {dobHide ? (
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
                          maxDate={calculateMaxDate()}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Date of incorporation</label>
                    <div className="loan-in">
                      <DatePicker
                        className={
                          doiError ? "salary-input error" : "salary-input"
                        }
                        onChange={handleDateOfInc}
                        selected={doi}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Date Of Incorporation"
                        dropdownMode="select"
                        showMonthDropdown
                        showYearDropdown
                        adjustDateOnChange
                        maxDate={new Date()}
                      />
                    </div>
                  </div>
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
                </div>

                <div className="form-group loan-in row">
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
                </div>
                <div className="form-group loan-in row">
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
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>City, District</label>
                    <input
                      type="text"
                      className={
                        cityCurrentError ? "salary-input error" : "salary-input"
                      }
                      placeholder="Enter city"
                      value={cityCurrent}
                      onChange={handleCityCurrent}
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
        show={directorShow}
        onHide={handleCloseDirectorDetails}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Director details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 col-lg-12">
            <>
              <div className="inner-employement">
                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Pan Number</label>
                    <InputMask
                      mask="aaaaa9999a"
                      maskChar=""
                      className={
                        dirPanNoError ? "salary-input error" : "salary-input"
                      }
                      placeholder="AZSPT5997H"
                      onChange={handleDirPanNumber}
                      onKeyUp={validateDirPanNumber}
                      value={dirPanNo}
                    />
                  </div>
                  <div className="col-md-6 spacing">
                    <label>Director Name</label>
                    <input
                      type="text"
                      className={
                        dirNameError ? "salary-input error" : "salary-input"
                      }
                      onChange={handleDirName}
                      value={dirName}
                    />
                  </div>
                </div>

                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Aadhar Number</label>
                    <InputMask
                      mask="9999 9999 9999"
                      maskChar=""
                      type="tel"
                      className={
                        aadhaarError ? "salary-input error" : "salary-input"
                      }
                      placeholder="9999 9999 9999"
                      value={aadhaar}
                      onKeyUp={verifyAadharNo}
                      onChange={handleAadhaar}
                    />
                  </div>

                  <div className="col-md-6 spacing">
                    <label>Upload Pan Card</label>
                    <input
                      type="file"
                      id="upload_pan_cards"
                      accept="image/png, image/jpeg, image/gif"
                      placeholder="Upload Pan Card"
                      onChange={handleDirectorPanCard}
                      className={
                        directorPanCardError
                          ? "form-control errorlogin"
                          : "form-control"
                      }
                    />
                    {directorPanCardErrorMsg ? (
                      <span className="vrtext message">
                        {directorPanCardErrorMsg}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="form-group loan-in row">
                  <div className="col-md-6 spacing">
                    <label>Aadhar Front Doc.</label>
                    <input
                      type="file"
                      id="upload_addhar_front"
                      accept="image/png, image/jpeg, image/gif"
                      placeholder="Upload Aadhar Card Front"
                      onChange={handleDirectorAadharFront}
                      className={
                        directorAadharFrontError
                          ? "form-control errorlogin"
                          : "form-control"
                      }
                    />
                    {directorAadharFrontErrorMsg ? (
                      <span className="vrtext message">
                        {directorAadharFrontErrorMsg}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="col-md-6 spacing">
                    <label>Aadhar Back Doc.</label>
                    <input
                      type="file"
                      id="upload_aadhar_back"
                      accept="image/png, image/jpeg, image/gif"
                      placeholder="Upload Aadhar Card Back"
                      onChange={handleDirectorAadharBack}
                      className={
                        directorAadharBackError
                          ? "form-control errorlogin"
                          : "form-control"
                      }
                    />
                    {directorAadharBackErrorMsg ? (
                      <span className="vrtext message">
                        {directorAadharBackErrorMsg}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDirectorDetails}>
            Close
          </Button>
          <Button variant="primary" onClick={UpdateDirectorInfoData}>
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
                        id="upload_cheque"
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
                      <h6>Upload Business Registration Proof:</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        id="upload_cheque"
                        accept="application/pdf"
                        //placeholder="Upload welcome note"
                        onChange={handleBusinessProofDoc}
                        className={
                          bisinessTypeDocError
                            ? "form-control errorlogin"
                            : "form-control"
                        }
                        ref={businessRef}
                      />
                      {bussnessDoc.length ? (
                        <i
                          className="fa fa-times fa-times-red"
                          onClick={(e) => removeFile(e, "businessDoc")}
                        ></i>
                      ) : (
                        ""
                      )}
                      {businessTypeErrorMsg ? (
                        <span className="vrtext message">
                          {businessTypeErrorMsg}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="row multiuploads">
                    <div className="col-sm-5">
                      <h6>Upload 12 Months Bank Statement:</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        id="upload_cheque"
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
                        id="upload_cheque"
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
                        id="upload_cheque"
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
                  <div className="row multiuploads">
                    <div className="col-sm-5">
                      <h6>Upload MOA/AOA :</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        id="upload_cheque"
                        accept="application/pdf"
                        // placeholder="Upload welcome note"
                        className={
                          directorKYCError
                            ? "form-control errorlogin"
                            : "form-control"
                        }
                        onChange={handleDirectorKYC}
                        ref={dirRef}
                      />
                      {directorKYC.length ? (
                        <i
                          className="fa fa-times fa-times-red"
                          onClick={(e) => removeFile(e, "directorKYC")}
                        ></i>
                      ) : (
                        ""
                      )}
                      {directorKYCErrorMsg ? (
                        <span className="vrtext message">
                          {directorKYCErrorMsg}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="row multiuploads">
                    <div className="col-sm-5">
                      <h6>Upload Partnership Deed:</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                      <input
                        type="file"
                        id="upload_cheque"
                        accept="application/pdf"
                        placeholder="Upload welcome note"
                        onChange={handlePartnershipDeed}
                        className={
                          partnershipDeedError
                            ? "form-control errorlogin"
                            : "form-control"
                        }
                        ref={deedRef}
                      />
                      {partnershipDeed.length ? (
                        <i
                          className="fa fa-times fa-times-red"
                          onClick={(e) => removeFile(e, "partnershipDeed")}
                        ></i>
                      ) : (
                        ""
                      )}
                      {partnershipDeedErrorMsg ? (
                        <span className="vrtext message">
                          {partnershipDeedErrorMsg}
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
