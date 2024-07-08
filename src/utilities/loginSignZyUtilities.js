import axios from "axios";
import { SIGNZY_URL, SIGNZY_USERNAME, SIGNZY_PASSWORD } from './../config/constant';
const config = {
	headers: { 
	  	'Access-Control-Allow-Origin' : '*',
	  	'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	}
};
const signzyLogin =  async () => {
	var options = {
	  	method: 'POST',
	  	url: SIGNZY_URL+'patrons/login',
	  	headers: {'Accept-Language': 'en-US,en;q=0.8', Accept: '*/*'},
	  	data: {username: SIGNZY_USERNAME, password: SIGNZY_PASSWORD}
	};
	axios.request(options).then(function (response) {
	  	console.log(response.data);
	}).catch(function (error) {
	  	console.error(error);
	});
	/*axios.post(SIGNZY_URL+'patrons/login',{username: SIGNZY_USERNAME, password: SIGNZY_PASSWORD}, config).then((res) => {
		console.error(res);
	}).catch(function (error) {
	  	console.error(error);
	})*/
}
const identities = () => {
	//https://preproduction.signzy.tech/api/v2/patrons/655b019a1efb76002306ffe6/identities
	var options = {
	  	method: 'POST',
	  	url: SIGNZY_URL+'patrons/655b019a1efb76002306ffe6/identities',
	  	headers: {'Accept-Language': 'en-US,en;q=0.8', Accept: '*/*'},
	  	data: {
			"type": "individualPan",//"individualPan" OR "businessPan" OR "aadhaar" OR "passport" OR "drivingLicence" OR "cheque" OR "voterid"
			    "email": "anoop@techwagger.com",
			    "callbackUrl": "https://finlab.apisod.ai",
			    "images": []
			}

		};
	axios.request(options).then(function (response) {
	  	console.log(response.data);
	}).catch(function (error) {
	  	console.error(error);
	});
}
export function doSomething (num){
	//signzyLogin()
	identities();
	return num + 1;
}
export function doSomething1 (num){
	return num + 1;
}