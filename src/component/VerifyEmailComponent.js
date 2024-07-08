import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_URL } from './../config/constant';
import Swal from 'sweetalert2'
function VerifyEmailComponent() {
  const location = useLocation();
  console.log(location)
  let navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    axios.post(API_URL+"user/verify-email-link",{token: token}).then((res) => {
      let response = res?.data;
      if(response?.status == 200){
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response?.message,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            return navigate('/');
          } 
        });
      }else{
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: response?.message,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            return navigate('/');
          } 
        });
      }
    }).catch((e) => {

    })
    console.log('Token:', token);
  }, [location.search]);

  return (
    <div>
      
    </div>
  );
}

export default VerifyEmailComponent;
