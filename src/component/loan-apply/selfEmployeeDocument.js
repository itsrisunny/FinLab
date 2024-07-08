import React, {useEffect, useState, useRef} from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import JpgIcon from "../../assets/images/jpg-image.png" 
import {Link} from "react-router-dom"
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";
import { API_URL } from './../../config/constant';
import Spinner from 'react-bootstrap/Spinner';
export default function SelfEmployeeDocument({activeCard, preFillData ,userType, businessTypeSelect, iFileType, handleCongratulation, caseId,loading}){
	const [panCard, setPanCard] = useState([])
	const [panCardFileName, setPanCardFileName] = useState("")
	const [panCardFileType, setPanCardFileType] = useState("")
	const [panCardError, setPanCardError] = useState(false)
	const [panCardErrorMsg, setPanCardErrorMsg] = useState(false)
	const [businessType, setBusinessType] = useState([])
	const [businessTypeName, setBusinessTypeName] = useState("")
	const [businessFileType, setBusinessFileType] = useState("")
	const [businessTypeError, setBusinessTypeError] = useState(false)
	const [businessTypeErrorMsg, setBusinessTypeErrorMsg] = useState(false)
	const [directorKYC, setDirectorKYC] = useState([])
	const [directorKYCName, setDirectorKYCName] = useState("")
	const [directorKYCType, setDirectorKYCType] = useState("")
	const [directorKYCError, setDirectorKYCError] = useState(false)
	const [directorKYCErrorMsg, setDirectorKYCErrorMsg] = useState(false)
	const [formSixteen, setFormSixteen] = useState([])
	const [formSixteenName, setFormSixteenName] = useState("")
	const [formSixteenType, setFormSixteenType] = useState("")
	const [formSixteenError, setFormSixteenError] = useState(false);
	const [formSixteenErrorMsg, setFormSixteenErrorMsg] = useState(false);

	const [formSixteenP, setFormSixteenP] = useState([])
	const [formSixteenPName, setFormSixteenPName] = useState("")
	const [formSixteenPType, setFormSixteenPType] = useState("")
	const [formSixteenPError, setFormSixteenPError] = useState(false);
	const [formSixteenPErrorMsg, setFormSixteenPErrorMsg] = useState(false);

	const [partnershipDeed, setPartnershipDeed] = useState([])
	const [partnershipDeedName, setPartnershipDeedName] = useState("")
	const [partnershipDeedType, setPartnershipDeedType] = useState("")
	const [partnershipDeedError, setPartnershipDeedError] = useState(false);
	const [partnershipDeedErrorMsg, setPartnershipDeedErrorMsg] = useState(false);
	const [width, setWidth] = useState(window.innerWidth);
	const [isDisableBtn, setIsDisableBtn] = useState(false);
	const [bankStatement, setBankStatement] = useState([])
	const [bankStatementName, setBankStatementName] = useState("")
	const [bankStatementType, setBankStatementType] = useState("")
	const [bankStatementError, setBankStatementError] = useState(false)
	const [bankStatementErrorMsg, setBankStatementErrorMsg] = useState(false)
	const [bankStatementFile,setBankStatementFile] = useState("");
	const [display,setDisplay] = useState("none");
	
	function start_and_end(str) {
  		if (str.length > 35) {
    		return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  		}
  		return str;
	}
	  function handleWindowSizeChange() {
	      setWidth(window.innerWidth);
	  }
	  useEffect(() => {
	    window.addEventListener('resize', handleWindowSizeChange);
	    return () => {
	      window.removeEventListener('resize', handleWindowSizeChange);
	    }
	  }, []);

	  const isMobile = width <= 768;
	const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
	const allowedPdfTypes = ["application/pdf"];
	const MAX_FILE_SIZE_IMAGE = 2050 // 5MB
	const MAX_FILE_SIZE_PDF = 5120 // 5MB
	const handlePanCard = (e) => {
		const selectedFile = e.target.files;
		setPanCardError(false)
		setPanCardErrorMsg("");
		setPanCard(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setPanCardFileName(file_name)
		if(file_type === "image/png"){
			setPanCardFileType("png")
		}else if(file_type === "image/jpg" || file_type === "image/jpeg"){
			setPanCardFileType("jpg")
		}else if(file_type === "image/gif"){
			setPanCardFileType("gif")
		}else{
			setPanCardFileType("")
		}
		if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
		    setPanCardError(true)
		    setPanCardErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
		}
		if(selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_IMAGE){
	      	setPanCardErrorMsg("File size is greater than 2 MB");
	      	setPanCardError(true)
	    }
	}

	

	const handleBusinessType = (e) => {
		const selectedFile = e.target.files;
		setBusinessTypeError(false)
		setBusinessTypeErrorMsg("");
		setBusinessType(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setBusinessTypeName(file_name)
		if(file_type === "application/pdf"){
			setBusinessFileType("pdf")
		}else{
			setBusinessFileType("")
		}
		if (selectedFile.length && !allowedPdfTypes.includes(selectedFile[0]?.type)) {
		    setBusinessTypeError(true)
		    setBusinessTypeErrorMsg("Only PDF are allowed.");
		}
		if(selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_PDF){
	      	setBusinessTypeErrorMsg("File size is greater than 2 MB");
	      	setBusinessTypeError(true)
	    }
	}

	

	const handleDirectorKYC = (e) => {
		const selectedFile = e.target.files;
		setDirectorKYCError(false)
		setDirectorKYCErrorMsg("");
		setDirectorKYC(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setDirectorKYCName(file_name)
		if(file_type === "application/pdf"){
			setDirectorKYCType("pdf")
		}else{
			setDirectorKYCType("")
		}
		if (selectedFile.length && !allowedPdfTypes.includes(selectedFile[0]?.type)) {
		    setDirectorKYCError(true)
		    setDirectorKYCErrorMsg("Only PDF are allowed.");
		}
		if(selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_PDF){
	      	setDirectorKYCErrorMsg("File size is greater than 2 MB");
	      	setDirectorKYCError(true)
	    }
	}

	const handleFormSixteen = (e) => {
		const selectedFile = e.target.files;
		setFormSixteenError(false)
		setFormSixteenErrorMsg("");
		setFormSixteen(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setFormSixteenName(file_name)
		if(file_type === "application/pdf"){
			setFormSixteenType("pdf")
		}else{
			setFormSixteenType("")
		}
		if (selectedFile.length && !allowedPdfTypes.includes(selectedFile[0]?.type)) {
		    setFormSixteenError(true)
		    setFormSixteenErrorMsg("Only PDF are allowed.");
		}
		if(selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_PDF){
	      	setFormSixteenErrorMsg("File size is greater than 2 MB");
	      	setFormSixteenError(true)
	    }
	}
	const handleFormSixteenP = (e) => {
		const selectedFile = e.target.files;
		setFormSixteenPError(false)
		setFormSixteenPErrorMsg("");
		setFormSixteenP(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setFormSixteenPName(file_name)
		if(file_type === "application/pdf"){
			setFormSixteenPType("pdf")
		}else{
			setFormSixteenPType("")
		}
		if (selectedFile.length && !allowedPdfTypes.includes(selectedFile[0]?.type)) {
		    setFormSixteenPError(true)
		    setFormSixteenPErrorMsg("Only PDF are allowed.");
		}
		if(selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_PDF){
	      	setFormSixteenPErrorMsg("File size is greater than 2 MB");
	      	setFormSixteenPError(true)
	    }
	}
	const handleBankStatement = (e) => {
		const selectedFile = e.target.files;
		setBankStatementError(false)
		setBankStatementErrorMsg("");
		setBankStatement(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setBankStatementName(file_name)
		if(file_type === "application/pdf"){
			setBankStatementType("pdf")
		}else{
			setBankStatementType("")
		}
		for (var i = 0; i < selectedFile.length; i++) {
			if (selectedFile.length && !allowedPdfTypes.includes(selectedFile[i]?.type)) {
			    setBankStatementError(true)
			    setBankStatementErrorMsg("Only PDF are allowed.");
			}
			if(selectedFile.length && (selectedFile[i].size / 1024) > MAX_FILE_SIZE_PDF){
		      	setBankStatementErrorMsg("File size is greater than 5 MB");
		      	setBankStatementError(true)
		    }
		}
	}
	const handlePartnershipDeed = (e) => {
		const selectedFile = e.target.files;
		setPartnershipDeedError(false)
		setPartnershipDeedErrorMsg("");
		setPartnershipDeed(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setPartnershipDeedName(file_name)
		if(file_type === "application/pdf"){
			setPartnershipDeedType("pdf")
		}else{
			setPartnershipDeedType("")
		}
		for (var i = 0; i < selectedFile.length; i++) {
			if (selectedFile.length && !allowedPdfTypes.includes(selectedFile[i]?.type)) {
			    setPartnershipDeedError(true)
			    setPartnershipDeedErrorMsg("Only PDF are allowed.");
			}
			if(selectedFile.length && (selectedFile[i].size / 1024) > MAX_FILE_SIZE_PDF){
		      	setPartnershipDeedErrorMsg("File size is greater than 5 MB");
		      	setPartnershipDeedError(true)
		    }
		}
	}
	const handleValidation = () => {
		let isFormValid = true;
		if(!panCard.length || panCardErrorMsg){
			isFormValid = false;
			setPanCardError(true)
		}
		if(!businessType.length || businessTypeErrorMsg){
			isFormValid = false;
			setBusinessTypeError(true)
		}
		if(businessTypeSelect == "2"){
			if(!directorKYC.length || directorKYCErrorMsg){
				isFormValid = false;
				setDirectorKYCError(true)
			}
		}
		if(iFileType !== "none"){
			if(!formSixteen.length || formSixteenErrorMsg){
				isFormValid = false;
				setFormSixteenError(true)
			}
			if(!formSixteenP.length || formSixteenPErrorMsg){
				isFormValid = false;
				setFormSixteenPError(true)
			}
		}
		if(!bankStatement.length || bankStatementErrorMsg){
			isFormValid = false;
			setBankStatementError(true)
		}
		
		if(businessTypeSelect == "3" || businessTypeSelect == "4"){
			if(!partnershipDeed.length || partnershipDeedErrorMsg){
				isFormValid = false;
				setPartnershipDeedError(true)
			}
		}
		return isFormValid;
	}
	const handleUploadDocument = async () => {
		
		
		if(!fileData){
			if(handleValidation()){
				setDisplay("flex");
				setIsDisableBtn(true)
				axios.post(API_URL+"token/generate-token",{user_id: localStorage.getItem("user_id")}).then((res) => {
					let response = res.data;
					if(response?.token){
						let formData = new FormData()
						formData.append('case_id', caseId)
						formData.append('token', response?.token)
						if(panCard.length){
							formData.append('pan_card', panCard[0])
						}
						if(businessType.length){
							formData.append('business_registration', businessType[0])
						}
						if(directorKYC.length){
							formData.append('director_kyc', directorKYC[0])
						}
						/*formSixteen.forEach((v, i) => {
							formData.append('itr', formSixteen[i])
						})*/
						if(formSixteen.length){
							formData.append('itr', formSixteen[0])
						}
						if(formSixteenP.length){
							formData.append('itr', formSixteenP[0])
						}
						if(partnershipDeed.length){
							formData.append('partnership_deed', partnershipDeed[0])
						}
						if(bankStatement.length){
							formData.append('bank_statement', bankStatement[0])
						}
						
						axios.post(API_URL+"files/upload",formData).then((res) => {
							let response = res.data;
							if(response?.status === 200){
								handleCongratulation(response?.data)
							}
							//console.log(response)
							setIsDisableBtn(false)
							setDisplay("none");
						}).catch((e) => {
							setDisplay("none");
							console.log(e)
							setIsDisableBtn(false)
						})
					}
				}).catch((e) => {
					setDisplay("none");
					console.log(e)
					setIsDisableBtn(false)
				})
			}
	   }else{
		
		handleCongratulation({"name":preFillData?.personal_detail?.name ,"case_number":preFillData?.user_detail?.case_number});
	   }
	  
	}
	
	const inputFilePanRef = useRef();
	const inputFileBusinessRef = useRef();
	const inputFileDKycRef = useRef();
	const inputFileItrRef = useRef();
	const inputFileItrRefP = useRef();
	const inputFileDeedRef = useRef();
	const onBtnPanClick = () => {
    	inputFilePanRef.current.click();
  	}
  	const onBtnBusinessClick = () => {
    	inputFileBusinessRef.current.click();
  	}
  	const onBtnDKycClick = () => {
    	inputFileDKycRef.current.click();
  	}
  	const onBtnItrClick = () => {
    	inputFileItrRef.current.click();
  	}
  	const onBtnItrPClick = () => {
    	inputFileItrRefP.current.click();
  	}
  	const onBtnDeedClick = () => {
    	inputFileDeedRef.current.click();
  	}


	  const [pancardFile,setPancardFile] = useState(""); 
	  const [directorKycFile,setDirectorKycFile] = useState(""); 
	  const [businessRegistrationFile,setBusinessRegistrationFile] = useState(""); 
	  const [partnershipDeedFile,setPartnershipDeedFile] = useState(""); 
	  const [itrFile,setItrFile] = useState([]); 
	  const [fileData,setFileData] = useState(false);
  
	  useEffect(() => {
		  if(Object.keys(preFillData).length){
		 
		  
		  let panData = preFillData?.files.filter(x => x.document_type === "pan_card")  
		  setPancardFile(panData[0]?.filename); 
		  
		  let directorKycData = preFillData?.files.filter(x => x.document_type === "director_kyc")  
		  setDirectorKycFile(directorKycData[0]?.filename); 
  
		  let businessRegistrationData = preFillData?.files.filter(x => x.document_type === "business_registration")  
		  setBusinessRegistrationFile(businessRegistrationData[0]?.filename); 
  
		  let partnershipDeedData = preFillData?.files.filter(x => x.document_type === "partnership_deed")  
		  setPartnershipDeedFile(partnershipDeedData[0]?.filename);

		  let bankStatementData = preFillData?.files.filter(x => x.document_type === "bank_statement")  
		  setBankStatementFile(bankStatementData[0]?.filename);
		  
		  let itrData = preFillData?.files.filter(x => x.document_type === "itr")  
		  let fileItr =  itrData.map(x=>{
			  return x.filename
		   });
		  setItrFile(fileItr);
           
		  if(preFillData?.files.length){
			setFileData(true);
		  }
		  
		}					
	  },[preFillData]) 
  	const inputFileBankSRef = useRef();
	const onBtnBankSClick = () => {
    	inputFileBankSRef.current.click();
  	}

	  useEffect(()=>{
		loading(display)
	},[display]);


	const handleRemovePan = ()=>{
		setPanCard([]);
		setPanCardFileName("");
		setPanCardFileType("");
		setPanCardError(false);
		setPanCardErrorMsg(false);
		inputFilePanRef.current.value = null;
	}
	const handleBusinessRemove = ()=>{
		setBusinessType([]);
		setBusinessTypeName("");
		setBusinessFileType("");
		setBusinessTypeError(false);
		setBusinessTypeErrorMsg(false);
		inputFileBusinessRef.current.value = null;
	}

	const handlePartnerRemove = ()=>{
		setPartnershipDeed([]);
		setPartnershipDeedName("");
		setPartnershipDeedType("");
		setPartnershipDeedError(false);
		setPartnershipDeedErrorMsg(false);
		inputFileDeedRef.current.value = null;
	}
	
	const handleDirectorKYCRemove = ()=>{
		setDirectorKYC([]);
		setDirectorKYCName("");
		setDirectorKYCType("");
		setDirectorKYCError(false);
		setDirectorKYCErrorMsg(false);
		inputFileDKycRef.current.value = null;
	}
	const removeFile = () => {
		setFormSixteen([]);
		setFormSixteenName("");
		setFormSixteenType("");
		setFormSixteenError(false);
		setFormSixteenErrorMsg(false);
		inputFileItrRef.current.value = null;
	}
	const removeFileP = () => {
		setFormSixteenP([]);
		setFormSixteenPName("");
		setFormSixteenPType("");
		setFormSixteenPError(false);
		setFormSixteenPErrorMsg(false);
		inputFileItrRefP.current.value = null;
	}
	const handleBankStatementRemove = ()=>{
		setBankStatement([]);
		setBankStatementName("");
		setBankStatementType("");
		setBankStatementError(false);
		setBankStatementErrorMsg(false);
		inputFileBankSRef.current.value = null;
	}
	

	return(
		<>
			<div className="col-lg-6 col-md-12" style={{"display":(activeCard === "upload-document" && userType === "employed")?"block":"none"}}>
				<h4 className="top-heading">Upload Documents</h4>
				<div className="form-group label">
				<div className="uploadsections p-20">
					<div className="uploadfilesArea">
						<div className="filnameIcons">
							<div className="fileIc">
								<span className="imgWithName">
									<span className="imgIcons">{panCardFileType === "png"?<Icon.FiletypePng color={panCardError?"#f62b2b":"#1962CD"} size={50}/>:panCardFileType === "jpg"?<Icon.FiletypeJpg color={panCardError?"#f62b2b":"#1962CD"} size={50}/>:panCardFileType === "gif"?<Icon.FiletypeGif color={panCardError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={panCardError?"#f62b2b":"#1962CD"} size={50}/>}</span>
									<span className="imageName">
										<span title={panCardFileName} className={panCardError?"vrtext error":"vrtext"}>{panCard.length?(<>Pan Card Image<br />{start_and_end(panCardFileName)} </>):(pancardFile != undefined && pancardFile !="" )?<>Pan Card Image<br />pancardFile</>:"Upload Pan Card Image"}</span>
										{panCard.length?"":(pancardFile != undefined && pancardFile !="")?"":<>
										<span className="vrtext message">* File Format: JPEG, PNG, and GIF; Max size: 2MB</span></>}
										{panCardErrorMsg?<span className="vrtext message">{panCardErrorMsg}</span>:""}
									</span>
								</span>
								{panCard.length?<><span className="greenTick" onClick={handleRemovePan} ><i className="fa fa-check"></i></span></>:""}
							</div>
						</div>
						<div className="uploadbtnSize">
							<input type="file" accept="image/png, image/jpeg, image/gif" onChange={handlePanCard} style={{"display":"none"}} ref={inputFilePanRef} />
							<div className="uplodBtns" onClick={onBtnPanClick}>
								Upload <i className="fa fa-cloud-upload"></i>
							</div>
						</div>
					</div>
					<div className="uploadfilesArea">
						<div className="filnameIcons">
							<div className="fileIc">
								<span className="imgWithName">
									<span className="imgIcons">{businessFileType === "pdf"?<Icon.FiletypePdf color={businessTypeError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={businessTypeError?"#f62b2b":"#1962CD"} size={50}/>}</span>
									<span className="imageName">
										<span title={businessTypeName} className={businessTypeError?"vrtext error":"vrtext"}>{businessType.length?(<>Business Registration Proof<br />{start_and_end(businessTypeName)}</>):(businessRegistrationFile != undefined && businessRegistrationFile !="")?<>Business Registration Proof<br />businessRegistrationFile</>:"Upload Business Registration Proof"}</span>
										{businessType.length?"":(businessRegistrationFile != undefined && businessRegistrationFile !="")?"":<>
										<span className="vrtext message">* File Format: PDF; Max size: 5MB</span></>}
										{businessTypeErrorMsg?<span className="vrtext message">{businessTypeErrorMsg}</span>:""}
									</span>
								</span>
								{businessType.length?<><span className="greenTick" onClick={handleBusinessRemove}><i className="fa fa-check"></i></span></>:""}
							</div>
						</div>
						<div className="uploadbtnSize">
							<input type="file" accept="application/pdf" onChange={handleBusinessType} style={{"display":"none"}} ref={inputFileBusinessRef}/>
							<div className="uplodBtns" onClick={onBtnBusinessClick}>
								Upload <i className="fa fa-cloud-upload"></i>
							</div>
						</div>
					</div>
					<div className="uploadfilesArea" style={{"display":(businessTypeSelect == "3" || businessTypeSelect == "4")?"flex":"none"}}>
						<div className="filnameIcons">
							<div className="fileIc">
								<span className="imgWithName">
									<span className="imgIcons">{businessFileType === "pdf"?<Icon.FiletypePdf color={partnershipDeedError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={partnershipDeedError?"#f62b2b":"#1962CD"} size={50}/>}</span>
									<span className="imageName">
										<span title={partnershipDeedName} className={partnershipDeedError?"vrtext error":"vrtext"}>{partnershipDeed.length?(<>Partnership Deed<br />{start_and_end(partnershipDeedName)}</>):(partnershipDeedFile != undefined && partnershipDeedFile !="")?<>Partnership Deed<br />partnershipDeedFile</>:"Upload Partnership Deed"}</span>
										{partnershipDeed.length?"":(partnershipDeedFile != undefined && partnershipDeedFile !="" )?"":<>
										<span className="vrtext message">* File Format: PDF; Max size: 5MB</span></>}
										{partnershipDeedErrorMsg?<span className="vrtext message">{partnershipDeedErrorMsg}</span>:""}
									</span>
								</span>
								{partnershipDeed.length?<><span className="greenTick" onClick={handlePartnerRemove}><i className="fa fa-check"></i></span></>:""}
							</div>
						</div>
						<div className="uploadbtnSize">
							<input type="file" accept="application/pdf" onChange={handlePartnershipDeed} style={{"display":"none"}} ref={inputFileDeedRef}/>
							<div className="uplodBtns" onClick={onBtnDeedClick}>
								Upload <i className="fa fa-cloud-upload"></i>
							</div>
						</div>
					</div>
					<div className="uploadfilesArea" style={{"display":(businessTypeSelect == "2")?"flex":"none"}}>
						<div className="filnameIcons">
							<div className="fileIc">
								<span className="imgWithName">
									<span className="imgIcons">{directorKYCType === "pdf"?<Icon.FiletypePdf color={directorKYCError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={directorKYCError?"#f62b2b":"#1962CD"} size={50}/>}</span>
									<span className="imageName">
										<span title={directorKYCName} className={directorKYCError?"vrtext error":"vrtext"}>{directorKYC.length?(<>MOA/AOA<br />{start_and_end(directorKYCName)}</>):(directorKycFile != undefined && directorKycFile !="")?<>MOA/AOA<br />directorKycFile</>:"Upload MOA/AOA"}</span>
										{directorKYC.length?"":(directorKycFile != undefined && directorKycFile !="")?"":<>
										<span className="vrtext message">* File Format: PDF; Max size: 5MB</span></>}
										{directorKYCErrorMsg?<span className="vrtext message">{directorKYCErrorMsg}</span>:""}
									</span>
								</span>
								{directorKYC.length?<><span className="greenTick" onClick={handleDirectorKYCRemove} ><i className="fa fa-check"></i></span></>:""}
							</div>
						</div>
						<div className="uploadbtnSize">
							<input type="file" accept="application/pdf" onChange={handleDirectorKYC} style={{"display":"none"}} ref={inputFileDKycRef}/>
							<div className="uplodBtns" onClick={onBtnDKycClick}>
								Upload <i className="fa fa-cloud-upload"></i>
							</div>
						</div>
					</div>
					<div className="uploadfilesArea">
							<div className="filnameIcons">
								<div className="fileIc">
									<span className="imgWithName">
										<span className="imgIcons">{bankStatementType === "pdf"?<Icon.FiletypePdf color={bankStatementError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={bankStatementError?"#f62b2b":"#1962CD"} size={50}/>}</span>
										<span className="imageName">
											<span title={bankStatementName} className={bankStatementError?"vrtext error":"vrtext"}>{bankStatement.length?(<>12 Months Bank Statement<br />{start_and_end(bankStatementName)}</>):(bankStatementFile!=undefined  && bankStatementFile !="")?<>12 Months Bank Statement<br />bankStatementFile</>:"Upload 12 Months Bank Statement"}</span>
											{bankStatement.length?"":(bankStatementFile!=undefined && bankStatementFile !="")?"":<>
											<span className="vrtext message">* File Format: PDF; Max size: 5MB</span></>}
											{bankStatementErrorMsg?<span className="vrtext message">{bankStatementErrorMsg}</span>:""}
										</span>
									</span>
									{bankStatement.length?<><span className="greenTick"  onClick={handleBankStatementRemove}><i className="fa fa-check"></i></span></>:""}
								</div>
							</div>
							<div className="uploadbtnSize">
								<input type="file" accept="application/pdf" onChange={handleBankStatement} style={{"display":"none"}} ref={inputFileBankSRef} />
								<div className="uplodBtns" onClick={onBtnBankSClick}>
									Upload <i className="fa fa-cloud-upload"></i>
								</div>
							</div>
						</div>
					<div className="uploadfilesArea" style={{"display":((businessTypeSelect == "1" || businessTypeSelect == "3" || businessTypeSelect == "2" || businessTypeSelect == "4" || businessTypeSelect == "5" || businessTypeSelect == "6") && iFileType !== "none")?"flex":"none"}}>
						<div className="filnameIcons">
							<div className="fileIc">
								<span className="imgWithName">
									<span className="imgIcons">{formSixteenType === "pdf"?<Icon.FiletypePdf color={formSixteenError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={formSixteenError?"#f62b2b":"#1962CD"} size={50}/>}</span>
									<span className="imageName">
										<span title={formSixteenName} className={formSixteenError?"vrtext error":"vrtext"}>{formSixteen.length?(<>Current Year ITR<br />{start_and_end(formSixteenName)}</>):"Current Year ITR"}</span>
										{formSixteen.length?"":<>
										<span className="vrtext message">* File Format: PDF; Max size: 5MB</span></>}
										{formSixteenErrorMsg?<span className="vrtext message">{formSixteenErrorMsg}</span>:""}
									</span>
								</span>
								{formSixteen.length?<><span className="greenTick"  onClick={removeFile}><i className="fa fa-check"></i></span></>:""}
							</div>
						</div>
						<div className="uploadbtnSize">
							<input type="file" accept="application/pdf" onChange={handleFormSixteen} disabled={formSixteen.length === 2?true:false} style={{"display":"none"}} ref={inputFileItrRef}/>
							<div className="uplodBtns" onClick={onBtnItrClick}>
								Upload <i className="fa fa-cloud-upload"></i>
							</div>
						</div>
					</div>

					<div className="uploadfilesArea" style={{"display":((businessTypeSelect == "1" || businessTypeSelect == "3" || businessTypeSelect == "2" || businessTypeSelect == "4" || businessTypeSelect == "5" || businessTypeSelect == "6") && iFileType !== "none")?"flex":"none"}}>
						<div className="filnameIcons">
							<div className="fileIc">
								<span className="imgWithName">
									<span className="imgIcons">{formSixteenPType === "pdf"?<Icon.FiletypePdf color={formSixteenPError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={formSixteenPError?"#f62b2b":"#1962CD"} size={50}/>}</span>
									<span className="imageName">
										<span title={formSixteenPName} className={formSixteenPError?"vrtext error":"vrtext"}>{formSixteenP.length?(<>Previous Year ITR<br />{start_and_end(formSixteenPName)}</>):"Previous Year ITR"}</span>
										{formSixteenP.length?"":<>
										<span className="vrtext message">* File Format: PDF; Max size: 5MB</span></>}
										{formSixteenPErrorMsg?<span className="vrtext message">{formSixteenPErrorMsg}</span>:""}
									</span>
								</span>
								{formSixteenP.length?<><span className="greenTick"  onClick={removeFileP}><i className="fa fa-check"></i></span></>:""}
							</div>
						</div>
						<div className="uploadbtnSize">
							<input type="file" accept="application/pdf" onChange={handleFormSixteenP} disabled={formSixteen.length === 2?true:false} style={{"display":"none"}} ref={inputFileItrRefP}/>
							<div className="uplodBtns" onClick={onBtnItrPClick}>
								Upload <i className="fa fa-cloud-upload"></i>
							</div>
						</div>
					</div>
					
				</div>
					

				

					<div>
                        <button className="btn btn-login" onClick={handleUploadDocument} disabled={isDisableBtn}>
			                {
			                    isDisableBtn?<><Spinner
			                  as="span"
			                  animation="border"
			                  size="sm"
			                  role="status"
			                  aria-hidden="true"
			                /> Please Wait...</>:"Submit"
			                }</button>
                    </div>
				</div>
			</div>
		</>
	)
}