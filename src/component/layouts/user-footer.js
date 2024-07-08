export default function UserFooter(){
	let copyrightDate = new Date();
	const thisYear = copyrightDate.getFullYear();
	return(
		<>
		
            <div className="user-footer-bg">
			<div className="container-fluid">
			<div className="row">
				<div className="col-md-6">Finlab © {thisYear} All rights reserved.</div>
				<div className="col-md-6">Made with <i className="fa fa-heart" aria-hidden="true" style={{color:'#ff0707'}}></i> in India</div>
			</div>
    </div>
    </div>
  
		</>
	)
}