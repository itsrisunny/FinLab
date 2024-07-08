import React, {useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom"
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";
import { API_URL } from './../../config/constant';
import Spinner from 'react-bootstrap/Spinner';
export default function SalariedDocument({activeCard, preFillData ,userType, handleCongratulation, caseId,loading}){
	const [panCard, setPanCard] = useState([])
	const [panCardFileName, setPanCardFileName] = useState("")
	const [panCardFileType, setPanCardFileType] = useState("")
	const [panCardError, setPanCardError] = useState(false)
	const [panCardErrorMsg, setPanCardErrorMsg] = useState(false)
	const [aadhaarFront, setAadhaarFront] = useState([])
	const [aadhaarFrontName, setAadhaarFrontName] = useState("")
	const [aadhaarFrontType, setAadhaarFrontType] = useState("")
	const [aadhaarFrontError, setAadhaarFrontError] = useState(false)
	const [aadhaarFrontErrorMsg, setAadhaarFrontErrorMsg] = useState(false)

	const [aadhaarBack, setAadhaarBack] = useState([])
	const [aadhaarBackName, setAadhaarBackName] = useState("")
	const [aadhaarBackType, setAadhaarBackType] = useState("")
	const [aadhaarBackError, setAadhaarBackError] = useState(false)
	const [aadhaarBackErrorMsg, setAadhaarBackErrorMsg] = useState(false)


	const [salaryStatement, setSalaryStatement] = useState([])
	const [salaryStatementName, setSalaryStatementName] = useState("")
	const [salaryStatementType, setSalaryStatementType] = useState("")
	const [salaryStatementError, setSalaryStatementError] = useState(false)
	const [salaryStatementErrorMsg, setSalaryStatementErrorMsg] = useState(false)

	const [salaryStatementP, setSalaryStatementP] = useState([])
	const [salaryStatementPName, setSalaryStatementPName] = useState("")
	const [salaryStatementPType, setSalaryStatementPType] = useState("")
	const [salaryStatementPError, setSalaryStatementPError] = useState(false)
	const [salaryStatementPErrorMsg, setSalaryStatementPErrorMsg] = useState(false)

	const [salaryStatementT, setSalaryStatementT] = useState([])
	const [salaryStatementTName, setSalaryStatementTName] = useState("")
	const [salaryStatementTType, setSalaryStatementTType] = useState("")
	const [salaryStatementTError, setSalaryStatementTError] = useState(false)
	const [salaryStatementTErrorMsg, setSalaryStatementTErrorMsg] = useState(false)


	const [bankStatement, setBankStatement] = useState([])
	const [bankStatementName, setBankStatementName] = useState("")
	const [bankStatementType, setBankStatementType] = useState("")
	const [bankStatementError, setBankStatementError] = useState(false)
	const [bankStatementErrorMsg, setBankStatementErrorMsg] = useState(false)

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

	const [isDisableBtn, setIsDisableBtn] = useState(false)
	const inputFilePanRef = useRef();
	const inputFileAadhaarFRef = useRef();
	const inputFileAadhaarBRef = useRef();
	const inputFileItrRef = useRef();
	const inputFileItrRefP = useRef();
	const inputFileSalaryStmtRef = useRef();
	const inputFileSalaryStmtPRef = useRef();
	const inputFileSalaryStmtTRef = useRef();
	const inputFileBankSRef = useRef();
	const [display,setDisplay] = useState("none");
	const onBtnPanClick = () => {
    	inputFilePanRef.current.click();
  	}
  	const onBtnAadhaarFClick = () => {
    	inputFileAadhaarFRef.current.click();
  	}
	const onBtnAadhaarBClick = () => {
    	inputFileAadhaarBRef.current.click();
  	}
  	const onBtnItrClick = () => {
    	inputFileItrRef.current.click();
  	}
  	const onBtnItrPClick = () => {
    	inputFileItrRefP.current.click();
  	}
  	const onBtnSalaryStmtClick = () => {
  		//console.log(inputFileSalaryStmtRef)
    	inputFileSalaryStmtRef.current.click();
  	}
  	const onBtnSalaryStmtPClick = () => {
    	inputFileSalaryStmtPRef.current.click();
  	}
  	const onBtnSalaryStmtTClick = () => {
    	inputFileSalaryStmtTRef.current.click();
  	}
  	const onBtnBankSClick = () => {
    	inputFileBankSRef.current.click();
  	}
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
	function start_and_end(str) {
  		if (str.length > 35) {
    		return str.substr(0, 20) + '...' + str.substr(str.length-10, str.length);
  		}
  		return str;
	}
	const handleAadharFront = (e) => {
		const selectedFile = e.target.files;
		setAadhaarFrontError(false)
		setAadhaarFrontErrorMsg("");
		setAadhaarFront(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setAadhaarFrontName(file_name)
		if(file_type === "image/png"){
			setAadhaarFrontType("png")
		}else if(file_type === "image/jpg" || file_type === "image/jpeg"){
			setAadhaarFrontType("jpg")
		}else if(file_type === "image/gif"){
			setAadhaarFrontType("gif")
		}else{
			setAadhaarFrontType("")
		}
		if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
		    setAadhaarFrontError(true)
		    setAadhaarFrontErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
		}
		if(selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_IMAGE){
	      	setAadhaarFrontErrorMsg("File size is greater than 2 MB");
	      	setAadhaarFrontError(true)
	    }
	}
	const handleAadharBack = (e) => {
		const selectedFile = e.target.files;
		setAadhaarBackError(false)
		setAadhaarBackErrorMsg("");
		setAadhaarBack(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setAadhaarBackName(file_name)
		if(file_type === "image/png"){
			setAadhaarBackType("png")
		}else if(file_type === "image/jpg" || file_type === "image/jpeg"){
			setAadhaarBackType("jpg")
		}else if(file_type === "image/gif"){
			setAadhaarBackType("gif")
		}else{
			setAadhaarBackType("")
		}
		if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
		    setAadhaarBackError(true)
		    setAadhaarBackErrorMsg("Only JPEG, PNG, and GIF images are allowed.");
		}
		if(selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_IMAGE){
	      	setAadhaarBackErrorMsg("File size is greater than 2 MB");
	      	setAadhaarBackError(true)
	    }
	}
	const handleSalaryStatement = (e) => {

		const selectedFile = e.target.files;
		setSalaryStatementError(false)
		setSalaryStatementErrorMsg("");
		setSalaryStatement(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setSalaryStatementName(file_name)
		if(file_type === "application/pdf"){
			setSalaryStatementType("pdf")
		}else{
			setSalaryStatementType("")
		}
		for (var i = 0; i < selectedFile.length; i++) {
			if (selectedFile.length && !allowedPdfTypes.includes(selectedFile[i]?.type)) {
			    setSalaryStatementError(true)
			    setSalaryStatementErrorMsg("Only PDF are allowed.");
			}
			if(selectedFile.length && (selectedFile[i].size / 1024) > MAX_FILE_SIZE_PDF){
		      	setSalaryStatementErrorMsg("File size is greater than 5 MB");
		      	setSalaryStatementError(true)
		    }
		}
	}

	const handleSalaryStatementP = (e) => {

		const selectedFile = e.target.files;
		setSalaryStatementPError(false)
		setSalaryStatementPErrorMsg("");
		setSalaryStatementP(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setSalaryStatementPName(file_name)
		if(file_type === "application/pdf"){
			setSalaryStatementPType("pdf")
		}else{
			setSalaryStatementPType("")
		}
		for (var i = 0; i < selectedFile.length; i++) {
			if (selectedFile.length && !allowedPdfTypes.includes(selectedFile[i]?.type)) {
			    setSalaryStatementPError(true)
			    setSalaryStatementPErrorMsg("Only PDF are allowed.");
			}
			if(selectedFile.length && (selectedFile[i].size / 1024) > MAX_FILE_SIZE_PDF){
		      	setSalaryStatementPErrorMsg("File size is greater than 5 MB");
		      	setSalaryStatementPError(true)
		    }
		}
	}

	const handleSalaryStatementT = (e) => {

		const selectedFile = e.target.files;
		setSalaryStatementTError(false)
		setSalaryStatementTErrorMsg("");
		setSalaryStatementT(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setSalaryStatementTName(file_name)
		if(file_type === "application/pdf"){
			setSalaryStatementTType("pdf")
		}else{
			setSalaryStatementTType("")
		}
		for (var i = 0; i < selectedFile.length; i++) {
			if (selectedFile.length && !allowedPdfTypes.includes(selectedFile[i]?.type)) {
			    setSalaryStatementTError(true)
			    setSalaryStatementTErrorMsg("Only PDF are allowed.");
			}
			if(selectedFile.length && (selectedFile[i].size / 1024) > MAX_FILE_SIZE_PDF){
		      	setSalaryStatementTErrorMsg("File size is greater than 5 MB");
		      	setSalaryStatementTError(true)
		    }
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
	const handleValidation = () => {
		let isFormValid = true;
		if(!panCard.length || panCardErrorMsg){
			isFormValid = false;
			setPanCardError(true)
		}
		if(!aadhaarFront.length || aadhaarFrontErrorMsg){
			isFormValid = false;
			setAadhaarFrontError(true)
		}
		if(!aadhaarBack.length || aadhaarBackErrorMsg){
			isFormValid = false;
			setAadhaarBackError(true)
		}
		if(!salaryStatement.length || salaryStatementErrorMsg){
			isFormValid = false;
			setSalaryStatementError(true)
		}
		if(!salaryStatementP.length || salaryStatementPErrorMsg){
			isFormValid = false;
			setSalaryStatementPError(true)
		}
		if(!salaryStatementT.length || salaryStatementTErrorMsg){
			isFormValid = false;
			setSalaryStatementTError(true)
		}

		if(!bankStatement.length || bankStatementErrorMsg){
			isFormValid = false;
			setBankStatementError(true)
		}
		if(!formSixteen.length || formSixteenErrorMsg){
			isFormValid = false;
			setFormSixteenError(true)
		}
		if(!formSixteenP.length || formSixteenPErrorMsg){
			isFormValid = false;
			setFormSixteenPError(true)
		}
		return isFormValid;
	}
	const handleUploadDocument = () => {
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
		    		if(aadhaarFront.length){
		    			formData.append('aadhaar_front', aadhaarFront[0])
		    		}
		    		if(aadhaarBack.length){
		    			formData.append('aadhaar_back', aadhaarBack[0])
		    		}
		    		/*salaryStatement.forEach((v, i) => {
		    			formData.append('salary_slip', salaryStatement[i])
		    		})*/
		    		if(salaryStatement.length){
		    			formData.append('salary_slip', salaryStatement[0])
		    		}
		    		if(salaryStatementP.length){
		    			formData.append('salary_slip', salaryStatementP[0])
		    		}
		    		if(salaryStatementT.length){
		    			formData.append('salary_slip', salaryStatementT[0])
		    		}
		    		if(bankStatement.length){
		    			formData.append('bank_statement', bankStatement[0])
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
		    		axios.post(API_URL+"files/upload",formData).then((res) => {
						let response = res.data;
						//handleCongratulation()
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
	const handleRemovePan = ()=>{
		setPanCard([]);
		setPanCardFileName("");
		setPanCardFileType("");
		setPanCardError(false);
		setPanCardErrorMsg(false);
		inputFilePanRef.current.value = null;
	}
	const handleRemoveFileAdharFront = ()=>{
		setAadhaarFront([]);
		setAadhaarFrontName("");
		setAadhaarFrontType("");
		setAadhaarFrontError(false);
		setAadhaarFrontErrorMsg(false);
		inputFileAadhaarFRef.current.value = null;
	}
	const handleRemoveFileAdharBack = ()=>{
		setAadhaarBack([]);
		setAadhaarBackName("");
		setAadhaarBackType("");
		setAadhaarBackError(false);
		setAadhaarBackErrorMsg(false);
		inputFileAadhaarBRef.current.value = null;
	}
	const handleRemoveSalaryFirst = ()=>{
		setSalaryStatement([]);
		setSalaryStatementName("");
		setSalaryStatementType("");
		setSalaryStatementError(false);
		setSalaryStatementErrorMsg(false);
		inputFileSalaryStmtRef.current.value = null;
	}
	const handleRemoveSalaryTwo = ()=>{
		setSalaryStatementP([]);
		setSalaryStatementPName("");
		setSalaryStatementPType("");
		setSalaryStatementPError(false);
		setSalaryStatementPErrorMsg(false);
		inputFileSalaryStmtPRef.current.value = null;
	}
	const handleRemoveSalaryThird = ()=>{
		setSalaryStatementT([]);
		setSalaryStatementTName("");
		setSalaryStatementTType("");
		setSalaryStatementTError(false);
		setSalaryStatementTErrorMsg(false);
		inputFileSalaryStmtTRef.current.value = null;
	}
	const removeFileBank = () => {
		setBankStatement([]);
		setBankStatementName("");
		setBankStatementType("");
		setBankStatementError(false);
		setBankStatementErrorMsg(false);
		inputFileBankSRef.current.value = null;
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
	const removeFileSalary = (index) => {
		//salaryStatement.splice(i, 1);
		setSalaryStatement(salaryStatement.filter((v, i) => i !== index));
	}

	const [pancardFile,setPancardFile] = useState(""); 
	const [aadharFrontFile,setAadharFrontFile] = useState(""); 
	const [aadharBackFile,setAadharBackFile] = useState(""); 
	const [salarySlipFile,setSalarySlipFile] = useState([]); 
	const [bankStatementFile,setBankStatementFile] = useState(""); 
	const [itrFile,setItrFile] = useState([]); 
	const [fileData,setFileData] = useState(false);

	useEffect(() => {
	    if(Object.keys(preFillData).length){
		
		let panData = preFillData?.files.filter(x => x.document_type === "pan_card")  
		setPancardFile(panData[0]?.filename); 
		
		let aadharFrontData = preFillData?.files.filter(x => x.document_type === "aadhaar_front")  
		setAadharFrontFile(aadharFrontData[0]?.filename); 
      
		let aadharBackData = preFillData?.files.filter(x => x.document_type === "aadhaar_back")  
		setAadharBackFile(aadharBackData[0]?.filename); 

		let salaryslipData = preFillData?.files.filter(x => x.document_type === "salary_slip") 
		let fileSal =  salaryslipData.map(x=>{
			return x.filename
		 }); 
		setSalarySlipFile(fileSal); 

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

	useEffect(()=>{
		loading(display)
	},[display]);
   
	return(
		<>
			<div className="col-lg-6 col-md-12" style={{display:(activeCard === "upload-document" && userType === "salaried")?"block":"none"}}>
				<h4 className="top-heading">Upload Documents</h4>
				<div className="form-group label">
					<div className="uploadsections p-20">
						<div className="uploadfilesArea">
							<div className="filnameIcons">
								<div className="fileIc">
									<span className="imgWithName">
										<span className="imgIcons">{panCardFileType === "png"?<Icon.FiletypePng color={panCardError?"#f62b2b":"#1962CD"} size={50}/>:panCardFileType === "jpg"?<Icon.FiletypeJpg color={panCardError?"#f62b2b":"#1962CD"} size={50}/>:panCardFileType === "gif"?<Icon.FiletypeGif color={panCardError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={panCardError?"#f62b2b":"#1962CD"} size={50}/>}</span>
										<span className="imageName">
											<span title={panCardFileName} className={panCardError?"vrtext error":"vrtext"}>{panCard.length?(<>Upload Pan Card Image<br />{start_and_end(panCardFileName)}</>):(pancardFile!=undefined && pancardFile !="" )?pancardFile:"Upload Pan Card Image"}</span>
											{panCard.length?"":(pancardFile!=undefined && pancardFile !="")?"":<>
											<span className="vrtext message">* File Format: JPEG, PNG, and GIF; Max size: 2MB</span></>}
											{panCardErrorMsg?<span className="vrtext message">{panCardErrorMsg}</span>:""}
											
										</span>
									</span>
									{panCard.length?<><span className="greenTick" onClick={handleRemovePan}><i className="fa fa-check"></i></span></>:""}
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
										<span className="imgIcons">{aadhaarFrontType === "png"?<Icon.FiletypePng color={aadhaarFrontError?"#f62b2b":"#1962CD"} size={50}/>:aadhaarFrontType === "jpg"?<Icon.FiletypeJpg color={aadhaarFrontError?"#f62b2b":"#1962CD"} size={50}/>:aadhaarFrontType === "gif"?<Icon.FiletypeGif color={aadhaarFrontError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={aadhaarFrontError?"#f62b2b":"#1962CD"} size={50}/>}</span>
										<span className="imageName">
											<span title={aadhaarFrontName} className={aadhaarFrontError?"vrtext error":"vrtext"}>{aadhaarFront.length?(<>Upload Aadhaar Front Image<br />{start_and_end(aadhaarFrontName)}</>):(aadharFrontFile!=undefined && aadharFrontFile !="")?aadharFrontFile:"Upload Aadhaar Front Image"}</span>
											{aadhaarFront.length?"":(aadharFrontFile!=undefined && aadharFrontFile !="")?"":<>
											<span className="vrtext message">* File Format: JPEG, PNG, and GIF; Max size: 2MB</span></>}
											{aadhaarFrontErrorMsg?<span className="vrtext message">{aadhaarFrontErrorMsg}</span>:""}
										</span>
									</span>
									{aadhaarFront.length?<><span className="greenTick" onClick={handleRemoveFileAdharFront}><i className="fa fa-check"></i></span></>:""}
								</div>
							</div>
							<div className="uploadbtnSize">
								<input type="file" accept="image/png, image/jpeg, image/gif" onChange={handleAadharFront} style={{"display":"none"}} ref={inputFileAadhaarFRef} />
								<div className="uplodBtns" onClick={onBtnAadhaarFClick}>
									Upload <i className="fa fa-cloud-upload"></i>
								</div>
							</div>
						</div>
						<div className="uploadfilesArea">
							<div className="filnameIcons">
								<div className="fileIc">
									<span className="imgWithName">
										<span className="imgIcons">{aadhaarBackType === "png"?<Icon.FiletypePng color={aadhaarBackError?"#f62b2b":"#1962CD"} size={50}/>:aadhaarBackType === "jpg"?<Icon.FiletypeJpg color={aadhaarBackError?"#f62b2b":"#1962CD"} size={50}/>:aadhaarBackType === "gif"?<Icon.FiletypeGif color={aadhaarBackError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={aadhaarBackError?"#f62b2b":"#1962CD"} size={50}/>}</span>
										<span className="imageName">
											<span title={aadhaarBackName} className={aadhaarBackError?"vrtext error":"vrtext"}>{aadhaarBack.length?(<>Upload Aadhaar Back Image<br />{start_and_end(aadhaarBackName)}</>):(aadharBackFile!=undefined && aadharBackFile !="")?aadharBackFile:"Upload Aadhaar Back Image"}</span>
											{aadhaarBack.length?"":(aadharBackFile!=undefined && aadharBackFile !="")?"":<>
											<span className="vrtext message">* File Format: JPEG, PNG, and GIF; Max size: 2MB</span></>}
											{aadhaarBackErrorMsg?<span className="vrtext message">{aadhaarBackErrorMsg}</span>:""}
										</span>
									</span>
									{aadhaarBack.length?<><span className="greenTick" onClick={handleRemoveFileAdharBack}><i className="fa fa-check"></i></span></>:""}
								</div>
							</div>
							<div className="uploadbtnSize">
								<input type="file" accept="image/png, image/jpeg, image/gif" onChange={handleAadharBack} style={{"display":"none"}} ref={inputFileAadhaarBRef} />
								<div className="uplodBtns" onClick={onBtnAadhaarBClick}>
									Upload <i className="fa fa-cloud-upload"></i>
								</div>
							</div>
						</div>

						

						<div className="uploadfilesArea">
							<div className="filnameIcons">
								<div className="fileIc">
									<span className="imgWithName">
										<span className="imgIcons">{salaryStatementType === "pdf"?<Icon.FiletypePdf color={salaryStatementError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={salaryStatementError?"#f62b2b":"#1962CD"} size={50}/>}</span>
										<span className="imageName">
											<span title={salaryStatementName} className={salaryStatementError?"vrtext error":"vrtext"}>{salaryStatement.length?(<>Upload 1st Month Salary Slip<br />{start_and_end(salaryStatementName)}</>):"Upload 1 Month Salary Slip"}</span>
											{salaryStatement.length?"":<>
											<span className="vrtext message">* File Format: PDF; Max size: 5MB</span></>}
											{salaryStatementErrorMsg?<span className="vrtext message">{salaryStatementErrorMsg}</span>:""}
										</span>
									</span>
									{salaryStatement.length?<><span className="greenTick" onClick={handleRemoveSalaryFirst}><i className="fa fa-check"></i></span></>:""}
								</div>
							</div>
							<div className="uploadbtnSize">
								<input type="file" accept="application/pdf" onChange={handleSalaryStatement} style={{"display":"none"}} ref={inputFileSalaryStmtRef}/>
								<div className="uplodBtns" onClick={onBtnSalaryStmtClick}>
									Upload <i className="fa fa-cloud-upload"></i>
								</div>
							</div>
						</div>

						<div className="uploadfilesArea">
							<div className="filnameIcons">
								<div className="fileIc">
									<span className="imgWithName">
										<span className="imgIcons">{salaryStatementPType === "pdf"?<Icon.FiletypePdf color={salaryStatementPError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={salaryStatementPError?"#f62b2b":"#1962CD"} size={50}/>}</span>
										<span className="imageName">
											<span title={salaryStatementPName} className={salaryStatementPError?"vrtext error":"vrtext"}>{salaryStatementP.length?(<>Upload 2nd Month Salary Slip<br />{start_and_end(salaryStatementPName)}</>):"Upload 2nd Month Salary Slip"}</span>
											{salaryStatementP.length?"":<>
											<span className="vrtext message">* File Format: PDF; Max size: 5MB</span></>}
											{salaryStatementPErrorMsg?<span className="vrtext message">{salaryStatementPErrorMsg}</span>:""}
										</span>
									</span>
									{salaryStatementP.length?<><span className="greenTick" onClick={handleRemoveSalaryTwo}><i className="fa fa-check"></i></span></>:""}
								</div>
							</div>
							<div className="uploadbtnSize">
								<input type="file" accept="application/pdf" onChange={handleSalaryStatementP} style={{"display":"none"}} ref={inputFileSalaryStmtPRef}/>
								<div className="uplodBtns" onClick={onBtnSalaryStmtPClick}>
									Upload <i className="fa fa-cloud-upload"></i>
								</div>
							</div>
						</div>

						<div className="uploadfilesArea">
							<div className="filnameIcons">
								<div className="fileIc">
									<span className="imgWithName">
										<span className="imgIcons">{salaryStatementTType === "pdf"?<Icon.FiletypePdf color={salaryStatementTError?"#f62b2b":"#1962CD"} size={50}/>:<Icon.Files color={salaryStatementTError?"#f62b2b":"#1962CD"} size={50}/>}</span>
										<span className="imageName">
											<span title={salaryStatementTName} className={salaryStatementTError?"vrtext error":"vrtext"}>{salaryStatementT.length?(<>Upload 3rd Month Salary Slip<br />{start_and_end(salaryStatementTName)}</>):"Upload 3rd Month Salary Slip"}</span>
											{salaryStatementT.length?"":<>
											<span className="vrtext message">* File Format: PDF; Max size: 5MB</span></>}
											{salaryStatementTErrorMsg?<span className="vrtext message">{salaryStatementTErrorMsg}</span>:""}
										</span>
									</span>
									{salaryStatementT.length?<><span className="greenTick" onClick={handleRemoveSalaryThird}><i className="fa fa-check"></i></span></>:""}
								</div>
							</div>
							<div className="uploadbtnSize">
								<input type="file" accept="application/pdf" onChange={handleSalaryStatementT} style={{"display":"none"}} ref={inputFileSalaryStmtTRef}/>
								<div className="uplodBtns" onClick={onBtnSalaryStmtTClick}>
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
											<span title={bankStatementName} className={bankStatementError?"vrtext error":"vrtext"}>{bankStatement.length?(<>Upload 12 Months Bank Statement<br /> {start_and_end(bankStatementName)}</>):(bankStatementFile!=undefined  && bankStatementFile !="")?bankStatementFile:"Upload 12 Months Bank Statement"}</span>
											{bankStatement.length?"":(bankStatementFile!=undefined && bankStatementFile !="")?"":<>
											<span className="vrtext message">* File Format: PDF; Max size: 5MB</span></>}
											{bankStatementErrorMsg?<span className="vrtext message">{bankStatementErrorMsg}</span>:""}
										</span>
									</span>
									{bankStatement.length?<><span className="greenTick" onClick={removeFileBank}><i className="fa fa-check"></i></span></>:""}
								</div>
							</div>
							<div className="uploadbtnSize">
								<input type="file" accept="application/pdf" onChange={handleBankStatement} style={{"display":"none"}} ref={inputFileBankSRef} />
								<div className="uplodBtns" onClick={onBtnBankSClick}>
									Upload <i className="fa fa-cloud-upload"></i>
								</div>
							</div>
						</div>

						<div className="uploadfilesArea">
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
						<div className="uploadfilesArea">
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