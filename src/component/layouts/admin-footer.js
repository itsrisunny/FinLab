import React, { useEffect, useRef, useState} from "react";

export default function AdminFooter(){
    return(<>
        <div className="footerSection">
				<div className="continer-fluid">
					<div className="row">
						<div className="col-md-12">
							<div className="CopyrightText">
								<p>Finlab © {(new Date).getFullYear()}. All rights reserved.</p>
							</div>							
						</div>
					</div>
				</div>
			</div>
    </>)
}
