import React, { useEffect, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import FinlabLogo from "../../../assets/images/admin-dashboard/logo.png"
import JohnDoe from "../../../assets/images/admin-dashboard/john.jpg"
import DemoChart from "../../../assets/images/admin-dashboard/chart-demo.jpg"
import DemoChartTwo from "../../../assets/images/admin-dashboard/chart-demo-two.jpg"
import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
import moment from 'moment';
import axios from "axios";
import { API_URL } from "../../../config/constant";
import CurrencyFormat from 'react-currency-format';
import AppPieChart from './appPieChart';
import GroupedBarGraph from "./groupedBarGraph";
import ProgressChart from "./progressChart";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
export default function Index(){
	
 
const [dateRangeFilter, setDateRangeFilter] = useState({ from: '', to: '' });
const [totalLeads,setTotalLeads] = useState(0);
const [totalIncompleteLeads,setTotalIncompleteLeads] = useState(0);
const [totalOfferLeads,setTotalOfferLeads] = useState(0);
const [totalRejectedLeads,setTotalRejectedLeads] = useState(0);
const [totalClosedLeads,setTotalClosedLeads] = useState(0);
const[allLeads,setAllLeads] = useState(0);


const [totalAppliedLoan,setTotalAppliedLoan] = useState(0);
const [totalDispersedLoan,setTotalDispersedLoan] = useState(0);
const [totalApprovedLoan,setTotalApprovedLoan] = useState(0);
const [totalOtherLoan,setTotalOtherLoan] = useState(0);
const[allLoan,setAllLoan] = useState(0);
const [data,setData ]= useState([{}])
const[active,setActive] = useState(true);

const[partnerId,setPartnerId] = useState("");


/*** AM followup Chart */
const [amChartApp,setAmChartApp] =useState([]);


useEffect(()=>{
	if(active){
		getApplicationData()
		getLoanData()
		getLoanDataDateWise();
	}
},[0])
useEffect(()=>{
	if(active){
		getApplicationData()
		getLoanData()
		getLoanDataDateWise()
	}
},[dateRangeFilter])





  

const getApplicationData = () =>{
	const  jsonData = {} 
	
  
  if(dateRangeFilter.from !="" && dateRangeFilter.to !="" && (new Date(dateRangeFilter.from).getTime() < new Date(dateRangeFilter.to).getTime())){
   jsonData['dateRange']=dateRangeFilter;
  }
    
 // console.log(jsonData);

   axios.post(API_URL+`admin/dashboard-application-status`,jsonData).then((res) => {
	 let response = res.data;
	 if(response?.status === 200){
		//console.log(response?.data?.offeredLeads)
		setTotalLeads(response?.data?.leads);
		setTotalIncompleteLeads(response?.data?.incompleteLeads);
		setTotalOfferLeads(response?.data?.offeredLeads);
		setTotalRejectedLeads(response?.data?.rejectLeads);
		setTotalClosedLeads(response?.data?.closedLeads);
		setAllLeads(parseInt(response?.data?.leads ? response?.data?.leads : 0 )+parseInt(response?.data?.incompleteLeads ? response?.data?.incompleteLeads : 0)+parseInt(response?.data?.offeredLeads ? response?.data?.offeredLeads : 0)+parseInt(response?.data?.closedLeads ? response?.data?.closedLeads : 0));
	    setAmChartApp([{ category: 'Incomplete', val: response?.data?.incompleteLeads },{ category: 'Lead', val: response?.data?.leads },{ category: 'Offered', val: response?.data?.offeredLeads },{ category: 'Closed', val: response?.data?.closedLeads },{ category: 'Rejected', val: response?.data?.rejectLeads }]);
       }
	
   }).catch((e) => {
		   console.log(e)
	   }) 

 }

//console.log(amChartApp)

 const getLoanData = () =>{
	const  jsonData = {} 
	
  
  if(dateRangeFilter.from !="" && dateRangeFilter.to !="" && (new Date(dateRangeFilter.from).getTime() < new Date(dateRangeFilter.to).getTime())){
   jsonData['dateRange']=dateRangeFilter;
  }
    
 // console.log(jsonData);

   axios.post(API_URL+`admin/dashboard-loan-amt`,jsonData).then((res) => {
	 let response = res.data;
	 if(response?.status === 200){
		//console.log(response?.data)
		
		setTotalAppliedLoan(response?.data?.appliedLoan);
		setTotalDispersedLoan(response?.data?.disburstLoan);
		setTotalApprovedLoan(response?.data?.approvedLoan);
		setTotalOtherLoan(0);
		
		setAllLoan(parseInt(response?.data?.appliedLoan ? response?.data?.appliedLoan:0)+parseInt(response?.data?.disburstLoan ? response?.data?.disburstLoan : 0 )+parseInt(response?.data?.approvedLoan ? response?.data?.approvedLoan :0)+parseInt(0));
	
	 }
	
   }).catch((e) => {
		   console.log(e)
	   }) 

 }
 function custom_sort(a, b) {
	   return new Date(moment(a.category, 'DD-MM-YYYY').format('YYYY-MM-DD')).getTime() - new Date(moment(b.category, 'DD-MM-YYYY').format('YYYY-MM-DD')).getTime();
	}
 const getLoanDataDateWise = () =>{
	const  jsonData = {} 
	
  
  if(dateRangeFilter.from !="" && dateRangeFilter.to !="" && (new Date(dateRangeFilter.from).getTime() < new Date(dateRangeFilter.to).getTime())){
   jsonData['dateRange']=dateRangeFilter;
  }
    
  
   axios.post(API_URL+`admin/dashboard-loan-amt-date-wise`,jsonData).then((res) => {
	 let response = res.data;
	 if(response?.status === 200){
	 	(response?.data).sort(custom_sort)
		setData(response?.data)
	}
	
   }).catch((e) => {
		   console.log(e)
	   }) 

 }




 const getApplicationDataPartner = () =>{
	const  jsonData = {"partnerId":partnerId} 
	
  
  if(dateRangeFilter.from !="" && dateRangeFilter.to !="" && (new Date(dateRangeFilter.from).getTime() < new Date(dateRangeFilter.to).getTime())){
   jsonData['dateRange']=dateRangeFilter;
  }
    
 // console.log(jsonData);

   axios.post(API_URL+`admin/dashboard-application-status`,jsonData).then((res) => {
	 let response = res.data;
	 if(response?.status === 200){
		//console.log(response?.data?.offeredLeads)
		setTotalLeads(response?.data?.leads);
		setTotalIncompleteLeads(response?.data?.incompleteLeads);
		setTotalOfferLeads(response?.data?.offeredLeads);
		setTotalRejectedLeads(response?.data?.rejectLeads);
		setTotalClosedLeads(response?.data?.closedLeads);
		setAllLeads(parseInt(response?.data?.leads ? response?.data?.leads : 0 )+parseInt(response?.data?.incompleteLeads ? response?.data?.incompleteLeads : 0)+parseInt(response?.data?.offeredLeads ? response?.data?.offeredLeads : 0)+parseInt(response?.data?.closedLeads ? response?.data?.closedLeads : 0));
	    setAmChartApp([{ category: 'Incomplete', val: response?.data?.incompleteLeads },{ category: 'Lead', val: response?.data?.leads },{ category: 'Offered', val: response?.data?.offeredLeads },{ category: 'Closed', val: response?.data?.closedLeads },{ category: 'Rejected', val: response?.data?.rejectLeads }]);
       }
	
   }).catch((e) => {
		   console.log(e)
	   }) 

 }

//console.log(amChartApp)

 const getLoanDataPartner = () =>{
	const  jsonData = {"partnerId":partnerId}  
	
  
  if(dateRangeFilter.from !="" && dateRangeFilter.to !="" && (new Date(dateRangeFilter.from).getTime() < new Date(dateRangeFilter.to).getTime())){
   jsonData['dateRange']=dateRangeFilter;
  }
    
 // console.log(jsonData);

   axios.post(API_URL+`admin/dashboard-loan-amt`,jsonData).then((res) => {
	 let response = res.data;
	 if(response?.status === 200){
		//console.log(response?.data)
		
		setTotalAppliedLoan(response?.data?.appliedLoan);
		setTotalDispersedLoan(response?.data?.disburstLoan);
		setTotalApprovedLoan(response?.data?.approvedLoan);
		setTotalOtherLoan(0);
		
		setAllLoan(parseInt(response?.data?.appliedLoan ? response?.data?.appliedLoan:0)+parseInt(response?.data?.disburstLoan ? response?.data?.disburstLoan : 0 )+parseInt(response?.data?.approvedLoan ? response?.data?.approvedLoan :0)+parseInt(0));
	
	 }
	
   }).catch((e) => {
		   console.log(e)
	   }) 

 }

 const getLoanDataDateWisePartner = () =>{
	const  jsonData = {"partnerId":partnerId} 
	
  
  if(dateRangeFilter.from !="" && dateRangeFilter.to !="" && (new Date(dateRangeFilter.from).getTime() < new Date(dateRangeFilter.to).getTime())){
   jsonData['dateRange']=dateRangeFilter;
  }
    
 // console.log(jsonData);

   axios.post(API_URL+`admin/dashboard-loan-amt-date-wise`,jsonData).then((res) => {
	 let response = res.data;
	 if(response?.status === 200){
		/*setData(response?.data)*/
		(response?.data).sort(custom_sort)
		setData(response?.data)
	}
	
   }).catch((e) => {
		   console.log(e)
	   }) 

 }


 const handelUserDashboard = () =>{
    setActive(true);
	cleanData();
	getApplicationData()
	getLoanData()
	getLoanDataDateWise();


 }

const handelPartnerDashboard = () =>{
	setActive(false);
	cleanData();
	getApplicationDataPartner()
	getLoanDataPartner()
	getLoanDataDateWisePartner();
 }

 const cleanData = () =>{
		setDateRangeFilter({ from: '', to: '' });
		setTotalLeads(0);
		setTotalIncompleteLeads(0);
		setTotalOfferLeads(0);
		setTotalRejectedLeads(0);
		setTotalClosedLeads(0);
		setAllLeads(0);


		setTotalAppliedLoan(0);
		setTotalDispersedLoan(0);
		setTotalApprovedLoan(0);
		setTotalOtherLoan(0);
		setAllLoan(0);
		setData([{}])
		setAmChartApp([]);
		setPartnerId("");
 }
 const handelPartnerId = (e) =>{
		setPartnerId(e.target.value);
 }

 useEffect(()=>{
	if(!active){
		getApplicationDataPartner()
		getLoanDataPartner()
		getLoanDataDateWisePartner();
	}
},[partnerId,dateRangeFilter])
const [items, setItems] = useState([]);
const getActivePartners = () => {
	axios.post(API_URL+`admin/active-partner`).then((res) => {
		let response = res.data;
		if(response?.status === 200){
			response?.data.map((v, k) => {
				v.name = v?.name+" ["+v?.partner_id+"]";
			})
			setItems(response?.data)
		}
	}).catch((e) => {
		console.log(e)
	}) 
}
useEffect(() => {
 	getActivePartners();
},[])
const formatResult = (item, key) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }
const handleOnSearch = (string, results) => {
  console.log(string, results)
}
const handleOnSelect = (item) => {
	setPartnerId(item?.partner_id);
}
const handleReset = () => {
	setPartnerId("")
}
useEffect(() => {
	getTopFiveRecords();
},[])
const [allData, setAllData] = useState([]);
const [progressBarData, setProgressBarData] = useState([]);
const [approvedBardata, setApprovedBardata] = useState([]);
const [conversionLoan, setConversionLoan] = useState([]);
const [rejectionLoan, setRejectionLoan] = useState([]);
const getTopFiveRecords = () => {
	axios.post(API_URL+`admin/top-five-records`).then((res) => {
	 let response = res.data;
	 if(response?.status === 200){
	 	console.log(response?.data)
	 	setAllData(response?.data)
	 	
	 }
	}).catch((e) => {
		console.log(e)
	}) 
}
useEffect(() => {
	setProgressBarData(allData?.lead)
	setApprovedBardata(allData?.approvedLoan)
	setConversionLoan(allData?.conversionLoan)
	setRejectionLoan(allData?.rejectLoan)
},[allData])
return(
	<>
	<div className="layout-wrapper">
		<div className="layout-container">
			   <AdminNavBar />
		  <div className="adminMain-wrapper">
			
			<AdminHeader />

			<div className="mainContent">
			<div className="check-wrapper">
				<div className="dashboardTop-button">
					<div className="continer-fluid">
						<div className="row">
							<div className="col-md-4 topleftbuttons">
								<div className="twosetbtns">
									<button type="button" className={active?"btn btn-primary active":"btn btn-primary"} onClick={handelUserDashboard}>User Dashboard</button>
									<button type="button" className={!active?"btn btn-primary active":"btn btn-primary"} onClick={handelPartnerDashboard}>Partners Dashboard</button>
								</div>
							</div>
							<div className="col-md-3 partneridDiv">
							{/*<div className="dateFromTO form-inline partnersIds">*/}

								{!active?<div className="dateFromTO partnersIds">
											{/*<div className="datelabel form-group">Partners ID</div>*/}
											<div className="dateinputfileds">{/*<input type="text" name="partner" onChange={handelPartnerId} value={partnerId} className="form-control" />*/}
											<ReactSearchAutocomplete 
												items={items}
												formatResult={formatResult}
												placeholder="Enter Partner ID"
												autoFocus
												onSearch={handleOnSearch}
												onClear={handleReset}
												onSelect={handleOnSelect}
												className="serach-auto-box"
											/>
											</div>											
										</div>:""}
							</div>
							<div className="col-md-5 filterDivi">
								<div className="rtfilterbuttons">
									<div className="datefiltersOption">
										<div className="dateFromTO form-inline">
											<div className="datelabel form-group">Date</div>
											<div className="dateinputfileds ">
												<input  type="date"
												 placeholder="From"
												 className="form-group"
												 value={dateRangeFilter.from}
												 onChange={(e) => setDateRangeFilter({ ...dateRangeFilter, from: e.target.value })} />
											</div>
											<div className="dateinputfileds">
												<input  type="date"
												 placeholder="To"
												 className="form-group"
												 value={dateRangeFilter.to}
												 onChange={(e) => setDateRangeFilter({ ...dateRangeFilter, to: e.target.value })}  />
										</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="sectionCompund">
				
				<div className="grapMaps">
				<div className="topHeadings">
					<h5>Application Funnel</h5>
				</div>
					<div className="fourKpis">
						<div className="continer-fluid">							
							
							<div className="row sectionTwo">
								
								<div className="col-md-5">
									<div className="row">
								<div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
									<div className="income-dashone fistSec" style={{backgroundColor:"#506ffb",color:"white"}}>
										<div className="analytics-content">										
										<h6>Total Applications : {allLeads ? <CurrencyFormat value={allLeads} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true}  />:"0"}</h6>										
										</div>
									</div>
									</div>
								</div>
								<div className="row">
								<div className="col-lg-6 col-md-6 col-sm-6">
									<div className="income-dashone fistSec">
										<div className="analytics-content">
											<h5 style={{color:"#42cdff"}}>Incomplete Lead</h5>
											<h6><span>{totalIncompleteLeads ? <CurrencyFormat value={totalIncompleteLeads} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true}  />:"0"}</span></h6>											
										</div>
									</div>
								</div>

								<div className="col-lg-6 col-md-6 col-sm-6">
									<div className="income-dashone secondSec">
										<div className="analytics-content">
											<h5 style={{color:"#ffb800"}}>Leads</h5>
											<h6><span>{totalLeads ? <CurrencyFormat value={totalLeads} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true}  />:"0"}</span></h6>
										</div>
									</div>
								</div>
								</div>
								<div className="row">
								<div className="col-lg-6 col-md-6 col-sm-6 ">
									<div className="income-dashone thirdSec">
										<div className="analytics-content">
											<h5 style={{color:"#f555ff"}}>Offered Lead</h5>
											<h6><span>{totalOfferLeads ? <CurrencyFormat value={totalOfferLeads} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true}  />:"0"}</span></h6>
										</div>
									</div>
								</div>

								<div className="col-lg-6 col-md-6 col-sm-6 ">
									<div className="income-dashone fourSec">
										<div className="analytics-content">
											<h5 style={{color:"#52fb6a"}}>Closed Lead</h5>
											<h6><span>{totalClosedLeads ? <CurrencyFormat value={totalClosedLeads} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true}  />:"0"}</span></h6>
										</div>
									</div>
								</div>
								</div>
								</div>
									<div className="col-md-7">
									<div className="chartplacements">
										
										{(amChartApp.length>0)?<div><AppPieChart options={amChartApp}   /></div>:""}
									</div>
								</div>
								{/* <div className="col-md-5">
											<div className="tableStructure">
												<table className="table table-striped table-bordered">
													<thead>
														<tr>
															<th>Lead adstatus</th>
															<th>Count</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>Incomplete</td>
															<td>{totalIncompleteLeads ? <CurrencyFormat value={totalIncompleteLeads} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true}  />:"0"}</td>
														</tr>
														<tr>
															<td>Leads</td>
															<td>{totalLeads ? <CurrencyFormat value={totalLeads} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true}  />:"0"}</td>
														</tr>
														<tr>
															<td>Offered</td>
															<td>{totalOfferLeads ? <CurrencyFormat value={totalOfferLeads} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true}  />:"0"}</td>
														</tr>
														<tr>
															<td>Closed</td>
															<td>{totalClosedLeads ? <CurrencyFormat value={totalClosedLeads} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true}  />:"0"}</td>
														</tr>
														<tr>
															<td>Rejected</td>
															<td>{totalRejectedLeads ? <CurrencyFormat value={totalRejectedLeads} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true}  />:"0"}</td>
														</tr>
													</tbody>
												</table>
											</div>
								</div> */}
							
							</div>
							
						</div>
					</div>
				</div>

				
				<div className="grapMaps">
				<div className="topHeadings">
					<h5>Amount Funnel</h5>
				</div>
					<div className="fourKpis">
						<div className="continer-fluid">							
							<div className="row">

								

							</div>
						<div className="row sectionAnotherKpi">	
							<div className="col-md-5">
								<div className="row">
									<div className="col-lg-12 col-md-6 col-sm-6 col-xs-12">
								
									<div className="income-dashone fistSec" style={{backgroundColor:"#506ffb",color:"white"}}>
										<div className="analytics-content">
										<h6>Total Applications Amount : {allLoan ? <CurrencyFormat value={allLoan} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true} prefix={"₹"}  />:"0"}</h6>											
										</div>
									</div>
								</div>
								</div>
								<div className="row">
								<div className="col-lg-6 col-md-6 col-sm-6">
									<div className="income-dashone fistSec">
										<div className="analytics-content">
											<h5 style={{color:"#4571bd"}}>Amount Applied</h5>
											<h6><span>{totalAppliedLoan ? <CurrencyFormat value={totalAppliedLoan} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true} prefix={"₹"}  />:"0"}</span></h6>
											
										</div>
									</div>
								</div>

								<div className="col-lg-6 col-md-6 col-sm-6">
									<div className="income-dashone secondSec">
										<div className="analytics-content">
											<h5 style={{color:"#ec7c33"}}>Approved Amount</h5>
											<h6><span>{totalApprovedLoan ? <CurrencyFormat value={totalApprovedLoan} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true} prefix={"₹"}  />:"0"}</span></h6>
											
										</div>
									</div>
								</div>
								</div>
								<div className="row">
								<div className="col-lg-12 col-md-12 col-sm-6 col-xs-12">
									<div className="income-dashone thirdSec">
										<div className="analytics-content">
											<h5 style={{color:"#a4a3a4"}}>Disbursed Amount</h5>
											<h6><span>{totalDispersedLoan ? <CurrencyFormat value={totalDispersedLoan} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true} prefix={"₹"}  />:"0"}</span></h6>
											
										</div>
									</div>
								</div>
								</div>
									</div>
									<div className="col-md-7">
										<div className="chartplacements">
											
											{(data.length>0)?<div><GroupedBarGraph data={data}   /></div>:""}
										</div>
									</div>
									{/* <div className="col-md-5">
										<div className="tableStructure">
											<table className="table table-striped table-bordered">
												<thead>
													<tr>
														<th>Status</th>
														<th>Amount</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>Applied Amount</td>
														<td>{totalAppliedLoan ? <CurrencyFormat value={totalAppliedLoan} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true} prefix={"₹"}  />:"0"}</td>
													</tr>
													<tr>
														<td>Approved Amount</td>
														<td>{totalApprovedLoan ? <CurrencyFormat value={totalApprovedLoan} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true} prefix={"₹"}  />:"0"}</td>
													</tr>
													<tr>
														<td>Disbursed Amount</td>
														<td>{totalDispersedLoan ? <CurrencyFormat value={totalDispersedLoan} thousandSpacing={'2s'} displayType={'text'} thousandSeparator={true} prefix={"₹"}  />:"0"}</td>
													</tr>												
												</tbody>
											</table>
										</div>
									</div> */}
							
						</div>
						</div>
					</div>
				</div>
</div>
{
	!active?<><div className="row">
		<div className="col-md-6">
			<div className="progress-bar-head">Top 5 Partner By Lead</div>
			<div className="bar">
				<ProgressChart id={"progressChart1"} progressBarData={progressBarData}/>
			</div>
		</div>
		<div className="col-md-6">
			<div className="progress-bar-head">Top 5 Partners by Approved Loan</div>
			<div className="bar">
			<ProgressChart id={"progressChart2"} progressBarData={approvedBardata}/>
			</div>
		</div>
	</div>
	<div className="row">
		<div className="col-md-6">
			<div className="progress-bar-head">Top 5 Partners by Conversion</div>
			<div className="bar">
				<ProgressChart id={"progressChart3"} progressBarData={conversionLoan}/>
			</div>
		</div>
		<div className="col-md-6">
			<div className="progress-bar-head">Top 5 Partners by Rejection Rate</div>
			<div className="bar">
			<ProgressChart id={"progressChart4"} conversionLoan={rejectionLoan}/>
			</div>
		</div>
	</div></>:""
}
	

			</div>
			</div>
			<AdminFooter />

		</div>




	</div>

</div>


			
</>
	)
}