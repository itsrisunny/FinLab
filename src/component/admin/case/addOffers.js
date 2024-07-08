import React, {useEffect, useState} from "react";
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field';
import numberToText from "number-to-text";
require('number-to-text/converters/en-in');


export default function AddOffer(props){
    const [bank,setBank] = useState({0:""});
	const [loanAmt,setLoanAmt] = useState({0:""});
	const [emi, setEmi] = useState({0:""})
	const [roi, setRoi] = useState({0:""})
	const [tenure, setTenure] = useState({0:""})
	const [processingFee, setProcessingFee] = useState({0:""})
	const [roiType, setRoiType] = useState({0:""})
    const [bankValue,setBankValue] = useState("");
    const [roiTypeValue,setRoiTypeValue] = useState("");
    
    useEffect(()=>{
        
    if(props?.edit){  
        setBank((prev)=>({...prev,[0]:props?.dataOfOffer?.bank_id}))   
        setLoanAmt((prev)=>({...prev,[0]:props?.dataOfOffer?.disbursement_amount}));
        setEmi((prev)=>({...prev,[0]:props?.dataOfOffer?.monthly_installment_amount}));
        setRoi((prev)=>({...prev,[0]:props?.dataOfOffer?.rate_of_interest}));
        setTenure((prev)=>({...prev,[0]:props?.dataOfOffer?.tenure}));
        setProcessingFee((prev)=>({...prev,[0]:props?.dataOfOffer?.processing_fee}));
        setRoiType((prev)=>({...prev,[0]:props?.dataOfOffer?.roi_type}));
        setBankValue(props?.dataOfOffer?.bank_id);
        setRoiTypeValue(props?.dataOfOffer?.roi_type);
        }
    },[props?.edit])


    let xCount =[0];
    const [count, setCount] = useState(xCount)

   const handelChange = () =>{
   // console.log( "count",count.length)
        let len = count.length;
        setCount((prev)=>([...prev,len]));
        updateAllElement(len)
   }
  
   const updateAllElement = (len)=>{
    setBank((prev)=>({...prev,[len]:""}))   
    setLoanAmt((prev)=>({...prev,[len]:""}));
    setEmi((prev)=>({...prev,[len]:""}));
    setRoi((prev)=>({...prev,[len]:""}));
    setTenure((prev)=>({...prev,[len]:""}));
    setProcessingFee((prev)=>({...prev,[len]:""}));
    setRoiType((prev)=>({...prev,[len]:""}));

   }

  
  const handelBank = (i,e) =>{
    setBank((prev)=>({...prev,[i]:e.target.value}));
    setBankValue(e.target.value);
  }  

  const handelLoanAmount = (i,e) =>{
    setLoanAmt((prev)=>({...prev,[i]:(e?e:0)}))
  } 

  const handelEmi = (i,e) =>{
    setEmi((prev)=>({...prev,[i]:(e?e:0)}))
  } 

  const handelRoi = (i,e) =>{
    setRoi((prev)=>({...prev,[i]:(e?e:0)}))
  } 

  const handelTenure = (i,e) =>{
    setTenure((prev)=>({...prev,[i]:e.target.value}))
  } 

  const handelProcessingFee = (i,e) =>{
    setProcessingFee((prev)=>({...prev,[i]:(e?e:0)}))
  } 

  const handeRoiType = (i,e) =>{
    setRoiType((prev)=>({...prev,[i]:e.target.value}));
    setRoiTypeValue(e.target.value);
    
  }

//    console.log("bank",bank)
//    console.log("setLoanAmt",loanAmt)
//    console.log("EMI",emi)
//    console.log("Roi",roi)
//    console.log("Tenure",tenure)
//    console.log("setProcessingFee",processingFee)
   
   useEffect(()=>{
    let bk = Object.values(bank).includes("")
    let la = Object.values(loanAmt).includes("")
    let em = Object.values(emi).includes("")
    let ro = Object.values(roi).includes("")
    let te = Object.values(tenure).includes("")
    let pf = Object.values(processingFee).includes("")
    let rtyp = Object.values(roiType).includes("")
   // if(!bk && !la && !em && !ro && !te && !pf && !rtyp){
    if(!bk && !la && !em && !ro && !te && !pf ){
    
        props.processData(bank,loanAmt,emi,roi,tenure,processingFee,roiType);
        props.checkSubmitDisableBtn(false)
    }else{
        
        props.checkSubmitDisableBtn(true)
    }
  },[bank,loanAmt,emi,roi,tenure,processingFee,roiType])

  const handelRemove = () =>{
    let lastElement = count.slice(-1);
    //console.log(lastElement)
    setCount((prev)=>([...prev,]));
    setCount(count.filter(item => item != lastElement));
    updateAllElementRemove(lastElement);

  } 

  const updateAllElementRemove = (len)=>{
    delete bank[len];
    delete loanAmt[len];
    delete emi[len];
    delete roi[len];
    delete tenure[len];
    delete processingFee[len];
    delete roiType[len];
     
   }




 return(
    <>
    <div className="col-md-12 col-lg-12">
    
        {
            
            count.map((v, i) => {
                return(
                    <>
                        <div className="inner-employement">
                            <h5>{i+1}. Add Offer (<span style={{"color":"red"}}>{props.loanTypeData}</span>)</h5>
                            <div className="form-group loan-in row">
                                 <div className="col-md-6 spacing">
                                    <label>Bank</label>
                                    <select value={bankValue} className={"salary-input"} onChange={(e)=>{handelBank(i,e)}}>
                                        <option value="">Select Bank</option>
                                        { props?.bankData ? props?.bankData.map( xx =>{
                                            return (<option value={xx?.id}>{xx?.bank_name}</option>)
                                        })
                                        :""}
                                    </select>   
                                </div>
                                <div className="col-md-6 spacing">
                                    <label>Loan amount</label>
                                    <CurrencyInput decimalsLimit={0} intlConfig={{ locale: 'en-IN', currency: 'INR' }} maxLength={8} prefix="₹"  name={"loan_amt"+i} className={"salary-input"} value={loanAmt[i]} placeholder="10000000" onValueChange={(e)=>{handelLoanAmount(i,e)}}  />
                                    <span className="textSize"> {loanAmt[i]?numberToText.convertToText(loanAmt[i],{language:"en-in"}) :""}</span>
                                </div>
                            </div>
                            <div className="form-group loan-in row">
                                <div className="col-md-6 spacing">
                                    <label>EMI</label>
                                    <CurrencyInput decimalsLimit={0} intlConfig={{ locale: 'en-IN', currency: 'INR' }} maxLength={8} prefix="₹" name={"emi"+i} className={"salary-input"} value={emi[i]} placeholder="10000"  onValueChange={(e)=>{handelEmi(i,e)}} />
                                    <span className="textSize"> {emi[i]?numberToText.convertToText(emi[i],{language:"en-in"}) :""}</span>
                                </div>
                                <div className="col-md-6 spacing">
                                    <label>Rate of interest</label>
                                    <CurrencyInput decimalsLimit={2} maxLength={6} suffix="%"  name={"roi"+i} className={"salary-input"} value={roi[i]} placeholder="11.05%" onValueChange={(e)=>{handelRoi(i,e)}} />
                                    
                                </div>
                            </div>
                            <div className="form-group loan-in row">
                                <div className="col-md-6 spacing">
                                    <label>Tenure</label>
                                    <InputMask mask="9999" maskChar="" name={"tenure"+i} className={"salary-input"} value={tenure[i]} placeholder="72 Months" onChange={(e)=>{handelTenure(i,e)}} />
                                   
                                </div>
                                <div className="col-md-6 spacing">
                                    <label>Processing fee (Without GST)</label>
                                    <CurrencyInput  decimalsLimit={0} intlConfig={{ locale: 'en-IN', currency: 'INR' }} prefix="₹" maxLength={8}  name={"process"+i} className={"salary-input"} value={processingFee[i]} placeholder="1299" onValueChange={(e)=>{handelProcessingFee(i,e)}} />
                                    <span className="textSize"> {processingFee[i]?numberToText.convertToText(processingFee[i],{language:"en-in"}) :""}</span>
                                </div>
                            </div>

                            <div className="form-group loan-in row">
                                 <div className="col-md-6 spacing">
                                    <label>Rate of interest type</label>
                                    <select value={roiTypeValue} className={"salary-input"} onChange={(e)=>{handeRoiType(i,e)}}>
                                        <option value="">Select ROI type</option>
                                        <option value="Reducing">Reducing</option>
                                        <option value="Flat">Flat</option>
                                    </select>   
                                </div>
                            </div>
                           
                        </div>
                    </>
                )
            }) 
        }
        {(!props?.edit)?
        <>
          <button className="btn btn-primary float-right" onClick={handelChange}>Add more</button>
         {(count.length>1)?
          <button className="btn btn-warning float-right" style={{"marginRight": "20px"}} onClick={()=>{handelRemove()}}>Remove</button>
          :""
         }
       
       </>
        : ""}
    </div>
</>
   );



}