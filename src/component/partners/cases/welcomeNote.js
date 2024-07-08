import React, {useEffect, useState} from "react";
import CurrencyFormat from 'react-currency-format';


export default function WelcomeNote(props){
    

    const [userFile, setUserFile] = useState([])
	const [userFileName, setUseFileName] = useState("")
	const [userFileType, setUserFileType] = useState("")
	const [userFileError, setUserFileError] = useState(false)
	const [userFileErrorMsg, setUserFileErrorMsg] = useState(false)

    const allowedTypes = ["image/jpeg", "image/png", "image/gif","application/pdf"];
	const MAX_FILE_SIZE_IMAGE = 2050 // 5MB
	


	const handelWelcomeNote = (e) => {
		const selectedFile = e.target.files;
		setUserFileError(false)
		setUserFileErrorMsg("");
		setUserFile(selectedFile)
		let file_name = selectedFile[0]?.name;
		let file_type = selectedFile[0]?.type;
		setUseFileName(file_name)
		if(file_type === "image/png"){
			setUserFileType("png")
		}else if(file_type === "image/jpg" || file_type === "image/jpeg"){
			setUserFileType("jpg")
		}else if(file_type === "image/gif"){
			setUserFileType("gif")
		}else if(file_type === "application/pdf"){
			setUserFileType("pdf")
		}
		else{
			setUserFileType("")
		}
		if (selectedFile.length && !allowedTypes.includes(selectedFile[0]?.type)) {
		    setUserFileError(true)
		    setUserFileErrorMsg("Only JPEG, PNG, GIF and PDF images are allowed.");
		}
		if(selectedFile.length && (selectedFile[0].size / 1024) > MAX_FILE_SIZE_IMAGE){
	      	setUserFileErrorMsg("File size is greater than 2 MB");
	      	setUserFileError(true)
	    }
	}

    

    useEffect(()=>{

        if(userFile.length && !userFileError ){
        
            props.welcomeProcessData(userFile);
            props.checkWelcomSubmitDisableBtn(false)
        }else{
            
            props.checkWelcomSubmitDisableBtn(true)
        }
      },[userFile])
    



    return(
      <>
                 <div className="col-sm-12 mb-3">
                            <div className=" h-100">
                              <div className="card-body">
                                <h5 className="d-flex align-items-center mb-3">  
                                  Accepted Offer Details 
                                </h5>  
                                <div className="row" >
                                  <div className="col-sm-5">
                                      <h6>Bank:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">{props?.offerData[0]?.bank_name}</div>
                                </div>
                                <div className="row" >
                                  <div className="col-sm-5">
                                      <h6>Loan Amount:</h6>
                                  </div>
                                  
                                  <div className="col-sm-7 text-secondary">{props?.offerData[0]?.disbursement_amount ? <CurrencyFormat value={props?.offerData[0]?.disbursement_amount} displayType={'text'} thousandSeparator={true} thousandSpacing={'2s'} prefix={'₹'} /> : "" }</div>
                                </div>              
                                <div className="row" >
                                  <div className="col-sm-5">
                                      <h6>EMI:</h6>
                                  </div>
                                 
                                  <div className="col-sm-7 text-secondary">{props?.offerData[0]?.monthly_installment_amount ? <CurrencyFormat value={props?.offerData[0]?.monthly_installment_amount} displayType={'text'} thousandSeparator={true} thousandSpacing={'2s'} prefix={'₹'} /> : "" }</div>
                                </div> 
                                <div className="row" >
                                  <div className="col-sm-5">
                                      <h6>Rate Of Interest:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">{props?.offerData[0]?.rate_of_interest ? props?.offerData[0]?.rate_of_interest + "%" : "" }</div>
                                </div>
                                <div className="row" >
                                  <div className="col-sm-5">
                                      <h6>Gross Tenure:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">{props?.offerData[0]?.tenure ? props?.offerData[0]?.tenure + "Months" : "" }</div>
                                </div> 
                                <div className="row" >
                                  <div className="col-sm-5">
                                      <h6>Processing Fee:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">{props?.offerData[0]?.processing_fee ? <CurrencyFormat value={props?.offerData[0]?.processing_fee} displayType={'text'} thousandSeparator={true} thousandSpacing={'2s'} prefix={'₹'} /> : "" }</div>
                                </div> 
                                <div className="row" >
                                  <div className="col-sm-5">
                                      <h6>Rate Of Interest Type:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">{props?.offerData[0]?.roi_type ? props?.offerData[0]?.roi_type : "" }</div>
                                </div> 

                                <div className="row" >
                                  <div className="col-sm-5">
                                      <h6>Add Welcome note:</h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                  <input
						        type="file"
						        id="upload_cheque"
								accept="image/png, image/jpeg, image/gif, application/pdf"
						        placeholder="Upload welcome note"
							    onChange={handelWelcomeNote}
								  />

                                   
                                    
                                    </div>
                                  
                                </div> 

                                <div className="row" >
                                  <div className="col-sm-5">
                                      <h6></h6>
                                  </div>
                                  <div className="col-sm-7 text-secondary">
                                     {userFileError? <span style={{color:"red"}}>{userFileErrorMsg}</span> :""}                    
                                    
                                    </div>
                                  
                                </div> 
                                
                                        
                                
                              </div>
                            </div>
                          </div> 
      </>

    );

}