import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { API_URL } from "../../../config/constant";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import generateApplication from './generateApplication';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import InputMask from 'react-input-mask';
import Form from 'react-bootstrap/Form';

const CaseNumberInLead = () => {

    let { Id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [showPersonalDetails, setPersonalDetails] = useState(false);
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(false)
    const [panNumber, setPanNumber] = useState("")
    const [panNumberError, setPanNumberError] = useState(false)
    const [addOneCurrent, setAddOneCurrent] = useState("")
    const [addOneError, setAddOneError] = useState(false)
    const [streetCurrent, setStreetCurrent] = useState("")
    const [streetCurrentError, setStreetCurrentError] = useState(false);
    const [pinCodeCurrent, setPinCodeCurrent] = useState("")
    const [pinCodeCurrentError, setPinCodeCurrentError] = useState(false);
    const [cityCurrent, setCityCurrent] = useState("")
    const [cityCurrentError, setCityCurrentError] = useState(false);
    const [stateCurrent, setStateCurrent] = useState("")
    const [stateCurrentError, setStateCurrentError] = useState(false);

    const [bankDetailsShow, setBankDetailsShow] = useState(false);

    const [accountNumber, setAccountNumber] = useState("")
    const [accountNumberError, setAccountNumberError] = useState("")
    const [accountHolderName, setAccountHolderName] = useState("")
    const [accountHolderNameError, setAccountHolderNameError] = useState("")
    const [ifscCode, setIfscCode] = useState("")
    const [ifscCodeError, setIfscCodeError] = useState("")
    const [bankName, setBankName] = useState("")
    const [branchAddress, setBranchAddress] = useState("")
    const [preAccountNo, setPreAccountNo] = useState("")

    const [showEmployementDetails, setShowEmployementDetails] = useState(false);
    const [gstin, setGstin] = useState("")
    const [gstinError, setGstinError] = useState(false)
    const [businessVintage, setBusinessVintage] = useState("")
    const [businessVintageError, setBusinessVintageError] = useState(false)
    const [companyRegister, setCompanyRegister] = useState("");
    const [companyRegisterError, setCompanyRegisterError] = useState(false);
    const [officeSetup, setOfficeSetup] = useState("");
    const [officeSetupError, setOfficeSetupError] = useState(false)
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [employeeNumberError, setEmployeeNumberError] = useState(false);




    useEffect(() => {
        getUserData();

    }, [1]);


    const [ph, setPh] = useState("000000000");

    const getUserData = () => {

        let formData = {
            id: Id
        }
        axios.post(API_URL + "admin/get-partner-data ", formData).then((res) => {
            let response = res.data;

            if (response?.status === 200) {
                // console.log(response)
                let resp = response?.data?.appliedOfferData?.[0];
                setPh(resp?.pan_card ? resp?.pan_card : "0000000000")
                setData([{
                    name: resp?.name ? resp?.name : "",
                    emailId: resp?.email_id ? resp?.email_id : "",
                    phoneNumber: resp?.mobile_number ? resp?.mobile_number : "",
                    appliedDate: resp?.created_at ? resp?.created_at : "",
                    panNumber: resp?.pan_card ? resp?.pan_card : "",
                    dateOfBirth: resp?.personal_detail?.dob_doi ? resp?.personal_detail?.dob_doi : "",
                    dateOfIncorporation: resp?.personal_detail?.doi ? resp?.personal_detail?.doi : "",
                    isCompnayRegistered: resp?.is_company_registered ? resp?.is_company_registered : "",
                    officeSetup: resp?.office_setup ? resp?.office_setup : "",
                    noOfEmployees: resp?.no_of_employees ? resp?.no_of_employees : "",
                    companyAddress: {

                        landmark: resp?.landmark ? resp?.landmark : "",
                        pincode: resp?.pincode ? resp?.pincode : "",
                        state: resp?.state ? resp?.state : "",
                        city: resp?.city ? resp?.city : "",
                        street: resp?.street ? resp?.street : ""
                    },
                    gstinNumber: resp?.gst ? resp?.gst : "",
                    businessVintage: resp?.business_vintage ? resp?.business_vintage: "",
                    uploadBusinessRegistration: resp?.registration_proof_doc_path ? resp?.registration_proof_doc_path : "",
                    uploadBankStatement: resp?.cancelled_check_doc_path ? resp?.cancelled_check_doc_path : "",
                    kycDoc: resp?.kyc_doc_path ? resp?.kyc_doc_path : "",
                    gstDoc: resp?.gst_doc_path ? resp?.gst_doc_path : "",

                    bankDetails: [{
                        bankAccont: resp?.account_no ? resp?.account_no : "",
                        accountHolderName: resp?.bank_name ? resp?.bank_name : "",
                        ifsc: resp?.ifsc ? resp?.ifsc : "",
                        branchAddress: resp?.branch ? resp?.branch : "",
                        cancelledChequeDoc: resp?.cancelled_check_doc_path ? resp?.cancelled_check_doc_path : "",
                        id: resp?.id ? resp?.id : "",
                    }],
                    id: resp?.id ? resp?.id : "",
                }]);



            }

        }).catch((e) => {
            console.log(e)
        })
    }

    const downloadData = () => {
        let v = data[0];
        const dataUrlList = [];

        let a = v.gstDoc ? dataUrlList.push(API_URL + v.gstDoc) : "";


        a = v.kycDoc ? dataUrlList.push(API_URL + v.kycDoc) : ""

        a = v.uploadBankStatement ? dataUrlList.push(API_URL + v.uploadBankStatement) : "";


        a = v.uploadBusinessRegistration ? dataUrlList.push(API_URL + v.uploadBusinessRegistration) : "";



        // console.log(dataUrlList);
        convertIntoZip(dataUrlList);
        // dataUrlList?.map((x) => {
        //   window.open(x);
        // });

    }


    const convertIntoZip = async (urls) => {
        var zip = new JSZip();

        for (let i = 0; i < urls.length; i++) {
            const response = await fetch(urls[i]);
            const blob = await response.blob();
            zip.file(urls[i].split("/").pop(), blob);
        }


        const zipData = await zip.generateAsync({
            type: "blob",
            streamFiles: true,
        });


        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(zipData);
        link.download = ph + ".zip";
        link.click();


    }

    const editPersonalDetails = (data) => {
        setPersonalDetails(true);
        setName(data?.name);
        setPanNumber(data?.panNumber)
        setAddOneCurrent(data?.companyAddress?.street);
        setStreetCurrent(data?.companyAddress?.landmark)
        setPinCodeCurrent(data?.companyAddress?.pincode)
        setCityCurrent(data?.companyAddress?.city)
        setStateCurrent(data?.companyAddress?.state)
    }

    const handleClosePesonalDetails = () => {
        setPersonalDetails(false)
        setName("");
        setPanNumber("")
        setAddOneCurrent("");
        setStreetCurrent("")
        setPinCodeCurrent("")
        setCityCurrent("")
        setStateCurrent("")
        setNameError(false);
        setPanNumberError(false);
        setAddOneError(false);
        setStreetCurrentError(false);
        setPinCodeCurrentError(false);
        setCityCurrentError(false);
        setStateCurrentError(false);
    };

    const getAddressByPin = (e, type) => {
        if ((e.target.value).length === 6) {
            axios.get("https://api.postalpincode.in/pincode/" + e.target.value).then((res) => {
                if (res?.data.length) {
                    if (res?.data[0]?.PostOffice && res?.data[0]?.PostOffice.length) {
                        let data = res?.data[0]?.PostOffice[0]
                        setPinCodeCurrentError(false);
                        setStateCurrentError(false);
                        setStateCurrent(data?.State)

                        setCityCurrent(data?.District)


                    }
                }
            }).catch((e) => {
                console.log(e)
            })
        }

    }

    const handleName = (e) => {
        setNameError(false);
        setName(e.target.value)
    }
    const handlePanNumber = (e) => {
        setPanNumberError(false);
        setPanNumber((e.target.value).toUpperCase())
    }

    const handleAddOneCurrent = (e) => {
        setAddOneError(false);
        setAddOneCurrent(e.target.value)
    }

    const handleStreetCurrent = (e) => {
        setStreetCurrentError(false)
        setStreetCurrent(e.target.value)
    }

    const handlePinCodeCurrent = (e) => {
        setPinCodeCurrentError(false);
        setPinCodeCurrent(e.target.value)
    }

    const handleCityCurrent = (e) => {
        setCityCurrentError(false);
        setCityCurrent(e.target.value)
    }

    const handleStateCurrent = (e) => {
        setStateCurrentError(false);
        setStateCurrent(e.target.value)
    }

    const handleValidationPersonalDetails = () => {
        let isFormValid = true;

        if (!panNumber) {
            isFormValid = false;
            setPanNumberError(true)
        }
        if (panNumber.length !== 10) {
            isFormValid = false;
            setPanNumberError(true);
        }

        if (!name) {
            isFormValid = false;
            setNameError(true)
        }


        if (!addOneCurrent) {
            isFormValid = false;
            setAddOneError(true)
        }


        if (!pinCodeCurrent) {
            isFormValid = false;
            setPinCodeCurrentError(true)
        }
        if (pinCodeCurrent.length !== 6) {
            isFormValid = false;
            setPinCodeCurrentError(true)
        }
        if (!cityCurrent) {
            isFormValid = false;
            setCityCurrentError(true)
        }
        if (!stateCurrent) {
            isFormValid = false;
            setStateCurrentError(true)
        }
        if (!streetCurrent) {
            isFormValid = false;
            setStreetCurrentError(true)
        }
        return isFormValid;
    }

    const UpdatePersonalDetailsData = () => {
        if (handleValidationPersonalDetails()) {

            const jsonData = {
                "name": name,
                "pancard": panNumber,
                "street": addOneCurrent,
                "landmark": streetCurrent,
                "city": cityCurrent,
                "state": stateCurrent,
                "pincode": pinCodeCurrent,
                "id": Id

            }

            axios.post(API_URL + "admin/update-partner-personal-data", jsonData).then((res) => {
                let response = res.data;

                if (response?.status === 200) {
                    //console.log(response?.data)  
                    toast.success(response?.message);
                    setPersonalDetails(false);
                    getUserData();

                }
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    const EditBankDetails = (data, accont_number) => {
        setPreAccountNo(accont_number);
        setBankDetailsShow(true);
        setAccountNumber(data?.bankAccont);
        setAccountHolderName(data?.accountHolderName)
        setIfscCode(data?.ifsc)
        handleGetBankInfoUsingIFSC(data?.ifsc);


    }

    const handleCloseBankDetails = () => {
        setBankDetailsShow(false);
        setPreAccountNo("");
        setAccountNumber("");
        setAccountHolderName("");
        setIfscCode("");
        setAccountNumberError("");
        setAccountHolderNameError("");
        setIfscCodeError("");
    };

    const handleAccountNumber = (e) => {
        setAccountNumberError("")
        setAccountNumber(e.target.value)
    }

    const handleAccountHolderName = (e) => {
        setAccountHolderNameError("")
        setAccountHolderName(e.target.value)

    }
    const handleIfscCode = (e) => {
        setIfscCodeError("")
        setIfscCode(e.target.value)
    }
    const handleGetBankInfoUsingIFSC = (data) => {
        axios.get("https://ifsc.razorpay.com/" + data).then((res) => {
            let response = res.data;
            if (Object.keys(response).length) {
                setBankName(response?.BANK)
                setBranchAddress(response?.BRANCH + ", " + response?.CITY)
            } else {
                setIfscCodeError("Invalid IFSC code.")
                setBankName("")
                setBranchAddress("")
            }

        }).catch((e) => {
            setIfscCodeError("Invalid IFSC code.")
            setBankName("")
            setBranchAddress("")
        })
    }




    const handleBankValidation = () => {
        let isFormValid = true;
        if (!accountNumber) {
            setAccountNumberError("Please enter account number.");
            isFormValid = false
        }


        if (!accountHolderName) {
            setAccountHolderNameError("Please enter account holder name.");
            isFormValid = false
        }
        if (!ifscCode) {
            setIfscCodeError("Please enter IFSC code.");
            isFormValid = false
        }
        if (ifscCodeError) {
            isFormValid = false
        }

        return isFormValid;
    }

    const UpdateBankInfoData = () => {
        if (handleBankValidation()) {

            const jsonData = {
                "bankName": accountHolderName,
                "accountNo": accountNumber,
                "ifsc": ifscCode,
                "branch": branchAddress,
                "id": Id

            }

            axios.post(API_URL + "admin/update-partner-bank-data", jsonData).then((res) => {
                let response = res.data;

                if (response?.status === 200) {
                    //console.log(response?.data)  
                    toast.success(response?.message);
                    setBankDetailsShow(false);
                    getUserData();

                }
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    const editEmployementDetails = (data) => {
       setShowEmployementDetails(true)
        setGstin(data?.gstinNumber)
        setBusinessVintage(data?.businessVintage)
        setCompanyRegister(data?.isCompnayRegistered)
        setOfficeSetup(data?.officeSetup)
        setEmployeeNumber(data?.noOfEmployees)
    }

    const handleCloseEmployementDetails = () => {
        setShowEmployementDetails(false)
        setGstin("");
        setBusinessVintage("");
        setCompanyRegister("");
        setOfficeSetup("");
        setEmployeeNumber("");
        setGstinError(false);
        setBusinessVintageError(false);
        setCompanyRegisterError(false);
        setOfficeSetupError(false);
        setEmployeeNumberError(false);
    };

    const handleGstin = (e) => {
        setGstinError(false)
        setGstin((e.target.value).toUpperCase())
    }

    const handleBusinessVintage = (e) => {
        setBusinessVintageError(false)
        setBusinessVintage(e.target.value)
    }

    const handleCompanyRegister = (e) => {
        setCompanyRegister(e.target.value);
        setCompanyRegisterError(false)

    }

    const handleOfficeSetup = (e) => {
        setOfficeSetup(e.target.value);
        setOfficeSetupError(false)
    }

    const handleEmployeeNumber = (e) => {
        setEmployeeNumber(e.target.value);
        setEmployeeNumberError(false)
    }

    const handleEmployeeValidation = () => {
        let isFormValid = true;
        if (!gstin) {
            isFormValid = false;
            setGstinError(true);
        }

        if (!businessVintage) {
            isFormValid = false;
            setBusinessVintageError(true)
        }

        if (!companyRegister) {
            isFormValid = false;
            setCompanyRegisterError(true)
        }

        if (!officeSetup) {
            isFormValid = false;
            setOfficeSetupError(true)
        }
        if (!employeeNumber) {
            isFormValid = false;
            setEmployeeNumberError(true)
        }


        return isFormValid;
    }

    const UpdateEmployementDetailsData = () => {
        if (handleEmployeeValidation()) {

            const jsonData = {
                "gst": gstin,
                "isCompanyRegistered": companyRegister,
                "officeSetup": officeSetup,
                "noOfEmployees": employeeNumber,
                "businessVintage": businessVintage,
                "id": Id

            }


            axios.post(API_URL + "admin/update-partner-employment-data", jsonData).then((res) => {
                let response = res.data;

                if (response?.status === 200) {
                    //console.log(response?.data)  
                    toast.success(response?.message);
                    setShowEmployementDetails(false);
                    getUserData();

                }
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    const handleBackButton = () => {
        navigate(-1);
      };

    return (
        <>
            <div className="layout-wrapper">
                <div className="layout-container">
                    <AdminNavBar />
                    <div className="adminMain-wrapper">
                        <AdminHeader />
                        <div className='mainContent'>


                            <div className="main-body">
                                
                                <div className="col-md-12 moveRight" >
                                    <button className='btn-warning' style={{ height: '2rem' }} onClick={handleBackButton}>Back</button>                                 
                                    <span> <button className="btn btn-primary" onClick={(e) => { generateApplication(data) }}><i className="fa fa-download" aria-hidden="true"></i> Application</button></span>
                                    <span> <button className="btn btn-primary" onClick={downloadData} ><i className="fa fa-download" aria-hidden="true"></i> Documents</button> </span>

                                </div>

                                {data.map((v, i) => {

                                    return (
                                        <div className="row gutters-sm">
                                            <div className="col-md-12 mb-3">
                                                <div className="card case-admin">
                                                    <h5 className='case-heading'>Partner Details</h5>
                                                    <div className="card-body">
                                                        
                                                            <div className="row ">
                                                                <div className="col-sm-4" >
                                                                    <h6>Name:</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary"> {v.name}</div>
                                                            </div>
                                                            <div className="row ">
                                                                <div className="col-sm-4" >
                                                                    <h6>Email Id: </h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary"> {v.emailId}</div>
                                                            </div>
                                                            <div className="row ">
                                                                <div className="col-sm-4" >
                                                                    <h6>Phone number: </h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary"> {v.phoneNumber ? <CurrencyFormat value={v.phoneNumber} displayType={'text'} format="### ### ####" /> : ""}</div>
                                                            </div>
                                                            <div className="row ">
                                                                <div className="col-sm-4" >
                                                                    <h6>Applied date:</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">{v.appliedDate ? moment(v.appliedDate, "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY") : ""}</div>
                                                            </div>


                                                        
                                                    </div>
                                                </div>
                                                </div>
                                                <div className='col-md-12 mb-3'>
                                                <div className="card case-admin">
                                                <h5 className='case-heading'>Employment Details</h5>
                                                    <div className="card-body">
                                                            <div className="row" >
                                                                <div className="col-sm-4">
                                                                    <h6>GSTIN number:</h6>
                                                                </div>
                                                                <div className="col-sm-7 text-secondary">{v.gstinNumber}</div>
                                                                
                                                                <button className="btn" style={{padding:'0px'}} onClick={(e) => { editEmployementDetails(v) }}><i className="fa fa-edit" aria-hidden="true"></i></button>
                                                            
                                                            </div>

                                                            <div className="row" >
                                                                <div className="col-sm-4">
                                                                    <h6>Business vintage:</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">{v.businessVintage}</div>
                                                            </div>
                                                            <div className="row" >
                                                                <div className="col-sm-4">
                                                                    <h6>Is Company Registered:</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">{v.isCompnayRegistered}</div>
                                                            </div>

                                                            <div className="row" >
                                                                <div className="col-sm-4">
                                                                    <h6>Office Setup:</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">{v.officeSetup}</div>
                                                            </div>

                                                            <div className="row" >
                                                                <div className="col-sm-4">
                                                                    <h6>No. Of Employees:</h6>
                                                                </div>
                                                                <div className="col-sm-8 text-secondary">{v.noOfEmployees}</div>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-3">
                                                <div className="card case-admin">
                                                <h5 className='case-heading'>Personal details</h5>
                                                    <div className="card-body">
                                                        

                                                        <div className="row" >

                                                            <div className="col-sm-4">
                                                                <h6>Name (Company):</h6>
                                                            </div>
                                                            <div className="col-sm-7 text-secondary">{v.name ? v.name : ""}</div>
                                                            
                                                            <button className="btn" style={{padding:'0px'}} onClick={(e) => { editPersonalDetails(v) }} ><i className="fa fa-edit" aria-hidden="true"></i></button>
                                                        
                                                        </div>

                                                        <div className="row" >
                                                            <div className="col-sm-4">
                                                                <h6>Pan Number:</h6>
                                                            </div>
                                                            <div className="col-sm-8 text-secondary">{v.panNumber ? v.panNumber : ""}</div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-sm-4">
                                                                <h6>Address:</h6>
                                                            </div>
                                                            <div className="col-sm-8 text-secondary">
                                                                {v.companyAddress.street ? v.companyAddress.street + ", " : ""}
                                                                {v.companyAddress.landmark ? v.companyAddress.landmark + ", " : ""}
                                                                {v.companyAddress.city ? v.companyAddress.city + ", " : ""}{v.companyAddress.state ? v.companyAddress.state + ", " : ""}{v.companyAddress.pincode}
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                        <div className="card case-admin">
                                                        <h5 className="case-heading">
                                                                    Upload documents
                                                                </h5>
                                                            <div className="card-body">
                                                                
                                                                {v.uploadBusinessRegistration ?
                                                                    <p>Registration proof <Link to={API_URL + v.uploadBusinessRegistration} download='#' target="_blank">Download</Link></p>
                                                                    : ""}


                                                                <p>Kyc Doc <Link to={API_URL + v.kycDoc} download="#" target="_blank">Download</Link></p>



                                                                {v.gstDoc ?
                                                                    <p>GST Doc <Link to={API_URL + v.gstDoc} download="#" target="_blank">Download</Link></p>
                                                                    : ""
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>

                                            <div className="col-md-12 mb-3">
                                                <div className="card case-admin">
                                                <h5 className='case-heading'> Bank details</h5>
                                                    <div className="card-body">
                                                        
                                                        <table style={{ width: '100%' }} className="table table-stripped">
                                                            <thead>
                                                                <tr>
                                                                    <th className="table-head">Account Number </th>
                                                                    <th className="table-head">Account Holder Name</th>
                                                                    <th className="table-head">IFSC</th>
                                                                    <th className="table-head">Branch Address</th>

                                                                    <th className="table-head">Cancelled Cheque Doc.</th>

                                                                    <th className="table-head">Action</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {v.bankDetails.map(v => (
                                                                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                                                                        <td className="table-body">{v.bankAccont}</td>
                                                                        <td className="table-body">{v.accountHolderName}</td>
                                                                        <td className="table-body">{v.ifsc}</td>
                                                                        <td className="table-body">{v.branchAddress}</td>
                                                                        <td className="table-body"> <Link to={API_URL + v.cancelledChequeDoc} target="_blank" download="#">Download</Link> </td>
                                                                        <td className="table-body">

                                                                            <button className="btn btn-primary" onClick={() => EditBankDetails(v, v.bankAccont)}>Edit</button>


                                                                        </td>
                                                                    </tr>
                                                                ))
                                                                }

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    )

                                })}
                            </div>

                        </div>
                        <AdminFooter />
                    </div>
                </div>
            </div>
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
                                        <label>Name (Comapany)</label>
                                        <input type="text" className={nameError ? "salary-input error" : "salary-input"} onChange={handleName} value={name} />
                                    </div>
                                    <div className="col-md-6 spacing">
                                        <label>Pan Number</label>
                                        <InputMask mask="aaaaa9999a" maskChar="" className={panNumberError ? "salary-input error" : "salary-input"} placeholder="AZSPT5997H" onChange={handlePanNumber} value={panNumber} />
                                    </div>

                                </div>



                                <div className="form-group loan-in row">

                                    <div className="col-md-6 spacing">
                                        <label>Street</label>
                                        <input type="text" className={addOneError ? "salary-input error" : "salary-input"} placeholder="Enter address 1" value={addOneCurrent} onChange={handleAddOneCurrent} />
                                    </div>
                                    <div className="col-md-6 spacing">
                                        <label>Landmark</label>
                                        <input type="text" className={streetCurrentError ? "salary-input error" : "salary-input"} placeholder="Enter landmark" value={streetCurrent} onChange={handleStreetCurrent} />
                                    </div>

                                </div>

                                <div className="form-group loan-in row">

                                    <div className="col-md-6 spacing">
                                        <label>Pin code</label>
                                        <InputMask mask="999999" type="tel" maskChar="" className={pinCodeCurrentError ? "salary-input error" : "salary-input"} placeholder="Enter pin code" value={pinCodeCurrent} onChange={handlePinCodeCurrent} onKeyUp={(e) => getAddressByPin(e, "current")} />
                                    </div>
                                    <div className="col-md-6 spacing">
                                        <label>City</label>
                                        <input type="text" className={cityCurrentError ? "salary-input error" : "salary-input"} placeholder="Enter city" value={cityCurrent} onChange={handleCityCurrent} />
                                    </div>
                                </div>
                                <div className="form-group loan-in row">

                                    <div className="col-md-6 spacing">
                                        <label>State</label>
                                        <input type="text" className={stateCurrentError ? "salary-input error" : "salary-input"} placeholder="Enter state" value={stateCurrent} onChange={handleStateCurrent} />
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
                    <Button variant="primary" onClick={UpdatePersonalDetailsData} >Submit</Button>
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
                    <Modal.Title>Employement details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-md-12 col-lg-12">

                        <>
                            <div className="inner-employement">

                                <div className="form-group loan-in row">
                                    <div className="col-md-6 spacing">
                                        <label>GSTIN Number</label>
                                        <div className="loan-in">
                                            <InputMask mask="99aaaaa9999a9a9" maskChar="" className={gstinError ? "salary-input error" : "salary-input"} placeholder="22AAAAA0000A1Z5" value={gstin} onChange={handleGstin} />

                                        </div>

                                    </div>
                                    <div className="col-md-6 spacing">
                                        <label>Business vintage</label>
                                        <select id="dropdown1" name="role" className={businessVintageError ? "salary-input error" : "salary-input"} onChange={handleBusinessVintage} value={businessVintage} >
                                            <option value="">Select</option>
                                            <option value="Below 1 year">Below 1 year</option>
                                            <option value="1-3yr">1-3yr</option>
                                            <option value="above 3 year">above 3 year</option>
                                        </select>
                                    </div>

                                </div>


                                <div className="form-group loan-in row">

                                    <div className="col-md-6 spacing">
                                        <label>Is company registered</label>
                                        <select id="dropdown3" name="role" className={companyRegisterError ? "salary-input error" : "salary-input"} onChange={handleCompanyRegister} value={companyRegister} >
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 spacing">
                                        <label>Office Setup</label>
                                        <select id="dropdown2" name="role" className={officeSetupError ? "salary-input error" : "salary-input"} onChange={handleOfficeSetup} value={officeSetup} >
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group loan-in row">

                                    <div className="col-md-6 spacing">
                                        <label>No of employees</label>
                                        <select id="dropdowns" name="role" className={employeeNumberError ? "salary-input error" : "salary-input"} onChange={handleEmployeeNumber} value={employeeNumber}>
                                            <option value="">Select</option>
                                            <option value="1-5">1-5</option>
                                            <option value="5-10">5-10</option>
                                            <option value="10+">10+</option>
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
                    <Button variant="primary" onClick={UpdateEmployementDetailsData} >Submit</Button>
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
                            <Form.Label htmlFor="accont_number">Account Number<span className="required">*</span></Form.Label>
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
                            <Form.Label htmlFor="account_holder_name">Account Holder Name<span className="required">*</span></Form.Label>
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
                            <Form.Label htmlFor="ifsc_code">IFSC Code<span className="required">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                id="ifsc_code"
                                aria-describedby="ifscHelpBlock"
                                placeholder="IFSC Code"
                                value={ifscCode}
                                onChange={handleIfscCode}
                                onBlur={(e) => { handleGetBankInfoUsingIFSC(e.target.value) }}
                            // readOnly={editMode ? true : false}
                            />
                            <Form.Text id="ifscHelpBlock" muted>
                                {ifscCodeError}
                            </Form.Text>
                        </div>

                        {
                            (bankName && branchAddress) ? <div className="col-md-12 label-line-height">
                                <div><span className="fw-bold">Bank Name:</span> {bankName}</div>
                                <div><span className="fw-bold">Branch Name:</span> {branchAddress}</div>
                            </div> : ""
                        }

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseBankDetails}>
                        Close
                    </Button>
                    <Button variant="primary" className="submit-btn-modal" onClick={UpdateBankInfoData} >Submit</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </>
    )
}

export default CaseNumberInLead;